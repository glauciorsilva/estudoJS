# Roadmap: JavaScript em 15 dias

## Expectativa realista (leia antes!)

Em 15 dias, com **3 a 4 horas por dia (~50 horas)**, dá para sair do zero até **dominar os fundamentos e o JavaScript moderno do dia a dia**: ler e escrever código, resolver problemas, manipular dados, usar classes, DOM e async/await. Isso é a base de qualquer trabalho com JS (React, Node, Firebase).

“Fluência” de verdade — escrever sem consultar, sabendo escolher a melhor solução — vem com **prática contínua em projetos**. Por isso o plano termina com um projeto e um roteiro de continuidade. Se um dia exigir mais tempo, tudo bem: **domínio > velocidade**. O app mostra se você está em dia ou atrasado.

## Método (baseado em ciência da aprendizagem)

| Técnica | Como o app aplica |
|---|---|
| **Prática de recuperação** (tentar lembrar) | Exercícios antes de ver a solução; quizzes sem consulta; revisões começam com o editor vazio. |
| **Repetição espaçada** | Cada exercício resolvido volta em 1, 3, 7, 15… dias na aba Revisão. |
| **Prática intercalada** | “Treino intercalado” mistura exercícios de dias diferentes; o dia 14 mistura tudo. |
| **Feedback imediato** | Testes automáticos + erros explicados em português, com a linha do erro. |
| **Dificuldade desejável** | Dicas progressivas; a solução pede confirmação e reduz a nota (e agenda revisão). |
| **Autoexplicação / metacognição** | Diário diário: “o que aprendi” + autoavaliação dos objetivos. |
| **Diagnóstico** | Painel de domínio por tópico e tipos de erro mais frequentes. |

### Rotina diária (3–4h)

1. **Aquecimento – 10 min**: revisões pendentes.
2. **Teoria ativa – 40–50 min**: leia e clique em “▶ Testar” em cada exemplo. Mude os exemplos e preveja o resultado antes de executar.
3. **Prática – 1h30–2h**: exercícios em ordem. Tente 10 min antes de abrir uma dica.
4. **Quiz – 10 min**: sem consultar. Releia as explicações.
5. **Diário – 5 min**: escreva com suas palavras.
6. **Pausas**: 5 min a cada 25–50 min. Durma bem — o sono consolida a memória.

**Dia concluído** = 80% dos exercícios resolvidos + quiz ≥ 70%.

## Os 15 dias

### Semana 1 — Fundamentos
| Dia | Tema | Você vai conseguir |
|---|---|---|
| 1 | Primeiros passos | `console.log`, `let`/`const`, tipos primitivos, operadores, template strings |
| 2 | Condicionais | `===`, `&&`/`||`/`!`, truthy/falsy, `if`/`else`, `switch`, ternário |
| 3 | Laços | `for`, `while`, `for...of`, acumuladores, `break`/`continue`, laços aninhados |
| 4 | Funções | declaração, arrow, `return` × `console.log`, parâmetros padrão, escopo, recursão |
| 5 | Strings e números | métodos de string, conversões, `Math`, arredondamento, aleatórios |
| 6 | Arrays | `push`/`pop`/`shift`/`splice`, busca, cópia × mutação, spread, matrizes |
| 7 | Objetos e JSON | propriedades, métodos e `this`, `Object.entries`, desestruturação, `?.`/`??`, JSON — **checkpoint** |

### Semana 2 — JavaScript moderno e a web
| Dia | Tema | Você vai conseguir |
|---|---|---|
| 8 | map/filter/reduce | transformar, filtrar, resumir, ordenar e encadear listas |
| 9 | Callbacks e closures | funções de ordem superior, fábricas de funções, estado privado, memoização |
| 10 | Classes e POO | `class`, getters/setters, `static`, campos `#privados`, herança, polimorfismo |
| 11 | Erros, Map, Set e módulos | `try/catch/throw`, erros personalizados, método de depuração, `Map`/`Set`, `import`/`export` |
| 12 | DOM e eventos | selecionar, criar e alterar elementos, eventos, formulários, delegação |
| 13 | Assíncrono | event loop, Promises, `async/await`, `fetch`, `Promise.all`/`race` |

### Reta final — Integração
| Dia | Tema | Você vai conseguir |
|---|---|---|
| 14 | Resolução de problemas | método de 5 passos, padrões (contagem, pilha, busca binária), noção de eficiência |
| 15 | Projeto final + simulado | gerenciador de tarefas em 5 etapas (classe → estatísticas → JSON → async → DOM) e simulado com 12 questões |

## Depois dos 15 dias (continuidade)

1. **Semana 3**: refaça o projeto final fora do app (HTML + CSS + JS), salve no `localStorage`, publique no GitHub e na Vercel.
2. **Semana 4**: troque o `localStorage` pelo Firestore — use o código deste app (`src/data/store.js`) como referência.
3. **Node.js + npm** e **Git** no dia a dia.
4. **React** (ou Vue) — agora que closures, arrays e async estão firmes, fica muito mais fácil.
5. **TypeScript**.
6. Pratique sempre: 1 problema por dia no [Exercism](https://exercism.org/tracks/javascript) e 1 projeto pequeno por semana.
