import { shell } from '../ui/layout.js';
import { esc, toast, encodeCode, difficultyLabel, progressBar } from '../ui/dom.js';
import { getDay, DAYS } from '../content/index.js';
import { topicLabel } from '../content/topics.js';
import { getState, saveQuiz, saveNote } from '../data/store.js';
import { dayStats, exerciseScore, QUIZ_PASS } from '../data/progress.js';
import { startStudyTimer, stopStudyTimer } from '../data/timer.js';

const ABAS = [
  ['aula', '📖 Aula'],
  ['exercicios', '💻 Exercícios'],
  ['quiz', '❓ Quiz'],
  ['diario', '📝 Diário'],
];

function renderBlock(b) {
  if (b.p) return `<p>${b.p}</p>`;
  if (b.tip) return `<div class="dica-box">💡 ${b.tip}</div>`;
  if (b.warn) return `<div class="aviso-box">⚠️ ${b.warn}</div>`;
  if (b.list) return `<ul>${b.list.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  if (b.code) {
    const botao = b.run ? `<a class="btn btn-sm testar" href="#/playground?code=${encodeURIComponent(encodeCode(b.code))}">▶ Testar</a>` : '';
    return `<div class="codigo-bloco"><pre><code>${esc(b.code)}</code></pre>${botao}</div>`;
  }
  return '';
}

function lessonHtml(day) {
  return `
    <div class="objetivos"><h2>Ao final do dia você vai conseguir</h2><ul>${day.goals.map((g) => `<li>${esc(g)}</li>`).join('')}</ul></div>
    ${day.lesson.map((s, i) => `<section class="secao-aula"><h2>${i + 1}. ${esc(s.title)}</h2>${s.blocks.map(renderBlock).join('')}</section>`).join('')}
    <div class="acoes-fim"><a class="btn btn-primary" href="#/dia/${day.day}?aba=exercicios">Ir para os exercícios →</a></div>`;
}

function exercisesHtml(day) {
  const { progress } = getState();
  return `<ol class="lista-ex">${day.exercises.map((e) => {
    const p = progress[e.id];
    const icone = p?.passed ? '✅' : p?.attempts ? '🟡' : '⚪';
    const status = p?.passed ? `resolvido · nota ${Math.round(exerciseScore(p) * 100)}%` : p?.attempts ? `${p.attempts} tentativa(s)` : 'não iniciado';
    return `<li><a href="#/exercicio/${e.id}" class="ex-item">
      <span class="ex-icone" aria-hidden="true">${icone}</span>
      <span class="ex-info"><strong>${esc(e.title)}</strong><span class="pequeno muted">${esc(topicLabel(e.topic))} · ${difficultyLabel(e.difficulty)} · ${status}</span></span>
      <span aria-hidden="true">›</span></a></li>`;
  }).join('')}</ol>`;
}

function quizHtml(day) {
  const q = getState().quiz[`d${day.day}`];
  return `
    <p class="muted">Responda sem consultar a aula: tentar lembrar é o que fixa o conteúdo. Aprovação: ${QUIZ_PASS}%.${q ? ` Sua melhor nota: <strong>${q.best}%</strong> (${q.attempts} tentativa(s)).` : ''}</p>
    <form id="quiz" class="quiz">
      ${day.quiz.map((item, i) => `
        <fieldset class="questao" data-q="${i}">
          <legend><span class="q-num">${i + 1}.</span> ${item.q}</legend>
          ${item.options.map((op, j) => `<label class="opcao"><input type="radio" name="q${i}" value="${j}" required> <span>${op}</span></label>`).join('')}
          <div class="explicacao" hidden></div>
        </fieldset>`).join('')}
      <div class="quiz-acoes"><button class="btn btn-primary">Corrigir</button><button type="button" class="btn btn-ghost" id="refazer" hidden>Refazer</button></div>
      <p id="quiz-resultado" class="quiz-resultado" role="status"></p>
    </form>`;
}

function diaryHtml(day) {
  const n = getState().notes[`d${day.day}`] || {};
  const metas = n.goals || [];
  return `
    <p class="muted">Explicar com suas palavras é uma das técnicas de estudo mais eficazes (<em>autoexplicação</em>). Seja honesto(a): isso é só para você.</p>
    <fieldset class="autoavaliacao"><legend>Autoavaliação — eu consigo…</legend>
      ${day.goals.map((g, i) => `<label class="opcao"><input type="checkbox" data-meta="${i}" ${metas[i] ? 'checked' : ''}> <span>${esc(g)}</span></label>`).join('')}
    </fieldset>
    <label class="campo">O que eu aprendi hoje (explique como se fosse ensinar alguém)
      <textarea id="aprendi" rows="5" maxlength="5000">${esc(n.aprendi || '')}</textarea></label>
    <label class="campo">O que ainda está confuso / dúvidas
      <textarea id="duvidas" rows="3" maxlength="3000">${esc(n.duvidas || '')}</textarea></label>
    <p class="pequeno muted" id="nota-status">Salvo automaticamente.</p>
    ${day.extra ? `<div class="dica-box"><strong>Desafio extra (fora do app):</strong> ${day.extra}</div>` : ''}`;
}

export function dayView(root, { match, params }) {
  const day = getDay(match[1]);
  if (!day) {
    root.innerHTML = shell('/dia', '<p>Dia não encontrado. <a href="#/trilha">Voltar para a trilha</a></p>');
    return;
  }
  const aba = ABAS.some(([id]) => id === params.get('aba')) ? params.get('aba') : 'aula';
  const st = dayStats(day);
  const corpo = { aula: lessonHtml, exercicios: exercisesHtml, quiz: quizHtml, diario: diaryHtml }[aba](day);
  const anterior = DAYS.find((d) => d.day === day.day - 1);
  const proximo = DAYS.find((d) => d.day === day.day + 1);

  root.innerHTML = shell(`/dia/${day.day}`, `
    <nav class="migalha" aria-label="Você está em"><a href="#/trilha">Trilha</a> › Dia ${day.day}</nav>
    <h1><span class="dia-tag">Dia ${day.day}</span> ${esc(day.title)}</h1>
    <p class="muted">${esc(day.summary)} · ~${day.hours}h</p>
    <div class="dia-progresso">${progressBar(st.ratio, 'Exercícios do dia')}<span class="pequeno">${st.passed}/${st.total} exercícios · quiz ${st.quizBest === null ? '—' : `${st.quizBest}%`}</span></div>
    <div class="abas" role="tablist">
      ${ABAS.map(([id, label]) => `<a role="tab" href="#/dia/${day.day}?aba=${id}" class="aba${id === aba ? ' ativa' : ''}" aria-selected="${id === aba}">${label}</a>`).join('')}
    </div>
    <div class="aba-conteudo" role="tabpanel">${corpo}</div>
    <nav class="dia-nav">
      ${anterior ? `<a href="#/dia/${anterior.day}" class="btn btn-ghost">← Dia ${anterior.day}</a>` : '<span></span>'}
      ${proximo ? `<a href="#/dia/${proximo.day}" class="btn btn-ghost">Dia ${proximo.day} →</a>` : ''}
    </nav>`);

  startStudyTimer();

  if (aba === 'quiz') bindQuiz(root, day);
  const salvarDiario = aba === 'diario' ? bindDiary(root, day) : null;

  return {
    cleanup() {
      salvarDiario?.();
      stopStudyTimer();
    },
  };
}

function bindQuiz(root, day) {
  const form = root.querySelector('#quiz');
  const refazer = root.querySelector('#refazer');
  const resultado = root.querySelector('#quiz-resultado');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const respostas = day.quiz.map((_, i) => {
      const marcado = form.querySelector(`input[name="q${i}"]:checked`);
      return marcado ? Number(marcado.value) : null;
    });
    if (respostas.includes(null)) {
      toast('Responda todas as questões antes de corrigir.', 'aviso');
      return;
    }
    let acertos = 0;
    day.quiz.forEach((item, i) => {
      const fs = form.querySelector(`[data-q="${i}"]`);
      const certo = respostas[i] === item.answer;
      if (certo) acertos++;
      fs.classList.add(certo ? 'q-certa' : 'q-errada');
      fs.querySelectorAll('input').forEach((inp) => { inp.disabled = true; });
      fs.querySelectorAll('.opcao')[item.answer].classList.add('correta');
      const exp = fs.querySelector('.explicacao');
      exp.hidden = false;
      exp.innerHTML = `${certo ? '✅ Correto.' : '❌ Incorreto.'} ${item.explain}`;
    });
    const nota = Math.round((acertos / day.quiz.length) * 100);
    const anterior = getState().quiz[`d${day.day}`];
    saveQuiz(day.day, {
      best: Math.max(nota, anterior?.best ?? 0),
      last: nota,
      attempts: (anterior?.attempts || 0) + 1,
      wrong: respostas.map((r, i) => (r === day.quiz[i].answer ? null : i)).filter((x) => x !== null),
      at: new Date().toISOString(),
    });
    resultado.innerHTML = nota >= QUIZ_PASS
      ? `🎉 Você acertou ${acertos} de ${day.quiz.length} (${nota}%). Aprovado!`
      : `Você acertou ${acertos} de ${day.quiz.length} (${nota}%). Releia as explicações e a parte da aula correspondente, e tente de novo mais tarde.`;
    form.querySelector('button.btn-primary').hidden = true;
    refazer.hidden = false;
    resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  refazer.addEventListener('click', () => {
    form.reset();
    form.querySelectorAll('fieldset').forEach((fs) => {
      fs.classList.remove('q-certa', 'q-errada');
      fs.querySelectorAll('input').forEach((inp) => { inp.disabled = false; });
      fs.querySelectorAll('.opcao').forEach((o) => o.classList.remove('correta'));
      fs.querySelector('.explicacao').hidden = true;
    });
    form.querySelector('button.btn-primary').hidden = false;
    refazer.hidden = true;
    resultado.textContent = '';
    form.scrollIntoView({ behavior: 'smooth' });
  });
}

function bindDiary(root, day) {
  const status = root.querySelector('#nota-status');
  let timer;
  const salvar = () => {
    const goals = [...root.querySelectorAll('[data-meta]')].map((c) => c.checked);
    saveNote(day.day, {
      aprendi: root.querySelector('#aprendi').value,
      duvidas: root.querySelector('#duvidas').value,
      goals,
      at: new Date().toISOString(),
    });
    status.textContent = 'Salvo ✓';
  };
  const agendar = () => {
    status.textContent = 'Salvando…';
    clearTimeout(timer);
    timer = setTimeout(salvar, 800);
  };
  root.querySelector('.aba-conteudo').addEventListener('input', agendar);
  root.querySelector('.aba-conteudo').addEventListener('change', agendar);
  // ao sair da tela, salva o que estiver pendente
  return () => {
    if (status.textContent === 'Salvando…') {
      clearTimeout(timer);
      salvar();
    }
  };
}
