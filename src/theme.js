// Tema claro/escuro. A preferência fica no navegador (é por dispositivo).
import { safeGet, safeSet } from './auth.js';

const KEY = 'estudojs:tema';
const media = matchMedia('(prefers-color-scheme: dark)');

export const getTheme = () => safeGet(KEY) || 'auto';

export function applyTheme() {
  const pref = getTheme();
  const resolved = pref === 'auto' ? (media.matches ? 'dark' : 'light') : pref;
  const html = document.documentElement;
  if (pref === 'auto') delete html.dataset.theme;
  else html.dataset.theme = pref;
  html.dataset.themeResolved = resolved;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'dark' ? '#14161c' : '#f7f7fb');
}

export function setTheme(value) {
  safeSet(KEY, value);
  applyTheme();
}

media.addEventListener('change', applyTheme);
