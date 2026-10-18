import { describe, it, expect, vi } from 'vitest';
import { EXERCISES } from '../src/content/index.js';

const ex = EXERCISES[0];
const usuarios = {
  u1: {
    perfil: { name: 'Ana', email: 'ana@x.com', startDate: '2026-01-01', resumo: { tarefas: 3, totalTarefas: 145, diaAtual: 2, tempoSeg: 3600, ultimaAtividade: '2026-01-02T10:00:00.000Z', dificuldades: ['Laços de repetição'] } },
    progress: { [ex.id]: { attempts: 2, passed: true, lastCode: 'console.log("<b>oi</b>")', lastAttemptAt: '2026-01-02T10:00:00.000Z' } },
    quiz: { d1: { best: 90 } },
    notes: { d1: { aprendi: 'aprendi <script>', duvidas: 'nenhuma' } },
    activity: {},
  },
  u2: { perfil: { name: 'Bruno', email: 'b@x.com' }, progress: {}, quiz: {}, notes: {}, activity: {} },
};

vi.mock('../src/firebase.js', () => ({ db: {} }));
vi.mock('firebase/firestore', () => ({
  collection: (_db, ...path) => path,
  doc: (_db, ...path) => path,
  getDocs: async (path) => {
    const docs = path.length === 1
      ? Object.entries(usuarios).map(([id, u]) => ({ id, data: () => u.perfil }))
      : Object.entries(usuarios[path[1]][path[2]]).map(([id, d]) => ({ id, data: () => d }));
    return { docs, forEach: (fn) => docs.forEach(fn) };
  },
  getDoc: async (path) => ({ exists: () => true, data: () => usuarios[path[1]].perfil }),
}));
vi.mock('../src/data/store.js', async (orig) => {
  const real = await orig();
  return { ...real, getState: () => ({ user: { uid: 'adm', email: 'rafael.glaucio2@gmail.com', verified: true }, profile: {}, progress: {}, quiz: {}, notes: {}, activity: {} }), getSyncStatus: () => 'ok' };
});

globalThis.document ??= { addEventListener() {}, getElementById() { return null; } };
const { adminView, adminUserView } = await import('../src/views/admin.js');
const espera = () => new Promise((r) => setTimeout(r, 20));

describe('tela do administrador', () => {
  it('lista os alunos com tarefas em números', async () => {
    const root = { innerHTML: '' };
    adminView(root);
    await espera();
    expect(root.innerHTML).toContain('2 aluno(s)');
    expect(root.innerHTML).toContain('<strong>3</strong> de 145');
    expect(root.innerHTML).toContain('href="#/admin/u1"');
    expect(root.innerHTML).toContain('Laços de repetição');
  });

  it('mostra o detalhe do aluno escapando o conteúdo dele', async () => {
    const root = { innerHTML: '' };
    adminUserView(root, { match: [null, 'u1'] });
    await espera();
    expect(root.innerHTML).toContain('Ana');
    expect(root.innerHTML).toContain('2<small>/145</small>');
    expect(root.innerHTML).toContain('&lt;b&gt;oi&lt;/b&gt;');
    expect(root.innerHTML).toContain('aprendi &lt;script&gt;');
    expect(root.innerHTML).not.toContain('<script>');
  });
});
