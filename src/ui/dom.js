// Pequenos utilitários de interface.

// Escapa texto para inserir com segurança em HTML (evita XSS).
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function toast(message, type = 'info', ms = 3200) {
  let box = $('#toasts');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toasts';
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    document.body.append(box);
  }
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  box.append(el);
  setTimeout(() => el.classList.add('saindo'), ms - 300);
  setTimeout(() => el.remove(), ms);
}

/** Diálogo de confirmação acessível. Resolve true/false. */
export function confirmDialog(message, { ok = 'Confirmar', cancel = 'Cancelar', danger = false } = {}) {
  return new Promise((resolve) => {
    const dlg = document.createElement('dialog');
    dlg.className = 'dialog';
    dlg.innerHTML = `<form method="dialog"><p>${message}</p><div class="dialog-acoes">
      <button value="cancel" class="btn btn-ghost">${esc(cancel)}</button>
      <button value="ok" class="btn ${danger ? 'btn-danger' : 'btn-primary'}">${esc(ok)}</button></div></form>`;
    document.body.append(dlg);
    dlg.addEventListener('close', () => {
      resolve(dlg.returnValue === 'ok');
      dlg.remove();
    });
    dlg.showModal();
  });
}

export function progressBar(ratio, label = '') {
  const pct = Math.round(Math.max(0, Math.min(1, ratio)) * 100);
  return `<div class="barra" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(label || `${pct}%`)}"><span style="width:${pct}%"></span></div>`;
}

export function ring(percent, size = 120, label = '') {
  const r = 52;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, percent)) / 100);
  return `<svg class="anel" width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-label="${esc(label)} ${percent}%">
    <circle cx="60" cy="60" r="${r}" class="anel-fundo"/>
    <circle cx="60" cy="60" r="${r}" class="anel-valor" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/>
    <text x="60" y="58" text-anchor="middle" class="anel-num">${percent}%</text>
    <text x="60" y="78" text-anchor="middle" class="anel-legenda">${esc(label)}</text>
  </svg>`;
}

export const difficultyLabel = (d) => ['', 'Fácil', 'Médio', 'Desafio'][d] || '';

// Codifica/decodifica código para links do playground (?code=...) com suporte a acentos.
export function encodeCode(code) {
  return btoa(String.fromCharCode(...new TextEncoder().encode(code)));
}
export function decodeCode(b64) {
  try {
    return new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
  } catch {
    return '';
  }
}
