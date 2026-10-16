import { toast } from '../ui/dom.js';
import { firebaseEnabled, allowSignup } from '../config.js';
import { login, signup, resetPassword, loginLocal, authErrorMessage } from '../auth.js';

export function loginView(root, { onLocalLogin }) {
  root.innerHTML = `
  <main class="login" id="conteudo">
    <div class="login-card">
      <div class="login-logo"><span class="logo-js grande">JS</span></div>
      <h1>EstudoJS</h1>
      <p class="muted">JavaScript em 15 dias, praticando de verdade.</p>
      ${firebaseEnabled ? `
      <form id="form-login" novalidate>
        <label>E-mail<input type="email" id="email" autocomplete="email" inputmode="email" required></label>
        <label>Senha
          <span class="senha-wrap"><input type="password" id="senha" autocomplete="current-password" required minlength="6">
          <button type="button" class="btn-icone" id="ver-senha" aria-label="Mostrar senha">👁</button></span>
        </label>
        <p class="erro-form" id="erro" role="alert"></p>
        <button class="btn btn-primary btn-bloco" id="entrar">Entrar</button>
        ${allowSignup ? '<button type="button" class="btn btn-ghost btn-bloco" id="cadastrar">Criar conta</button>' : ''}
        <button type="button" class="link" id="esqueci">Esqueci minha senha</button>
      </form>
      ${allowSignup ? '' : '<p class="muted pequeno">As contas são criadas pelo administrador no Firebase Authentication.</p>'}
      ` : `
      <div class="aviso-box">
        <strong>Firebase ainda não configurado.</strong>
        <p>Você pode usar o app em <em>modo local</em>: o progresso fica salvo só neste navegador. Para login com e-mail e senha e sincronização entre dispositivos, configure as variáveis <code>VITE_FIREBASE_*</code> (veja o README).</p>
      </div>
      <form id="form-local">
        <label>Como quer ser chamado(a)?<input id="nome-local" autocomplete="nickname" maxlength="30" placeholder="Seu nome"></label>
        <button class="btn btn-primary btn-bloco">Começar em modo local</button>
      </form>`}
    </div>
  </main>`;

  if (!firebaseEnabled) {
    root.querySelector('#form-local').addEventListener('submit', (e) => {
      e.preventDefault();
      onLocalLogin(loginLocal(root.querySelector('#nome-local').value.trim()));
    });
    return;
  }

  const form = root.querySelector('#form-login');
  const email = root.querySelector('#email');
  const senha = root.querySelector('#senha');
  const erro = root.querySelector('#erro');
  const btn = root.querySelector('#entrar');

  root.querySelector('#ver-senha').addEventListener('click', (e) => {
    const visivel = senha.type === 'text';
    senha.type = visivel ? 'password' : 'text';
    e.currentTarget.setAttribute('aria-label', visivel ? 'Mostrar senha' : 'Ocultar senha');
  });

  const run = async (fn, labelOcupado) => {
    erro.textContent = '';
    if (!email.value.trim() || !senha.value) {
      erro.textContent = 'Preencha e-mail e senha.';
      return;
    }
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = labelOcupado;
    try {
      await fn(email.value, senha.value);
      // onAuthStateChanged (em main.js) cuida do redirecionamento
    } catch (err) {
      erro.textContent = authErrorMessage(err);
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    run(login, 'Entrando…');
  });
  root.querySelector('#cadastrar')?.addEventListener('click', () => run(signup, 'Criando…'));
  root.querySelector('#esqueci').addEventListener('click', async () => {
    erro.textContent = '';
    if (!email.value.trim()) {
      erro.textContent = 'Digite seu e-mail acima e toque novamente em “Esqueci minha senha”.';
      email.focus();
      return;
    }
    try {
      await resetPassword(email.value);
      toast(`Se ${email.value.trim()} tiver conta, você receberá um e-mail para redefinir a senha.`, 'ok', 6000);
    } catch (err) {
      erro.textContent = authErrorMessage(err);
    }
  });
  email.focus();
}
