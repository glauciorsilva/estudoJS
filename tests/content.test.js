// Garante a qualidade do conteúdo: toda solução passa nos testes,
// todo código inicial falha, ids são únicos e os exemplos das aulas rodam.
import { describe, it, expect } from 'vitest';
import { DAYS, EXERCISES } from '../src/content/index.js';
import { TOPICS } from '../src/content/topics.js';
import { runCode } from '../src/runner/runtime.js';
import { createDom } from '../src/runner/dom.js';

const run = (ex, code) =>
  runCode({ code, tests: ex.tests, checks: ex.checks || [], dom: ex.env === 'dom' ? createDom(ex.html) : null });

describe('estrutura', () => {
  it('tem 15 dias em ordem', () => {
    expect(DAYS.map((d) => d.day)).toEqual(Array.from({ length: 15 }, (_, i) => i + 1));
  });

  it('ids de exercício são únicos', () => {
    const ids = EXERCISES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(EXERCISES.map((e) => [e.id, e]))('%s tem campos válidos', (_, ex) => {
    expect(TOPICS[ex.topic], `tópico ${ex.topic}`).toBeTruthy();
    expect([1, 2, 3]).toContain(ex.difficulty);
    expect(ex.title && ex.prompt && ex.solution).toBeTruthy();
    expect(typeof ex.starter).toBe('string');
    expect(ex.hints.length).toBeGreaterThan(0);
    expect(ex.tests.length).toBeGreaterThan(0);
    for (const t of ex.tests) {
      expect(t.name).toBeTruthy();
      if (t.run) expect(t.run.includes('\n'), `quebra de linha no teste "${t.name}"`).toBe(false);
    }
  });

  it.each(DAYS.map((d) => [d.day, d]))('quiz do dia %s é válido', (_, day) => {
    expect(day.quiz.length).toBeGreaterThanOrEqual(4);
    for (const q of day.quiz) {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
      expect(q.explain).toBeTruthy();
    }
  });
});

describe('soluções passam', () => {
  it.each(EXERCISES.map((e) => [e.id, e]))('%s', async (_, ex) => {
    const r = await run(ex, ex.solution);
    const falhas = r.tests.filter((t) => !t.pass).map((t) => `${t.name}: esperado ${t.expected}, recebido ${t.received} ${t.error || ''}`);
    expect(r.error, JSON.stringify(r.error)).toBeNull();
    expect(falhas).toEqual([]);
    expect(r.ok).toBe(true);
  });
});

describe('códigos iniciais NÃO passam', () => {
  it.each(EXERCISES.map((e) => [e.id, e]))('%s', async (_, ex) => {
    const r = await run(ex, ex.starter);
    expect(r.ok).toBe(false);
  });
});

describe('exemplos das aulas executam sem erro', () => {
  const exemplos = DAYS.flatMap((d) =>
    d.lesson.flatMap((s, si) => s.blocks.filter((b) => b.code && b.run).map((b, bi) => [`dia ${d.day} / ${s.title} #${bi + 1}`, b.code, si])),
  );
  it.each(exemplos)('%s', async (_, code) => {
    const r = await runCode({ code, dom: createDom('') });
    expect(r.error, JSON.stringify(r.error)).toBeNull();
    expect(r.logs.length).toBeGreaterThan(0);
  });
});
