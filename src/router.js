// Roteador simples baseado no "#" da URL (funciona em qualquer hospedagem estática).
const routes = [];
let current = null; // { cleanup }
let notFound = null;

export function route(pattern, view) {
  routes.push({ pattern, view });
}
export function fallback(view) {
  notFound = view;
}

export function parseHash() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, query = ''] = raw.split('?');
  return { path, params: new URLSearchParams(query) };
}

export async function render(root) {
  const { path, params } = parseHash();
  if (current?.cleanup) {
    try { current.cleanup(); } catch (e) { console.error(e); }
  }
  current = null;
  for (const { pattern, view } of routes) {
    const m = pattern.exec(path);
    if (m) {
      current = (await view(root, { match: m, params })) || null;
      return;
    }
  }
  current = (await notFound?.(root, { params })) || null;
}

export function navigate(hash) {
  if (location.hash === hash) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else location.hash = hash;
}
