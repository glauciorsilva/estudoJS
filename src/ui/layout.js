// Estrutura da página: cabeçalho, menu lateral (desktop) e barra inferior (celular).
import { esc } from './dom.js';
import { getState, getSyncStatus } from '../data/store.js';
import { dueReviews } from '../data/progress.js';

const NAV = [
  { hash: '#/', label: 'Painel', icon: '🏠', match: /^\/$/ },
  { hash: '#/trilha', label: 'Trilha', icon: '🗺️', match: /^\/(trilha|dia)/ },
  { hash: '#/revisao', label: 'Revisão', icon: '🔁', match: /^\/revisao/ },
  { hash: '#/desempenho', label: 'Desempenho', icon: '📊', match: /^\/desempenho/ },
  { hash: '#/playground', label: 'Console', icon: '⌨️', match: /^\/playground/ },
];

const SYNC_LABEL = { ok: 'Progresso salvo', salvando: 'Salvando…', erro: 'Erro ao salvar — verifique a conexão' };

export function shell(path, content) {
  const { user, profile } = getState();
  const due = dueReviews().length;
  const links = NAV.map((n) => {
    const ativo = n.match.test(path);
    const badge = n.hash === '#/revisao' && due ? `<span class="badge" aria-label="${due} revisões pendentes">${due}</span>` : '';
    return `<a href="${n.hash}" class="nav-item${ativo ? ' ativo' : ''}"${ativo ? ' aria-current="page"' : ''}><span class="nav-icone" aria-hidden="true">${n.icon}</span><span class="nav-texto">${n.label}</span>${badge}</a>`;
  }).join('');
  const nome = profile.name || user?.name || 'Estudante';
  const sync = getSyncStatus();
  return `
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>
  <header class="topo">
    <a href="#/" class="logo" aria-label="EstudoJS, ir para o painel"><span class="logo-js">JS</span><span class="logo-texto">EstudoJS</span></a>
    <div class="topo-dir">
      ${user?.local ? '<span class="tag tag-aviso" title="Sem Firebase: o progresso fica só neste navegador">modo local</span>' : ''}
      <span class="sync sync-${sync}" id="sync" title="${SYNC_LABEL[sync]}" aria-label="${SYNC_LABEL[sync]}"></span>
      <a href="#/conta" class="avatar" title="Minha conta" aria-label="Minha conta">${esc(nome.charAt(0).toUpperCase())}</a>
    </div>
  </header>
  <nav class="nav" aria-label="Navegação principal">${links}</nav>
  <main id="conteudo" class="conteudo" tabindex="-1">${content}</main>`;
}

document.addEventListener('sync-status', (e) => {
  const el = document.getElementById('sync');
  if (el) {
    el.className = `sync sync-${e.detail}`;
    el.title = SYNC_LABEL[e.detail];
    el.setAttribute('aria-label', SYNC_LABEL[e.detail]);
  }
});
