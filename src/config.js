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

// O cadastro público fica desligado por padrão: as contas são criadas no console do Firebase.
export const allowSignup = env.VITE_ALLOW_SIGNUP === 'true';
