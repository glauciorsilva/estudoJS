import { describe, it, expect } from 'vitest';
import { overview, weakTopics } from '../src/data/progress.js';
import { buildSummary } from '../src/data/summary.js';
import { emDificuldade, videoUrl } from '../src/ui/video.js';
import { VIDEOS } from '../src/content/videos.js';
import { TOPICS } from '../src/content/topics.js';
import { isAdminEmail } from '../src/config.js';
import { EXERCISES } from '../src/content/index.js';

// Estado de outro aluno (como o painel do administrador monta a partir do Firestore).
const [ex1, ex2] = EXERCISES;
const aluno = {
  user: { uid: 'x' },
  profile: { startDate: '2026-01-01' },
  progress: {
    [ex1.id]: { attempts: 1, passed: true, lastAttemptAt: '2026-01-02T10:00:00.000Z' },
    [ex2.id]: { attempts: 6, failsBeforePass: 6, hintsUsed: 2, solutionViewed: true, lastAttemptAt: '2026-01-03T10:00:00.000Z' },
  },
  quiz: { d1: { best: 80 } },
  notes: {},
  activity: { '2026-01-02': { seconds: 600, solved: 1, attempts: 1 } },
};

describe('progresso de outro aluno', () => {
  it('conta tarefas feitas e o total em números', () => {
    const o = overview(aluno);
    expect(o.passed).toBe(1);
    expect(o.quizzesPassed).toBe(1);
    expect(o.doneTasks).toBe(2);
    expect(o.totalTasks).toBe(EXERCISES.length + 15);
  });

  it('resumo guardado no perfil', () => {
    const r = buildSummary(aluno);
    expect(r).toMatchObject({ tarefas: 2, exercicios: 1, quizzes: 1, tempoSeg: 600, ultimaAtividade: '2026-01-03T10:00:00.000Z' });
    expect(r.dificuldades).toEqual(weakTopics(3, aluno).map((t) => t.label));
  });
});

describe('vídeo de apoio', () => {
  it('aparece só com sinais de dificuldade em exercício não resolvido', () => {
    expect(emDificuldade({})).toBe(false);
    expect(emDificuldade({ failsBeforePass: 2 })).toBe(false);
    expect(emDificuldade({ failsBeforePass: 3 })).toBe(true);
    expect(emDificuldade({ hintsUsed: 2 })).toBe(true);
    expect(emDificuldade({ solutionViewed: true })).toBe(true);
    expect(emDificuldade({ passed: true, failsBeforePass: 9 })).toBe(false);
  });

  it('todo tópico tem um link do YouTube', () => {
    for (const t of Object.keys(TOPICS)) {
      expect(videoUrl(t)).toMatch(/^https:\/\/www\.youtube\.com\/(watch\?v=[\w-]{11}$|results\?search_query=)/);
    }
    for (const [t, v] of Object.entries(VIDEOS)) {
      expect(TOPICS[t], `tópico ${t}`).toBeTruthy();
      expect(v.id).toMatch(/^[\w-]{11}$/);
    }
  });
});

describe('administrador', () => {
  it('reconhece o e-mail sem diferenciar maiúsculas', () => {
    expect(isAdminEmail('rafael.glaucio2@gmail.com')).toBe(true);
    expect(isAdminEmail('Rafael.Glaucio2@Gmail.com')).toBe(true);
    expect(isAdminEmail('outra@pessoa.com')).toBe(false);
    expect(isAdminEmail(undefined)).toBe(false);
  });
});

describe('sugestões do editor', async () => {
  const { EditorState } = await import('@codemirror/state');
  const { CompletionContext } = await import('@codemirror/autocomplete');
  const { javascript } = await import('@codemirror/lang-javascript');
  const { sugestoesJS } = await import('../src/ui/completions.js');
  const sugerir = (doc, explicit = false) => {
    const state = EditorState.create({ doc, extensions: [javascript()] });
    const r = sugestoesJS(new CompletionContext(state, doc.length, explicit));
    return r ? r.options.map((o) => o.label) : [];
  };

  it('métodos depois do ponto', () => {
    expect(sugerir('Math.')).toContain('round');
    expect(sugerir('console.')).toContain('log');
    expect(sugerir('lista.')).toEqual(expect.arrayContaining(['map', 'filter', 'push']));
  });
  it('palavras e modelos ao digitar', () => {
    expect(sugerir('fo')).toEqual(expect.arrayContaining(['for', 'forof']));
    expect(sugerir("const s = 'lista.")).toEqual([]); // dentro de texto, não sugere
  });
  it('sem nada digitado, só quando pedido, mostra modelos', () => {
    expect(sugerir('')).toEqual([]);
    expect(sugerir('', true)[0]).toBe('log');
  });
});
