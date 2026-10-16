import { shell } from '../ui/layout.js';
import { esc } from '../ui/dom.js';
import { topicLabel } from '../content/topics.js';
import { getState } from '../data/store.js';
import { dueReviews, weakTopics, practiceFor, interleavedSet, exerciseScore } from '../data/progress.js';

function item(e, { revisao = false, extra = '' } = {}) {
  const p = getState().progress[e.id];
  const nota = p?.passed ? `nota ${Math.round(exerciseScore(p) * 100)}%` : p?.attempts ? 'não resolvido' : 'novo';
  return `<li><a class="ex-item" href="#/exercicio/${e.id}${revisao ? '?revisao=1' : ''}">
    <span class="ex-icone" aria-hidden="true">${revisao ? '🔁' : '🎯'}</span>
    <span class="ex-info"><strong>${esc(e.title)}</strong><span class="pequeno muted">Dia ${e.day} · ${esc(topicLabel(e.topic))} · ${nota}${extra}</span></span>
    <span aria-hidden="true">›</span></a></li>`;
}

export function reviewView(root) {
  const due = dueReviews();
  const fracos = weakTopics(3);
  const mistura = interleavedSet(5);

  root.innerHTML = shell('/revisao', `
    <h1>Revisão</h1>
    <p class="muted">A memória se fortalece quando você tenta lembrar algo <strong>pouco antes de esquecer</strong>. O app agenda cada exercício resolvido para voltar em 1, 3, 7, 15... dias — e em revisão você resolve <strong>do zero, sem ver o código anterior</strong>.</p>

    <section class="painel">
      <h2>🔁 Revisões de hoje ${due.length ? `<span class="badge">${due.length}</span>` : ''}</h2>
      ${due.length ? `<ol class="lista-ex">${due.map((e) => item(e, { revisao: true })).join('')}</ol>` : '<p class="muted">Nada para revisar hoje. 👏 Continue a trilha!</p>'}
    </section>

    <section class="painel">
      <h2>🎯 Treino focado nas suas dificuldades</h2>
      ${fracos.length ? fracos.map((t) => {
        const lista = practiceFor(t.id, 4);
        return `<h3>${esc(t.label)} <span class="pequeno muted">· domínio ${Math.round(t.mastery * 100)}% · aula no dia ${t.day}</span></h3>
          ${t.reasons.length ? `<p class="pequeno muted">${esc(t.reasons.join(' · '))}</p>` : ''}
          ${lista.length ? `<ol class="lista-ex">${lista.map((e) => item(e)).join('')}</ol>` : ''}
          <a class="link pequeno" href="#/dia/${t.day}">Reler a aula do dia ${t.day} →</a>`;
      }).join('') : '<p class="muted">Quando você errar, usar dicas ou ver soluções, o app identifica os tópicos frágeis e monta o treino aqui.</p>'}
    </section>

    <section class="painel">
      <h2>🔀 Treino intercalado</h2>
      <p class="pequeno muted">Misturar assuntos de dias diferentes treina a habilidade mais importante: <em>reconhecer qual ferramenta usar</em>.</p>
      ${mistura.length >= 2 ? `<ol class="lista-ex">${mistura.map((e) => item(e, { revisao: true })).join('')}</ol>
        <button class="btn btn-ghost btn-sm" id="sortear">🎲 Sortear outros</button>` : '<p class="muted">Resolva exercícios de pelo menos 2 dias para liberar.</p>'}
    </section>`);
  root.querySelector('#sortear')?.addEventListener('click', () => reviewView(root));
}
