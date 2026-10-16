import { shell } from '../ui/layout.js';
import { esc } from '../ui/dom.js';
import { decodeCode } from '../ui/dom.js';
import { createEditor, symbolBar } from '../ui/editor.js';
import { renderError, renderConsole, renderDomPreview } from '../ui/results.js';
import { execute, warmUp } from '../runner/sandbox.js';
import { safeGet, safeSet } from '../auth.js';
import { startStudyTimer, stopStudyTimer } from '../data/timer.js';

const KEY = 'estudojs:playground';
const EXEMPLO = `// Console livre: teste qualquer código aqui.
// Dica: Ctrl+Enter executa.
const nomes = ['Ana', 'Bia', 'Caio'];
for (const nome of nomes) {
  console.log(\`Olá, \${nome}!\`);
}
`;

export function playgroundView(root, { params }) {
  const doLink = params.get('code');
  const inicial = doLink ? decodeCode(doLink) : safeGet(KEY) || EXEMPLO;

  root.innerHTML = shell('/playground', `
    <h1>Console livre</h1>
    <p class="muted">Experimente à vontade: nada aqui afeta sua pontuação. ${doLink ? 'Exemplo carregado da aula — altere e execute de novo!' : ''}</p>
    <p class="pequeno muted">Disponíveis: <code>console</code>, <code>document</code> (página simulada), <code>fetch</code> (API de exemplo: <code>https://api.exemplo.com/usuarios</code> e <code>/produtos</code>).</p>
    <div class="editor-barra">
      <button class="btn btn-primary" id="executar">▶ Executar</button>
      <button class="btn btn-ghost btn-sm" id="limpar">🧹 Limpar código</button>
      ${doLink ? '<button class="btn btn-ghost btn-sm" id="voltar">← Voltar à aula</button>' : ''}
    </div>
    <div class="editor editor-alto" id="editor"></div>
    <div id="simbolos"></div>
    <div class="resultado" id="saida" aria-live="polite"><p class="muted pequeno">A saída aparece aqui.</p></div>`);

  let salvar;
  const editor = createEditor(root.querySelector('#editor'), {
    doc: inicial,
    onRun: () => executar(),
    onChange: (code) => {
      if (doLink) return; // não sobrescreve seu rascunho com os exemplos das aulas
      clearTimeout(salvar);
      salvar = setTimeout(() => safeSet(KEY, code), 400);
    },
  });
  root.querySelector('#simbolos').append(symbolBar(editor));
  warmUp();

  const saida = root.querySelector('#saida');
  const botao = root.querySelector('#executar');

  async function executar() {
    botao.disabled = true;
    saida.innerHTML = '<p class="muted pequeno">Executando…</p>';
    try {
      const r = await execute({ code: editor.getValue(), env: 'dom', html: '' });
      const temPagina = r.dom && r.dom.trim() !== '';
      saida.innerHTML = `${renderError(r.error)}<h3 class="pequeno">Console</h3>${renderConsole(r.logs, r.truncated)}${temPagina ? '<h3 class="pequeno">Página</h3><div id="preview"></div>' : ''}`;
      if (temPagina) renderDomPreview(saida.querySelector('#preview'), r.dom);
    } catch (err) {
      saida.innerHTML = `<div class="erro" role="alert"><strong>${err.timeout ? '⏱️ Tempo esgotado' : 'Falha'}</strong><p>${esc(err.message)}</p></div>`;
    } finally {
      botao.disabled = false;
    }
  }

  botao.addEventListener('click', executar);
  root.querySelector('#limpar').addEventListener('click', () => {
    editor.setValue('');
    editor.focus();
  });
  root.querySelector('#voltar')?.addEventListener('click', () => history.back());
  startStudyTimer();

  return {
    cleanup() {
      stopStudyTimer();
      editor.destroy();
    },
  };
}
