// Painel do administrador: acompanha o progresso de todos os alunos (somente leitura).
// Quem garante o acesso são as regras do Firestore; aqui só escondemos a tela de quem não é admin.
import { shell } from '../ui/layout.js';
import { esc, progressBar, toast, difficultyLabel } from '../ui/dom.js';
import { getState } from '../data/store.js';
import { isAdminEmail } from '../config.js';
import { resendVerification, refreshVerification } from '../auth.js';
import { DAYS } from '../content/index.js';
import { topicLabel } from '../content/topics.js';
import { overview, weakTopics, errorProfile, exerciseScore, formatDuration } from '../data/progress.js';

const COLECOES = ['progress', 'quiz', 'notes', 'activity'];

async function firestore() {
  const [{ db }, fs] = await Promise.all([import('../firebase.js'), import('firebase/firestore')]);
  return { db, ...fs };
}

const dataHora = (iso) => (iso ? new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—');

function semAcesso(root, motivo) {
  root.innerHTML = shell('/admin', `<h1>Administração</h1><section class="painel"><p>${motivo}</p></section>`);
}

/** Admin precisa ter o e-mail confirmado: sem isso, as regras do Firestore negam a leitura. */
function pedirVerificacao(root, user, depois) {
  root.innerHTML = shell('/admin', `
    <h1>Administração</h1>
    <section class="painel">
      <h2>Confirme seu e-mail</h2>
      <p>Para ver os dados dos alunos, o e-mail <strong>${esc(user.email)}</strong> precisa estar confirmado.
      Abra o link que o Firebase enviou para sua caixa de entrada (veja também o spam) e depois clique em “Já confirmei”.</p>
      <div class="botoes">
        <button class="btn btn-primary" id="ja-confirmei">Já confirmei</button>
        <button class="btn btn-ghost" id="reenviar">Reenviar e-mail de confirmação</button>
      </div>
    </section>`);
  root.querySelector('#reenviar').addEventListener('click', async (e) => {
    e.target.disabled = true;
    try {
      await resendVerification();
      toast('E-mail de confirmação enviado.', 'ok');
    } catch (err) {
      toast(err.code === 'auth/too-many-requests' ? 'Muitos envios seguidos. Aguarde alguns minutos.' : 'Não foi possível enviar o e-mail.', 'erro');
      e.target.disabled = false;
    }
  });
  root.querySelector('#ja-confirmei').addEventListener('click', async () => {
    if (await refreshVerification()) {
      user.verified = true;
      depois();
    } else {
      toast('Ainda não consta como confirmado. Abra o link do e-mail e tente de novo.', 'erro');
    }
  });
}

function guarda(root, depois) {
  const { user } = getState();
  if (!user || user.local || !isAdminEmail(user.email)) {
    semAcesso(root, 'Esta área é restrita ao administrador.');
    return;
  }
  if (!user.verified) {
    pedirVerificacao(root, user, depois);
    return;
  }
  depois();
}

function erroLeitura(root, e) {
  console.error(e);
  const msg = e?.code === 'permission-denied'
    ? 'Permissão negada pelo Firestore. Publique as regras atualizadas (firestore.rules) no console do Firebase e confirme que seu e-mail está verificado.'
    : 'Não foi possível carregar os dados. Verifique a conexão e tente de novo.';
  semAcesso(root, msg);
}

// ---------------------------------------------------------------------------
// Lista de alunos
// ---------------------------------------------------------------------------

export function adminView(root) {
  guarda(root, () => carregarLista(root));
}

async function carregarLista(root) {
  root.innerHTML = shell('/admin', '<h1>Administração</h1><p class="muted">Carregando alunos…</p>');
  let alunos;
  try {
    const { db, collection, getDocs } = await firestore();
    const snap = await getDocs(collection(db, 'users'));
    alunos = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
  } catch (e) {
    erroLeitura(root, e);
    return;
  }
  alunos.sort((a, b) => (b.resumo?.ultimaAtividade || '').localeCompare(a.resumo?.ultimaAtividade || ''));

  const total = DAYS.reduce((s, d) => s + d.exercises.length, 0) + DAYS.length;
  const linhas = alunos.map((a) => {
    const r = a.resumo;
    const feitas = r ? r.tarefas : null;
    return `<tr>
      <th scope="row"><a href="#/admin/${esc(a.uid)}">${esc(a.name || '(sem nome)')}</a><div class="pequeno muted">${esc(a.email || '')}</div></th>
      <td>${feitas === null ? '<span class="muted">—</span>' : `<strong>${feitas}</strong> de ${r.totalTarefas || total}`}
        ${feitas === null ? '' : progressBar(feitas / (r.totalTarefas || total), `${feitas} de ${r.totalTarefas || total} tarefas`)}</td>
      <td>${r ? `Dia ${r.diaAtual}` : '—'}</td>
      <td>${r ? formatDuration(r.tempoSeg || 0) : '—'}</td>
      <td>${dataHora(r?.ultimaAtividade)}</td>
      <td class="pequeno">${r?.dificuldades?.length ? esc(r.dificuldades.join(', ')) : '<span class="muted">—</span>'}</td>
    </tr>`;
  }).join('');

  root.innerHTML = shell('/admin', `
    <h1>Administração</h1>
    <p class="muted">${alunos.length} aluno(s) cadastrado(s). Clique no nome para ver tudo o que a pessoa fez.</p>
    <section class="painel">
      <div class="tabela-rolagem">
        <table class="tabela">
          <thead><tr><th>Aluno</th><th>Tarefas feitas</th><th>Etapa</th><th>Tempo</th><th>Última atividade</th><th>Dificuldades</th></tr></thead>
          <tbody>${linhas || '<tr><td colspan="6" class="muted">Nenhum aluno ainda.</td></tr>'}</tbody>
        </table>
      </div>
      <p class="pequeno muted">“—” aparece para quem ainda não abriu o app depois desta atualização; o detalhe do aluno funciona mesmo assim.</p>
    </section>`);
}

// ---------------------------------------------------------------------------
// Detalhe de um aluno
// ---------------------------------------------------------------------------

export function adminUserView(root, { match }) {
  guarda(root, () => carregarAluno(root, match[1]));
}

async function carregarAluno(root, uid) {
  root.innerHTML = shell('/admin', '<p class="muted">Carregando dados do aluno…</p>');
  const st = { user: { uid }, profile: {}, progress: {}, quiz: {}, notes: {}, activity: {} };
  try {
    const { db, doc, getDoc, collection, getDocs } = await firestore();
    const perfil = await getDoc(doc(db, 'users', uid));
    st.profile = perfil.exists() ? perfil.data() : {};
    await Promise.all(COLECOES.map(async (col) => {
      const snap = await getDocs(collection(db, 'users', uid, col));
      snap.forEach((d) => { st[col][d.id] = d.data(); });
    }));
  } catch (e) {
    erroLeitura(root, e);
    return;
  }

  const o = overview(st);
  const fracos = weakTopics(5, st);
  const erros = errorProfile(6, st);

  const dias = o.days.map(({ day, stats }) => {
    const nota = st.notes[`d${day.day}`];
    const exercicios = day.exercises.map((ex) => {
      const p = st.progress[ex.id];
      const estado = p?.passed ? `<span class="tag tag-ok">resolvido · nota ${Math.round(exerciseScore(p) * 100)}%</span>`
        : p?.attempts ? '<span class="tag tag-aviso">tentando</span>' : '<span class="muted">não iniciado</span>';
      const detalhes = p?.attempts
        ? `${p.attempts} tentativa(s) · ${p.hintsUsed || 0} dica(s)${p.solutionViewed ? ' · viu a solução' : ''} · ${formatDuration(p.timeSec || 0)}`
        : '';
      const codigo = p?.lastCode
        ? `<details><summary class="pequeno">último código</summary><pre class="codigo-admin">${esc(p.lastCode)}</pre></details>`
        : '';
      return `<li class="admin-ex"><div><strong>${esc(ex.title)}</strong> <span class="pequeno muted">${esc(topicLabel(ex.topic))} · ${difficultyLabel(ex.difficulty)}</span></div>
        <div>${estado} <span class="pequeno muted">${detalhes}</span></div>${codigo}</li>`;
    }).join('');
    const diario = nota && (nota.aprendi || nota.duvidas)
      ? `<div class="pequeno"><strong>Diário:</strong> ${esc(nota.aprendi || '—')}${nota.duvidas ? `<br><strong>Dúvidas:</strong> ${esc(nota.duvidas)}` : ''}</div>`
      : '';
    return `<details class="painel" ${stats.status === 'andamento' ? 'open' : ''}>
      <summary><strong>Dia ${day.day} — ${esc(day.title)}</strong>
        <span class="muted"> · ${stats.passed} de ${stats.total} exercícios · quiz ${stats.quizBest === null ? '—' : `${stats.quizBest}%`}</span></summary>
      <ul class="lista-limpa">${exercicios}</ul>${diario}
    </details>`;
  }).join('');

  const nome = st.profile.name || '(sem nome)';
  root.innerHTML = shell('/admin', `
    <p><a href="#/admin" class="link">← Todos os alunos</a></p>
    <h1>${esc(nome)}</h1>
    <p class="muted">${esc(st.profile.email || '')} · começou em ${esc(st.profile.startDate || '—')}</p>

    <section class="cards-resumo" aria-label="Resumo do aluno">
      <div class="card-num"><span class="num">${o.doneTasks}<small>/${o.totalTasks}</small></span><span class="rotulo">tarefas feitas</span></div>
      <div class="card-num"><span class="num">${o.passed}<small>/${o.totalEx}</small></span><span class="rotulo">exercícios resolvidos</span></div>
      <div class="card-num"><span class="num">${o.quizzesPassed}<small>/15</small></span><span class="rotulo">quizzes aprovados</span></div>
      <div class="card-num"><span class="num">${formatDuration(o.totalSeconds)}</span><span class="rotulo">tempo de estudo · 🔥 ${o.streak} dia(s) seguidos</span></div>
    </section>

    <div class="grid-2">
      <section class="painel">
        <h2>Dificuldades</h2>
        ${fracos.length ? `<ul class="lista-limpa">${fracos.map((t) => `<li class="foco-item"><div class="foco-topo"><strong>${esc(t.label)}</strong><span class="muted pequeno">domínio ${Math.round(t.mastery * 100)}%</span></div>${progressBar(t.mastery, `Domínio de ${t.label}`)}${t.reasons.length ? `<p class="pequeno muted">${esc(t.reasons.join(' · '))}</p>` : ''}</li>`).join('')}</ul>` : '<p class="muted">Nenhuma dificuldade identificada até agora.</p>'}
      </section>
      <section class="painel">
        <h2>Erros mais comuns</h2>
        ${erros.length ? `<ul class="lista-limpa">${erros.map((e) => `<li>• ${esc(e.label)} <span class="muted">(${e.count}×)</span></li>`).join('')}</ul>` : '<p class="muted">Nenhum erro registrado.</p>'}
        <p class="pequeno muted">Etapa atual: dia ${o.currentDay} · ${o.completedDays} dia(s) concluído(s).</p>
      </section>
    </div>

    <h2>Dia a dia</h2>
    ${dias}`);
}
