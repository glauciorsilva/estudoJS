// Web Worker: roda o código do aluno fora da thread da interface.
// Se o código entrar em loop infinito, a interface continua respondendo
// e o worker é encerrado pelo tempo limite (ver sandbox.js).
import { createDom } from './dom.js';
import { runCode } from './runtime.js';

self.onmessage = async (event) => {
  const { id, payload } = event.data || {};
  try {
    const dom = payload.env === 'dom' ? createDom(payload.html) : null;
    const result = await runCode({ code: payload.code, tests: payload.tests, checks: payload.checks, dom });
    self.postMessage({ id, result });
  } catch (e) {
    self.postMessage({ id, fatal: String((e && e.message) || e) });
  }
};
