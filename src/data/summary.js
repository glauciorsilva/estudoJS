// Resumo do progresso de um aluno, guardado no perfil para o painel do administrador.
import { subscribe, saveSummary, getState } from './store.js';
import { overview, weakTopics } from './progress.js';

export function buildSummary(st = getState()) {
  const o = overview(st);
  const ultima = Object.values(st.progress).reduce((m, p) => (p.lastAttemptAt && p.lastAttemptAt > m ? p.lastAttemptAt : m), '');
  return {
    tarefas: o.doneTasks,
    totalTarefas: o.totalTasks,
    exercicios: o.passed,
    totalExercicios: o.totalEx,
    quizzes: o.quizzesPassed,
    diaAtual: o.currentDay,
    diasConcluidos: o.completedDays,
    tempoSeg: o.totalSeconds,
    ultimaAtividade: ultima || null,
    dificuldades: weakTopics(3, st).map((t) => t.label),
  };
}

let timer = null;
let ligado = false;

/** Mantém o resumo atualizado enquanto o aluno estuda (com atraso, para não gravar a cada tecla). */
export function trackSummary() {
  if (getState().user?.local) return;
  saveSummary(buildSummary());
  if (ligado) return;
  ligado = true;
  subscribe(() => {
    clearTimeout(timer);
    timer = setTimeout(() => saveSummary(buildSummary()), 3000);
  });
}
