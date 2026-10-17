// Núcleo que executa o código do aluno e os testes de um exercício.
// Não depende de DOM nem de Firebase: roda dentro do Web Worker (no navegador)
// e também no Node (nos testes automáticos do conteúdo, via Vitest).

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const MAX_LOGS = 300;
const TIMER_SETTLE_MS = 2000; // espera máxima por setTimeout/setInterval pendentes
const MAIN_TIMEOUT_MS = 2500; // espera máxima pelo await do código principal
const TEST_TIMEOUT_MS = 1500; // espera máxima por teste assíncrono
export const TOTAL_BUDGET_MS = 5000; // a sandbox interrompe tudo um pouco depois disso

// Rejeita se a Promise não terminar a tempo (ex.: Promise que nunca chama resolve).
function withTimeout(promise, ms, message) {
  let timer;
  const limit = new Promise((_, reject) => {
    timer = setTimeout(() => reject(Object.assign(new Error(message), { name: 'Tempo esgotado' })), ms);
  });
  return Promise.race([promise, limit]).finally(() => clearTimeout(timer));
}

// ---------------------------------------------------------------------------
// Formatação de valores (parecida com o console do Chrome/Node)
// ---------------------------------------------------------------------------

function isDomNode(v) {
  return v !== null && typeof v === 'object' && typeof v.nodeType === 'number' && 'nodeName' in v;
}

export function formatValue(value, depth = 0, seen = new WeakSet(), top = true) {
  const t = typeof value;
  if (t === 'string') return top ? value : `'${value.replace(/'/g, "\\'")}'`;
  if (t === 'number') return Object.is(value, -0) ? '-0' : String(value);
  if (t === 'bigint') return `${value}n`;
  if (t === 'undefined' || t === 'boolean' || value === null) return String(value);
  if (t === 'symbol') return value.toString();
  if (t === 'function') {
    const src = Function.prototype.toString.call(value);
    if (/^class[\s{]/.test(src)) return `[class ${value.name || '(anônima)'}]`;
    return value.name ? `[Function: ${value.name}]` : '[Function (anonymous)]';
  }
  if (isDomNode(value)) {
    if (value.nodeType === 1) {
      const html = value.outerHTML || `<${value.nodeName.toLowerCase()}>`;
      return html.length > 120 ? html.slice(0, 117) + '...' : html;
    }
    if (value.nodeType === 3) return `#text "${value.textContent}"`;
    return `[${value.nodeName}]`;
  }
  if (seen.has(value)) return '[Circular]';
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (value instanceof Date) return isNaN(value) ? 'Invalid Date' : value.toISOString();
  if (value instanceof RegExp) return String(value);
  if (typeof Promise !== 'undefined' && value instanceof Promise) return 'Promise { <pending> }';

  if (depth > 2) {
    if (Array.isArray(value)) return '[Array]';
    return '[Object]';
  }
  seen.add(value);
  try {
    const f = (v) => formatValue(v, depth + 1, seen, false);
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      const items = [];
      for (let i = 0; i < value.length; i++) {
        if (i >= 100) { items.push(`... mais ${value.length - 100} itens`); break; }
        items.push(i in value ? f(value[i]) : '<vazio>');
      }
      return `[ ${items.join(', ')} ]`;
    }
    if (value instanceof Map) {
      if (value.size === 0) return 'Map(0) {}';
      const items = [...value].map(([k, v]) => `${f(k)} => ${f(v)}`);
      return `Map(${value.size}) { ${items.join(', ')} }`;
    }
    if (value instanceof Set) {
      if (value.size === 0) return 'Set(0) {}';
      return `Set(${value.size}) { ${[...value].map(f).join(', ')} }`;
    }
    const proto = Object.getPrototypeOf(value);
    const ctorName = proto && proto !== Object.prototype && proto.constructor ? proto.constructor.name : '';
    const prefix = ctorName && ctorName !== 'Object' ? `${ctorName} ` : proto === null ? '[Object: null prototype] ' : '';
    const keys = Object.keys(value);
    if (keys.length === 0) return `${prefix}{}`;
    const items = keys.map((k) => {
      const key = /^[A-Za-z_$][\w$]*$/.test(k) ? k : `'${k}'`;
      return `${key}: ${f(value[k])}`;
    });
    return `${prefix}{ ${items.join(', ')} }`;
  } finally {
    seen.delete(value);
  }
}

// ---------------------------------------------------------------------------
// Comparação profunda (para comparar o resultado com o esperado)
// ---------------------------------------------------------------------------

export function deepEqual(a, b, approx = false) {
  if (typeof a === 'number' && typeof b === 'number') {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    if (approx) return Math.abs(a - b) < 1e-9;
    return a === b;
  }
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof Map || b instanceof Map) {
    if (!(a instanceof Map && b instanceof Map) || a.size !== b.size) return false;
    for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k), approx)) return false;
    return true;
  }
  if (a instanceof Set || b instanceof Set) {
    if (!(a instanceof Set && b instanceof Set) || a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i], approx));
  }
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k], approx));
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

