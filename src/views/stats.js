import { shell } from '../ui/layout.js';
import { esc, progressBar } from '../ui/dom.js';
import { getState, todayKey } from '../data/store.js';
import { overview, topicStats, errorProfile, formatDuration, QUIZ_PASS } from '../data/progress.js';

const DICAS_ERRO = {
  'variavel-inexistente': 'Confira a grafia exata dos nomes. Copie e cole o nome da variável quando estiver em dúvida.',
  'propriedade-de-undefined': 'Antes da linha do erro, faça console.log do objeto. Use ?. quando o valor pode não existir.',
  'nao-e-funcao': 'Verifique o nome do método (maiúsculas!) e o tipo do valor com typeof.',
  sintaxe: 'Escreva aos poucos e execute com frequência. Feche parênteses e chaves logo que abrir.',
  'resultado-errado': 'Faça o “teste de mesa”: simule o código no papel com os valores do teste que falhou.',
  'loop-infinito': 'Confira se a variável da condição do while/for muda dentro do laço.',
  'const-reatribuida': 'Use let para valores que mudam (contadores, acumuladores).',
  async: 'Lembre: await só dentro de função async, e funções async retornam Promise.',
};

function heatmap(activity) {
  const dias = [];
  const hoje = new Date();
  for (let i = 27; i >= 0; i--) {
    const d = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - i);
    const k = todayKey(d);
    const min = Math.round((activity[k]?.seconds || 0) / 60);
    const nivel = min === 0 ? 0 : min < 30 ? 1 : min < 90 ? 2 : min < 180 ? 3 : 4;
    dias.push(`<span class="calor n${nivel}" title="${d.toLocaleDateString('pt-BR')}: ${min} min, ${activity[k]?.solved || 0} resolvidos"></span>`);
  }
  return `<div class="heatmap" role="img" aria-label="Minutos estudados nos últimos 28 dias">${dias.join('')}</div>
    <div class="legenda pequeno muted">menos <span class="calor n0"></span><span class="calor n1"></span><span class="calor n2"></span><span class="calor n3"></span><span class="calor n4"></span> mais</div>`;
}

export function statsView(root) {
  const { progress, activity } = getState();
  const o = overview();
  const topicos = topicStats();
  const erros = errorProfile(8);
  const tentativas = Object.values(progress).reduce((s, p) => s + (p.attempts || 0), 0);
  const primeiraVez = Object.values(progress).filter((p) => p.passed && (p.failsBeforePass || 0) === 0 && !p.hintsBeforePass && !p.solutionBeforePass).length;
  const solucoes = Object.values(progress).filter((p) => p.solutionViewed).length;

  root.innerHTML = shell('/desempenho', `
    <h1>Desempenho</h1>

    <section class="cards-resumo">
      <div class="card-num"><span class="num">${o.percent}%</span><span class="rotulo">da trilha</span></div>
      <div class="card-num"><span class="num">${o.passed ? Math.round((primeiraVez / o.passed) * 100) : 0}%</span><span class="rotulo">resolvidos sem ajuda e de primeira</span></div>
      <div class="card-num"><span class="num">${tentativas}</span><span class="rotulo">execuções de código</span></div>
      <div class="card-num"><span class="num">${formatDuration(o.totalSeconds)}</span><span class="rotulo">de estudo ativo</span></div>
    </section>

    <section class="painel">
      <h2>Domínio por tópico</h2>
      <p class="pequeno muted"><strong>Cobertura</strong> = quanto do tópico você já resolveu. <strong>Domínio</strong> = qualidade nos exercícios que tentou (cai com dicas, soluções e muitas tentativas; sobe com revisões).</p>
      <div class="tabela-rolagem"><table class="tabela">
        <thead><tr><th scope="col">Tópico</th><th scope="col">Cobertura</th><th scope="col">Domínio</th></tr></thead>
        <tbody>${topicos.map((t) => `<tr>
          <th scope="row"><span class="pequeno muted">D${t.day}</span> ${esc(t.label)}</th>
          <td>${progressBar(t.coverage, `Cobertura ${t.label}`)}<span class="pequeno">${t.passed}/${t.total}</span></td>
          <td>${t.mastery === null ? '<span class="muted pequeno">—</span>' : `${progressBar(t.mastery, `Domínio ${t.label}`)}<span class="pequeno ${t.mastery < 0.6 ? 'txt-erro' : ''}">${Math.round(t.mastery * 100)}%</span>`}</td>
        </tr>`).join('')}</tbody>
      </table></div>
    </section>

    <div class="grid-2">
      <section class="painel">
        <h2>Seus tipos de erro</h2>
        ${erros.length ? `<ul class="lista-limpa">${erros.map((e) => `<li class="erro-tipo"><div><strong>${esc(e.label)}</strong> <span class="muted">${e.count}×</span></div>${DICAS_ERRO[e.kind] ? `<p class="pequeno muted">${DICAS_ERRO[e.kind]}</p>` : ''}</li>`).join('')}</ul>` : '<p class="muted">Nenhum erro registrado ainda.</p>'}
        ${solucoes ? `<p class="pequeno">Você viu a solução em ${solucoes} exercício(s). Eles voltarão na revisão.</p>` : ''}
      </section>

      <section class="painel">
        <h2>Constância</h2>
        <p>🔥 Sequência atual: <strong>${o.streak} dia(s)</strong></p>
        ${heatmap(activity)}
        <p class="pequeno muted">Estudar um pouco todo dia rende mais do que muitas horas de uma vez.</p>
      </section>
    </div>

    <section class="painel">
      <h2>Por dia</h2>
      <div class="tabela-rolagem"><table class="tabela">
        <thead><tr><th scope="col">Dia</th><th scope="col">Exercícios</th><th scope="col">Nota média</th><th scope="col">Quiz</th></tr></thead>
        <tbody>${o.days.map(({ day, stats }) => `<tr>
          <th scope="row"><a href="#/dia/${day.day}">${day.day}. ${esc(day.title)}</a></th>
          <td>${stats.passed}/${stats.total}</td>
          <td>${stats.attempted ? `${Math.round(stats.score * 100)}%` : '—'}</td>
          <td class="${stats.quizBest !== null && stats.quizBest < QUIZ_PASS ? 'txt-erro' : ''}">${stats.quizBest === null ? '—' : `${stats.quizBest}%`}</td>
        </tr>`).join('')}</tbody>
      </table></div>
    </section>`);
}
