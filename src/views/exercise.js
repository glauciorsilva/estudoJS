import { shell } from '../ui/layout.js';
import { esc, toast, confirmDialog, difficultyLabel } from '../ui/dom.js';
import { createEditor, symbolBar } from '../ui/editor.js';
import { renderError, renderTests, renderConsole, renderDomPreview } from '../ui/results.js';
import { getExercise, nextExercise } from '../content/index.js';
import { topicLabel } from '../content/topics.js';
import { execute, warmUp } from '../runner/sandbox.js';
import { explainError } from '../runner/errors.js';
import { getState, updateProgress, addActivity } from '../data/store.js';
import { exerciseScore, scheduleAfterPass, scheduleAfterFail } from '../data/progress.js';
import { startStudyTimer, stopStudyTimer } from '../data/timer.js';
import { safeGet, safeSet, safeRemove } from '../auth.js';

const draftKey = (id) => `estudojs:draft:${getState().user?.uid}:${id}`;

function errorKind(result) {
  if (result.error) return explainError(result.error)?.kind || 'outro';
  const comErro = result.tests.find((t) => !t.pass && t.errorName);
  if (comErro) {
    const message = comErro.error.slice(comErro.errorName.length + 2);
    return explainError({ name: comErro.errorName, message })?.kind || 'outro';
  }
  return 'resultado-errado';
}

