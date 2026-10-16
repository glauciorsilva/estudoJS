# EstudoJS — JavaScript em 15 dias

🌐 **Acesse:** <https://estudojs.vercel.app>

App web para aprender JavaScript **praticando**: aulas curtas, ~130 exercícios com correção automática, quizzes, diário de aprendizagem, revisão espaçada e um painel que mostra **quanto falta** e **onde estão suas dificuldades**. Funciona no desktop e no celular Android (pode ser instalado como app).

- 📖 Plano de estudos completo: [ROADMAP.md](ROADMAP.md)
- 🔍 Análise do projeto, riscos encontrados e decisões: [docs/REVISAO.md](docs/REVISAO.md)

## O que o app faz

| Tela | Para quê |
|---|---|
| **Painel** | Progresso geral, se você está em dia com o plano, sequência de dias, “Onde focar” e botão “Continuar”. |
| **Trilha** | Os 15 dias, com status e rotina diária recomendada. |
| **Dia** | Aula (com botão ▶ Testar em cada exemplo), exercícios, quiz e diário (autoavaliação + “o que aprendi”). |
| **Exercício** | Editor com destaque de sintaxe, barra de símbolos para celular, testes visíveis, erros explicados em português, dicas progressivas e solução. |
| **Revisão** | Revisão espaçada (1, 3, 7, 15… dias), treino focado nos tópicos fracos e treino intercalado. |
| **Desempenho** | Domínio por tópico, tipos de erro mais comuns, constância (mapa de calor) e notas por dia. |
| **Console** | Playground livre com `console`, `document` (página simulada) e `fetch` de exemplo. |

## Rodando no seu computador

Requisitos: [Node.js](https://nodejs.org) 20 ou mais novo.

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm test           # valida todos os exercícios e o motor de execução
npm run build      # gera a versão de produção em dist/
npm run preview    # testa a versão de produção localmente
```

Sem configurar o Firebase, o app abre em **modo local** (progresso salvo só naquele navegador). Ótimo para testar.

## Configurando o Firebase (login + banco de dados)

1. Acesse <https://console.firebase.google.com> → **Adicionar projeto**.
2. **Authentication** → *Começar* → *Método de login* → ative **E-mail/senha**.
3. **Cadastro aberto (padrão):** qualquer pessoa cria a própria conta na tela de login (nome, e-mail e senha). Deixe ligado **Authentication → Settings → User actions → Enable create (sign-up)**.
4. **Proteções recomendadas com cadastro aberto** (veja [docs/REVISAO.md](docs/REVISAO.md#cadastro-aberto)):
   - **Authentication → Settings → Password policy**: exija no mínimo 8 caracteres (o app já pede letras e números).
   - **Authentication → Settings → Sign-up quota**: limite de contas novas por IP (ex.: 10 por hora) contra robôs.
   - **App Check** com reCAPTCHA Enterprise (opcional, recomendado se o app ficar público).
   - Em **Uso e faturamento**, crie um alerta de orçamento se ativar o plano Blaze.
   - Para voltar a fechar o cadastro: desmarque *Enable create* e defina `VITE_ALLOW_SIGNUP=false`.
5. **Firestore Database** → *Criar banco de dados* → modo **produção** → região `southamerica-east1` (São Paulo).
6. **Firestore → Regras**: cole o conteúdo de [`firestore.rules`](firestore.rules) e publique. Sem isso, o app mostra “permissão negada”.
   - Alternativa via terminal: `npm i -g firebase-tools && firebase login && firebase use --add && firebase deploy --only firestore:rules`
7. **Configurações do projeto → Seus apps → Web (`</>`)**: registre o app e copie o objeto `firebaseConfig`.
8. Copie `.env.example` para `.env` e preencha as variáveis `VITE_FIREBASE_*` com esses valores.
9. Depois do deploy: **Authentication → Settings → Authorized domains** → adicione o domínio da Vercel (`estudojs.vercel.app`).

> A configuração web do Firebase **não é segredo** (ela vai para o navegador de qualquer forma). Quem protege os dados são as **regras do Firestore**: cada pessoa só lê e grava os próprios dados.

### Estrutura dos dados

```
users/{uid}                    perfil (nome, e-mail, data de início)
users/{uid}/progress/{exId}    tentativas, acertos, dicas, erros, revisão espaçada, último código
users/{uid}/quiz/d{dia}        melhor nota, tentativas, questões erradas
users/{uid}/notes/d{dia}       diário e autoavaliação
users/{uid}/activity/{data}    minutos estudados, exercícios resolvidos
```

## GitHub e deploy na Vercel

```bash
git add . && git commit -m "minha alteração"
git push
```

1. Em <https://vercel.com/new>, importe o repositório do GitHub (o Vite é detectado sozinho; `vercel.json` já está pronto).
2. Em **Settings → Environment Variables**, cadastre as mesmas variáveis `VITE_FIREBASE_*` do `.env` e faça um novo deploy.
3. A cada `git push` na branch principal, a Vercel publica automaticamente. O GitHub Actions (`.github/workflows/ci.yml`) roda os testes em cada push/PR.

## Instalar no Android

Abra o site no Chrome → menu ⋮ → **Instalar app** (ou “Adicionar à tela inicial”). Ele abre em tela cheia, como um app.

## Como o código do aluno é executado (segurança)

O código digitado roda num **Web Worker dentro de um iframe isolado** (`sandbox="allow-scripts"`, origem opaca):

- loops infinitos não travam a tela — a execução é interrompida após 6 s;
- o código **não consegue** ler o login do Firebase, o `localStorage` ou o IndexedDB do app (mesmo que alguém envie um link malicioso para o Console);
- `fetch` é simulado (`https://api.exemplo.com/usuarios` e `/produtos`), então funciona offline;
- exercícios de DOM usam uma página simulada ([linkedom](https://github.com/WebReflection/linkedom)) e a pré-visualização é exibida num iframe sem scripts.

## Estrutura do projeto

```
src/
  content/          aulas, exercícios e quizzes (1 arquivo por dia) + tópicos
  runner/           motor de execução: runtime (testes), worker, sandbox, tradução de erros
  data/             store (Firestore/local), regras de aprendizagem (progress.js), tempo de estudo
  views/            telas (painel, trilha, dia, exercício, revisão, desempenho, console, conta)
  ui/               editor (CodeMirror), layout, componentes
tests/              Vitest: toda solução passa, todo código inicial falha, exemplos das aulas rodam
```

### Adicionando um exercício

Edite o arquivo do dia em `src/content/days/` e adicione um objeto em `exercises`:

```js
{
  id: 'd03-novo',               // único
  title: 'Título',
  topic: 'lacos',               // ver src/content/topics.js
  difficulty: 1,                // 1 fácil, 2 médio, 3 desafio
  prompt: '<p>Enunciado em HTML</p>',
  starter: 'function f(x) {\n  \n}\n',
  solution: 'function f(x) {\n  return x;\n}',
  hints: ['Dica 1', 'Dica 2'],
  tests: [
    { name: 'f(1) → 1', run: 'f(1)', expected: 1 },   // compara o valor
    // { name: 'saída', logs: ['linha 1', 'linha 2'] } // compara o console
  ],
  checks: [{ type: 'must', pattern: 'for\\s*\\(', message: 'Usou for' }], // opcional
  // env: 'dom', html: '<button id="b"></button>'                         // opcional
}
```

Rode `npm test`: ele confirma que a solução passa e que o código inicial não passa.

## Licença

Uso pessoal e educacional.
