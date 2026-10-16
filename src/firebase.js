// Inicialização do Firebase (Authentication + Firestore).
// As chaves vêm das variáveis de ambiente VITE_FIREBASE_* (arquivo .env local
// ou "Environment Variables" na Vercel). A configuração web do Firebase não é
// secreta: quem protege os dados são as regras do Firestore (firestore.rules).
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { firebaseConfig } from './config.js';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Cache offline: o progresso continua sendo salvo sem internet e sincroniza depois.
let firestore;
try {
  firestore = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });
} catch {
  firestore = initializeFirestore(app, {});
}
export const db = firestore;
