// Ponto de entrada: tema → login → carregar progresso → rotas.
import './styles.css';
import { applyTheme } from './theme.js';
import { watchAuth } from './auth.js';
import { initStore, flush } from './data/store.js';
import { route, fallback, render } from './router.js';
import { loginView } from './views/login.js';
import { dashboardView } from './views/dashboard.js';
import { roadmapView } from './views/roadmap.js';
import { dayView } from './views/day.js';
import { exerciseView } from './views/exercise.js';
import { reviewView } from './views/review.js';
import { statsView } from './views/stats.js';
import { playgroundView } from './views/playground.js';
import { accountView } from './views/account.js';

applyTheme();
const root = document.getElementById('app');

route(/^\/$/, dashboardView);
route(/^\/trilha$/, roadmapView);
route(/^\/dia\/(\d{1,2})$/, dayView);
route(/^\/exercicio\/([\w-]+)$/, exerciseView);
route(/^\/revisao$/, reviewView);
route(/^\/desempenho$/, statsView);
route(/^\/playground$/, playgroundView);
route(/^\/conta$/, accountView);
fallback(dashboardView);

let currentUid = null;

async function onRoute() {
  await render(root);
  // Acessibilidade: leva o foco ao conteúdo novo e volta ao topo
  if (!location.hash.startsWith('#/exercicio')) window.scrollTo(0, 0);
  root.querySelector('#conteudo')?.focus({ preventScroll: true });
}

function showLoading(msg = 'Carregando…') {
  root.innerHTML = `<div class="carregando" role="status"><span class="logo-js grande">JS</span><p>${msg}</p></div>`;
}

function showLogin() {
  currentUid = null;
  removeEventListener('hashchange', onRoute);
  if (location.hash !== '#/login') history.replaceState(null, '', '#/login');
  loginView(root, { onLocalLogin: start });
}

async function start(user) {
  if (currentUid === user.uid) return;
  currentUid = user.uid;
  showLoading('Carregando seu progresso…');
  try {
    await initStore(user);
  } catch (e) {
    console.error(e);
    currentUid = null;
    root.innerHTML = `<div class="carregando"><p>Não foi possível carregar seus dados.</p><p class="pequeno muted">${e.code === 'permission-denied' ? 'Permissão negada: publique as regras do Firestore (firestore.rules).' : 'Verifique sua conexão e tente novamente.'}</p><button class="btn btn-primary" onclick="location.reload()">Tentar de novo</button></div>`;
    return;
  }
  if (!location.hash || location.hash === '#/login') history.replaceState(null, '', '#/');
  addEventListener('hashchange', onRoute);
  onRoute();
}

showLoading();
watchAuth((user) => {
  if (user) start(user);
  else showLogin();
}).catch((e) => {
  console.error(e);
  root.innerHTML = '<div class="carregando"><p>Erro ao iniciar o login. Verifique a configuração do Firebase.</p></div>';
});

addEventListener('beforeunload', flush);
