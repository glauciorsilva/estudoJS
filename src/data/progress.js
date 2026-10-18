// Regras de aprendizagem: pontuação de domínio, revisão espaçada,
// diagnóstico de dificuldades e acompanhamento do plano de 15 dias.
import { DAYS, EXERCISES, getExercise } from '../content/index.js';
import { TOPICS } from '../content/topics.js';
import { ERROR_KIND_LABELS } from '../runner/errors.js';
import { getState, todayKey } from './store.js';

export const DAY_COMPLETE_RATIO = 0.8; // 80% dos exercícios resolvidos
export const QUIZ_PASS = 70; // % mínimo no quiz

const DAY_MS = 24 * 60 * 60 * 1000;

function addDays(dateKey, n) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return todayKey(new Date(y, m - 1, d + n));
}
export function daysBetween(a, b) {
  const [y1, m1, d1] = a.split('-').map(Number);
  const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1)) / DAY_MS);
}

// ---------------------------------------------------------------------------
// Pontuação de um exercício (0 a 1)
// ---------------------------------------------------------------------------

/**
 * 1.0 = resolveu sozinho, de primeira ou quase.
 * Dicas, muitas tentativas e ver a solução reduzem a nota — não como punição,
 * mas para o app saber o que você ainda não domina e trazer de volta na revisão.
 */
export function exerciseScore(p) {
  if (!p || !p.passed) return 0;
  let s = 1;
  s -= 0.12 * Math.min(p.hintsBeforePass || 0, 3);
  s -= Math.min(0.3, 0.05 * Math.max(0, (p.failsBeforePass || 0) - 1));
  if (p.solutionBeforePass) s = Math.min(s, 0.35);
  s += 0.1 * (p.reviewPasses || 0); // revisões bem-sucedidas consolidam
  return Math.max(0.2, Math.min(1, Math.round(s * 100) / 100));
}

// ---------------------------------------------------------------------------
// Revisão espaçada (versão simplificada do método SM-2)
// ---------------------------------------------------------------------------

export function scheduleAfterPass(p, { review = false } = {}) {
  const score = exerciseScore(p);
  const prev = p.srs || { interval: 0, reps: 0 };
  let interval;
  if (!review) {
    interval = p.solutionBeforePass ? 1 : score >= 0.85 ? 3 : 1;
  } else {
    const semAjuda = !(p.lastRunUsedHelp);
    interval = semAjuda ? Math.max(2, Math.round((prev.interval || 1) * 2.5)) : Math.max(1, prev.interval || 1);
  }
  return { interval, reps: (prev.reps || 0) + 1, due: addDays(todayKey(), interval) };
}

export function scheduleAfterFail(p) {
  return { interval: 1, reps: p.srs?.reps || 0, due: addDays(todayKey(), 1) };
}

export function dueReviews() {
  const { progress } = getState();
  const hoje = todayKey();
  return EXERCISES.filter((e) => {
    const p = progress[e.id];
    return p?.passed && p.srs?.due && p.srs.due <= hoje;
  }).sort((a, b) => progress[a.id].srs.due.localeCompare(progress[b.id].srs.due));
}

// ---------------------------------------------------------------------------
// Dias e tópicos
// ---------------------------------------------------------------------------

export function dayStats(day, st = getState()) {
  const { progress, quiz } = st;
  const total = day.exercises.length;
  const passed = day.exercises.filter((e) => progress[e.id]?.passed).length;
  const attempted = day.exercises.filter((e) => progress[e.id]?.attempts).length;
  const score = day.exercises.reduce((s, e) => s + exerciseScore(progress[e.id]), 0) / total;
  const q = quiz[`d${day.day}`];
  const quizBest = q?.best ?? null;
  const exercisesDone = passed / total >= DAY_COMPLETE_RATIO;
  const quizDone = quizBest !== null && quizBest >= QUIZ_PASS;
  const status = exercisesDone && quizDone ? 'concluido' : attempted > 0 || q ? 'andamento' : 'novo';
  return { total, passed, attempted, score, quizBest, quizDone, exercisesDone, status, ratio: passed / total };
}

export function topicStats(st = getState()) {
  const { progress } = st;
  const map = {};
  for (const id of Object.keys(TOPICS)) map[id] = { id, label: TOPICS[id].label, day: TOPICS[id].day, total: 0, passed: 0, attempted: 0, scoreSum: 0, fails: 0, hints: 0, solutions: 0, timeSec: 0 };
  for (const e of EXERCISES) {
    const t = map[e.topic];
    const p = progress[e.id];
    t.total++;
    if (!p?.attempts) continue;
    t.attempted++;
    if (p.passed) t.passed++;
    t.scoreSum += exerciseScore(p);
    t.fails += p.failsBeforePass ?? p.attempts ?? 0;
    t.hints += p.hintsUsed || 0;
    t.solutions += p.solutionViewed ? 1 : 0;
    t.timeSec += p.timeSec || 0;
  }
  return Object.values(map).map((t) => ({
    ...t,
    coverage: t.passed / t.total, // quanto do tópico você já resolveu
    mastery: t.attempted ? t.scoreSum / t.attempted : null, // qualidade onde já tentou
  }));
}

