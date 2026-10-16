# Revisão do projeto: análise, riscos e decisões

O repositório estava vazio, então a “análise do projeto” cobriu o **plano** (requisitos pedidos) e, depois, uma revisão do código construído. Abaixo, cada ponto fraco encontrado e o que foi feito.

## 1. Riscos no plano original

| # | Ponto de atenção | Por que é um risco | O que foi feito |
|---|---|---|---|
| 1 | “Fluente em 15 dias” | Expectativa irreal gera frustração e abandono. Em ~50h dá para dominar os fundamentos e o JS moderno, não a fluência plena. | Meta realista no [ROADMAP](../ROADMAP.md), ritmo de 3–4h/dia, indicador “em dia / atrasado” e roteiro de continuidade após o dia 15. |
| 2 | Estudar só lendo/assistindo | Leitura passiva dá ilusão de aprendizado. | 130 exercícios com correção automática, quizzes sem consulta, revisão espaçada, treino intercalado e diário (técnicas com mais evidência científica). |
| 3 | Executar código digitado no navegador | Um `while(true)` trava a aba; código colado de um link poderia roubar o login do Firebase. | Execução num Web Worker dentro de iframe `sandbox` com origem opaca e tempo limite de 6 s. Testado: `localStorage`/IndexedDB do app ficam inacessíveis ao código do aluno. |
| 4 | “Login gerado pela Authentication” + compartilhar com outra pessoa | Esconder o botão de cadastro não impede que alguém crie conta pela API pública. | Cadastro desligado por padrão no app **e** instrução para desativar *Enable create (sign-up)* no Firebase. As regras garantem que cada pessoa só acessa os próprios dados. |
| 5 | Chaves do Firebase no GitHub/Vercel | Confusão comum: achar que a config web é secreta, ou commitar `.env`. | Config via `VITE_FIREBASE_*`, `.env` no `.gitignore`, `.env.example` documentado. A segurança real está em `firestore.rules`. |
| 6 | Firestore sem regras / em “modo de teste” | Modo de teste expira em 30 dias e deixa o banco aberto. | `firestore.rules` restritivo (só o dono, só coleções conhecidas, limite de tamanho) + `firebase.json` para publicar. |
| 7 | Domínio da Vercel não autorizado | Login falha em produção com `auth/unauthorized-domain`. | Passo no README e mensagem de erro traduzida no app. |
| 8 | Uso no Android | Teclados de celular escondem `{ } [ ] \``; editores de código costumam ser ruins no toque. | Barra de símbolos que não fecha o teclado, layout mobile-first, botões ≥ 44px, sem rolagem horizontal (verificado), PWA instalável. |
| 9 | Perder progresso (sem internet, fechar a aba) | Frustrante e desmotivador. | Cache offline do Firestore, gravação ao esconder/fechar a aba, rascunho do código salvo no aparelho, backup em JSON. |
| 10 | Medir “o quanto falta” e “onde estão as dificuldades” | Contar só exercícios feitos não mostra *qualidade*. | Nota por exercício (cai com dicas, soluções e muitas tentativas), domínio por tópico, perfil de tipos de erro, quizzes por dia, horas restantes estimadas. |
| 11 | Conteúdo com erro (exercício impossível ou teste errado) | Mina a confiança de quem está aprendendo. | Testes automáticos (Vitest + CI): **toda solução passa, todo código inicial falha, todo exemplo das aulas executa** — 493 verificações. |
| 12 | Depender do servidor para testar | Sem Firebase configurado, nada funcionaria. | “Modo local”: o app funciona 100% sem Firebase (dados no navegador). |

## 2. Revisão do código — problemas encontrados e corrigidos durante o desenvolvimento

- **Promises que nunca resolvem travavam a correção** (ex.: exercício assíncrono com código inicial vazio): cada teste agora tem tempo limite próprio e a mensagem explica o motivo.
- **Logs de `fetch` não apareciam** quando a função assíncrona não era aguardada: o `fetch` simulado passou a usar os timers rastreados, e a execução espera timers pendentes antes de corrigir.
- **Loop infinito levava 10 s para ser interrompido**: reduzido para 6 s, com orçamento de tempo interno menor para os testes.
- **Rolagem horizontal no celular** em enunciados com código longo: corrigido no grid (`min-width: 0`) e quebra de linha no `<pre>` do enunciado.
- **Diário perdia o texto** se a pessoa saísse da tela logo após digitar: o salvamento pendente é concluído ao sair.
- **Rascunhos antigos sobrescreviam código mais novo de outro aparelho**: o rascunho local é apagado sempre que o código é salvo na nuvem (a cada execução).
- **Testes com `<select>`**: a página simulada não permite atribuir `select.value`; o teste foi ajustado para marcar a `<option>`.
- **XSS**: textos vindos do usuário (nome, diário, e-mail) são sempre escapados; a pré-visualização do DOM roda num iframe sem scripts.

## 3. Limitações conhecidas (e alternativas)

- **DOM simulado**: os exercícios do dia 12 usam uma página simulada (sem CSS/layout). Por isso o “desafio extra” pede para repetir num arquivo HTML real.
- **Nota local × nuvem**: se a mesma conta editar o mesmo exercício em dois aparelhos ao mesmo tempo, vale a última gravação.
- **Alerta do `npm audit`** em `@grpc/grpc-js`: é dependência do Firestore **apenas no Node.js**; o navegador usa outro transporte, então não afeta o app.
- **Tamanho do bundle** (~250 KB gzip, principalmente o editor CodeMirror): carregado uma vez e cacheado por 1 ano pela Vercel.

## 4. Próximas melhorias sugeridas

1. Painel “Turma” para comparar o progresso das duas pessoas (exige regra de leitura compartilhada).
2. Notificação diária de estudo (PWA + Firebase Cloud Messaging).
3. Testes E2E automatizados (Playwright) no CI, usando o Firebase Emulator.
4. Novos dias opcionais: Node.js, Git, React e Firestore na prática.
