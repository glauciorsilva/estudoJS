// Executa código do aluno de forma isolada.
//
// Produção: o Worker roda dentro de um <iframe sandbox="allow-scripts"> (origem opaca).
// Assim o código digitado (ou colado de um link) NÃO consegue ler o login do Firebase,
// o localStorage nem o IndexedDB do app.
// Desenvolvimento (npm run dev): o Vite serve o worker como módulo ES, que não funciona
// dentro de um Blob; por isso usamos o worker direto (sem o iframe) só no modo dev.
import workerUrl from './worker.js?worker&url';

export const TIMEOUT_MS = 6000;

let seq = 0;
const pending = new Map();
let hostPromise = null;
let hostFrame = null;

const IFRAME_DOC = `<!doctype html><meta charset="utf-8"><script>
let blobUrl = null;
const workers = new Map();
function finish(id, data) {
  parent.postMessage({ type: 'result', id, data }, '*');
  const w = workers.get(id);
  if (w) { w.terminate(); workers.delete(id); }
}
addEventListener('message', (e) => {
  if (e.source !== parent) return;
  const m = e.data || {};
  if (m.type === 'init') {
    blobUrl = URL.createObjectURL(new Blob([m.src], { type: 'text/javascript' }));
    parent.postMessage({ type: 'ready' }, '*');
  } else if (m.type === 'run') {
    let w;
    try { w = new Worker(blobUrl); } catch (err) { finish(m.id, { fatal: String(err) }); return; }
    workers.set(m.id, w);
    w.onmessage = (ev) => finish(m.id, ev.data);
    w.onerror = (ev) => { ev.preventDefault(); finish(m.id, { fatal: ev.message || 'Erro no worker' }); };
    w.postMessage({ id: m.id, payload: m.payload });
  } else if (m.type === 'kill') {
    const w = workers.get(m.id);
    if (w) { w.terminate(); workers.delete(m.id); }
  }
});
parent.postMessage({ type: 'loaded' }, '*');
<\/script>`;

function onHostMessage(e) {
  if (!hostFrame || e.source !== hostFrame.contentWindow) return;
  const m = e.data || {};
  if (m.type === 'result') settle(m.id, m.data);
}

function settle(id, data) {
  const p = pending.get(id);
  if (!p) return;
  pending.delete(id);
  clearTimeout(p.timer);
  if (data && data.fatal) p.reject(new Error(data.fatal));
  else p.resolve(data.result);
}

function getHost() {
  if (hostPromise) return hostPromise;
  hostPromise = (async () => {
    const src = await (await fetch(workerUrl)).text();
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('tabindex', '-1');
    iframe.title = 'sandbox';
    iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden';
    await new Promise((resolve, reject) => {
      const onMsg = (e) => {
        if (e.source !== iframe.contentWindow) return;
        if (e.data?.type === 'loaded') iframe.contentWindow.postMessage({ type: 'init', src }, '*');
        if (e.data?.type === 'ready') { removeEventListener('message', onMsg); resolve(); }
      };
      addEventListener('message', onMsg);
      setTimeout(() => reject(new Error('Não foi possível iniciar a área de execução.')), 10000);
      iframe.srcdoc = IFRAME_DOC;
      document.body.append(iframe);
    });
    hostFrame = iframe;
    addEventListener('message', onHostMessage);
    return iframe;
  })();
  hostPromise.catch(() => { hostPromise = null; });
  return hostPromise;
}

function runDev(id, payload) {
  const w = new Worker(workerUrl, { type: 'module' });
  pending.get(id).kill = () => w.terminate();
  w.onmessage = (ev) => { w.terminate(); settle(id, ev.data); };
  w.onerror = (ev) => { ev.preventDefault(); w.terminate(); settle(id, { fatal: ev.message }); };
  w.postMessage({ id, payload });
}

/**
 * Executa o código. Resolve com o resultado de runCode (ver runtime.js).
 * Rejeita com err.timeout = true se passar do tempo limite (provável loop infinito).
 */
export function execute(payload, { timeout = TIMEOUT_MS } = {}) {
  const id = ++seq;
  return new Promise((resolve, reject) => {
    const entry = { resolve, reject, kill: null };
    entry.timer = setTimeout(() => {
      pending.delete(id);
      if (entry.kill) entry.kill();
      const err = new Error(`O código passou de ${timeout / 1000}s e foi interrompido. Provavelmente há um loop infinito (um while/for cuja condição nunca fica falsa) ou uma recursão sem caso base.`);
      err.timeout = true;
      reject(err);
    }, timeout);
    pending.set(id, entry);

    if (import.meta.env.DEV) {
      runDev(id, payload);
      return;
    }
    getHost().then((iframe) => {
      if (!pending.has(id)) return;
      entry.kill = () => iframe.contentWindow.postMessage({ type: 'kill', id }, '*');
      iframe.contentWindow.postMessage({ type: 'run', id, payload }, '*');
    }).catch((e) => {
      pending.delete(id);
      clearTimeout(entry.timer);
      reject(e);
    });
  });
}

// Inicia o sandbox antecipadamente (deixa a 1ª execução mais rápida).
export function warmUp() {
  if (!import.meta.env.DEV) getHost().catch(() => {});
}
