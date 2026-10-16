// Armazenamento do progresso.
// - Modo Firebase: Firestore em users/{uid} e subcoleções (progress, quiz, notes, activity).
// - Modo local: um único JSON no localStorage deste navegador.
// O app sempre lê do estado em memória (rápido) e grava no backend com "debounce".
import { safeGet, safeSet } from '../auth.js';

const COLLECTIONS = ['progress', 'quiz', 'notes', 'activity'];
const SAVE_DELAY_MS = 1200;

const state = {
  user: null,
  profile: {},
  progress: {},
  quiz: {},
  notes: {},
  activity: {},
};

const listeners = new Set();
let backend = null;
let syncStatus = 'ok'; // 'ok' | 'salvando' | 'erro'
let flushBound = false;

export const getState = () => state;
export const getSyncStatus = () => syncStatus;

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function emit() {
  for (const fn of listeners) fn(state);
}
function setSync(s) {
  if (s !== syncStatus) {
    syncStatus = s;
    document.dispatchEvent(new CustomEvent('sync-status', { detail: s }));
  }
}

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Remove undefined (o Firestore não aceita) e copia o objeto.
const clean = (obj) => JSON.parse(JSON.stringify(obj ?? {}));

// ---------------------------------------------------------------------------
// Backends
// ---------------------------------------------------------------------------

function localBackend(uid) {
  const key = `estudojs:data:${uid}`;
  let timer = null;
  const writeAll = () => {
    timer = null;
    const { profile, progress, quiz, notes, activity } = state;
    safeSet(key, JSON.stringify({ profile, progress, quiz, notes, activity }));
    setSync('ok');
  };
  return {
    async load() {
      const raw = safeGet(key);
      return raw ? JSON.parse(raw) : {};
    },
    save() {
      setSync('salvando');
      clearTimeout(timer);
      timer = setTimeout(writeAll, 300);
    },
    flush() {
      if (timer) { clearTimeout(timer); writeAll(); }
    },
    async reset() {
      safeSet(key, '{}');
    },
  };
}

async function firestoreBackend(uid) {
  const [{ db }, fs] = await Promise.all([import('../firebase.js'), import('firebase/firestore')]);
  const { doc, getDoc, getDocs, collection, setDoc, writeBatch, serverTimestamp } = fs;
  const userRef = doc(db, 'users', uid);
  const pending = new Map(); // "colecao/id" -> timer

  const write = async (col, id) => {
    pending.delete(`${col}/${id}`);
    try {
      if (col === 'profile') {
        await setDoc(userRef, { ...clean(state.profile), updatedAt: serverTimestamp() }, { merge: true });
      } else {
        await setDoc(doc(db, 'users', uid, col, String(id)), clean(state[col][id]));
      }
      if (pending.size === 0) setSync('ok');
    } catch (e) {
      console.error('Falha ao salvar no Firestore', e);
      setSync('erro');
    }
  };

  return {
    async load() {
      const data = {};
      const snap = await getDoc(userRef);
      data.profile = snap.exists() ? snap.data() : {};
      delete data.profile.updatedAt;
      delete data.profile.createdAt;
      await Promise.all(COLLECTIONS.map(async (col) => {
        const docs = await getDocs(collection(db, 'users', uid, col));
        data[col] = {};
        docs.forEach((d) => { data[col][d.id] = d.data(); });
      }));
      if (!snap.exists()) {
        await setDoc(userRef, { createdAt: serverTimestamp() }, { merge: true });
      }
      return data;
    },
    save(col, id) {
      setSync('salvando');
      const key = `${col}/${id}`;
      clearTimeout(pending.get(key));
      pending.set(key, setTimeout(() => write(col, id), SAVE_DELAY_MS));
    },
    flush() {
      for (const [key, timer] of pending) {
        clearTimeout(timer);
        const [col, ...rest] = key.split('/');
        write(col, rest.join('/'));
      }
    },
    async reset() {
      for (const col of COLLECTIONS) {
        const docs = await getDocs(collection(db, 'users', uid, col));
        let batch = writeBatch(db);
        let n = 0;
        for (const d of docs.docs) {
          batch.delete(d.ref);
          if (++n % 400 === 0) { await batch.commit(); batch = writeBatch(db); }
        }
        await batch.commit();
      }
    },
  };
}

// ---------------------------------------------------------------------------
// API usada pelas telas
// ---------------------------------------------------------------------------

export async function initStore(user) {
  backend?.flush(); // troca de usuário: grava o que estava pendente do anterior
  state.user = user;
  backend = user.local ? localBackend(user.uid) : await firestoreBackend(user.uid);
  const data = await backend.load();
  state.profile = data.profile || {};
  for (const col of COLLECTIONS) state[col] = data[col] || {};

  let changed = false;
  if (!state.profile.startDate) { state.profile.startDate = todayKey(); changed = true; }
  if (!state.profile.name) { state.profile.name = user.name; changed = true; }
  if (user.email && state.profile.email !== user.email) { state.profile.email = user.email; changed = true; }
  if (changed) backend.save('profile', 'me');

  // Garante que nada se perca ao fechar ou trocar de aba.
  if (!flushBound) {
    flushBound = true;
    addEventListener('pagehide', () => backend?.flush());
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') backend?.flush();
    });
  }
}

export function saveProfile(patch) {
  Object.assign(state.profile, patch);
  backend.save('profile', 'me');
  emit();
}

export function updateProgress(exerciseId, updater) {
  const current = state.progress[exerciseId] ? { ...state.progress[exerciseId] } : {};
  state.progress[exerciseId] = updater(current) || current;
  backend.save('progress', exerciseId);
  emit();
  return state.progress[exerciseId];
}

export function saveQuiz(day, data) {
  state.quiz[`d${day}`] = data;
  backend.save('quiz', `d${day}`);
  emit();
}

export function saveNote(day, data) {
  state.notes[`d${day}`] = { ...state.notes[`d${day}`], ...data };
  backend.save('notes', `d${day}`);
}

export function addActivity({ seconds = 0, solved = 0, attempts = 0 }) {
  const key = todayKey();
  const cur = state.activity[key] || { seconds: 0, solved: 0, attempts: 0 };
  state.activity[key] = {
    seconds: cur.seconds + seconds,
    solved: cur.solved + solved,
    attempts: cur.attempts + attempts,
  };
  backend.save('activity', key);
}

export async function resetProgress() {
  await backend.reset();
  for (const col of COLLECTIONS) state[col] = {};
  state.profile.startDate = todayKey();
  backend.save('profile', 'me');
  backend.flush();
  emit();
}

export function exportData() {
  const { profile, progress, quiz, notes, activity } = state;
  return JSON.stringify({ exportadoEm: new Date().toISOString(), profile, progress, quiz, notes, activity }, null, 2);
}

export function flush() {
  backend?.flush();
}
