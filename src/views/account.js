import { shell } from '../ui/layout.js';
import { esc, toast, confirmDialog } from '../ui/dom.js';
import { getState, saveProfile, resetProgress, exportData, todayKey } from '../data/store.js';
import { logout } from '../auth.js';
import { getTheme, setTheme } from '../theme.js';

export function accountView(root) {
  const { user, profile } = getState();
  const tema = getTheme();

  root.innerHTML = shell('/conta', `
    <h1>Minha conta</h1>
    <section class="painel">
      <form id="perfil" class="form-grid">
        <label class="campo">Nome<input id="nome" maxlength="40" value="${esc(profile.name || '')}"></label>
        <label class="campo">E-mail<input value="${esc(user.email || '(modo local)')}" disabled></label>
        <label class="campo">Início da trilha
          <input type="date" id="inicio" value="${esc(profile.startDate || todayKey())}" max="${todayKey()}">
          <span class="pequeno muted">Usado para calcular se você está em dia com o plano de 15 dias.</span>
        </label>
        <button class="btn btn-primary">Salvar</button>
      </form>
    </section>

    <section class="painel">
      <h2>Aparência</h2>
      <div class="segmentado" role="radiogroup" aria-label="Tema">
        ${[['auto', '🖥️ Sistema'], ['light', '☀️ Claro'], ['dark', '🌙 Escuro']].map(([v, l]) => `<label><input type="radio" name="tema" value="${v}" ${tema === v ? 'checked' : ''}><span>${l}</span></label>`).join('')}
      </div>
    </section>

    <section class="painel">
      <h2>Dados</h2>
      <p class="pequeno muted">${user.local ? 'Modo local: seu progresso está salvo apenas neste navegador. Faça backup de vez em quando.' : 'Seu progresso é salvo no Firebase e sincroniza entre seus dispositivos.'}</p>
      <div class="botoes">
        <button class="btn btn-ghost" id="exportar">⬇️ Baixar backup (JSON)</button>
        <button class="btn btn-danger" id="zerar">🗑️ Zerar progresso</button>
      </div>
    </section>

    <section class="painel">
      <button class="btn btn-ghost btn-bloco" id="sair">Sair da conta</button>
    </section>
    <p class="pequeno muted centro">EstudoJS · feito com JavaScript puro, Vite e Firebase. O código deste app também é material de estudo!</p>`);

  root.querySelector('#perfil').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = root.querySelector('#nome').value.trim();
    const inicio = root.querySelector('#inicio').value;
    saveProfile({ name: nome || profile.name, startDate: inicio || profile.startDate });
    toast('Dados salvos.', 'ok');
  });

  root.querySelectorAll('input[name="tema"]').forEach((r) => r.addEventListener('change', () => {
    setTheme(r.value);
    accountView(root); // recria (o editor usa as cores do tema)
  }));

  root.querySelector('#exportar').addEventListener('click', () => {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `estudojs-backup-${todayKey()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  root.querySelector('#zerar').addEventListener('click', async () => {
    const ok = await confirmDialog('Isso apaga <strong>todo</strong> o seu progresso (exercícios, quizzes, diário e histórico). Não dá para desfazer. Continuar?', { ok: 'Apagar tudo', danger: true });
    if (!ok) return;
    try {
      await resetProgress();
      toast('Progresso zerado. Bons estudos!', 'ok');
      location.hash = '#/';
    } catch (e) {
      toast('Não foi possível zerar agora. Verifique a conexão.', 'erro');
      console.error(e);
    }
  });

  root.querySelector('#sair').addEventListener('click', () => logout());
}
