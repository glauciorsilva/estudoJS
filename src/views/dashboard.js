import { shell } from '../ui/layout.js';
import { esc, ring, progressBar } from '../ui/dom.js';
import { getState } from '../data/store.js';
import { videoButton } from '../ui/video.js';
import { overview, weakTopics, dueReviews, nextUp, lastActivityExercise, errorProfile, formatDuration, practiceFor } from '../data/progress.js';

function saudacao() {
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
}

export function dashboardView(root) {
  const { profile } = getState();
  const o = overview();
  const fracos = weakTopics(3);
  const revisoes = dueReviews();
  const continuar = lastActivityExercise() || nextUp();
  const erros = errorProfile(3);

  let ritmo;
  if (o.completedDays === 15) ritmo = '<span class="tag tag-ok">Trilha concluída! 🎉</span>';
  else if (o.pace >= 0) ritmo = `<span class="tag tag-ok">Em dia${o.pace > 0 ? ` (+${o.pace} adiantado)` : ''}</span>`;
  else ritmo = `<span class="tag tag-aviso">${-o.pace} dia(s) atrasado</span>`;

  const foco = fracos.length
    ? fracos.map((t) => {
      const sugestao = practiceFor(t.id, 1)[0];
      return `<li class="foco-item">
        <div class="foco-topo"><strong>${esc(t.label)}</strong><span class="muted pequeno">domínio ${Math.round(t.mastery * 100)}%</span></div>
        ${progressBar(t.mastery, `Domínio de ${t.label}`)}
        ${t.reasons.length ? `<p class="pequeno muted">${esc(t.reasons.join(' · '))}</p>` : ''}
        <div class="botoes">
          ${sugestao ? `<a class="btn btn-sm" href="#/exercicio/${sugestao.id}">Treinar: ${esc(sugestao.title)}</a>` : ''}
          ${videoButton(t.id)}
        </div>
      </li>`;
    }).join('')
    : '<li class="muted">Ainda sem dados suficientes. Faça exercícios e o app vai mostrar aqui onde você precisa reforçar.</li>';

  const content = `
  <section class="hero">
    <div class="hero-texto">
      <h1>${saudacao()}, ${esc(profile.name || 'estudante')}!</h1>
      <p class="tarefas-total">Você já fez <strong>${o.doneTasks}</strong> de <strong>${o.totalTasks}</strong> tarefas <span class="muted">(${o.passed} de ${o.totalEx} exercícios + ${o.quizzesPassed} de 15 quizzes)</span></p>
      <p class="muted">Dia <strong>${o.currentDay}</strong> de 15 na trilha · pelo calendário, hoje seria o dia ${o.expectedDay}. ${ritmo}</p>
      ${continuar ? `<a class="btn btn-primary btn-grande" href="#/exercicio/${continuar.id}">▶ Continuar: ${esc(continuar.title)}</a>` : '<a class="btn btn-primary btn-grande" href="#/revisao">🔁 Fazer revisões</a>'}
      ${revisoes.length ? `<a class="btn btn-ghost" href="#/revisao">🔁 ${revisoes.length} revisão(ões) para hoje</a>` : ''}
    </div>
    <div class="hero-anel">${ring(Math.round((o.doneTasks / o.totalTasks) * 100), 132, 'tarefas feitas', `${o.doneTasks}/${o.totalTasks}`)}</div>
  </section>

  <section class="cards-resumo" aria-label="Resumo">
    <div class="card-num"><span class="num">${o.passed}<small>/${o.totalEx}</small></span><span class="rotulo">exercícios resolvidos</span></div>
    <div class="card-num"><span class="num">${o.quizzesPassed}<small>/15</small></span><span class="rotulo">quizzes aprovados</span></div>
    <div class="card-num"><span class="num">🔥 ${o.streak}</span><span class="rotulo">dia(s) seguidos</span></div>
    <div class="card-num"><span class="num">${formatDuration(o.todaySeconds)}</span><span class="rotulo">hoje · total ${formatDuration(o.totalSeconds)}</span></div>
  </section>

  <div class="grid-2">
    <section class="painel">
      <h2>🎯 Onde focar</h2>
      <ul class="lista-limpa">${foco}</ul>
      ${erros.length ? `<h3 class="pequeno">Seus erros mais comuns</h3><ul class="lista-limpa pequeno">${erros.map((e) => `<li>• ${esc(e.label)} <span class="muted">(${e.count}×)</span></li>`).join('')}</ul>` : ''}
      <a href="#/desempenho" class="link">Ver desempenho completo →</a>
    </section>

    <section class="painel">
      <h2>📅 O que falta</h2>
      <p>Faltam <strong>${o.totalEx - o.passed}</strong> exercícios e <strong>${15 - o.quizzesPassed}</strong> quizzes — cerca de <strong>${Math.ceil(o.hoursLeft)}h</strong> de estudo.</p>
      <ol class="mini-dias">
        ${o.days.map(({ day, stats }) => `<li><a href="#/dia/${day.day}" class="mini-dia st-${stats.status}${day.day === o.currentDay ? ' atual' : ''}" title="Dia ${day.day}: ${esc(day.title)} — ${stats.passed}/${stats.total}">
          <span>${day.day}</span><small>${stats.passed}/${stats.total}</small>${progressBar(stats.ratio, `Dia ${day.day}`)}</a></li>`).join('')}
      </ol>
      <p class="pequeno muted">Um dia é concluído com 80% dos exercícios resolvidos e quiz ≥ 70%.</p>
    </section>
  </div>`;

  root.innerHTML = shell('/', content);
}