export function exerciseView(root, { match, params }) {
  const ex = getExercise(match[1]);
  if (!ex) {
    root.innerHTML = shell('/dia', '<p>Exercício não encontrado. <a href="#/trilha">Voltar para a trilha</a></p>');
    return null;
  }
  const revisao = params.get('revisao') === '1';
  const prox = nextExercise(ex.id);
  const ultimoDoDia = !prox || prox.day !== ex.day;
  let p = getState().progress[ex.id] || {};

  // Em revisão começa do zero: recuperar da memória é o que fortalece o aprendizado.
  const codigoInicial = revisao ? ex.starter : safeGet(draftKey(ex.id)) ?? p.lastCode ?? ex.starter;
  let dicasVisiveis = revisao ? 0 : Math.min(p.hintsUsed || 0, ex.hints.length);
  let ajudaNestaSessao = false;
  let ultimoCodigoExecutado = null;
  let tempoAcumulado = 0;

  const proximoLink = ultimoDoDia
    ? `<a class="btn btn-primary" href="#/dia/${ex.day}?aba=quiz">Fazer o quiz do dia ${ex.day} →</a>`
    : `<a class="btn btn-primary" href="#/exercicio/${prox.id}">Próximo exercício →</a>`;

  root.innerHTML = shell(`/dia/${ex.day}`, `
    <nav class="migalha" aria-label="Você está em"><a href="#/trilha">Trilha</a> › <a href="#/dia/${ex.day}?aba=exercicios">Dia ${ex.day}</a> › Exercício</nav>
    <div class="ex-cabecalho">
      <h1>${esc(ex.title)}</h1>
      <div class="tags">
        <span class="tag">${esc(topicLabel(ex.topic))}</span>
        <span class="tag dif-${ex.difficulty}">${difficultyLabel(ex.difficulty)}</span>
        ${revisao ? '<span class="tag tag-aviso">Modo revisão: resolva de memória</span>' : ''}
        <span class="tag tag-ok" id="tag-resolvido" ${p.passed ? '' : 'hidden'}>✓ resolvido · nota ${Math.round(exerciseScore(p) * 100)}%</span>
      </div>
    </div>

    <div class="ex-layout">
      <section class="ex-enunciado" aria-label="Enunciado">
        <details open class="enunciado-box">
          <summary>Enunciado</summary>
          <div class="enunciado">${ex.prompt}</div>
          <h2 class="pequeno">O que será verificado</h2>
          <ul class="verificacoes">${ex.tests.map((t) => `<li>${esc(t.name)}</li>`).join('')}${(ex.checks || []).map((c) => `<li>${esc(c.message)} <span class="tag">regra</span></li>`).join('')}</ul>
          ${ex.env === 'dom' ? '<p class="pequeno muted">Este exercício roda numa página simulada. Veja o resultado na seção “Página”.</p>' : ''}
        </details>

        <div class="ajuda">
          <div id="dicas">${ex.hints.slice(0, dicasVisiveis).map((h, i) => `<div class="dica-box"><strong>Dica ${i + 1}:</strong> ${h}</div>`).join('')}</div>
          <div class="ajuda-botoes">
            <button class="btn btn-ghost btn-sm" id="btn-dica" ${dicasVisiveis >= ex.hints.length ? 'hidden' : ''}>💡 Ver dica ${dicasVisiveis + 1} de ${ex.hints.length}</button>
            <button class="btn btn-ghost btn-sm" id="btn-solucao">🔑 Ver solução</button>
          </div>
          <div id="solucao" hidden></div>
        </div>
      </section>

      <section class="ex-codigo" aria-label="Código">
        <div class="editor-barra">
          <button class="btn btn-primary" id="btn-executar" title="Ctrl+Enter">▶ Executar</button>
          <button class="btn btn-ghost btn-sm" id="btn-resetar" title="Voltar ao código inicial">↺ Recomeçar</button>
          <span class="pequeno muted atalho">Ctrl+Enter executa</span>
        </div>
        <div class="editor" id="editor"></div>
        <div id="simbolos"></div>
        <div class="resultado" id="resultado" aria-live="polite">
          <p class="muted pequeno">Escreva seu código e toque em <strong>Executar</strong>.</p>
        </div>
        <div id="sucesso" hidden class="sucesso-box">
          <p>🎉 <strong>Muito bem!</strong> Todos os testes passaram.</p>
          <p class="pequeno">Antes de seguir: você conseguiria explicar cada linha do seu código para alguém?</p>
          ${revisao ? '<a class="btn btn-primary" href="#/revisao">Voltar para a revisão →</a>' : proximoLink}
        </div>
      </section>
    </div>`);

  const resultadoEl = root.querySelector('#resultado');
  const btnExecutar = root.querySelector('#btn-executar');
  let salvarRascunho;

  const editor = createEditor(root.querySelector('#editor'), {
    doc: codigoInicial,
    onRun: () => executar(),
    onChange: (code) => {
      if (revisao) return;
      clearTimeout(salvarRascunho);
      salvarRascunho = setTimeout(() => safeSet(draftKey(ex.id), code), 400);
    },
  });
  root.querySelector('#simbolos').append(symbolBar(editor));
  warmUp();

  async function executar() {
    const code = editor.getValue();
    btnExecutar.disabled = true;
    btnExecutar.textContent = '⏳ Executando…';
    resultadoEl.innerHTML = '<p class="muted pequeno">Executando…</p>';
    let result;
    try {
      result = await execute({ code, tests: ex.tests, checks: ex.checks || [], env: ex.env, html: ex.html });
    } catch (err) {
      result = null;
      resultadoEl.innerHTML = `<div class="erro" role="alert"><div class="erro-titulo">⏱️ <strong>${err.timeout ? 'Tempo esgotado' : 'Falha na execução'}</strong></div><p class="erro-explicacao">${esc(err.message)}</p></div>`;
      registrar(code, { ok: false, timeout: Boolean(err.timeout) });
    } finally {
      btnExecutar.disabled = false;
      btnExecutar.textContent = '▶ Executar';
    }
    if (!result) return;

    const passaram = result.tests.filter((t) => t.pass).length;
    const banner = result.ok
      ? `<div class="banner banner-ok">✅ ${passaram} de ${result.tests.length} verificações passaram</div>`
      : `<div class="banner banner-erro">❌ ${passaram} de ${result.tests.length} verificações passaram</div>`;
    resultadoEl.innerHTML = `${banner}${renderError(result.error)}
      <h3 class="pequeno">Verificações</h3>${renderTests(result.tests)}
      <h3 class="pequeno">Console</h3>${renderConsole(result.logs, result.truncated)}
      ${result.dom != null ? '<h3 class="pequeno">Página</h3><div id="preview"></div>' : ''}`;
    if (result.dom != null) renderDomPreview(resultadoEl.querySelector('#preview'), result.dom);
    registrar(code, result);
    if (matchMedia('(max-width: 900px)').matches) resultadoEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function registrar(code, result) {
    const mudouCodigo = code !== ultimoCodigoExecutado;
    ultimoCodigoExecutado = code;
    const agora = new Date().toISOString();
    const jaResolvido = Boolean(p.passed);
    const kind = result.ok ? null : result.timeout ? 'loop-infinito' : errorKind(result);

    p = updateProgress(ex.id, (cur) => {
      const n = { ...cur };
      n.attempts = (n.attempts || 0) + 1;
      n.firstAttemptAt = n.firstAttemptAt || agora;
      n.lastAttemptAt = agora;
      n.timeSec = (n.timeSec || 0) + tempoAcumulado;
      if (!revisao) n.lastCode = code.slice(0, 20000);
      if (kind && mudouCodigo) {
        n.errors = { ...(n.errors || {}) };
        n.errors[kind] = (n.errors[kind] || 0) + 1;
      }
      if (!result.ok && !n.passed && mudouCodigo) n.failsBeforePass = (n.failsBeforePass || 0) + 1;
      if (result.ok && !n.passed) {
        n.passed = true;
        n.passedAt = agora;
        n.hintsBeforePass = n.hintsUsed || 0;
        n.solutionBeforePass = Boolean(n.solutionViewed);
        n.srs = scheduleAfterPass(n);
      } else if (result.ok && revisao) {
        n.lastRunUsedHelp = ajudaNestaSessao;
        if (!ajudaNestaSessao) n.reviewPasses = (n.reviewPasses || 0) + 1;
        n.srs = scheduleAfterPass(n, { review: true });
        delete n.lastRunUsedHelp;
      }
      return n;
    });
    tempoAcumulado = 0;
    if (!revisao) safeRemove(draftKey(ex.id)); // o código agora está salvo em lastCode
    addActivity({ attempts: 1, solved: result.ok && !jaResolvido ? 1 : 0 });

    if (result.ok) {
      safeRemove(draftKey(ex.id));
      root.querySelector('#sucesso').hidden = false;
      const tag = root.querySelector('#tag-resolvido');
      tag.hidden = false;
      tag.textContent = `✓ resolvido · nota ${Math.round(exerciseScore(p) * 100)}%`;
      if (!jaResolvido) toast('Exercício resolvido! 🎉', 'ok');
      else if (revisao) toast(ajudaNestaSessao ? 'Revisão feita. Ela volta em breve para fixar melhor.' : `Revisão concluída! Próxima em ${p.srs.interval} dia(s).`, 'ok');
    } else {
      root.querySelector('#sucesso').hidden = true;
      // Muitas tentativas seguidas: sugerir uma dica
      if (!p.passed && (p.failsBeforePass || 0) >= 4 && dicasVisiveis === 0 && mudouCodigo) {
        toast('Travou? Tudo bem! Abrir uma dica agora é uma boa ideia.', 'info', 5000);
      }
    }
  }

  btnExecutar.addEventListener('click', executar);

  root.querySelector('#btn-resetar').addEventListener('click', async () => {
    if (await confirmDialog('Apagar seu código e voltar ao código inicial do exercício?', { ok: 'Recomeçar', danger: true })) {
      editor.setValue(ex.starter);
      safeRemove(draftKey(ex.id));
      editor.focus();
    }
  });

  const btnDica = root.querySelector('#btn-dica');
  btnDica.addEventListener('click', () => {
    if (dicasVisiveis >= ex.hints.length) return;
    dicasVisiveis++;
    ajudaNestaSessao = true;
    root.querySelector('#dicas').insertAdjacentHTML('beforeend', `<div class="dica-box"><strong>Dica ${dicasVisiveis}:</strong> ${ex.hints[dicasVisiveis - 1]}</div>`);
    updateProgress(ex.id, (cur) => ({ ...cur, hintsUsed: Math.max(cur.hintsUsed || 0, dicasVisiveis) }));
    if (dicasVisiveis >= ex.hints.length) btnDica.hidden = true;
    else btnDica.textContent = `💡 Ver dica ${dicasVisiveis + 1} de ${ex.hints.length}`;
  });

  root.querySelector('#btn-solucao').addEventListener('click', async () => {
    const box = root.querySelector('#solucao');
    if (!box.hidden) { box.hidden = true; return; }
    const tentativas = p.failsBeforePass || 0;
    if (!p.passed || revisao) {
      const msg = tentativas < 2
        ? 'Você tentou poucas vezes. Ver a solução agora reduz bastante o aprendizado (e a nota deste exercício). Que tal abrir uma dica primeiro?'
        : 'Ver a solução reduz a nota deste exercício e ele voltará na revisão. Depois de ler, feche a solução e reescreva de memória. Continuar?';
      if (!(await confirmDialog(msg, { ok: 'Ver solução', cancel: 'Tentar mais' }))) return;
      ajudaNestaSessao = true;
      p = updateProgress(ex.id, (cur) => {
        const n = { ...cur, solutionViewed: true };
        if (revisao && cur.passed) n.srs = scheduleAfterFail(cur);
        return n;
      });
    }
    box.hidden = false;
    box.innerHTML = '<p class="pequeno muted">Leia, entenda, feche e escreva de memória — não copie e cole.</p><div class="editor editor-solucao"></div>';
    createEditor(box.querySelector('.editor-solucao'), { doc: ex.solution, readOnly: true, label: 'Solução' });
  });

  startStudyTimer((s) => { tempoAcumulado += s; });

  if (p.passed && !revisao) root.querySelector('#sucesso').hidden = false;

  return {
    cleanup() {
      stopStudyTimer();
      clearTimeout(salvarRascunho);
      const atual = editor.getValue();
      if (!revisao && atual !== ex.starter && atual !== getState().progress[ex.id]?.lastCode) safeSet(draftKey(ex.id), atual);
      if (tempoAcumulado >= 30 && getState().progress[ex.id]) {
        updateProgress(ex.id, (cur) => ({ ...cur, timeSec: (cur.timeSec || 0) + tempoAcumulado }));
      }
      editor.destroy();
    },
  };
}
