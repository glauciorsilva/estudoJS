import { describe, it, expect } from 'vitest';
import { runCode, formatValue, deepEqual } from '../src/runner/runtime.js';
import { explainError } from '../src/runner/errors.js';

describe('formatValue', () => {
  it('formata como o console', () => {
    expect(formatValue('oi')).toBe('oi');
    expect(formatValue(['a', 1, null])).toBe("[ 'a', 1, null ]");
    expect(formatValue({ a: 1, b: { c: [2] } })).toBe('{ a: 1, b: { c: [ 2 ] } }');
    expect(formatValue(new Map([['x', 1]]))).toBe("Map(1) { 'x' => 1 }");
    expect(formatValue(new Set([1]))).toBe('Set(1) { 1 }');
    expect(formatValue(() => 1)).toBe('[Function (anonymous)]');
    class Gato { constructor() { this.n = 1; } }
    expect(formatValue(new Gato())).toBe('Gato { n: 1 }');
    const circ = { a: 1 }; circ.eu = circ;
    expect(formatValue(circ)).toBe('{ a: 1, eu: [Circular] }');
  });
});

describe('deepEqual', () => {
  it('compara estruturas', () => {
    expect(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(deepEqual([1, 2], [2, 1])).toBe(false);
    expect(deepEqual(NaN, NaN)).toBe(true);
    expect(deepEqual({ a: undefined }, {})).toBe(false);
    expect(deepEqual(new Map([[1, 2]]), new Map([[1, 2]]))).toBe(true);
  });
});

describe('runCode', () => {
  it('captura logs e roda testes', async () => {
    const r = await runCode({ code: 'console.log("x", 1)\nconst f = n => n + 1', tests: [{ name: 't', run: 'f(1)', expected: 2 }] });
    expect(r.logs).toEqual([{ level: 'log', text: 'x 1' }]);
    expect(r.ok).toBe(true);
  });

  it('informa a linha do erro de execução', async () => {
    const r = await runCode({ code: 'const a = 1;\nconst b = 2;\nnaoExiste();' });
    expect(r.error.name).toBe('ReferenceError');
    expect(r.error.line).toBe(3);
  });

  it('erro de sintaxe não quebra', async () => {
    const r = await runCode({ code: 'const = 5', tests: [{ name: 't', run: '1', expected: 1 }] });
    expect(r.error.phase).toBe('syntax');
    expect(r.ok).toBe(false);
  });

  it('modo estrito: atribuir variável não declarada é erro', async () => {
    const r = await runCode({ code: 'total = 5' });
    expect(r.error.name).toBe('ReferenceError');
  });

  it('testes ainda rodam se o código falha depois de declarar a função', async () => {
    const r = await runCode({ code: 'function f() { return 1 }\nnull.x', tests: [{ name: 't', run: 'f()', expected: 1 }] });
    expect(r.error).not.toBeNull();
    expect(r.tests[0].pass).toBe(true);
    expect(r.ok).toBe(false);
  });

  it('espera timers antes de verificar logs', async () => {
    const r = await runCode({ code: 'setTimeout(() => console.log("depois"), 50)', tests: [{ name: 'l', logs: ['depois'] }] });
    expect(r.ok).toBe(true);
  });

  it('fetch simulado', async () => {
    const r = await runCode({ code: 'const r = await fetch("https://api.exemplo.com/produtos/1"); console.log((await r.json()).nome)' });
    expect(r.logs[0].text).toBe('Teclado');
  });

  it('checks de código ignoram comentários', async () => {
    const r = await runCode({ code: '// arr.map(x)\nconst a = 1', checks: [{ type: 'must', pattern: '\\.map\\(', message: 'map' }] });
    expect(r.tests[0].pass).toBe(false);
  });
});

describe('explainError', () => {
  it('traduz erros comuns', () => {
    expect(explainError({ name: 'ReferenceError', message: 'x is not defined' }).kind).toBe('variavel-inexistente');
    expect(explainError({ name: 'TypeError', message: "Cannot read properties of undefined (reading 'nome')" }).kind).toBe('propriedade-de-undefined');
    expect(explainError({ name: 'TypeError', message: 'Assignment to constant variable.' }).kind).toBe('const-reatribuida');
    expect(explainError({ name: 'SyntaxError', message: 'Unexpected end of input' }).kind).toBe('sintaxe');
    expect(explainError({ name: 'TypeError', message: 'lista.mapp is not a function' }).kind).toBe('nao-e-funcao');
  });
});