// Saída do console como linhas: um console.log com '\n' vale por várias linhas, e
// espaços no fim de linha e linhas vazias no final (invisíveis na tela) não contam.
export function linhasDoConsole(textos) {
  const linhas = textos.join('\n').split('\n').map((l) => l.trimEnd());
  while (linhas.length && linhas[linhas.length - 1] === '') linhas.pop();
  return linhas;
}

// Descreve a primeira linha diferente, com aspas para revelar espaços e maiúsculas.
export function primeiraDiferenca(recebido, esperado) {
  const n = Math.max(recebido.length, esperado.length);
  for (let i = 0; i < n; i++) {
    if (recebido[i] === esperado[i]) continue;
    if (i >= recebido.length) return `Faltou a linha ${i + 1}: ${JSON.stringify(esperado[i])}`;
    if (i >= esperado.length) return `Linha ${i + 1} a mais: ${JSON.stringify(recebido[i])}`;
    return `Linha ${i + 1}: esperado ${JSON.stringify(esperado[i])}, recebido ${JSON.stringify(recebido[i])}`;
  }
  return '';
}

// Remove comentários de forma simples (usado só nas verificações de "use X / não use Y").
export function stripComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');
}

let lineProbe;
// Descobre em que linha o motor JS "numera" a 2ª linha do corpo de uma função criada
// com new Function. Assim convertemos a linha do erro para a linha do código do aluno.
function probeLineOffset() {
  if (lineProbe !== undefined) return lineProbe;
  try {
    new Function('"probe";\nthrow new Error("probe")')();
  } catch (e) {
    lineProbe = extractLine(e.stack);
  }
  return lineProbe;
}

function extractLine(stack) {
  if (!stack) return null;
  const m = /(?:<anonymous>|> Function|> eval|anonymous):(\d+):\d+/.exec(stack);
  return m ? Number(m[1]) : null;
}

function userLineFromError(err) {
  const reported = extractLine(err && err.stack);
  const probe = probeLineOffset();
  if (reported == null || probe == null) return null;
  const line = reported - probe + 1;
  return line >= 1 ? line : null;
}

function serializeError(err, phase) {
  if (err && typeof err === 'object' && 'message' in err) {
    return { name: err.name || 'Error', message: String(err.message), line: userLineFromError(err), phase };
  }
  return { name: 'Erro', message: `Valor lançado com throw: ${formatValue(err)}`, line: null, phase };
}

// Cria versões "rastreadas" de setTimeout/setInterval para esperar os timers
// do aluno terminarem antes de rodar os testes.
const nativeSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createTimers() {
  const pending = new Map();
  const api = {
    setTimeout(fn, ms = 0, ...args) {
      const id = setTimeout(() => {
        pending.delete(id);
        if (typeof fn === 'function') fn(...args);
      }, ms);
      pending.set(id, 'timeout');
      return id;
    },
    clearTimeout(id) { clearTimeout(id); pending.delete(id); },
    setInterval(fn, ms = 0, ...args) {
      const id = setInterval(() => { if (typeof fn === 'function') fn(...args); }, ms);
      pending.set(id, 'interval');
      return id;
    },
    clearInterval(id) { clearInterval(id); pending.delete(id); },
  };
  // Espera os timers pendentes terminarem (no máximo maxMs).
  api.settle = async (maxMs) => {
    const limite = Date.now() + maxMs;
    await nativeSleep(0);
    while (pending.size > 0 && Date.now() < limite) await nativeSleep(10);
    await nativeSleep(0); // deixa as Promises encadeadas terminarem
  };
  api.clearAll = () => {
    for (const [id, kind] of pending) (kind === 'interval' ? clearInterval : clearTimeout)(id);
    pending.clear();
  };
  return api;
}

// API falsa usada nas aulas de assíncrono: imita o fetch sem precisar de internet.
const FAKE_DB = {
  usuarios: [
    { id: 1, nome: 'Ana', cidade: 'Recife', ativo: true },
    { id: 2, nome: 'Bruno', cidade: 'Curitiba', ativo: false },
    { id: 3, nome: 'Carla', cidade: 'Manaus', ativo: true },
  ],
  produtos: [
    { id: 1, nome: 'Teclado', preco: 150 },
    { id: 2, nome: 'Mouse', preco: 80 },
    { id: 3, nome: 'Monitor', preco: 900 },
  ],
};

export function createFakeFetch(timer = setTimeout, delay = 30) {
  return function fetch(url) {
    return new Promise((resolve, reject) => {
      timer(() => {
        const m = /^https:\/\/api\.exemplo\.com\/(\w+)(?:\/(\d+))?\/?$/.exec(String(url));
        if (!m) return reject(new TypeError(`Failed to fetch: ${url}`));
        const [, recurso, id] = m;
        let body = FAKE_DB[recurso];
        let status = body ? 200 : 404;
        if (body && id) {
          body = body.find((x) => x.id === Number(id));
          if (!body) status = 404;
        }
        const data = status === 200 ? JSON.parse(JSON.stringify(body)) : { erro: 'Não encontrado' };
        resolve({ ok: status === 200, status, json: async () => data, text: async () => JSON.stringify(data) });
      }, delay);
    });
  };
}

