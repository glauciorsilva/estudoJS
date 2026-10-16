# EstudoJS — Documentação do aplicativo

**Endereço:** <https://estudojs.vercel.app> · **Código:** <https://github.com/glauciorsilva/estudoJS>

O EstudoJS é um app web para aprender JavaScript em 15 dias **praticando**: aulas curtas, 130 exercícios corrigidos automaticamente, quizzes, diário de estudo, revisão espaçada e um painel que mostra quanto falta e onde estão as dificuldades. Funciona no computador e no celular Android (pode ser instalado como app).

---

## Parte 1 — Manual do aluno

### 1.1 Criar conta e entrar

1. Acesse <https://estudojs.vercel.app>.
2. Toque em **Criar conta** e informe nome, e-mail e senha. A tela mostra as regras de senha (no momento: pelo menos 6 caracteres, com letra minúscula, letra MAIÚSCULA, número e símbolo, como `Estudo#2026`).
3. Você recebe um e-mail de confirmação (não é obrigatório para usar).
4. Nas próximas vezes, use **Entrar**. Esqueceu a senha? Digite o e-mail e toque em **Esqueci minha senha**.

Seu progresso fica salvo na nuvem: você pode começar no computador e continuar no celular.

### 1.2 Instalar no Android

Abra o site no Chrome → menu **⋮** → **Instalar app** (ou “Adicionar à tela inicial”). O EstudoJS ganha um ícone e abre em tela cheia.

### 1.3 As telas

| Tela | O que tem |
|---|---|
| **Painel** 🏠 | Saudação, dia atual da trilha e se você está em dia com o calendário, botão **Continuar**, % da trilha, exercícios resolvidos, quizzes aprovados, sequência de dias 🔥, tempo de estudo, **Onde focar** (tópicos fracos) e **O que falta**. |
| **Trilha** 🗺️ | Os 15 dias com progresso e a rotina diária recomendada. |
| **Dia** | Abas **Aula**, **Exercícios**, **Quiz** e **Diário**. |
| **Exercício** | Enunciado, “o que será verificado”, editor de código, barra de símbolos, botão Executar, resultado, dicas e solução. |
| **Revisão** 🔁 | Revisões do dia, treino focado nas dificuldades e treino intercalado. |
| **Desempenho** 📊 | Domínio por tópico, tipos de erro mais comuns, mapa de constância e notas por dia. |
| **Console** ⌨️ | Área livre para testar qualquer código (não conta pontos). |
| **Conta** (letra no canto superior direito) | Nome, data de início da trilha, tema claro/escuro, backup, zerar progresso e sair. |

### 1.4 Como fazer um exercício

1. Leia o enunciado e a lista **O que será verificado**.
2. Escreva o código no editor. No celular, use a **barra de símbolos** abaixo do editor para `{ } [ ] ( ) ' " \` => ;` e outros.
3. Toque em **▶ Executar** (no computador: <kbd>Ctrl</kbd>+<kbd>Enter</kbd>).
4. Veja o resultado:
   - **Verificações** ✓/✗ — em cada falha aparecem o valor *esperado* e o *recebido*;
   - **Erro** — o tipo, a linha e uma explicação em português do que provavelmente aconteceu;
   - **Console** — tudo o que você imprimiu com `console.log`;
   - **Página** — nos exercícios de DOM, como a página ficou.
5. Travou? Use **💡 Ver dica** (uma por vez). A **🔑 solução** pede confirmação e reduz a nota do exercício; leia, feche e reescreva de memória.
6. Ao passar em tudo, aparece **Muito bem!** e o botão para o próximo exercício (ou para o quiz do dia).

Seu código fica salvo automaticamente; dá para sair e voltar depois.

### 1.5 Como o app mede o seu progresso

