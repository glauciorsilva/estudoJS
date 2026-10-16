import { shell } from '../ui/layout.js';
import { esc, progressBar } from '../ui/dom.js';
import { DAYS } from '../content/index.js';
import { dayStats, overview } from '../data/progress.js';

const STATUS = { concluido: '✅ Concluído', andamento: '⏳ Em andamento', novo: 'Não iniciado' };

export function roadmapView(root) {
  const o = overview();
  const semanas = [
    { titulo: 'Semana 1 — Fundamentos', dias: DAYS.slice(0, 7) },
    { titulo: 'Semana 2 — JavaScript moderno e a web', dias: DAYS.slice(7, 13) },
    { titulo: 'Reta final — Integração', dias: DAYS.slice(13) },
  ];

  const content = `
  <h1>Trilha de 15 dias</h1>
  <p class="muted">Siga na ordem — cada dia usa o anterior. Ritmo sugerido: 3 a 4 horas por dia (veja o método em cada dia). Você pode voltar a qualquer dia quando quiser.</p>
  ${semanas.map((s) => `
    <h2 class="semana">${s.titulo}</h2>
    <ol class="trilha">
      ${s.dias.map((d) => {
        const st = dayStats(d);
        return `<li>
          <a href="#/dia/${d.day}" class="dia-card st-${st.status}${d.day === o.currentDay ? ' atual' : ''}">
            <span class="dia-num" aria-hidden="true">${d.day}</span>
            <div class="dia-info">
              <span class="sr-only">Dia ${d.day}:</span>
              <strong>${esc(d.title)}</strong>
              <span class="muted pequeno">${esc(d.summary)}</span>
              <div class="dia-meta">
                ${progressBar(st.ratio, `Exercícios do dia ${d.day}`)}
                <span class="pequeno">${st.passed}/${st.total} exercícios · quiz ${st.quizBest === null ? '—' : `${st.quizBest}%`} · ~${d.hours}h</span>
              </div>
              <span class="pequeno status">${d.day === o.currentDay && st.status !== 'concluido' ? '👉 Dia atual · ' : ''}${STATUS[st.status]}</span>
            </div>
          </a>
        </li>`;
      }).join('')}
    </ol>`).join('')}

  <section class="painel">
    <h2>Rotina diária recomendada</h2>
    <ol>
      <li><strong>Aquecimento (10 min)</strong>: faça as revisões pendentes da aba Revisão.</li>
      <li><strong>Teoria ativa (40–50 min)</strong>: leia a aula e clique em “Testar” em todos os exemplos. Altere-os!</li>
      <li><strong>Prática (1h30–2h)</strong>: exercícios em ordem. Tente 10 min antes de abrir uma dica.</li>
      <li><strong>Quiz (10 min)</strong>: sem consultar. Releia as explicações dos erros.</li>
      <li><strong>Diário (5 min)</strong>: escreva com suas palavras o que aprendeu e o que ficou confuso.</li>
    </ol>
    <p class="pequeno muted">Faça pausas de 5 min a cada 25–50 min. Dormir bem consolida o que você estudou — virar a noite atrapalha.</p>
  </section>`;
  root.innerHTML = shell('/trilha', content);
}