// ---------------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------------

/**
 * Executa o código do aluno + testes.
 * @param {object} p
 * @param {string} p.code - código digitado pelo aluno
 * @param {Array} [p.tests] - testes do exercício
 * @param {Array} [p.checks] - verificações no texto do código (ex.: "use map")
 * @param {object} [p.dom] - { document, window } (linkedom) quando o exercício usa DOM
 */
export async function runCode({ code, tests = [], checks = [], dom = null }) {
  const started = Date.now();
  const logs = [];
  const timers = createTimers();
  let truncated = false;

  const pushLog = (level, args) => {
    if (logs.length >= MAX_LOGS) { truncated = true; return; }
    logs.push({ level, text: args.map((a) => formatValue(a)).join(' ') });
  };
  const fakeConsole = {
    log: (...a) => pushLog('log', a),
    info: (...a) => pushLog('info', a),
    warn: (...a) => pushLog('warn', a),
    error: (...a) => pushLog('error', a),
    debug: (...a) => pushLog('log', a),
    table: (data) => pushLog('log', [data]),
    clear: () => { logs.length = 0; },
  };

  let testFactory = null;
  const register = (factory) => { testFactory = factory; };

  const testExprs = tests.map((t) => (t.run ? `async () => (${t.run})` : 'null'));
  // Linha 1: modo estrito + registro dos testes. O código do aluno começa na linha 2.
  const body = `"use strict"; __registrar(() => [${testExprs.join(', ')}]);\n${code}`;

  const params = ['console', '__registrar', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'fetch'];
  const args = [fakeConsole, register, timers.setTimeout, timers.clearTimeout, timers.setInterval, timers.clearInterval, createFakeFetch(timers.setTimeout)];
  if (dom) {
    params.push('document', 'window', 'Event', 'CustomEvent');
    args.push(dom.document, dom.window, dom.window.Event, dom.window.CustomEvent);
  }

  let error = null;
  let fn = null;
  try {
    fn = new AsyncFunction(...params, body);
  } catch (e) {
    error = serializeError(e, 'syntax');
  }

  if (fn) {
    try {
      await withTimeout(fn(...args), MAIN_TIMEOUT_MS, 'O código ficou esperando uma Promise que nunca terminou (await sem resolve?).');
    } catch (e) {
      error = serializeError(e, 'runtime');
    }
    await timers.settle(TIMER_SETTLE_MS);
  }

  const results = [];
  const testFns = testFactory ? testFactory() : null;
  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    const r = { name: t.name, pass: false };
    if (t.run) {
      if (!testFns) {
        r.error = 'O código não pôde ser executado (erro de sintaxe). Corrija o erro acima primeiro.';
      } else {
        try {
          const restante = Math.max(200, started + TOTAL_BUDGET_MS - Date.now());
          const received = await withTimeout(testFns[i](), Math.min(TEST_TIMEOUT_MS, restante), 'O teste não terminou a tempo: alguma Promise nunca foi resolvida/rejeitada.');
          r.pass = deepEqual(received, t.expected, t.approx);
          r.received = formatValue(received, 0, new WeakSet(), false);
          r.expected = formatValue(t.expected, 0, new WeakSet(), false);
        } catch (e) {
          const se = serializeError(e, 'test');
          r.error = `${se.name}: ${se.message}`;
          r.errorName = se.name;
        }
      }
    } else if (t.logs) {
      const got = linhasDoConsole(logs.map((l) => l.text));
      const esperado = linhasDoConsole(t.logs);
      r.pass = deepEqual(got, esperado);
      r.expected = t.logs.join('\n') || '(nenhuma saída)';
      r.received = got.join('\n') || '(nenhuma saída)';
      if (!r.pass) r.diff = primeiraDiferenca(got, esperado);
      r.isLog = true;
    } else if (t.logsInclude) {
      const got = linhasDoConsole(logs.map((l) => l.text));
      const missing = t.logsInclude.filter((x) => !got.includes(x.trimEnd()));
      r.pass = missing.length === 0;
      r.expected = `linhas contendo: ${t.logsInclude.join(' | ')}`;
      r.received = got.join('\n') || '(nenhuma saída)';
      r.isLog = true;
    }
    results.push(r);
  }

  const clean = stripComments(code);
  for (const c of checks) {
    const found = new RegExp(c.pattern, c.flags || '').test(clean);
    const pass = c.type === 'mustNot' ? !found : found;
    results.push({ name: c.message, pass, isCheck: true });
  }

  timers.clearAll();

  return {
    ok: !error && results.length > 0 && results.every((r) => r.pass),
    logs,
    truncated,
    error,
    tests: results,
    dom: dom ? dom.document.body.innerHTML : null,
    durationMs: Date.now() - started,
  };
}