- **Nota do exercício (0–100%)**: 100% se resolveu sozinho e com poucas tentativas. Cai com dicas, muitas tentativas e, principalmente, ao ver a solução. Sobe quando você acerta nas revisões.
- **Domínio por tópico**: média das notas dos exercícios que você tentou naquele tópico. Abaixo de 75%, o tópico aparece em **Onde focar**.
- **Cobertura**: quantos exercícios do tópico você já resolveu.
- **Dia concluído**: 80% dos exercícios resolvidos **e** quiz com 70% ou mais.
- **Progresso da trilha**: 85% exercícios + 15% quizzes.
- **Em dia / atrasado**: compara o dia em que você está com a data de início da trilha (ajustável em Conta).
- **Tempo de estudo**: conta apenas o tempo ativo (aba aberta e interação nos últimos 2 minutos).
- **Sequência 🔥**: dias seguidos com pelo menos 5 minutos de estudo ou um exercício resolvido.
- **Tipos de erro**: cada execução com erro é classificada (nome de variável errado, acesso a `undefined`, sintaxe, loop infinito, resultado errado…) para mostrar seus padrões.

### 1.6 Revisão espaçada

Cada exercício resolvido volta na aba **Revisão**: em 3 dias se você foi bem, ou no dia seguinte se usou a solução. A cada revisão bem-sucedida **sem ajuda**, o intervalo cresce (cerca de 2,5×). Na revisão o editor começa vazio: você precisa lembrar. É isso que fixa o conhecimento.

### 1.7 Rotina recomendada (3–4 h/dia)

1. Revisões pendentes (10 min) → 2. Aula testando os exemplos (40–50 min) → 3. Exercícios (1h30–2h) → 4. Quiz (10 min) → 5. Diário (5 min). Pausas a cada 25–50 min.

### 1.8 Problemas comuns

| Situação | O que fazer |
|---|---|
| “Tempo esgotado” ao executar | Seu código tem um loop que nunca termina (ou recursão sem caso base). Confira a condição do `while`/`for`. |
| “A senha precisa ter: …” | Ajuste a senha conforme os itens listados. |
| Bolinha vermelha no topo | O app não conseguiu salvar (sem internet). Ele tenta de novo; não feche a aba até ficar verde. |
| “Permissão negada” ao entrar | As regras do Firestore não estão publicadas (ver Parte 2). |

---

## Parte 2 — Documentação técnica

### 2.1 Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | JavaScript puro (ES modules), HTML e CSS — sem framework, para o próprio código servir de material de estudo |
| Build | Vite |
| Editor | CodeMirror 6 |
| Login | Firebase Authentication (e-mail/senha) |
| Banco | Cloud Firestore, com cache offline |
| Execução do código do aluno | Web Worker dentro de iframe `sandbox` + linkedom (DOM simulado) |
| Testes | Vitest (493 verificações) |
| Hospedagem | Vercel (deploy automático a cada push) |
| CI | GitHub Actions (testes + build) |

### 2.2 Estrutura de pastas

```
src/
  main.js            entrada: tema → login → carregar dados → rotas
  router.js          rotas por hash (#/dia/3, #/exercicio/d03-fatorial…)
  config.js          variáveis VITE_FIREBASE_* e VITE_ALLOW_SIGNUP
  firebase.js        inicialização do Firebase (Auth + Firestore com cache offline)
  auth.js            login, cadastro, política de senha, mensagens de erro
  theme.js           tema claro/escuro
  content/
    topics.js        tópicos usados no diagnóstico
    days/dayNN.js    aula, exercícios, quiz e desafio de cada dia
  runner/
    runtime.js       executa o código + testes (usado no navegador e no Node)
    worker.js        Web Worker
    sandbox.js       iframe isolado + tempo limite
    errors.js        tradução e classificação dos erros
    dom.js           página simulada (linkedom)
  data/
    store.js         leitura/gravação (Firestore ou localStorage)
    progress.js      notas, domínio, revisão espaçada, plano de 15 dias
    timer.js         tempo de estudo ativo
  ui/                editor, layout, resultados, utilitários
  views/             telas
tests/               conteúdo (soluções passam, códigos iniciais falham) e motor de execução
scripts/             gerar-apostila.mjs
docs/                apostila, documentação, revisão do projeto
```

### 2.3 Como o código do aluno é executado

