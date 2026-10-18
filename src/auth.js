// Autenticação: Firebase (e-mail e senha) ou modo local quando o Firebase não está configurado.
import { firebaseEnabled } from './config.js';

const LOCAL_USER_KEY = 'estudojs:local-user';
const PENDING_NAME_KEY = 'estudojs:nome-cadastro';
let fb = null; // módulos do Firebase carregados sob demanda

async function loadFirebase() {
  if (!fb) {
    const [{ auth }, authMod] = await Promise.all([import('./firebase.js'), import('firebase/auth')]);
    fb = { auth, ...authMod };
  }
  return fb;
}

function toUser(u) {
  if (!u) return null;
  // Logo após o cadastro, o displayName ainda pode não ter sido gravado: usa o nome digitado.
  const name = u.displayName || safeGet(PENDING_NAME_KEY) || (u.email || '').split('@')[0];
  return { uid: u.uid, email: u.email, name, local: false, verified: u.emailVerified };
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

export async function signup(nome, email, senha) {
  const { auth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } = await loadFirebase();
  const senhaOk = await checarSenha(senha);
  if (!senhaOk.valida) {
    const err = new Error('Senha fraca');
    err.code = 'auth/password-does-not-meet-requirements';
    err.faltando = senhaOk.faltando;
    throw err;
  }
  safeSet(PENDING_NAME_KEY, nome);
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email.trim(), senha);
    await updateProfile(user, { displayName: nome });
    auth.languageCode = 'pt-BR';
    // Confirmação de e-mail: não bloqueia o uso, mas ajuda a recuperar a senha depois.
    sendEmailVerification(user).catch(() => {});
  } finally {
    safeRemove(PENDING_NAME_KEY);
  }
}

const REQUISITOS = [
  // [campo do resultado, texto, opção da política]
  ['meetsMinPasswordLength', (o) => `pelo menos ${o.minPasswordLength ?? 6} caracteres`, 'minPasswordLength'],
  ['containsLowercaseLetter', () => 'uma letra minúscula', 'containsLowercaseLetter'],
  ['containsUppercaseLetter', () => 'uma letra MAIÚSCULA', 'containsUppercaseLetter'],
  ['containsNumericCharacter', () => 'um número', 'containsNumericCharacter'],
  ['containsNonAlphanumericCharacter', () => 'um símbolo (ex.: ! @ # $ %)', 'containsNonAlphanumericCharacter'],
];

/**
 * Confere a senha contra a política configurada no Firebase (Authentication → Settings → Password policy).
 * Retorna { valida, faltando: [textos], regras: [textos] }.
 */
export async function checarSenha(senha) {
  const { auth, validatePassword } = await loadFirebase();
  const status = await validatePassword(auth, senha);
  const opts = status.passwordPolicy?.customStrengthOptions || {};
  const regras = REQUISITOS.filter(([, , opt]) => opt === 'minPasswordLength' || opts[opt]).map(([, txt]) => txt(opts));
  const faltando = REQUISITOS.filter(([campo]) => status[campo] === false).map(([, txt]) => txt(opts));
  return { valida: status.isValid, faltando, regras };
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
  'auth/admin-restricted-operation': 'O cadastro está desativado no Firebase (Authentication → Settings → User actions → Enable create).',
  'auth/password-does-not-meet-requirements': 'A senha não atende à política de senhas definida no Firebase.',
  'auth/unauthorized-domain': 'Este domínio não está autorizado no Firebase (Authentication → Settings → Authorized domains).',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'Chave do Firebase inválida. Verifique as variáveis VITE_FIREBASE_*.',
};

export function authErrorMessage(err) {
  if (err?.faltando?.length) return `A senha precisa ter: ${err.faltando.join(', ')}.`;
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

/** Reenvia o e-mail de confirmação para o usuário logado. */
export async function resendVerification() {
  const { auth, sendEmailVerification } = await loadFirebase();
  if (auth.currentUser) await sendEmailVerification(auth.currentUser);
}

/** Recarrega o usuário e o token (necessário para as regras enxergarem o e-mail recém-confirmado). */
export async function refreshVerification() {
  const { auth } = await loadFirebase();
  const u = auth.currentUser;
  if (!u) return false;
  await u.reload();
  await u.getIdToken(true);
  return u.emailVerified;
}
