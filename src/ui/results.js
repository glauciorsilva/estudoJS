// Mostra o resultado de uma execução: erro explicado, testes, console e página (DOM).
import { esc } from './dom.js';
import { explainError } from '../runner/errors.js';

export function renderError(error) {
  if (!error) return '';
  const info = explainError(error);
  const onde = error.line ? ` <span class="erro-linha">linha ${error.line}</span>` : '';
  return `<div class="erro" role="alert">
    <div class="erro-titulo">⚠️ <strong>${esc(error.name)}</strong>${onde}</div>
    <code class="erro-msg">${esc(error.message)}</code>
    ${info?.html ? `<p class="erro-explicacao">💡 ${info.html}</p>` : ''}
  </div>`;
}

export function renderConsole(logs, truncated) {
  if (!logs.length) return '<p class="muted pequeno">(nenhuma saída no console — use <code>console.log()</code> para ver valores)</p>';
  const linhas = logs.map((l) => `<div class="log log-${l.level}">${esc(l.text)}</div>`).join('');
  return `<div class="console" tabindex="0">${linhas}${truncated ? '<div class="log log-warn">… saída muito longa, cortada.</div>' : ''}</div>`;
}

export function renderTests(tests) {
  if (!tests.length) return '';
  return `<ul class="testes">${tests.map((t) => {
    let detalhe = '';
    if (!t.pass && t.error) detalhe = `<div class="teste-detalhe"><span>Erro:</span> <code>${esc(t.error)}</code></div>`;
    else if (!t.pass && !t.isCheck && t.expected !== undefined) {
      detalhe = `<div class="teste-detalhe"><div><span>Esperado:</span> <code>${esc(t.expected)}</code></div><div><span>Recebido:</span> <code>${esc(t.received)}</code></div></div>`;
    }
    return `<li class="${t.pass ? 'ok' : 'falhou'}"><span class="teste-icone" aria-hidden="true">${t.pass ? '✓' : '✗'}</span><div><span class="sr-only">${t.pass ? 'Passou:' : 'Falhou:'}</span>${esc(t.name)}${t.isCheck ? ' <span class="tag">regra</span>' : ''}${detalhe}</div></li>`;
  }).join('')}</ul>`;
}

/** Pré-visualização da página: iframe sem scripts (sandbox vazio) — seguro. */
export function renderDomPreview(container, html) {
  container.innerHTML = '';
  if (html == null) return;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox', '');
  iframe.title = 'Pré-visualização da página';
  iframe.className = 'preview';
  iframe.srcdoc = `<!doctype html><meta charset="utf-8"><style>
    body{font-family:system-ui,sans-serif;padding:12px;color:#1f2430;background:#fff}
    .oculto{display:none}.feita,.concluida{text-decoration:line-through;opacity:.6}.destaque{background:#fff3b0}
    .card{border:1px solid #ddd;border-radius:8px;padding:8px;margin:6px 0}
  </style>${html}`;
  container.append(iframe);
}