1. A tela envia `{ code, tests, checks, env, html }` para `sandbox.js`.
2. Em produção, um `<iframe sandbox="allow-scripts">` (origem opaca) cria um **Web Worker novo a cada execução**. O código não acessa o login, o `localStorage` nem o IndexedDB do app.
3. `runtime.js` monta uma função com o código do aluno em **modo estrito**, injeta `console`, `setTimeout`/`setInterval` rastreados e um `fetch` simulado (`https://api.exemplo.com/usuarios` e `/produtos`); nos exercícios de DOM injeta também `document` e `window` simulados.
4. Os testes rodam no mesmo escopo do código e comparam o valor retornado com o esperado (comparação profunda), ou comparam a saída do console.
5. Limites: 6 s no total (loop infinito é interrompido), 2,5 s para o `await` principal, 1,5 s por teste assíncrono, 300 linhas de console.

### 2.4 Modelo de dados (Firestore)

```
users/{uid}                     name, email, startDate, createdAt, updatedAt
users/{uid}/progress/{exId}     attempts, passed, passedAt, failsBeforePass, hintsUsed,
                                hintsBeforePass, solutionViewed, solutionBeforePass,
                                reviewPasses, errors{tipo: n}, timeSec, lastCode, srs{interval, reps, due}
users/{uid}/quiz/d{dia}         best, last, attempts, wrong[], at
users/{uid}/notes/d{dia}        aprendi, duvidas, goals[], at
users/{uid}/activity/{AAAA-MM-DD}  seconds, solved, attempts
```

Gravações são agrupadas (cerca de 1,2 s) e enviadas também ao esconder/fechar a aba. Sem Firebase configurado, tudo vai para o `localStorage` (“modo local”).

### 2.5 Segurança

- **Regras do Firestore** (`firestore.rules`): cada usuário só lê e grava `users/{seu uid}`; apenas as coleções `progress`, `quiz`, `notes` e `activity`; limites de tamanho (`lastCode` ≤ 20 000 caracteres; diário ≤ 5 000). Todo o resto é negado. Testado: ler dados de outro usuário, listar usuários, gravar em coleção não permitida e acessar sem login retornam **403**.
- **Cadastro aberto**, com política de senha do Firebase e e-mail de confirmação. Recomendado: *Sign-up quota* por IP.
- **XSS**: textos do usuário são sempre escapados; a pré-visualização de DOM roda num iframe sem scripts.
- **Cabeçalhos HTTP** (`vercel.json`): `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`.
- A configuração web do Firebase não é segredo; mesmo assim fica fora do Git (`.env`) e é cadastrada nas variáveis de ambiente da Vercel.

### 2.6 Rodar, testar e publicar

```bash
npm install
npm run dev        # http://localhost:5173 (usa o .env local)
npm test           # 493 verificações
npm run build      # gera dist/
npm run apostila   # regenera docs/APOSTILA.md a partir do conteúdo
```

Publicação: `git push` na branch conectada à Vercel → deploy automático em <https://estudojs.vercel.app>.

Variáveis de ambiente (arquivo `.env` local e Vercel → Settings → Environment Variables):

| Variável | Uso |
|---|---|
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` | Projeto Firebase `estudojs-1d125` |
| `VITE_ALLOW_SIGNUP` | `false` fecha o cadastro (padrão: aberto) |

### 2.7 Adicionar ou editar exercícios

Edite `src/content/days/dayNN.js`. Cada exercício tem `id`, `title`, `topic`, `difficulty`, `prompt` (HTML), `starter`, `solution`, `hints`, `tests` e, opcionalmente, `checks`, `env: 'dom'` e `html`. Depois rode `npm test` (garante que a solução passa e o código inicial falha) e `npm run apostila`.

Tipos de teste:

```js
{ name: 'soma(2, 3) → 5', run: 'soma(2, 3)', expected: 5 }      // valor retornado
{ name: 'saída', logs: ['linha 1', 'linha 2'] }                 // console exato
{ name: 'contém', logsInclude: ['linha 1'] }                    // console contém
// regra sobre o texto do código:
checks: [{ type: 'must', pattern: '\\.map\\(', message: 'Usou map' }]
```

### 2.8 Limitações conhecidas

- O DOM dos exercícios do dia 12 é simulado (sem CSS/layout).
- Se a mesma conta editar o mesmo exercício em dois aparelhos ao mesmo tempo, vale a última gravação.
- Plano gratuito do Firestore: 50 mil leituras e 20 mil gravações por dia (suficiente para dezenas de alunos ativos).
