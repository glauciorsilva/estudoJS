// Autenticação: Firebase (e-mail e senha) ou modo local quando o Firebase não está configurado.
import { firebaseEnabled } from './config.js';

const LOCAL_USER_KEY = 'estudojs:local-user';
let fb = null; // módulos do Firebase carregados sob demanda

async function loadFirebase() {
  if (!fb) {
    const [{ auth }, authMod] = await Promise.all([import('./firebase.js'), import('firebase/auth')]);
    fb = { auth, ...authMod };
  }
  return fb;
}

function toUser(u) {
  return u ? { uid: u.uid, email: u.email, name: u.displayName || (u.email || '').split('@')[0], local: false } : null;
}

/** Chama onChange(user | null) sempre que o login mudar. */
export async function watchAuth(onChange) {
  if (!firebaseEnabled) {
    const saved = safeGet(LOCAL_USER_KEY);
    onChange(saved ? JSON.parse(saved) : null);
    return;
  }
  const { auth, onAuthStateChanged } = await loadFirebase();
  onAuthStateChanged(auth, (u) => onChange(toUser(u)));
}

export async function login(email, senha) {
  const { auth, signInWithEmailAndPassword } = await loadFirebase();
  await signInWithEmailAndPassword(auth, email.trim(), senha);
}

export async function signup(email, senha) {
  const { auth, createUserWithEmailAndPassword } = await loadFirebase();
  await createUserWithEmailAndPassword(auth, email.trim(), senha);
}

export async function resetPassword(email) {
  const { auth, sendPasswordResetEmail } = await loadFirebase();
  auth.languageCode = 'pt-BR';
  await sendPasswordResetEmail(auth, email.trim());
}

export function loginLocal(name) {
  const user = { uid: 'local', email: '', name: name || 'Estudante', local: true };
  safeSet(LOCAL_USER_KEY, JSON.stringify(user));
  return user;
}

export async function logout() {
  if (!firebaseEnabled) {
    safeRemove(LOCAL_USER_KEY);
    location.hash = '#/login';
    location.reload();
    return;
  }
  const { auth, signOut } = await loadFirebase();
  await signOut(auth);
}

const AUTH_ERRORS = {
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/invalid-email': 'E-mail inválido.',
  'auth/missing-password': 'Digite a senha.',
  'auth/user-disabled': 'Esta conta foi desativada.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos ou redefina a senha.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
  'auth/email-already-in-use': 'Este e-mail já tem conta.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/operation-not-allowed': 'Login por e-mail/senha não está ativado no Firebase.',
  'auth/admin-restricted-operation': 'Cadastro desativado. Peça ao administrador para criar sua conta.',
  'auth/unauthorized-domain': 'Este domínio não está autorizado no Firebase (Authentication → Settings → Authorized domains).',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'Chave do Firebase inválida. Verifique as variáveis VITE_FIREBASE_*.',
};

export function authErrorMessage(err) {
  return AUTH_ERRORS[err?.code] || `Não foi possível concluir (${err?.code || err?.message || 'erro desconhecido'}).`;
}

// localStorage pode lançar erro (modo privado, bloqueio de cookies): nunca deixe isso quebrar o app.
export function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
export function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* ignora */ }
}
export function safeRemove(key) {
  try { localStorage.removeItem(key); } catch { /* ignora */ }
}