/** Tópicos onde você mais precisa de reforço, com o motivo. */
export function weakTopics(limit = 3, st = getState()) {
  return topicStats(st)
    .filter((t) => t.attempted > 0)
    .map((t) => {
      const reasons = [];
      if (t.attempted - t.passed > 0) reasons.push(`${t.attempted - t.passed} exercício(s) iniciados sem resolver`);
      if (t.solutions > 0) reasons.push(`viu ${t.solutions} solução(ões)`);
      if (t.hints >= 2) reasons.push(`${t.hints} dicas usadas`);
      if (t.fails / t.attempted >= 3) reasons.push(`média de ${(t.fails / t.attempted).toFixed(1)} tentativas por exercício`);
      return { ...t, reasons };
    })
    .filter((t) => t.mastery < 0.75)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, limit);
}

/** Exercícios recomendados para treinar um tópico (não resolvidos ou com nota baixa). */
export function practiceFor(topicId, limit = 5) {
  const { progress } = getState();
  return EXERCISES.filter((e) => e.topic === topicId)
    .map((e) => ({ e, s: progress[e.id]?.passed ? exerciseScore(progress[e.id]) : progress[e.id]?.attempts ? -1 : 0.5 }))
    .filter(({ s }) => s < 0.75)
    .sort((a, b) => a.s - b.s)
    .slice(0, limit)
    .map(({ e }) => e);
}

/** Tipos de erro mais frequentes. */
export function errorProfile(limit = 6, st = getState()) {
  const { progress } = st;
  const total = {};
  for (const p of Object.values(progress)) {
    for (const [kind, n] of Object.entries(p.errors || {})) total[kind] = (total[kind] || 0) + n;
  }
  return Object.entries(total)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([kind, count]) => ({ kind, count, label: ERROR_KIND_LABELS[kind] || kind }));
}

// ---------------------------------------------------------------------------
// Visão geral e plano
// ---------------------------------------------------------------------------

export function overview(st = getState()) {
  const { progress, quiz, activity, profile } = st;
  const totalEx = EXERCISES.length;
  const passed = EXERCISES.filter((e) => progress[e.id]?.passed).length;
  const quizzesPassed = DAYS.filter((d) => (quiz[`d${d.day}`]?.best ?? 0) >= QUIZ_PASS).length;
  const days = DAYS.map((d) => ({ day: d, stats: dayStats(d, st) }));
  const completedDays = days.filter((d) => d.stats.status === 'concluido').length;
  const currentDay = days.find((d) => d.stats.status !== 'concluido')?.day.day ?? 15;

  const hoje = todayKey();
  const startDate = profile.startDate || hoje;
  const expectedDay = Math.min(15, Math.max(1, daysBetween(startDate, hoje) + 1));

  const totalSeconds = Object.values(activity).reduce((s, a) => s + (a.seconds || 0), 0);
  const todaySeconds = activity[hoje]?.seconds || 0;

  // Horas restantes estimadas: horas planejadas × fração que falta de cada dia.
  const hoursLeft = days.reduce((s, { day, stats }) => s + day.hours * (stats.status === 'concluido' ? 0 : 1 - stats.ratio * 0.85), 0);

  // Progresso geral: 85% exercícios + 15% quizzes.
  const percent = Math.round(((passed / totalEx) * 0.85 + (quizzesPassed / DAYS.length) * 0.15) * 100);

  return {
    totalEx, passed, quizzesPassed, completedDays, currentDay, expectedDay, startDate,
    totalSeconds, todaySeconds, hoursLeft, percent, streak: streak(st), days,
    totalTasks: totalEx + DAYS.length, doneTasks: passed + quizzesPassed,
    pace: currentDay - expectedDay, // < 0 = atrasado
  };
}

export function streak(st = getState()) {
  const { activity } = st;
  const ativo = (k) => (activity[k]?.seconds || 0) >= 300 || (activity[k]?.solved || 0) > 0;
  let dia = todayKey();
  if (!ativo(dia)) dia = addDays(dia, -1); // hoje ainda pode ser feito
  let n = 0;
  while (ativo(dia)) {
    n++;
    dia = addDays(dia, -1);
  }
  return n;
}

/** Próximo exercício sugerido: o primeiro não resolvido, na ordem da trilha. */
export function nextUp() {
  const { progress } = getState();
  return EXERCISES.find((e) => !progress[e.id]?.passed) || null;
}

/** Treino intercalado: exercícios já resolvidos de dias diferentes, priorizando notas baixas. */
export function interleavedSet(n = 5) {
  const { progress } = getState();
  const resolvidos = EXERCISES.filter((e) => progress[e.id]?.passed)
    .map((e) => ({ e, peso: exerciseScore(progress[e.id]) + Math.random() * 0.5 }))
    .sort((a, b) => a.peso - b.peso);
  const escolhidos = [];
  const dias = new Set();
  for (const { e } of resolvidos) {
    if (escolhidos.length >= n) break;
    if (dias.has(e.day)) continue;
    dias.add(e.day);
    escolhidos.push(e);
  }
  return escolhidos;
}

export function lastActivityExercise() {
  const { progress } = getState();
  let best = null;
  for (const [id, p] of Object.entries(progress)) {
    if (!p.passed && p.lastAttemptAt && (!best || p.lastAttemptAt > best.at)) best = { id, at: p.lastAttemptAt };
  }
  return best ? getExercise(best.id) : null;
}

export function formatDuration(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  if (h === 0) return `${m} min`;
  return `${h}h${String(m).padStart(2, '0')}`;
}
