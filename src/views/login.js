import { toast } from '../ui/dom.js';
import { firebaseEnabled, allowSignup } from '../config.js';
import { login, signup, resetPassword, loginLocal, authErrorMessage } from '../auth.js';

const SENHA_MIN = 8;

export function loginView(root, { onLocalLogin }) {
  root.innerHTML = `
  <main class="login" id="conteudo">
    <div class="login-card">
      <div class="login-logo"><span class="logo-js grande">JS</span></div>
      <h1>EstudoJS</h1>
      <p class="muted">JavaScript em 15 dias, praticando de verdade.</p>
      ${firebaseEnabled ? `
      ${allowSignup ? `<div class="segmentado modo-login" role="tablist" aria-label="Entrar ou criar conta">
        <button type="button" role="tab" class="modo ativo" data-modo="entrar" aria-selected="true">Entrar</button>
        <button type="button" role="tab" class="modo" data-modo="criar" aria-selected="false">Criar conta</button>
      </div>` : ''}
      <form id="form-login" novalidate>
        <label data-so="criar" hidden>Nome<input id="nome" autocomplete="name" maxlength="40"></label>
        <label>E-mail<input type="email" id="email" autocomplete="email" inputmode="email" required></label>
        <label>Senha
          <span class="senha-wrap"><input type="password" id="senha" autocomplete="current-password" required>
          <button type="button" class="btn-icone" id="ver-senha" aria-label="Mostrar senha">👁</button></span>
          <span class="pequeno muted" data-so="criar" hidden>Mínimo de ${SENHA_MIN} caracteres, com letras e números.</span>
        </label>
        <label data-so="criar" hidden>Confirmar senha<input type="password" id="senha2" autocomplete="new-password"></label>
        <p class="erro-form" id="erro" role="alert"></p>
        <button class="btn btn-primary btn-bloco" id="enviar">Entrar</button>
        <button type="button" class="link" id="esqueci" data-so="entrar">Esqueci minha senha</button>
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

  const $ = (s) => root.querySelector(s);
  const form = $('#form-login');
  const nome = $('#nome');
  const email = $('#email');
  const senha = $('#senha');
  const senha2 = $('#senha2');
  const erro = $('#erro');
  const btn = $('#enviar');
  let modo = 'entrar';

  function setModo(novo) {
    modo = novo;
    root.querySelectorAll('[data-so]').forEach((el) => { el.hidden = el.dataset.so !== modo; });
    root.querySelectorAll('.modo').forEach((b) => {
      const ativo = b.dataset.modo === modo;
      b.classList.toggle('ativo', ativo);
      b.setAttribute('aria-selected', String(ativo));
    });
    btn.textContent = modo === 'criar' ? 'Criar conta' : 'Entrar';
    senha.autocomplete = modo === 'criar' ? 'new-password' : 'current-password';
    erro.textContent = '';
    (modo === 'criar' ? nome : email).focus();
  }
  root.querySelectorAll('.modo').forEach((b) => b.addEventListener('click', () => setModo(b.dataset.modo)));

  $('#ver-senha').addEventListener('click', (e) => {
    const visivel = senha.type === 'text';
    senha.type = visivel ? 'password' : 'text';
    e.currentTarget.setAttribute('aria-label', visivel ? 'Mostrar senha' : 'Ocultar senha');
  });

  function validar() {
    if (!email.value.trim() || !senha.value) return 'Preencha e-mail e senha.';
    if (modo !== 'criar') return '';
    if (nome.value.trim().length < 2) return 'Digite seu nome.';
    if (senha.value.length < SENHA_MIN || !/\d/.test(senha.value) || !/[a-zA-Z]/.test(senha.value)) {
      return `A senha precisa ter pelo menos ${SENHA_MIN} caracteres, com letras e números.`;
    }
    if (senha.value !== senha2.value) return 'As senhas não conferem.';
    return '';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    erro.textContent = validar();
    if (erro.textContent) return;
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = modo === 'criar' ? 'Criando…' : 'Entrando…';
    try {
      if (modo === 'criar') {
        await signup(nome.value.trim(), email.value, senha.value);
        toast('Conta criada! Enviamos um e-mail de confirmação.', 'ok', 5000);
      } else {
        await login(email.value, senha.value);
      }
      // onAuthStateChanged (em main.js) cuida do redirecionamento
    } catch (err) {
      erro.textContent = authErrorMessage(err);
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });

  $('#esqueci').addEventListener('click', async () => {
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
