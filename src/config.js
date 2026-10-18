// Lê a configuração do Firebase das variáveis de ambiente do Vite.
const env = import.meta.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// Sem Firebase configurado, o app funciona em "modo local" (dados só neste navegador).
export const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

// Cadastro aberto por padrão: qualquer pessoa pode criar conta com e-mail e senha.
// Para fechar (só o administrador cria contas), defina VITE_ALLOW_SIGNUP=false
// e desative "Enable create (sign-up)" no Firebase Authentication.
export const allowSignup = env.VITE_ALLOW_SIGNUP !== 'false';

// Administradores: veem o progresso de todos os alunos (somente leitura).
// A permissão real está no firestore.rules — mantenha as duas listas iguais.
export const ADMIN_EMAILS = ['rafael.glaucio2@gmail.com'];
export const isAdminEmail = (email) => ADMIN_EMAILS.includes(String(email || '').toLowerCase());
