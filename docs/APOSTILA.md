# Apostila EstudoJS — JavaScript em 15 dias

**Aplicativo:** <https://estudojs.vercel.app> · 15 dias · 130 exercícios · 80 questões de quiz

## Como usar esta apostila

Esta apostila acompanha o app. Para cada dia ela traz:

1. **Objetivos** — o que você vai conseguir fazer ao final do dia.
2. **Aula** — a explicação do conteúdo, com exemplos (no app, cada exemplo tem o botão ▶ Testar).
3. **Exercícios** — o enunciado e o **resultado esperado**: as verificações exatas que o app faz para considerar o exercício correto. Leia como "se eu chamar a função assim, ela deve devolver isto".
4. **Quiz** — perguntas de fixação.
5. **Desafio extra** — prática fora do app.

O **gabarito** (soluções e respostas dos quizzes) fica no final. Use-o só depois de tentar: tentar lembrar e errar faz parte de aprender. Existem várias soluções corretas para cada exercício; a do gabarito é apenas uma delas.

**Como ler o resultado esperado:** `soma(2, 3)` → `5` significa que, ao executar `soma(2, 3)`, o valor retornado deve ser `5`. Textos aparecem entre aspas simples (`'par'`), listas entre colchetes (`[ 1, 2 ]`) e objetos entre chaves (`{ a: 1 }`). Quando o resultado é do **console**, as linhas devem aparecer exatamente como mostradas.

## Sumário

- Dia 1 — Primeiros passos: console, variáveis e tipos
- Dia 2 — Decisões: condicionais e lógica
- Dia 3 — Repetição: laços for, while e for...of
- Dia 4 — Funções: o bloco de construção de tudo
- Dia 5 — Strings e números a fundo
- Dia 6 — Arrays: trabalhando com listas
- Dia 7 — Objetos, desestruturação e JSON
- Dia 8 — map, filter, reduce e companhia
- Dia 9 — Funções avançadas: callbacks e closures
- Dia 10 — Classes e Programação Orientada a Objetos
- Dia 11 — Erros, depuração, Map, Set e módulos
- Dia 12 — DOM e eventos: JavaScript na página
- Dia 13 — JavaScript assíncrono: Promises e async/await
- Dia 14 — Resolução de problemas e algoritmos
- Dia 15 — Projeto final: gerenciador de tarefas
- Gabarito


# Dia 1 — Primeiros passos: console, variáveis e tipos

*Escrever e executar seus primeiros programas, guardar valores em variáveis e fazer contas.* · Tempo estimado: ~3h

## Objetivos

- Usar console.log para mostrar valores
- Declarar variáveis com let e const (e saber quando usar cada uma)
- Reconhecer os tipos primitivos: string, number, boolean, null e undefined
- Fazer contas com operadores aritméticos e montar textos com template strings

## Aula

### 1.1 Como estudar com este app

Cada dia tem **teoria curta**, **exercícios com correção automática**, um **quiz** e um **diário**. A ordem recomendada é: leia a teoria testando os exemplos (botão *▶ Testar*), faça os exercícios, responda ao quiz e escreva no diário o que aprendeu.

Nos exercícios, escreva o código no editor e toque em **Executar** (ou `Ctrl`+`Enter`). Os testes dizem o que passou e o que falhou. Errar faz parte: cada erro é registrado para o app descobrir onde você precisa reforçar.

> 💡 **Dica:** Tente resolver sozinho por pelo menos 10 minutos antes de abrir uma dica. A dificuldade na medida certa é o que faz o cérebro aprender (isso se chama *dificuldade desejável*).

### 1.2 console.log: o seu megafone

`console.log()` mostra valores na área de saída. É a ferramenta nº 1 para entender o que o código está fazendo.

```js
console.log('Olá, mundo!');
console.log(2 + 3);
console.log('A soma é', 2 + 3);
```

Textos (strings) vão entre aspas simples `'...'`, duplas `"..."` ou crases `` `...` ``. Números não usam aspas.

### 1.3 Variáveis: let e const

Uma variável é uma “caixa com nome” que guarda um valor. Use `const` quando o valor **não** será trocado e `let` quando ele vai mudar.

```js
const nome = 'Ana';      // não muda
let pontos = 10;         // vai mudar
pontos = pontos + 5;     // agora vale 15
console.log(nome, pontos);
```

> ⚠️ **Atenção:** Evite `var`: é a forma antiga, com regras de escopo confusas. Em código moderno usamos apenas `let` e `const`.

Regras de nomes: comece com letra, `_` ou `$`; sem espaços; maiúsculas importam (`idade` ≠ `Idade`). Por convenção usamos *camelCase*: `precoFinal`, `nomeCompleto`.

### 1.4 Tipos primitivos

- `string`: textos — `'café'`
- `number`: números inteiros e decimais — `42`, `3.14` (decimal usa ponto!)
- `boolean`: `true` ou `false`
- `undefined`: variável declarada sem valor
- `null`: “vazio de propósito”

```js
let semValor;
console.log(typeof 'oi');      // string
console.log(typeof 10);        // number
console.log(typeof true);      // boolean
console.log(typeof semValor);  // undefined
console.log(typeof null);      // object (um bug histórico do JS!)
```

### 1.5 Operadores aritméticos

```js
console.log(7 + 2);   // 9  soma
console.log(7 - 2);   // 5  subtração
console.log(7 * 2);   // 14 multiplicação
console.log(7 / 2);   // 3.5 divisão
console.log(7 % 2);   // 1  resto da divisão
console.log(2 ** 3);  // 8  potência

let vidas = 3;
vidas += 2;  // o mesmo que vidas = vidas + 2
vidas++;     // soma 1
console.log(vidas); // 6
```

A precedência segue a matemática: `*`, `/` e `%` antes de `+` e `-`. Use parênteses para deixar claro.

> ⚠️ **Atenção:** Cuidado com `+` entre texto e número: `'5' + 3` resulta em `'53'` (concatenação), não 8.

### 1.6 Template strings

Com crases você coloca valores dentro do texto usando `${ }`. É a forma mais legível de montar mensagens.

```js
const produto = 'Café';
const preco = 12.5;
console.log(`O ${produto} custa R$ ${preco}`);
console.log(`O dobro custa R$ ${preco * 2}`);
```


## Exercícios

### Exercício 1.1 — Olá, console
*Variáveis, tipos e console · Fácil*

Use `console.log` para mostrar exatamente estas duas linhas, nesta ordem:

```
Olá, mundo!
Estou aprendendo JavaScript
```

**Código inicial:**

```js
// Escreva seu código abaixo
```

**✅ Resultado esperado** — o exercício está certo quando:

- **Saída correta** — o console deve mostrar exatamente:

```
Olá, mundo!
Estou aprendendo JavaScript
```

**💡 Dicas** (use só se travar):

1. Cada `console.log(...)` imprime uma linha.
2. O texto precisa estar entre aspas e ser idêntico, inclusive acentos e pontuação.

---

### Exercício 1.2 — let ou const?
*Variáveis, tipos e console · Fácil*

Crie uma **constante** `linguagem` com o valor `'JavaScript'` e uma variável `ano` (com `let`) valendo `1995`. Na linha seguinte, mude `ano` para `2026`.

**Código inicial:**

```js
// 1) declare linguagem com const

// 2) declare ano com let

// 3) mude o valor de ano
```

**✅ Resultado esperado** — o exercício está certo quando:

- `linguagem` → deve resultar em **`'JavaScript'`**
- `ano` → deve resultar em **`2026`**
- 📏 Regra de código: linguagem foi declarada com const
- 📏 Regra de código: ano começou com let valendo 1995

**💡 Dicas** (use só se travar):

1. `const nome = valor;` e `let nome = valor;`
2. Para trocar o valor depois, não repita o `let`: escreva só `ano = 2026;`

---

### Exercício 1.3 — Um de cada tipo
*Variáveis, tipos e console · Fácil*

Declare cinco variáveis:

- `texto`: qualquer string
- `numero`: qualquer number
- `ativo`: um boolean
- `vazio`: `null`
- `indefinido`: declarada sem valor

**Código inicial:**

```js
// declare as 5 variáveis
```

**✅ Resultado esperado** — o exercício está certo quando:

- `typeof texto` → deve resultar em **`'string'`** _(texto é string)_
- `typeof numero` → deve resultar em **`'number'`** _(numero é number)_
- `typeof ativo` → deve resultar em **`'boolean'`** _(ativo é boolean)_
- `vazio` → deve resultar em **`null`**
- `typeof indefinido` → deve resultar em **`'undefined'`** _(indefinido é undefined)_

**💡 Dicas** (use só se travar):

1. Para ter `undefined`, basta `let indefinido;` (sem `=`).
2. Use `typeof` com `console.log` para conferir o tipo de cada uma.

---

### Exercício 1.4 — Calculadora
*Operadores e expressões · Fácil*

Usando `a` e `b`, crie as constantes `soma`, `subtracao`, `multiplicacao`, `divisao`, `resto` e `potencia` (a elevado a b). Use as variáveis, não os números diretamente.

**Código inicial:**

```js
const a = 17;
const b = 5;

// crie as constantes aqui
```

**✅ Resultado esperado** — o exercício está certo quando:

- `soma` → deve resultar em **`22`**
- `subtracao` → deve resultar em **`12`**
- `multiplicacao` → deve resultar em **`85`**
- `divisao` → deve resultar em **`3.4`**
- `resto` → deve resultar em **`2`**
- `potencia` → deve resultar em **`1419857`**
- 📏 Regra de código: Usou as variáveis a e b (sem escrever o resultado direto)

**💡 Dicas** (use só se travar):

1. O resto da divisão é o operador `%`.
2. Potência: `**`.

---

### Exercício 1.5 — Apresentação com template string
*Variáveis, tipos e console · Fácil*

Crie a constante `frase` usando **template string** (crases e `${ }`) para que o valor seja exatamente:

```
Meu nome é Rafa e tenho 30 anos.
```

Depois mostre a frase no console.

**Código inicial:**

```js
const nome = 'Rafa';
const idade = 30;
```

**✅ Resultado esperado** — o exercício está certo quando:

- `frase` → deve resultar em **`'Meu nome é Rafa e tenho 30 anos.'`**
- **frase aparece no console** — o console deve mostrar exatamente:

```
Meu nome é Rafa e tenho 30 anos.
```
- 📏 Regra de código: Usou template string com ${nome} e ${idade}

**💡 Dicas** (use só se travar):

1. Crase é a tecla `` ` `` (no celular, use a barra de símbolos acima do teclado).
2. Dentro da crase: `${nome}` insere o valor da variável.

---

### Exercício 1.6 — Conversor de temperatura
*Operadores e expressões · Fácil*

Calcule `fahrenheit` a partir de `celsius` com a fórmula `F = C × 9 / 5 + 32` e mostre no console a mensagem:

```
25°C = 77°F
```

**Código inicial:**

```js
const celsius = 25;
```

**✅ Resultado esperado** — o exercício está certo quando:

- `fahrenheit` → deve resultar em **`77`**
- **mensagem no console** — o console deve mostrar exatamente:

```
25°C = 77°F
```

**💡 Dicas** (use só se travar):

1. Multiplicação é `*`.
2. Monte a mensagem com template string usando as duas variáveis.

---

### Exercício 1.7 — Troca de valores
*Variáveis, tipos e console · Médio*

Troque os valores de `a` e `b` **sem escrever os textos de novo**. Ao final, `a` deve valer `'segundo'` e `b` deve valer `'primeiro'`.

**Código inicial:**

```js
let a = 'primeiro';
let b = 'segundo';

// troque os valores aqui
```

**✅ Resultado esperado** — o exercício está certo quando:

- `a` → deve resultar em **`'segundo'`**
- `b` → deve resultar em **`'primeiro'`**
- 📏 Regra de código: Não reescreveu os textos (usou variáveis para trocar)

**💡 Dicas** (use só se travar):

1. Pense em dois copos: para trocar o conteúdo você precisa de um terceiro copo.
2. Crie `const temp = a;` antes de sobrescrever `a`.

---

### Exercício 1.8 — Preço com desconto
*Operadores e expressões · Médio*

Uma loja dá `desconto` por cento sobre o `preco`. Calcule `valorDesconto` e `precoFinal`.

Exemplo: preço 80 com 15% → desconto 12 → preço final 68.

**Código inicial:**

```js
const preco = 80;
const desconto = 15; // em %
```

**✅ Resultado esperado** — o exercício está certo quando:

- `valorDesconto` → deve resultar em **`12`**
- `precoFinal` → deve resultar em **`68`**

**💡 Dicas** (use só se travar):

1. 15% de 80 é `80 * 15 / 100`.

## Quiz

1. Qual a diferença entre `let` e `const`?
   a) Nenhuma
   b) `const` não permite reatribuir o valor; `let` permite
   c) `let` só guarda números
   d) `const` é mais lento

2. Quanto vale `10 % 3`?
   a) 3.33
   b) 1
   c) 3
   d) 0

3. Qual o resultado de `'5' + 3`?
   a) 8
   b) '53'
   c) Erro
   d) NaN

4. O que `typeof null` retorna?
   a) 'null'
   b) 'undefined'
   c) 'object'
   d) 'boolean'

5. Qual linha monta corretamente um texto com variável?
   a) `'Olá ${nome}'`
   b) `` `Olá ${nome}` ``
   c) `"Olá {nome}"`
   d) `` `Olá $nome` ``

## Desafio extra

Instale o Node.js no computador e rode `node` no terminal: digite expressões e veja os resultados. Repita os exemplos de hoje lá.


# Dia 2 — Decisões: condicionais e lógica

*Fazer o programa escolher caminhos com if/else, switch, ternário e operadores lógicos.* · Tempo estimado: ~3h

## Objetivos

- Comparar valores com ===, !==, >, <, >=, <=
- Combinar condições com && (E), || (OU) e ! (NÃO)
- Entender truthy e falsy
- Escolher entre if/else, switch e operador ternário

## Aula

### 2.1 Antes de começar: funções como “molde”

A partir de hoje os exercícios vêm dentro de uma **função**. Por enquanto, pense nela como uma caixa: recebe valores (parâmetros) e devolve uma resposta com `return`. No dia 4 veremos funções a fundo.

```js
function dobro(numero) {
  return numero * 2;
}
console.log(dobro(4));  // 8
console.log(dobro(10)); // 20
```

> 💡 **Dica:** Os testes chamam a sua função com vários valores diferentes. Por isso use o parâmetro, nunca um valor fixo.

### 2.2 Comparações

```js
console.log(5 === 5);    // true  (igual em valor E tipo)
console.log(5 === '5');  // false (number x string)
console.log(5 == '5');   // true  (== converte tipos: evite!)
console.log(3 !== 4);    // true  (diferente)
console.log(10 >= 10);   // true
```

> ⚠️ **Atenção:** Use sempre `===` e `!==`. O `==` faz conversões automáticas que geram bugs difíceis de achar.

### 2.3 if, else if, else

```js
const temperatura = 28;
if (temperatura > 30) {
  console.log('Muito quente');
} else if (temperatura > 20) {
  console.log('Agradável');
} else {
  console.log('Frio');
}
```

As condições são testadas de cima para baixo; a primeira verdadeira vence e as demais são ignoradas. Por isso a **ordem** importa.

### 2.4 Operadores lógicos

- `a && b` — verdadeiro se **os dois** forem verdadeiros
- `a || b` — verdadeiro se **pelo menos um** for verdadeiro
- `!a` — inverte: `!true` é `false`

```js
const idade = 20;
const temIngresso = true;
console.log(idade >= 18 && temIngresso); // true
console.log(idade < 12 || idade > 65);   // false
console.log(!temIngresso);               // false
```

### 2.5 Truthy e falsy

Em um `if`, qualquer valor vira verdadeiro ou falso. Os valores **falsy** são só estes: `false`, `0`, `''` (texto vazio), `null`, `undefined` e `NaN`. Todo o resto é **truthy** (inclusive `'0'`, `[]` e `{}`).

```js
const nome = '';
if (nome) {
  console.log('Olá, ' + nome);
} else {
  console.log('Nome não informado');
}
```

### 2.6 Ternário e switch

O ternário é um if/else curto que **produz um valor**: `condicao ? valorSeVerdadeiro : valorSeFalso`.

```js
const pontos = 75;
const resultado = pontos >= 60 ? 'aprovado' : 'reprovado';
console.log(resultado);

const fruta = 'uva';
switch (fruta) {
  case 'maçã':
    console.log('vermelha');
    break;
  case 'uva':
    console.log('roxa');
    break;
  default:
    console.log('não sei');
}
```

> ⚠️ **Atenção:** No `switch`, sem `break` (ou `return`) a execução “cai” para o próximo `case`.


## Exercícios

### Exercício 2.1 — Maior de idade
*Condicionais e lógica booleana · Fácil*

Complete `ehMaiorDeIdade(idade)` para retornar `true` se a idade for 18 ou mais, e `false` caso contrário.

**Código inicial:**

```js
function ehMaiorDeIdade(idade) {
  // seu código aqui
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `ehMaiorDeIdade(20)` → deve resultar em **`true`**
- `ehMaiorDeIdade(18)` → deve resultar em **`true`**
- `ehMaiorDeIdade(17)` → deve resultar em **`false`**

**💡 Dicas** (use só se travar):

1. Uma comparação já produz `true` ou `false`: você pode retornar ela diretamente.

---

### Exercício 2.2 — Par ou ímpar
*Condicionais e lógica booleana · Fácil*

Complete `parOuImpar(n)` para retornar `'par'` ou `'ímpar'`.

**Código inicial:**

```js
function parOuImpar(n) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `parOuImpar(4)` → deve resultar em **`'par'`**
- `parOuImpar(7)` → deve resultar em **`'ímpar'`**
- `parOuImpar(0)` → deve resultar em **`'par'`**
- `parOuImpar(-3)` → deve resultar em **`'ímpar'`**

**💡 Dicas** (use só se travar):

1. Um número é par quando o resto da divisão por 2 é zero: `n % 2 === 0`.
2. Lembre do acento em `'ímpar'`.

---

### Exercício 2.3 — Conceito da nota
*Condicionais e lógica booleana · Fácil*

Complete `conceito(nota)`:

- 9 ou mais → `'A'`
- 7 ou mais → `'B'`
- 5 ou mais → `'C'`
- abaixo de 5 → `'D'`

**Código inicial:**

```js
function conceito(nota) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `conceito(9.5)` → deve resultar em **`'A'`**
- `conceito(9)` → deve resultar em **`'A'`**
- `conceito(7)` → deve resultar em **`'B'`**
- `conceito(6.9)` → deve resultar em **`'C'`**
- `conceito(2)` → deve resultar em **`'D'`**

**💡 Dicas** (use só se travar):

1. Comece pela faixa mais alta. Assim cada `else if` só precisa testar o limite de baixo.

---

### Exercício 2.4 — Pode entrar no show?
*Condicionais e lógica booleana · Médio*

Complete `podeEntrar(idade, temIngresso, ehVip)`. Regras:

- VIPs sempre entram.
- Os demais entram se tiverem 18 anos ou mais **e** ingresso.

**Código inicial:**

```js
function podeEntrar(idade, temIngresso, ehVip) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `podeEntrar(16, false, true)` → deve resultar em **`true`** _(VIP de 16 sem ingresso entra)_
- `podeEntrar(20, true, false)` → deve resultar em **`true`** _(20 anos com ingresso entra)_
- `podeEntrar(20, false, false)` → deve resultar em **`false`** _(20 anos sem ingresso não entra)_
- `podeEntrar(17, true, false)` → deve resultar em **`false`** _(17 anos com ingresso não entra)_

**💡 Dicas** (use só se travar):

1. Dá para resolver numa linha combinando `||` e `&&`.
2. Use parênteses para agrupar a regra dos não-VIPs.

---

### Exercício 2.5 — Dia da semana com switch
*Condicionais e lógica booleana · Fácil*

Usando `switch`, complete `diaDaSemana(n)`: 1 → `'domingo'`, 2 → `'segunda'`, 3 → `'terça'`, 4 → `'quarta'`, 5 → `'quinta'`, 6 → `'sexta'`, 7 → `'sábado'`. Qualquer outro valor → `'inválido'`.

**Código inicial:**

```js
function diaDaSemana(n) {
  switch (n) {
    case 1:
      return 'domingo';
    // continue...
  }
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `diaDaSemana(1)` → deve resultar em **`'domingo'`**
- `diaDaSemana(3)` → deve resultar em **`'terça'`**
- `diaDaSemana(7)` → deve resultar em **`'sábado'`**
- `diaDaSemana(9)` → deve resultar em **`'inválido'`**
- 📏 Regra de código: Usou switch

**💡 Dicas** (use só se travar):

1. Como cada `case` usa `return`, não precisa de `break`.
2. Use `default:` para o “qualquer outro valor”.

---

### Exercício 2.6 — Status do pedido (ternário)
*Condicionais e lógica booleana · Fácil*

Complete `statusPedido(pago)` usando o **operador ternário**: se `pago` for verdadeiro retorne `'Enviar'`, senão `'Aguardando pagamento'`.

**Código inicial:**

```js
function statusPedido(pago) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `statusPedido(true)` → deve resultar em **`'Enviar'`**
- `statusPedido(false)` → deve resultar em **`'Aguardando pagamento'`**
- 📏 Regra de código: Usou o operador ternário
- 📏 Regra de código: Não usou if

**💡 Dicas** (use só se travar):

1. Formato: `condicao ? valorA : valorB`.

---

### Exercício 2.7 — Detector de falsy
*Condicionais e lógica booleana · Médio*

Complete `ehFalsy(valor)` para retornar `true` se o valor for falsy e `false` se for truthy. Dica: existe uma solução de uma linha.

**Código inicial:**

```js
function ehFalsy(valor) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `ehFalsy(0)` → deve resultar em **`true`**
- `ehFalsy('')` → deve resultar em **`true`**
- `ehFalsy(null)` → deve resultar em **`true`**
- `ehFalsy(NaN)` → deve resultar em **`true`**
- `ehFalsy('0')` → deve resultar em **`false`**
- `ehFalsy([])` → deve resultar em **`false`**

**💡 Dicas** (use só se travar):

1. O operador `!` converte para boolean e inverte.
2. Pense: `!0` é `true`; `!'oi'` é `false`.

---

### Exercício 2.8 — Maior de três (sem Math.max)
*Condicionais e lógica booleana · Médio*

Complete `maiorDeTres(a, b, c)` para retornar o maior dos três números, **sem usar** `Math.max`.

**Código inicial:**

```js
function maiorDeTres(a, b, c) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `maiorDeTres(1, 2, 3)` → deve resultar em **`3`**
- `maiorDeTres(9, 2, 3)` → deve resultar em **`9`**
- `maiorDeTres(1, 8, 3)` → deve resultar em **`8`**
- `maiorDeTres(-5, -2, -9)` → deve resultar em **`-2`**
- `maiorDeTres(4, 4, 4)` → deve resultar em **`4`**
- 📏 Regra de código: Não usou Math.max

**💡 Dicas** (use só se travar):

1. Comece supondo que `a` é o maior, guarde numa variável e compare com os outros.

---

### Exercício 2.9 — Calculadora de frete
*Condicionais e lógica booleana · Médio*

Complete `calcularFrete(peso, regiao)`:

- Taxa base: `'sul'` = 10, `'norte'` = 20, qualquer outra região = 15.
- Para cada kg **acima de 5**, some 2.
Ex.: `calcularFrete(8, 'sul')` → 10 + 3×2 = 16.

**Código inicial:**

```js
function calcularFrete(peso, regiao) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `calcularFrete(8, 'sul')` → deve resultar em **`16`**
- `calcularFrete(3, 'norte')` → deve resultar em **`20`**
- `calcularFrete(5, 'sudeste')` → deve resultar em **`15`**
- `calcularFrete(10, 'norte')` → deve resultar em **`30`**

**💡 Dicas** (use só se travar):

1. Resolva em duas partes: primeiro a taxa base, depois o adicional por peso.
2. O adicional só existe se `peso > 5`.

## Quiz

1. Qual o resultado de `5 === '5'`?
   a) true
   b) false
   c) Erro
   d) undefined

2. Qual destes valores é **truthy**?
   a) `0`
   b) `''`
   c) `'0'`
   d) `null`

3. `true || false && false` resulta em:
   a) true
   b) false

4. O que acontece num `switch` sem `break`?
   a) Erro de sintaxe
   b) A execução continua nos próximos cases
   c) Nada
   d) Volta para o início

5. Qual expressão retorna `'sim'` quando `x` é maior que 10?
   a) `x > 10 : 'sim' ? 'não'`
   b) `x > 10 ? 'sim' : 'não'`
   c) `if x > 10 'sim'`
   d) `x > 10 && 'não' || 'sim'`

## Desafio extra

Escreva no papel (sim, papel!) a tabela-verdade de `&&` e `||` com true/false. Depois confira no playground.


# Dia 3 — Repetição: laços for, while e for...of

*Repetir ações sem copiar código, acumular resultados e controlar o fluxo com break/continue.* · Tempo estimado: ~3h

## Objetivos

- Escrever laços for com início, condição e incremento
- Usar while quando não se sabe quantas repetições serão necessárias
- Percorrer textos com for...of
- Usar acumuladores (soma, contagem, texto) e break/continue

## Aula

### 3.1 O laço for

O `for` tem três partes: **início**; **condição** para continuar; **passo** executado ao fim de cada volta.

```js
for (let i = 1; i <= 5; i++) {
  console.log('Volta número', i);
}
```

> 💡 **Dica:** Leia em voz alta: “começando com i = 1, enquanto i ≤ 5, execute o bloco e depois some 1 em i”.

### 3.2 Acumuladores

Um padrão que você usará o tempo todo: criar uma variável **antes** do laço e atualizá-la **dentro** dele.

```js
let soma = 0;
for (let i = 1; i <= 4; i++) {
  soma += i;          // 1, 3, 6, 10
}
console.log(soma);    // 10

let texto = '';
for (let i = 0; i < 3; i++) {
  texto += '*';
}
console.log(texto);   // ***
```

### 3.3 while

Use `while` quando a repetição depende de uma condição e não de uma contagem fixa.

```js
let saldo = 100;
let meses = 0;
while (saldo < 200) {
  saldo = saldo * 1.1; // rende 10% ao mês
  meses++;
}
console.log(`Dobrou em ${meses} meses`);
```

> ⚠️ **Atenção:** Se a condição nunca ficar falsa, o laço é infinito. O app interrompe o código após alguns segundos, mas sempre garanta que algo muda dentro do laço.

### 3.4 for...of: percorrendo textos (e listas)

```js
const palavra = 'casa';
for (const letra of palavra) {
  console.log(letra);
}
```

Também dá para usar índices: `palavra[0]` é a primeira letra e `palavra.length` é o tamanho.

### 3.5 break e continue

```js
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue; // pula os pares
  if (i > 7) break;          // para o laço de vez
  console.log(i);            // 1 3 5 7
}
```

### 3.6 Laços aninhados

```js
for (let linha = 1; linha <= 3; linha++) {
  let desenho = '';
  for (let col = 1; col <= linha; col++) {
    desenho += '#';
  }
  console.log(desenho);
}
```

> 💡 **Dica:** Para entender um laço, simule no papel uma tabela com o valor de cada variável a cada volta (“teste de mesa”). É a habilidade mais valiosa para iniciantes.


## Exercícios

### Exercício 3.1 — Contagem de 1 a 5
*Laços de repetição · Fácil*

Use um laço `for` para mostrar no console os números de 1 a 5, um por linha.

**Código inicial:**

```js
// use um for
```

**✅ Resultado esperado** — o exercício está certo quando:

- **Mostra 1, 2, 3, 4, 5** — o console deve mostrar exatamente:

```
1
2
3
4
5
```
- 📏 Regra de código: Usou um laço for

**💡 Dicas** (use só se travar):

1. `for (let i = 1; i <= 5; i++) { ... }`

---

### Exercício 3.2 — Somar de 1 até n
*Laços de repetição · Fácil*

Complete `somaAte(n)` para retornar 1 + 2 + ... + n usando um laço.

**Código inicial:**

```js
function somaAte(n) {
  let soma = 0;
  // seu laço aqui
  return soma;
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `somaAte(4)` → deve resultar em **`10`**
- `somaAte(100)` → deve resultar em **`5050`**
- `somaAte(0)` → deve resultar em **`0`**

**💡 Dicas** (use só se travar):

1. Some `i` ao acumulador a cada volta.

---

### Exercício 3.3 — FizzBuzz
*Laços de repetição · Médio*

O clássico de entrevistas! Mostre os números de 1 a 15, um por linha, mas:

- múltiplos de 3 → `Fizz`
- múltiplos de 5 → `Buzz`
- múltiplos de 3 e 5 → `FizzBuzz`

**Código inicial:**

```js
for (let i = 1; i <= 15; i++) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **Saída de 1 a 15** — o console deve mostrar exatamente:

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

**💡 Dicas** (use só se travar):

1. Teste o caso “3 e 5” **primeiro**. Por quê? Se testar só o 3 antes, o 15 nunca chegaria no FizzBuzz.
2. Múltiplo de 3 e 5 é o mesmo que múltiplo de 15.

---

### Exercício 3.4 — Contar vogais
*Laços de repetição · Médio*

Complete `contarVogais(texto)` para retornar quantas vogais (a, e, i, o, u, sem acento) existem no texto, ignorando maiúsculas/minúsculas.

**Código inicial:**

```js
function contarVogais(texto) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `contarVogais('banana')` → deve resultar em **`3`**
- `contarVogais('JavaScript')` → deve resultar em **`3`**
- `contarVogais('xyz')` → deve resultar em **`0`**
- `contarVogais('AEIOU')` → deve resultar em **`5`**

**💡 Dicas** (use só se travar):

1. Percorra com `for (const letra of texto)`.
2. `texto.toLowerCase()` deixa tudo minúsculo.
3. Truque: `'aeiou'.includes(letra)` diz se a letra é vogal.

---

### Exercício 3.5 — Fatorial
*Laços de repetição · Fácil*

Complete `fatorial(n)`. O fatorial de 5 é 5 × 4 × 3 × 2 × 1 = 120. O fatorial de 0 é 1.

**Código inicial:**

```js
function fatorial(n) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `fatorial(5)` → deve resultar em **`120`**
- `fatorial(0)` → deve resultar em **`1`**
- `fatorial(1)` → deve resultar em **`1`**
- `fatorial(10)` → deve resultar em **`3628800`**

**💡 Dicas** (use só se travar):

1. Para multiplicações, o acumulador começa em **1** (não em 0).

---

### Exercício 3.6 — É primo?
*Laços de repetição · Médio*

Complete `ehPrimo(n)`: um número primo é maior que 1 e só é divisível por 1 e por ele mesmo. Retorne `true` ou `false`.

**Código inicial:**

```js
function ehPrimo(n) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `ehPrimo(2)` → deve resultar em **`true`**
- `ehPrimo(17)` → deve resultar em **`true`**
- `ehPrimo(1)` → deve resultar em **`false`**
- `ehPrimo(21)` → deve resultar em **`false`**
- `ehPrimo(97)` → deve resultar em **`true`**

**💡 Dicas** (use só se travar):

1. Teste divisores de 2 até n - 1. Se algum dividir (resto 0), não é primo.
2. Você pode retornar `false` no meio do laço: o `return` encerra a função.
3. Otimização opcional: basta testar até a raiz quadrada (`i * i <= n`).

---

### Exercício 3.7 — Inverter texto (sem reverse)
*Laços de repetição · Médio*

Complete `inverterTexto(texto)` para retornar o texto de trás para frente usando um laço. Não use `reverse`.

**Código inicial:**

```js
function inverterTexto(texto) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `inverterTexto('abc')` → deve resultar em **`'cba'`**
- `inverterTexto('roma')` → deve resultar em **`'amor'`**
- `inverterTexto('')` → deve resultar em **`''`**
- 📏 Regra de código: Não usou reverse

**💡 Dicas** (use só se travar):

1. O último índice é `texto.length - 1`.
2. Um laço pode contar para trás: `i--`.
3. Alternativa: `for (const l of texto) invertido = l + invertido;`

---

### Exercício 3.8 — Escada de #
*Laços de repetição · Médio*

Complete `escada(n)` para retornar um texto com n degraus separados por quebra de linha (`'\n'`). Para n = 3:

```
#
##
###
```

Ou seja, o retorno é `'#\n##\n###'` (sem quebra de linha no final).

**Código inicial:**

```js
function escada(n) {
  
}

console.log(escada(4));
```

**✅ Resultado esperado** — o exercício está certo quando:

- `escada(1)` → deve resultar em **`'#'`**
- `escada(3)` → deve resultar em **`'#
##
###'`**
- `escada(5).split('\n').length` → deve resultar em **`5`**

**💡 Dicas** (use só se travar):

1. `'#'.repeat(3)` gera `'###'` — ou use um laço interno.
2. Só adicione `'\n'` se não for o último degrau.

---

### Exercício 3.9 — Menor divisor (break)
*Laços de repetição · Médio*

Complete `menorDivisor(n)` para retornar o menor divisor de n maior que 1. Use um laço que **pare** assim que encontrar (com `break` ou `return`).

Ex.: `menorDivisor(15)` → 3; `menorDivisor(13)` → 13.

**Código inicial:**

```js
function menorDivisor(n) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `menorDivisor(15)` → deve resultar em **`3`**
- `menorDivisor(13)` → deve resultar em **`13`**
- `menorDivisor(100)` → deve resultar em **`2`**
- `menorDivisor(49)` → deve resultar em **`7`**

**💡 Dicas** (use só se travar):

1. Comece em 2 e suba até n.
2. Todo número é divisível por ele mesmo, então o laço sempre encontra algo.

## Quiz

1. Quantas vezes `for (let i = 0; i < 5; i++)` executa o bloco?
   a) 4
   b) 5
   c) 6
   d) Infinitas

2. O que `continue` faz?
   a) Encerra o laço
   b) Pula para a próxima volta
   c) Reinicia o laço do zero
   d) Nada

3. Para calcular um produto (multiplicação acumulada), o acumulador deve começar em:
   a) 0
   b) 1
   c) null
   d) ''

4. Qual laço é mais indicado quando não sabemos quantas repetições teremos?
   a) for
   b) while
   c) switch
   d) if

5. Qual é o índice do último caractere de `texto`?
   a) `texto.length`
   b) `texto.length - 1`
   c) `-1`
   d) `texto.last`

## Desafio extra

Faça o “teste de mesa” do FizzBuzz no papel para i de 1 a 6, anotando qual if é verdadeiro a cada volta.


# Dia 4 — Funções: o bloco de construção de tudo

*Criar funções reutilizáveis, entender parâmetros, retorno, escopo e recursão.* · Tempo estimado: ~3.5h

## Objetivos

- Declarar funções de três formas: declaração, expressão e arrow function
- Diferenciar return de console.log
- Usar parâmetros com valor padrão
- Entender escopo de bloco e de função
- Compor funções e escrever uma recursão simples

## Aula

### 4.1 Três formas de criar funções

```js
// 1. Declaração
function somar(a, b) {
  return a + b;
}

// 2. Expressão de função
const subtrair = function (a, b) {
  return a - b;
};

// 3. Arrow function (a mais usada hoje)
const multiplicar = (a, b) => a * b;   // retorno implícito
const quadrado = n => n * n;           // 1 parâmetro: parênteses opcionais

console.log(somar(2, 3), subtrair(5, 1), multiplicar(3, 4), quadrado(5));
```

> 💡 **Dica:** Na arrow function sem chaves, o valor após `=>` é retornado automaticamente. Com chaves `{ }`, você precisa escrever `return`.

### 4.2 return x console.log

Este é o erro nº 1 de iniciantes. `console.log` só **mostra**; `return` **devolve** o valor para quem chamou, que pode usá-lo em outras contas.

```js
function dobroMostra(n) { console.log(n * 2); }
function dobroRetorna(n) { return n * 2; }

const a = dobroMostra(5);   // mostra 10, mas a = undefined
const b = dobroRetorna(5);  // não mostra nada, b = 10
console.log(a, b);
```

O `return` também **encerra** a função imediatamente: nada depois dele é executado.

### 4.3 Parâmetros padrão

```js
function saudar(nome = 'visitante') {
  return `Olá, ${nome}!`;
}
console.log(saudar('Bia')); // Olá, Bia!
console.log(saudar());      // Olá, visitante!
```

### 4.4 Escopo

Variáveis criadas com `let`/`const` só existem dentro do bloco `{ }` onde foram declaradas. Funções enxergam variáveis de fora, mas o de fora não enxerga o que está dentro.

```js
const global = 'sou global';
function teste() {
  const local = 'sou local';
  console.log(global); // funciona
  if (true) {
    const doBloco = 'só existo no if';
  }
  // console.log(doBloco); // ReferenceError!
}
teste();
// console.log(local); // ReferenceError!
```

### 4.5 Funções chamando funções

Programas grandes são feitos de funções pequenas, cada uma com **uma responsabilidade**.

```js
const precoComImposto = (preco) => preco * 1.1;
const aplicarCupom = (preco, cupom) => cupom ? preco - 10 : preco;
const precoFinal = (preco, cupom) => aplicarCupom(precoComImposto(preco), cupom);
console.log(precoFinal(100, true)); // 100
```

### 4.6 Recursão

Uma função recursiva chama a si mesma com um problema menor, até chegar a um **caso base** que para as chamadas.

```js
function contagemRegressiva(n) {
  if (n === 0) {          // caso base
    console.log('Fogo!');
    return;
  }
  console.log(n);
  contagemRegressiva(n - 1); // passo recursivo
}
contagemRegressiva(3);
```


## Exercícios

### Exercício 4.1 — Primeira arrow function
*Funções · Fácil*

Crie a constante `triplo` com uma **arrow function** que recebe um número e retorna o triplo dele.

**Código inicial:**

```js
// const triplo = ...
```

**✅ Resultado esperado** — o exercício está certo quando:

- `triplo(3)` → deve resultar em **`9`**
- `triplo(-2)` → deve resultar em **`-6`**
- 📏 Regra de código: Usou arrow function

**💡 Dicas** (use só se travar):

1. Formato: `const nome = (param) => expressão;`

---

### Exercício 4.2 — Saudação com valor padrão
*Funções · Fácil*

Crie a função `saudacao(nome, periodo)` que retorna `'Bom dia, Ana!'` para `saudacao('Ana', 'dia')`. Se o período não for informado, use `'dia'`; se o nome não for informado, use `'visitante'`.

**Código inicial:**

```js
function saudacao(nome, periodo) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `saudacao('Ana', 'dia')` → deve resultar em **`'Bom dia, Ana!'`**
- `saudacao('Leo', 'tarde')` → deve resultar em **`'Bom tarde, Leo!'`**
- `saudacao('Bia')` → deve resultar em **`'Bom dia, Bia!'`**
- `saudacao()` → deve resultar em **`'Bom dia, visitante!'`**

**💡 Dicas** (use só se travar):

1. Valores padrão: `function f(a = 1, b = 2)`.
2. Monte o texto com template string.

---

### Exercício 4.3 — Retorne, não imprima
*Funções · Fácil*

A função abaixo **mostra** a área, mas quem chama precisa **receber** o valor para fazer outras contas. Corrija `areaRetangulo` para retornar a área. O código já usa o retorno para calcular `areaTotal`.

**Código inicial:**

```js
function areaRetangulo(largura, altura) {
  console.log(largura * altura);
}

const areaTotal = areaRetangulo(3, 4) + areaRetangulo(2, 5);
console.log('Área total:', areaTotal);
```

**✅ Resultado esperado** — o exercício está certo quando:

- `areaRetangulo(3, 4)` → deve resultar em **`12`**
- `areaTotal` → deve resultar em **`22`**

**💡 Dicas** (use só se travar):

1. Rode o código original e observe: `undefined + undefined` dá `NaN`.

---

### Exercício 4.4 — IMC em duas funções
*Funções · Médio*

Crie duas funções:

- `calcularIMC(peso, altura)`: retorna peso ÷ altura², arredondado para 1 casa decimal (`Math.round(x * 10) / 10`).
- `classificarIMC(imc)`: abaixo de 18.5 → `'abaixo'`; abaixo de 25 → `'normal'`; abaixo de 30 → `'sobrepeso'`; senão → `'obesidade'`.
Por fim, `diagnostico(peso, altura)` deve usar as duas e retornar, por ex., `'IMC 22.9: normal'`.

**Código inicial:**

```js
function calcularIMC(peso, altura) {
  
}

function classificarIMC(imc) {
  
}

function diagnostico(peso, altura) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `calcularIMC(70, 1.75)` → deve resultar em **`22.9`**
- `classificarIMC(17)` → deve resultar em **`'abaixo'`**
- `classificarIMC(27.5)` → deve resultar em **`'sobrepeso'`**
- `classificarIMC(31)` → deve resultar em **`'obesidade'`**
- `diagnostico(70, 1.75)` → deve resultar em **`'IMC 22.9: normal'`**

**💡 Dicas** (use só se travar):

1. Altura ao quadrado: `altura ** 2`.
2. Em `diagnostico`, guarde o IMC numa constante e passe-o para `classificarIMC`.

---

### Exercício 4.5 — Caça ao bug: escopo
*Funções · Médio*

Esta função deveria retornar 0.2 para clientes VIP e 0.05 para os demais, mas dá erro. Execute, leia a mensagem de erro e corrija.

**Código inicial:**

```js
function descontoCliente(ehVip) {
  if (ehVip) {
    let desconto = 0.2;
  } else {
    let desconto = 0.05;
  }
  return desconto;
}

console.log(descontoCliente(true));
```

**✅ Resultado esperado** — o exercício está certo quando:

- `descontoCliente(true)` → deve resultar em **`0.2`**
- `descontoCliente(false)` → deve resultar em **`0.05`**

**💡 Dicas** (use só se travar):

1. Uma variável `let` declarada dentro do `if { }` deixa de existir quando o bloco termina.
2. Declare `let desconto;` antes do `if` e só atribua dentro dos blocos.

---

### Exercício 4.6 — Contar uma letra
*Funções · Fácil*

Crie `contarLetra(texto, letra)` que retorna quantas vezes `letra` aparece em `texto` (diferenciando maiúsculas).

**✅ Resultado esperado** — o exercício está certo quando:

- `contarLetra('banana', 'a')` → deve resultar em **`3`**
- `contarLetra('Arara', 'a')` → deve resultar em **`2`**
- `contarLetra('teste', 'x')` → deve resultar em **`0`**

**💡 Dicas** (use só se travar):

1. Você já fez algo parecido com vogais no dia 3.

---

### Exercício 4.7 — Validador de senha
*Funções · Médio*

Crie `senhaForte(senha)` que retorna `true` se a senha tiver **pelo menos 8 caracteres**, **pelo menos um número** e **pelo menos uma letra maiúscula**.

**Código inicial:**

```js
function senhaForte(senha) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `senhaForte('Abcdefg1')` → deve resultar em **`true`** _("Abcdefg1" → true)_
- `senhaForte('abcdefg1')` → deve resultar em **`false`** _("abcdefg1" (sem maiúscula) → false)_
- `senhaForte('Abcdefgh')` → deve resultar em **`false`** _("Abcdefgh" (sem número) → false)_
- `senhaForte('Ab1')` → deve resultar em **`false`** _("Ab1" (curta) → false)_

**💡 Dicas** (use só se travar):

1. Use variáveis “bandeira” (`let temNumero = false`) e mude para true quando encontrar.
2. Um caractere é dígito se `c >= '0' && c <= '9'`.
3. É maiúscula se `c >= 'A' && c <= 'Z'` (ou `c !== c.toLowerCase()`).

---

### Exercício 4.8 — Potência recursiva
*Funções · Desafio*

Crie `potencia(base, expoente)` de forma **recursiva** (a função chama a si mesma), sem usar `**` nem `Math.pow`. Considere expoente inteiro ≥ 0.

Ideia: base^n = base × base^n-1, e base^0 = 1.

**Código inicial:**

```js
function potencia(base, expoente) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `potencia(2, 10)` → deve resultar em **`1024`**
- `potencia(5, 0)` → deve resultar em **`1`**
- `potencia(3, 4)` → deve resultar em **`81`**
- 📏 Regra de código: Não usou ** nem Math.pow
- 📏 Regra de código: A função chama a si mesma (recursão)

**💡 Dicas** (use só se travar):

1. Caso base: expoente 0 → retorna 1.
2. Passo recursivo: `return base * potencia(base, expoente - 1);`

## Quiz

1. O que `const f = (x) => x + 1;` retorna para `f(2)`?
   a) undefined
   b) 3
   c) '21'
   d) Erro

2. Uma função sem `return` retorna:
   a) 0
   b) null
   c) undefined
   d) false

3. O que acontece depois de um `return` dentro da função?
   a) O código continua
   b) A função termina imediatamente
   c) O valor é impresso
   d) A função recomeça

4. Em `const g = (a) => { a * 2 };`, quanto vale `g(3)`?
   a) 6
   b) undefined
   c) 'a*2'
   d) Erro

5. O que é indispensável em toda função recursiva?
   a) Um laço for
   b) Um caso base
   c) Parâmetro padrão
   d) Uma arrow function

## Desafio extra

Reescreva 3 exercícios dos dias anteriores como arrow functions. Qual forma você achou mais legível?


# Dia 5 — Strings e números a fundo

*Manipular textos com os principais métodos de string e trabalhar bem com números, conversões e Math.* · Tempo estimado: ~3h

## Objetivos

- Usar os métodos de string mais comuns: toUpperCase, trim, includes, slice, split, replace, padStart...
- Converter entre texto e número com segurança (Number, parseInt, parseFloat)
- Arredondar e formatar números (Math.round, toFixed)
- Gerar números aleatórios em um intervalo

## Aula

### 5.1 Strings são imutáveis

Métodos de string **não alteram** o texto original: eles retornam um **novo** texto. Por isso, guarde o resultado.

```js
const nome = 'ana';
nome.toUpperCase();            // não muda nome
const maiusculo = nome.toUpperCase();
console.log(nome, maiusculo);  // ana ANA
```

### 5.2 Métodos essenciais

```js
const frase = '  Aprender JavaScript é divertido  ';
console.log(frase.trim());                 // remove espaços das pontas
console.log(frase.length);                 // tamanho
console.log(frase.includes('Java'));       // true
console.log(frase.trim().startsWith('Ap')); // true
console.log(frase.indexOf('Java'));        // posição (ou -1)
console.log('banana'.replaceAll('a', 'o')); // bonono
console.log('JavaScript'.slice(0, 4));     // Java  (início, fim exclusivo)
console.log('JavaScript'.slice(-6));       // Script (negativo conta do fim)
console.log('a,b,c'.split(','));           // [ 'a', 'b', 'c' ]
console.log(['a', 'b'].join(' - '));       // a - b
console.log('7'.padStart(3, '0'));         // 007
console.log('ha'.repeat(3));               // hahaha
console.log('Olá'[0], 'Olá'.at(-1));       // O á
```

### 5.3 Convertendo texto ↔ número

```js
console.log(Number('42'));        // 42
console.log(Number('42abc'));     // NaN (Not a Number)
console.log(parseInt('42px'));    // 42 (lê até onde der)
console.log(parseFloat('3.5kg')); // 3.5
console.log(Number('3,5'));       // NaN — vírgula não é decimal em JS!
console.log(String(10) + 1);      // '101'
console.log(Number.isNaN(Number('x'))); // true
```

> ⚠️ **Atenção:** Dados digitados pelo usuário (formulários) chegam sempre como **texto**. Converta antes de fazer contas.

### 5.4 Math e arredondamento

```js
console.log(Math.round(2.5), Math.floor(2.9), Math.ceil(2.1)); // 3 2 3
console.log(Math.max(4, 9, 1), Math.min(4, 9, 1));             // 9 1
console.log(Math.abs(-7), Math.sqrt(16));                      // 7 4
console.log((19.987).toFixed(2));  // '19.99' (retorna TEXTO)
console.log(0.1 + 0.2);            // 0.30000000000000004 😱
```

O último resultado acontece em quase todas as linguagens: decimais binários são aproximações. Para dinheiro, arredonde na hora de mostrar ou trabalhe em centavos (inteiros).

### 5.5 Números aleatórios

```js
// Math.random() → decimal entre 0 (incluso) e 1 (excluso)
const dado = Math.floor(Math.random() * 6) + 1; // 1 a 6
console.log(dado);
```

> 💡 **Dica:** Fórmula geral para inteiros de `min` a `max` (inclusive): `Math.floor(Math.random() * (max - min + 1)) + min`.


## Exercícios

### Exercício 5.1 — Capitalizar palavra
*Strings (textos) · Fácil*

Crie `capitalizar(palavra)`: primeira letra maiúscula e o resto minúsculo. `capitalizar('jAVASCRIPT')` → `'Javascript'`.

**Código inicial:**

```js
function capitalizar(palavra) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `capitalizar('jAVASCRIPT')` → deve resultar em **`'Javascript'`**
- `capitalizar('ana')` → deve resultar em **`'Ana'`**
- `capitalizar('a')` → deve resultar em **`'A'`**

**💡 Dicas** (use só se travar):

1. `palavra[0]` ou `palavra.charAt(0)` pega a primeira letra.
2. `palavra.slice(1)` pega do segundo caractere até o fim.

---

### Exercício 5.2 — Formatar nome completo
*Strings (textos) · Médio*

Crie `formatarNome(nome)` que remove espaços extras nas pontas e capitaliza cada palavra. `formatarNome('  maria  da silva ')` → `'Maria Da Silva'`. Considere que entre as palavras pode haver mais de um espaço.

**Código inicial:**

```js
function formatarNome(nome) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `formatarNome('  maria  da silva ')` → deve resultar em **`'Maria Da Silva'`** _("  maria  da silva ")_
- `formatarNome('JOÃO pedro')` → deve resultar em **`'João Pedro'`** _("JOÃO pedro")_
- `formatarNome('ana')` → deve resultar em **`'Ana'`** _("ana")_

**💡 Dicas** (use só se travar):

1. `trim()` e depois `split(' ')` para separar as palavras.
2. Espaços duplos geram itens vazios `''` no split: pule-os com `continue`.
3. Junte com `join(' ')`.

---

### Exercício 5.3 — Palíndromo
*Strings (textos) · Médio*

Crie `ehPalindromo(texto)`: retorna `true` se o texto for igual lido de trás para frente, ignorando espaços e maiúsculas. Ex.: `'Socorram me subi no onibus em Marrocos'` → true.

**Código inicial:**

```js
function ehPalindromo(texto) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `ehPalindromo('arara')` → deve resultar em **`true`** _("arara" → true)_
- `ehPalindromo('Socorram me subi no onibus em Marrocos')` → deve resultar em **`true`** _(frase longa → true)_
- `ehPalindromo('javascript')` → deve resultar em **`false`** _("javascript" → false)_

**💡 Dicas** (use só se travar):

1. Primeiro “limpe” o texto: minúsculas e sem espaços (`replaceAll(' ', '')`).
2. Para inverter: `texto.split('').reverse().join('')`.

---

### Exercício 5.4 — Mascarar cartão
*Strings (textos) · Fácil*

Crie `mascararCartao(numero)` que mantém só os 4 últimos dígitos e troca os demais por `*`, mantendo o tamanho. `'1234567812345678'` → `'************5678'`.

**Código inicial:**

```js
function mascararCartao(numero) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `mascararCartao('1234567812345678')` → deve resultar em **`'************5678'`** _(16 dígitos)_
- `mascararCartao('98765432')` → deve resultar em **`'****5432'`** _(8 dígitos)_

**💡 Dicas** (use só se travar):

1. `slice(-4)` pega os 4 últimos.
2. `padStart(tamanho, '*')` completa à esquerda.

---

### Exercício 5.5 — Contar palavras
*Strings (textos) · Médio*

Crie `contarPalavras(frase)`. Atenção aos casos: espaços nas pontas, espaços duplos e frase vazia (retorna 0).

**Código inicial:**

```js
function contarPalavras(frase) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `contarPalavras('Olá mundo')` → deve resultar em **`2`** _("Olá mundo" → 2)_
- `contarPalavras('  muitos   espaços  aqui ')` → deve resultar em **`3`** _("  muitos   espaços  aqui " → 3)_
- `contarPalavras('')` → deve resultar em **`0`** _("" → 0)_
- `contarPalavras('   ')` → deve resultar em **`0`** _("   " → 0)_

**💡 Dicas** (use só se travar):

1. `split(/\s+/)` separa por “um ou mais espaços” (isso é uma expressão regular).
2. Trate a frase vazia antes: `''.split(' ')` retorna `['']`, que tem tamanho 1!

---

### Exercício 5.6 — Formatar moeda
*Números e Math · Fácil*

Crie `formatarMoeda(valor)` que retorna o valor no formato brasileiro simples: `formatarMoeda(10.5)` → `'R$ 10,50'`.

**Código inicial:**

```js
function formatarMoeda(valor) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `formatarMoeda(10.5)` → deve resultar em **`'R$ 10,50'`** _(10.5 → "R$ 10,50")_
- `formatarMoeda(3)` → deve resultar em **`'R$ 3,00'`** _(3 → "R$ 3,00")_
- `formatarMoeda(19.999)` → deve resultar em **`'R$ 20,00'`** _(19.999 → "R$ 20,00")_

**💡 Dicas** (use só se travar):

1. `toFixed(2)` garante 2 casas decimais (e retorna texto).
2. Troque o ponto pela vírgula com `replace`.
3. Curiosidade: no mundo real use `valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })`.

---

### Exercício 5.7 — Somar valores digitados
*Números e Math · Médio*

Valores vindos de formulários chegam como texto, às vezes com vírgula. Crie `somarTextos(a, b)` que converte e soma. `somarTextos('10', '5,5')` → `15.5`. Se algum não for número válido, retorne `null`.

**Código inicial:**

```js
function somarTextos(a, b) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `somarTextos('10', '5,5')` → deve resultar em **`15.5`** _("10" + "5,5" → 15.5)_
- `somarTextos('1.5', '2')` → deve resultar em **`3.5`** _("1.5" + "2" → 3.5)_
- `somarTextos('abc', '2')` → deve resultar em **`null`** _("abc" + "2" → null)_

**💡 Dicas** (use só se travar):

1. Troque a vírgula por ponto antes de converter.
2. Use `Number.isNaN(x)` para detectar valor inválido.

---

### Exercício 5.8 — Sorteio entre min e max
*Números e Math · Médio*

Crie `numeroAleatorio(min, max)` que retorna um **inteiro** sorteado entre min e max, **incluindo** os dois.

**Código inicial:**

```js
function numeroAleatorio(min, max) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **Sempre inteiro entre 1 e 3, e sorteia todos** → resultado esperado: `true`

  Teste executado pelo app:

  ```js
  (() => { const vistos = new Set();
  for (let i = 0;
  i < 3000;
  i++) { const n = numeroAleatorio(1, 3);
  if (!Number.isInteger(n) || n < 1 || n > 3) return false;
  vistos.add(n);
  } return vistos.size === 3;
  })()
  ```
- **Funciona com negativos (-2 a 2)** → resultado esperado: `true`

  Teste executado pelo app:

  ```js
  (() => { const vistos = new Set();
  for (let i = 0;
  i < 3000;
  i++) { const n = numeroAleatorio(-2, 2);
  if (!Number.isInteger(n) || n < -2 || n > 2) return false;
  vistos.add(n);
  } return vistos.size === 5;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Veja a fórmula na teoria do dia.
2. Por que `+ 1`? Porque `Math.random()` nunca chega a 1.

---

### Exercício 5.9 — Iniciais do nome
*Strings (textos) · Fácil*

Crie `iniciais(nome)` que retorna as iniciais em maiúsculas. `iniciais('ada lovelace byron')` → `'ALB'`.

**✅ Resultado esperado** — o exercício está certo quando:

- `iniciais('ada lovelace byron')` → deve resultar em **`'ALB'`** _("ada lovelace byron" → "ALB")_
- `iniciais('Grace Hopper')` → deve resultar em **`'GH'`** _("Grace Hopper" → "GH")_

**💡 Dicas** (use só se travar):

1. Separe as palavras com `split(' ')` e pegue `[0]` de cada uma.

## Quiz

1. Depois de `let s = 'oi'; s.toUpperCase();`, quanto vale `s`?
   a) 'OI'
   b) 'oi'
   c) undefined
   d) Erro

2. `'JavaScript'.slice(0, 4)` retorna:
   a) 'Java'
   b) 'JavaS'
   c) 'avaS'
   d) 'Scri'

3. `Number('3,5')` retorna:
   a) 3.5
   b) 3
   c) NaN
   d) '3,5'

4. Qual o tipo do retorno de `(2.5).toFixed(1)`?
   a) number
   b) string
   c) boolean

5. Qual expressão sorteia um inteiro de 1 a 10?
   a) `Math.random() * 10`
   b) `Math.floor(Math.random() * 10) + 1`
   c) `Math.round(Math.random() * 10)`
   d) `Math.ceil(Math.random()) * 10`

## Desafio extra

Abra o console do navegador (F12) em qualquer site e experimente métodos de string em textos da página, como `document.title.toUpperCase()`.


# Dia 6 — Arrays: trabalhando com listas

*Criar, ler, alterar e percorrer listas; entender mutação x cópia.* · Tempo estimado: ~3h

## Objetivos

- Criar arrays e acessar itens por índice
- Adicionar e remover itens (push, pop, shift, unshift, splice)
- Buscar itens (includes, indexOf) e copiar trechos (slice, spread)
- Saber quais métodos alteram o array original e quais criam um novo
- Trabalhar com arrays de arrays (matrizes)

## Aula

### 6.1 Criando e acessando

```js
const frutas = ['maçã', 'banana', 'uva'];
console.log(frutas[0]);          // maçã
console.log(frutas.length);      // 3
console.log(frutas.at(-1));      // uva (último)
frutas[1] = 'kiwi';              // altera um item
console.log(frutas);
```

Note que `const` impede trocar o array *inteiro* (`frutas = [...]`), mas permite alterar o conteúdo dele.

### 6.2 Adicionando e removendo

```js
const fila = ['Ana', 'Bruno'];
fila.push('Carla');       // adiciona no fim
fila.unshift('Zé');       // adiciona no início
console.log(fila);        // [ 'Zé', 'Ana', 'Bruno', 'Carla' ]
const ultimo = fila.pop();     // remove do fim e retorna
const primeiro = fila.shift(); // remove do início e retorna
console.log(primeiro, ultimo, fila);

const letras = ['a', 'b', 'c', 'd'];
letras.splice(1, 2);      // a partir do índice 1, remove 2 itens
console.log(letras);      // [ 'a', 'd' ]
```

### 6.3 Buscando

```js
const nums = [10, 20, 30, 20];
console.log(nums.includes(20));   // true
console.log(nums.indexOf(20));    // 1 (primeira ocorrência)
console.log(nums.indexOf(99));    // -1 (não achou)
console.log(nums.lastIndexOf(20)); // 3
```

### 6.4 Percorrendo

```js
const notas = [7, 9, 6];
for (let i = 0; i < notas.length; i++) {
  console.log(`Nota ${i + 1}: ${notas[i]}`);
}
for (const nota of notas) {
  console.log(nota);
}
```

> 💡 **Dica:** Use `for...of` quando só precisa dos valores; use o `for` clássico quando precisa do índice.

### 6.5 Mutação x cópia (muito importante!)

Arrays são guardados por **referência**: atribuir um array a outra variável **não copia**, as duas apontam para a mesma lista.

```js
const a = [1, 2, 3];
const b = a;          // mesma lista!
b.push(4);
console.log(a);       // [ 1, 2, 3, 4 ]  😮

const c = [...a];     // spread: cópia nova
c.push(5);
console.log(a, c);

const parte = a.slice(1, 3); // slice também cria cópia
console.log(parte);
```

- Alteram o original: `push, pop, shift, unshift, splice, sort, reverse`
- Criam um novo: `slice, concat, [...spread], map, filter` (dia 8)

> ⚠️ **Atenção:** Funções que recebem um array e o alteram causam bugs difíceis. Prefira retornar um array novo.

### 6.6 Matrizes (arrays de arrays)

```js
const tabuleiro = [
  ['X', 'O', 'X'],
  ['O', 'X', 'O'],
  ['O', 'X', 'X'],
];
console.log(tabuleiro[1][2]); // linha 1, coluna 2 → 'O'
for (const linha of tabuleiro) {
  console.log(linha.join(' | '));
}
```


## Exercícios

### Exercício 6.1 — Primeiro e último
*Arrays (listas) · Fácil*

Crie `pontas(lista)` que retorna um novo array com o primeiro e o último item. `pontas([4, 8, 15, 16])` → `[4, 16]`.

**Código inicial:**

```js
function pontas(lista) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `pontas([4, 8, 15, 16])` → deve resultar em **`[ 4, 16 ]`** _([4, 8, 15, 16] → [4, 16])_
- `pontas(['a', 'b'])` → deve resultar em **`[ 'a', 'b' ]`** _(["a", "b"] → ["a", "b"])_

**💡 Dicas** (use só se travar):

1. O último índice é `lista.length - 1`.
2. Retorne um array literal: `[a, b]`.

---

### Exercício 6.2 — Fila de atendimento
*Arrays (listas) · Fácil*

Implemente duas funções que **alteram** a fila recebida:

- `entrarNaFila(fila, nome)`: coloca o nome no fim e retorna o novo tamanho da fila.
- `atenderProximo(fila)`: remove e retorna o primeiro da fila. Se a fila estiver vazia, retorne `null`.

**Código inicial:**

```js
function entrarNaFila(fila, nome) {
  
}

function atenderProximo(fila) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `entrarNaFila(['Ana'], 'Bia')` → deve resultar em **`2`**
- **Atende na ordem de chegada** → resultado esperado: `[ 'Ana', 'Bia', 0 ]`

  Teste executado pelo app:

  ```js
  (() => { const f = [];
  entrarNaFila(f, 'Ana');
  entrarNaFila(f, 'Bia');
  return [atenderProximo(f), atenderProximo(f), f.length];
  })()
  ```
- `atenderProximo([])` → deve resultar em **`null`** _(Fila vazia → null)_

**💡 Dicas** (use só se travar):

1. `push` já retorna o novo tamanho.
2. `shift` remove do início.

---

### Exercício 6.3 — Somar e calcular média
*Arrays (listas) · Fácil*

Crie `somar(numeros)` e `media(numeros)`. A média de um array vazio deve ser 0.

**Código inicial:**

```js
function somar(numeros) {
  
}

function media(numeros) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `somar([1, 2, 3, 4])` → deve resultar em **`10`**
- `somar([])` → deve resultar em **`0`**
- `media([7, 8, 9])` → deve resultar em **`8`**
- `media([])` → deve resultar em **`0`**

**💡 Dicas** (use só se travar):

1. Reaproveite `somar` dentro de `media`.
2. Cuidado: dividir por zero dá `NaN`.

---

### Exercício 6.4 — Maior valor (sem Math.max)
*Arrays (listas) · Médio*

Crie `maiorValor(numeros)` que retorna o maior número do array, sem `Math.max` nem `sort`. Para array vazio retorne `undefined`.

**Código inicial:**

```js
function maiorValor(numeros) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `maiorValor([3, 9, 2])` → deve resultar em **`9`** _([3, 9, 2] → 9)_
- `maiorValor([-5, -2, -8])` → deve resultar em **`-2`** _([-5, -2, -8] → -2)_
- `maiorValor([])` → deve resultar em **`undefined`** _([] → undefined)_
- 📏 Regra de código: Não usou Math.max nem sort

**💡 Dicas** (use só se travar):

1. Comece com `maior = numeros[0]` — e não com 0. Por quê? Pense num array só de negativos.

---

### Exercício 6.5 — Remover duplicados
*Arrays (listas) · Médio*

Crie `semDuplicados(lista)` que retorna um **novo** array sem itens repetidos, mantendo a ordem da primeira aparição.

**Código inicial:**

```js
function semDuplicados(lista) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `semDuplicados([1, 2, 2, 3, 1])` → deve resultar em **`[ 1, 2, 3 ]`** _([1, 2, 2, 3, 1] → [1, 2, 3])_
- `semDuplicados(['a', 'b', 'a'])` → deve resultar em **`[ 'a', 'b' ]`** _(textos)_
- `(() => { const l = [1, 1]; semDuplicados(l); return l; })()` → deve resultar em **`[ 1, 1 ]`** _(Não altera o original)_

**💡 Dicas** (use só se travar):

1. Crie um array vazio e só adicione o item se ele ainda não estiver lá (`includes`).

---

### Exercício 6.6 — Contar ocorrências
*Arrays (listas) · Fácil*

Crie `contarOcorrencias(lista, valor)` que retorna quantas vezes `valor` aparece na lista.

**✅ Resultado esperado** — o exercício está certo quando:

- `contarOcorrencias([1, 2, 2, 3, 2], 2)` → deve resultar em **`3`** _(conta 2 em [1, 2, 2, 3, 2])_
- `contarOcorrencias(['a'], 'x')` → deve resultar em **`0`** _(conta "x" em ["a"])_

**💡 Dicas** (use só se travar):

1. Acumulador + for...of + if.

---

### Exercício 6.7 — Inverter sem alterar o original
*Arrays (listas) · Médio*

Crie `invertido(lista)` que retorna um **novo** array com os itens em ordem inversa, sem usar `reverse` e sem alterar o array recebido.

**Código inicial:**

```js
function invertido(lista) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `invertido([1, 2, 3])` → deve resultar em **`[ 3, 2, 1 ]`** _([1, 2, 3] → [3, 2, 1])_
- `(() => { const l = [1, 2]; invertido(l); return l; })()` → deve resultar em **`[ 1, 2 ]`** _(Original intacto)_
- 📏 Regra de código: Não usou reverse

**💡 Dicas** (use só se travar):

1. Percorra de trás para frente e faça `push` num array novo.

---

### Exercício 6.8 — Adicionar sem mutar
*Arrays (listas) · Médio*

Crie `comItem(lista, item)` que retorna um **novo** array com o item no final, sem alterar o original. Use o operador spread `...`.

**Código inicial:**

```js
function comItem(lista, item) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `comItem([1, 2], 3)` → deve resultar em **`[ 1, 2, 3 ]`** _(Adiciona no fim)_
- `(() => { const l = [1]; comItem(l, 2); return l; })()` → deve resultar em **`[ 1 ]`** _(Não altera o original)_
- 📏 Regra de código: Usou spread (...)

**💡 Dicas** (use só se travar):

1. `[...lista, item]` cria um array novo com todos os itens de lista e mais um.

---

### Exercício 6.9 — Soma da diagonal
*Arrays (listas) · Médio*

Crie `somaDiagonal(matriz)` que soma a diagonal principal de uma matriz quadrada (posições [0][0], [1][1], [2][2]...).

**Código inicial:**

```js
function somaDiagonal(matriz) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `somaDiagonal([[1, 2, 3], [4, 5, 6], [7, 8, 9]])` → deve resultar em **`15`** _(3x3)_
- `somaDiagonal([[10, 0], [0, 5]])` → deve resultar em **`15`** _(2x2)_

**💡 Dicas** (use só se travar):

1. Na diagonal, o índice da linha é igual ao da coluna: `matriz[i][i]`.

---

### Exercício 6.10 — Dividir em grupos
*Arrays (listas) · Desafio*

Crie `dividirEmGrupos(lista, tamanho)` que divide a lista em pedaços. `dividirEmGrupos([1,2,3,4,5], 2)` → `[[1,2],[3,4],[5]]`.

**Código inicial:**

```js
function dividirEmGrupos(lista, tamanho) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `dividirEmGrupos([1, 2, 3, 4, 5], 2)` → deve resultar em **`[ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]`** _([1..5] em 2)_
- `dividirEmGrupos([1, 2, 3, 4, 5, 6], 3)` → deve resultar em **`[ [ 1, 2, 3 ], [ 4, 5, 6 ] ]`** _([1..6] em 3)_
- `dividirEmGrupos([], 3)` → deve resultar em **`[]`** _([] → [])_

**💡 Dicas** (use só se travar):

1. Um laço que pula de `tamanho` em `tamanho`: `i += tamanho`.
2. `lista.slice(i, i + tamanho)` pega um pedaço.

## Quiz

1. Qual método remove o **último** item de um array?
   a) shift
   b) pop
   c) slice
   d) splice(0)

2. Após `const a = [1]; const b = a; b.push(2);`, quanto vale `a`?
   a) [1]
   b) [1, 2]
   c) [2]
   d) Erro, a é const

3. Qual destes **não** altera o array original?
   a) sort
   b) splice
   c) slice
   d) push

4. `[10, 20, 30].indexOf(40)` retorna:
   a) undefined
   b) null
   c) -1
   d) 0

5. Como acessar o número 6 em `const m = [[1,2,3],[4,5,6]]`?
   a) m[2][1]
   b) m[1][2]
   c) m[6]
   d) m[1,2]

## Desafio extra

Desenhe numa folha as “caixas e setas” do exemplo de mutação x cópia: duas variáveis apontando para o mesmo array.


# Dia 7 — Objetos, desestruturação e JSON

*Modelar dados do mundo real com objetos, copiar sem efeitos colaterais e converter para JSON.* · Tempo estimado: ~3.5h

## Objetivos

- Criar objetos e acessar propriedades com ponto e colchetes
- Percorrer objetos com Object.keys, Object.values e Object.entries
- Usar desestruturação, spread e rest
- Evitar erros com optional chaining (?.) e nullish coalescing (??)
- Converter objetos para JSON e de volta

## Aula

### 7.1 Objetos literais

Um objeto agrupa dados relacionados em pares **chave: valor**. É a forma como o JavaScript representa “coisas”: um usuário, um produto, um pedido.

```js
const usuario = {
  nome: 'Ana',
  idade: 28,
  ativo: true,
  hobbies: ['ler', 'correr'],
  endereco: { cidade: 'Recife', uf: 'PE' },
};
console.log(usuario.nome);            // ponto
console.log(usuario['idade']);        // colchetes
console.log(usuario.endereco.cidade); // aninhado
const campo = 'ativo';
console.log(usuario[campo]);          // colchetes com variável

usuario.email = 'ana@ex.com';  // adiciona
usuario.idade = 29;            // altera
delete usuario.ativo;          // remove
console.log(usuario);
```

### 7.2 Atalhos: propriedades e métodos

```js
const nome = 'Leo';
const idade = 30;
const pessoa = {
  nome,          // o mesmo que nome: nome
  idade,
  apresentar() { // método
    return `Oi, sou ${this.nome}`;
  },
};
console.log(pessoa.apresentar());
```

Dentro de um método, `this` é o próprio objeto antes do ponto (`pessoa`).

### 7.3 Percorrendo objetos

```js
const estoque = { maca: 10, banana: 4, uva: 0 };
console.log(Object.keys(estoque));    // [ 'maca', 'banana', 'uva' ]
console.log(Object.values(estoque));  // [ 10, 4, 0 ]
for (const [fruta, qtd] of Object.entries(estoque)) {
  console.log(`${fruta}: ${qtd}`);
}
console.log('uva' in estoque); // true
```

### 7.4 Desestruturação, spread e rest

```js
const produto = { nome: 'Caneca', preco: 30, cor: 'azul' };
const { nome, preco } = produto;           // tira propriedades para variáveis
console.log(nome, preco);

const { cor, ...resto } = produto;          // rest: “o resto”
console.log(cor, resto);

const [primeiro, segundo] = ['a', 'b', 'c']; // também funciona com arrays
console.log(primeiro, segundo);

const atualizado = { ...produto, preco: 25 }; // cópia com alteração
console.log(produto.preco, atualizado.preco);  // 30 25

function mostrar({ nome, preco }) {          // desestruturar parâmetros
  return `${nome}: R$ ${preco}`;
}
console.log(mostrar(produto));
```

> ⚠️ **Atenção:** Objetos também são passados por referência (como arrays). Use `{ ...obj }` para copiar. Atenção: essa cópia é *rasa* — objetos internos continuam compartilhados.

### 7.5 ?. e ??

```js
const cliente = { nome: 'Bia' };
// console.log(cliente.endereco.cidade); // TypeError!
console.log(cliente.endereco?.cidade);   // undefined, sem erro
console.log(cliente.endereco?.cidade ?? 'Sem cidade');

// ?? só usa o padrão se o valor for null/undefined
console.log(0 ?? 10);  // 0
console.log(0 || 10);  // 10 (|| usa o padrão para qualquer falsy)
```

### 7.6 JSON

JSON é o formato de texto usado para trocar dados entre sistemas (APIs, Firebase, arquivos). Parece um objeto JS, mas as chaves e textos usam sempre aspas duplas.

```js
const pedido = { id: 1, itens: ['café'], pago: false };
const texto = JSON.stringify(pedido);
console.log(texto, typeof texto);

const deVolta = JSON.parse(texto);
console.log(deVolta.itens[0]);

console.log(JSON.stringify(pedido, null, 2)); // formatado
```


## Exercícios

### Exercício 7.1 — Fábrica de pessoas
*Objetos e JSON · Fácil*

Crie `criarPessoa(nome, idade)` que retorna um objeto `{ nome, idade, maiorDeIdade }`, onde `maiorDeIdade` é um boolean.

**Código inicial:**

```js
function criarPessoa(nome, idade) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `criarPessoa('Ana', 20)` → deve resultar em **`{ nome: 'Ana', idade: 20, maiorDeIdade: true }`**
- `criarPessoa('Léo', 12)` → deve resultar em **`{ nome: 'Léo', idade: 12, maiorDeIdade: false }`**

**💡 Dicas** (use só se travar):

1. Atalho: `{ nome, idade }` equivale a `{ nome: nome, idade: idade }`.

---

### Exercício 7.2 — Descrever com desestruturação
*Objetos e JSON · Fácil*

Crie `descreverCarro(carro)` que recebe `{ marca, modelo, ano }` e retorna `'Fiat Uno (2010)'`. Use **desestruturação**.

**Código inicial:**

```js
function descreverCarro(carro) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `descreverCarro({ marca: 'Fiat', modelo: 'Uno', ano: 2010 })` → deve resultar em **`'Fiat Uno (2010)'`** _(Fiat Uno 2010)_
- `descreverCarro({ ano: 1999, modelo: 'Gol', marca: 'VW' })` → deve resultar em **`'VW Gol (1999)'`** _(VW Gol 1999)_
- 📏 Regra de código: Usou desestruturação

**💡 Dicas** (use só se travar):

1. Dentro da função: `const { marca, modelo, ano } = carro;`
2. Ou direto no parâmetro: `function descreverCarro({ marca, modelo, ano })`.

---

### Exercício 7.3 — Quantas propriedades?
*Objetos e JSON · Fácil*

Crie `contarPropriedades(obj)` que retorna quantas chaves o objeto tem.

**✅ Resultado esperado** — o exercício está certo quando:

- `contarPropriedades({ a: 1, b: 2 })` → deve resultar em **`2`** _({a:1, b:2} → 2)_
- `contarPropriedades({})` → deve resultar em **`0`** _({} → 0)_

**💡 Dicas** (use só se travar):

1. `Object.keys(obj)` retorna um array com as chaves.

---

### Exercício 7.4 — Frequência de letras
*Objetos e JSON · Médio*

Crie `frequencia(palavra)` que retorna um objeto com quantas vezes cada letra aparece. `frequencia('banana')` → `{ b: 1, a: 3, n: 2 }`.

**Código inicial:**

```js
function frequencia(palavra) {
  const contagem = {};
  
  return contagem;
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `frequencia('banana')` → deve resultar em **`{ b: 1, a: 3, n: 2 }`** _(banana)_
- `frequencia('')` → deve resultar em **`{}`** _(vazio)_

**💡 Dicas** (use só se travar):

1. Use colchetes com variável: `contagem[letra]`.
2. Na primeira vez, `contagem[letra]` é `undefined`. Truque: `(contagem[letra] || 0) + 1`.

---

### Exercício 7.5 — Atualizar estoque sem mutar
*Objetos e JSON · Médio*

Crie `adicionarAoEstoque(estoque, produto, qtd)` que retorna um **novo** objeto com a quantidade somada (ou criada, se o produto não existir). O objeto original não pode mudar.

**Código inicial:**

```js
function adicionarAoEstoque(estoque, produto, qtd) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `adicionarAoEstoque({ maca: 2 }, 'maca', 3)` → deve resultar em **`{ maca: 5 }`** _(Soma em produto existente)_
- `adicionarAoEstoque({ maca: 2 }, 'uva', 1)` → deve resultar em **`{ maca: 2, uva: 1 }`** _(Cria produto novo)_
- **Original intacto** → resultado esperado: `{ maca: 2 }`

  Teste executado pelo app:

  ```js
  (() => { const e = { maca: 2 };
  adicionarAoEstoque(e, 'maca', 3);
  return e;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Copie com spread: `{ ...estoque }`.
2. Chave dinâmica num objeto literal: `{ [produto]: valor }`.

---

### Exercício 7.6 — Cidade com segurança (?. e ??)
*Objetos e JSON · Médio*

Crie `cidadeDoUsuario(usuario)` que retorna `usuario.endereco.cidade` ou `'Desconhecida'` se qualquer parte não existir. Não deve dar erro mesmo se `usuario` for `null`.

**Código inicial:**

```js
function cidadeDoUsuario(usuario) {
  return usuario.endereco.cidade;
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `cidadeDoUsuario({ endereco: { cidade: 'Natal' } })` → deve resultar em **`'Natal'`** _(Com cidade)_
- `cidadeDoUsuario({ nome: 'Ana' })` → deve resultar em **`'Desconhecida'`** _(Sem endereço)_
- `cidadeDoUsuario(null)` → deve resultar em **`'Desconhecida'`** _(usuario null)_

**💡 Dicas** (use só se travar):

1. `?.` para no primeiro `null`/`undefined` e retorna `undefined`.
2. Depois use `??` para o valor padrão.

---

### Exercício 7.7 — Inverter chaves e valores
*Objetos e JSON · Médio*

Crie `inverterObjeto(obj)`: `{ a: 'x', b: 'y' }` → `{ x: 'a', y: 'b' }`.

**✅ Resultado esperado** — o exercício está certo quando:

- `inverterObjeto({ a: 'x', b: 'y' })` → deve resultar em **`{ x: 'a', y: 'b' }`** _({a:"x", b:"y"})_
- `inverterObjeto({ vermelho: '#f00' })` → deve resultar em **`{ '#f00': 'vermelho' }`** _(cores)_

**💡 Dicas** (use só se travar):

1. `Object.entries` dá pares `[chave, valor]`.

---

### Exercício 7.8 — Ida e volta em JSON
*Objetos e JSON · Fácil*

Crie `salvar(dados)` que retorna o texto JSON dos dados e `carregar(texto)` que transforma o texto JSON de volta em objeto.

**Código inicial:**

```js
function salvar(dados) {
  
}

function carregar(texto) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `salvar({ a: 1 })` → deve resultar em **`'{"a":1}'`** _(salvar retorna texto)_
- `carregar('{"nome":"Ana","tags":[1,2]}')` → deve resultar em **`{ nome: 'Ana', tags: [ 1, 2 ] }`**
- `carregar(salvar({ x: [1, { y: true }] }))` → deve resultar em **`{ x: [ 1, { y: true } ] }`** _(ida e volta mantém os dados)_

**💡 Dicas** (use só se travar):

1. `JSON.stringify` e `JSON.parse`.

---

### Exercício 7.9 — Objeto com métodos e this
*Objetos e JSON · Médio*

Crie `criarPlacar()` que retorna um objeto com:

- `pontos`: começa em 0
- `marcar(qtd)`: soma qtd (padrão 1) aos pontos e retorna o total
- `zerar()`: volta para 0

**Código inicial:**

```js
function criarPlacar() {
  return {
    pontos: 0,
    // métodos aqui
  };
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `(() => { const p = criarPlacar(); p.marcar(); return p.marcar(3); })()` → deve resultar em **`4`** _(marcar soma e retorna)_
- **zerar** → resultado esperado: `0`

  Teste executado pelo app:

  ```js
  (() => { const p = criarPlacar();
  p.marcar(5);
  p.zerar();
  return p.pontos;
  })()
  ```
- **placares independentes** → resultado esperado: `0`

  Teste executado pelo app:

  ```js
  (() => { const a = criarPlacar();
  const b = criarPlacar();
  a.marcar(2);
  return b.pontos;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Dentro dos métodos, acesse a propriedade com `this.pontos`.
2. Evite arrow functions como métodos: nelas o `this` não é o objeto.

---

### Exercício 7.10 — Mesclar configurações
*Objetos e JSON · Fácil*

Crie `mesclarConfig(padrao, usuario)` que retorna um novo objeto com as configurações padrão sobrescritas pelas do usuário.

**✅ Resultado esperado** — o exercício está certo quando:

- `mesclarConfig({ tema: 'claro', fonte: 14 }, { tema: 'escuro' })` → deve resultar em **`{ tema: 'escuro', fonte: 14 }`** _(sobrescreve tema)_
- `mesclarConfig({ a: 1 }, {})` → deve resultar em **`{ a: 1 }`** _(usuario vazio)_

**💡 Dicas** (use só se travar):

1. No spread, o que vem por último vence.

## Quiz

1. Como acessar uma propriedade cujo nome está na variável `campo`?
   a) `obj.campo`
   b) `obj[campo]`
   c) `obj->campo`
   d) `obj{campo}`

2. `const { a, ...r } = { a: 1, b: 2, c: 3 }`. Quanto vale `r`?
   a) { a: 1 }
   b) { b: 2, c: 3 }
   c) [2, 3]
   d) undefined

3. `0 ?? 5` resulta em:
   a) 0
   b) 5
   c) null
   d) false

4. O que `JSON.stringify({ a: 1 })` retorna?
   a) Um objeto
   b) O texto `{"a":1}`
   c) undefined
   d) Um array

5. `usuario?.perfil?.foto` quando `usuario` é `undefined`:
   a) TypeError
   b) undefined
   c) null
   d) ''

## Desafio extra

🎯 Checkpoint da semana 1! Vá em **Revisão** e refaça os exercícios sugeridos. Depois, modele em um objeto JS algo da sua vida (seu carro, uma receita, sua playlist).


# Dia 8 — map, filter, reduce e companhia

*Transformar, filtrar e resumir listas com os métodos funcionais de array — o dia a dia do JS moderno.* · Tempo estimado: ~3.5h

## Objetivos

- Transformar listas com map
- Selecionar itens com filter e find
- Resumir listas com reduce
- Verificar condições com some e every
- Ordenar com sort e uma função de comparação
- Encadear métodos (map + filter + reduce)

## Aula

### 8.1 Funções como argumento

Os métodos de hoje recebem uma **função** (chamada de *callback*) e a executam para cada item. Normalmente usamos arrow functions.

```js
const nums = [1, 2, 3];
nums.forEach((n, indice) => {
  console.log(`índice ${indice}: ${n}`);
});
```

### 8.2 map: transformar cada item

`map` retorna um **novo array do mesmo tamanho**, com o resultado da função para cada item.

```js
const precos = [10, 20, 30];
const comDesconto = precos.map(p => p * 0.9);
console.log(comDesconto); // [ 9, 18, 27 ]

const usuarios = [{ nome: 'Ana' }, { nome: 'Bia' }];
console.log(usuarios.map(u => u.nome)); // [ 'Ana', 'Bia' ]
```

### 8.3 filter e find: selecionar

```js
const idades = [12, 25, 17, 40];
const adultos = idades.filter(i => i >= 18);
console.log(adultos);                 // [ 25, 40 ] (todos que passam)
console.log(idades.find(i => i > 18)); // 25 (o primeiro que passa)
console.log(idades.find(i => i > 99)); // undefined
console.log(idades.findIndex(i => i === 17)); // 2
```

### 8.4 reduce: resumir em um valor

`reduce` percorre a lista carregando um **acumulador**. É o mesmo padrão de acumulador do dia 3, num formato compacto.

```js
const valores = [5, 10, 15];
const total = valores.reduce((acumulador, atual) => acumulador + atual, 0);
console.log(total); // 30

// Também pode resumir em um objeto
const frutas = ['maçã', 'uva', 'maçã'];
const contagem = frutas.reduce((acc, f) => {
  acc[f] = (acc[f] || 0) + 1;
  return acc;
}, {});
console.log(contagem);
```

> 💡 **Dica:** Sempre passe o valor inicial (o segundo argumento: `0`, `{}`, `[]`). Sem ele, reduce em array vazio dá erro.

### 8.5 some e every

```js
const notas = [7, 8, 4];
console.log(notas.some(n => n < 5));   // true  (pelo menos um)
console.log(notas.every(n => n >= 5)); // false (todos?)
```

### 8.6 sort com comparação

```js
console.log([10, 9, 1].sort());          // [ 1, 10, 9 ] 😱 ordena como TEXTO
console.log([10, 9, 1].sort((a, b) => a - b)); // crescente
console.log([10, 9, 1].sort((a, b) => b - a)); // decrescente

const pessoas = [{ nome: 'Caio', idade: 30 }, { nome: 'Ana', idade: 25 }];
const porIdade = [...pessoas].sort((a, b) => a.idade - b.idade); // copia antes!
const porNome = [...pessoas].sort((a, b) => a.nome.localeCompare(b.nome));
console.log(porIdade.map(p => p.nome), porNome.map(p => p.nome));
```

> ⚠️ **Atenção:** `sort` altera o array original. Copie com `[...lista]` antes de ordenar.

### 8.7 Encadeando

```js
const pedidos = [
  { cliente: 'Ana', valor: 120, pago: true },
  { cliente: 'Bia', valor: 80, pago: false },
  { cliente: 'Caio', valor: 200, pago: true },
];
const totalPago = pedidos
  .filter(p => p.pago)
  .map(p => p.valor)
  .reduce((soma, v) => soma + v, 0);
console.log(totalPago); // 320
```


## Exercícios

### Exercício 8.1 — Dobrar com map
*map, filter, reduce e cia. · Fácil*

Crie `dobrarTodos(numeros)` usando `map`.

**Código inicial:**

```js
function dobrarTodos(numeros) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `dobrarTodos([1, 2, 3])` → deve resultar em **`[ 2, 4, 6 ]`** _([1, 2, 3] → [2, 4, 6])_
- `dobrarTodos([])` → deve resultar em **`[]`** _([] → [])_
- 📏 Regra de código: Usou map

**💡 Dicas** (use só se travar):

1. `return numeros.map(n => ...);`

---

### Exercício 8.2 — Somente pares com filter
*map, filter, reduce e cia. · Fácil*

Crie `apenasPares(numeros)` usando `filter`.

**✅ Resultado esperado** — o exercício está certo quando:

- `apenasPares([1, 2, 3, 4, 5, 6])` → deve resultar em **`[ 2, 4, 6 ]`** _([1..6] → [2, 4, 6])_
- `apenasPares([1, 3])` → deve resultar em **`[]`** _(sem pares → [])_
- 📏 Regra de código: Usou filter

**💡 Dicas** (use só se travar):

1. O callback do filter deve retornar true para os itens que ficam.

---

### Exercício 8.3 — Somar com reduce
*map, filter, reduce e cia. · Fácil*

Crie `somaTotal(numeros)` usando `reduce`. Para array vazio, retorne 0.

**✅ Resultado esperado** — o exercício está certo quando:

- `somaTotal([1, 2, 3])` → deve resultar em **`6`** _([1, 2, 3] → 6)_
- `somaTotal([])` → deve resultar em **`0`** _([] → 0)_
- 📏 Regra de código: Usou reduce

**💡 Dicas** (use só se travar):

1. Não esqueça o valor inicial `0`.

---

### Exercício 8.4 — Nomes dos produtos baratos
*map, filter, reduce e cia. · Médio*

Crie `nomesBaratos(produtos, limite)` que retorna os **nomes** dos produtos com preço menor ou igual ao limite. Encadeie `filter` e `map`.

Exemplo de produtos:

```
[{ nome: 'Teclado', preco: 150, categoria: 'perifericos' }, { nome: 'Mouse', preco: 80, categoria: 'perifericos' }, { nome: 'Monitor', preco: 900, categoria: 'telas' }, { nome: 'Cabo HDMI', preco: 30, categoria: 'acessorios' }]
```

**Código inicial:**

```js
function nomesBaratos(produtos, limite) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **limite 100** → resultado esperado: `[ 'Mouse', 'Cabo HDMI' ]`

  Teste executado pelo app:

  ```js
  nomesBaratos([{ nome: 'Teclado', preco: 150, categoria: 'perifericos' }, { nome: 'Mouse', preco: 80, categoria: 'perifericos' }, { nome: 'Monitor', preco: 900, categoria: 'telas' }, { nome: 'Cabo HDMI', preco: 30, categoria: 'acessorios' }], 100)
  ```
- **limite 10** → resultado esperado: `[]`

  Teste executado pelo app:

  ```js
  nomesBaratos([{ nome: 'Teclado', preco: 150, categoria: 'perifericos' }, { nome: 'Mouse', preco: 80, categoria: 'perifericos' }, { nome: 'Monitor', preco: 900, categoria: 'telas' }, { nome: 'Cabo HDMI', preco: 30, categoria: 'acessorios' }], 10)
  ```
- 📏 Regra de código: Usou filter e map

**💡 Dicas** (use só se travar):

1. Primeiro filtre pelo preço, depois transforme cada produto em seu nome.

---

### Exercício 8.5 — Encontrar usuário
*map, filter, reduce e cia. · Fácil*

Crie `buscarPorId(usuarios, id)` que retorna o usuário com aquele id usando `find`, ou `null` se não existir.

**✅ Resultado esperado** — o exercício está certo quando:

- `buscarPorId([{ id: 1, nome: 'Ana' }, { id: 2, nome: 'Bia' }], 2)` → deve resultar em **`{ id: 2, nome: 'Bia' }`** _(acha id 2)_
- `buscarPorId([{ id: 1 }], 5)` → deve resultar em **`null`** _(id inexistente → null)_
- 📏 Regra de código: Usou find

**💡 Dicas** (use só se travar):

1. `find` retorna `undefined` quando não acha. Converta com `?? null`.

---

### Exercício 8.6 — Situação da turma
*map, filter, reduce e cia. · Médio*

Crie `situacaoTurma(notas)` que retorna:

- `'todos aprovados'` se todas as notas forem ≥ 6 (`every`)
- `'alguns reprovados'` se pelo menos uma for menor que 6, mas não todas
- `'todos reprovados'` se nenhuma for ≥ 6 (`some`)

**Código inicial:**

```js
function situacaoTurma(notas) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `situacaoTurma([7, 8, 9])` → deve resultar em **`'todos aprovados'`** _([7, 8, 9])_
- `situacaoTurma([7, 3, 9])` → deve resultar em **`'alguns reprovados'`** _([7, 3, 9])_
- `situacaoTurma([1, 2])` → deve resultar em **`'todos reprovados'`** _([1, 2])_

**💡 Dicas** (use só se travar):

1. “Nenhuma aprovada” é o mesmo que `!notas.some(n => n >= 6)`.

---

### Exercício 8.7 — Ordenar por preço (sem mutar)
*map, filter, reduce e cia. · Médio*

Crie `ordenarPorPreco(produtos)` que retorna um **novo** array ordenado do mais barato para o mais caro, sem alterar o original.

**✅ Resultado esperado** — o exercício está certo quando:

- **ordem por preço** → resultado esperado: `[ 'Cabo HDMI', 'Mouse', 'Teclado', 'Monitor' ]`

  Teste executado pelo app:

  ```js
  ordenarPorPreco([{ nome: 'Teclado', preco: 150, categoria: 'perifericos' }, { nome: 'Mouse', preco: 80, categoria: 'perifericos' }, { nome: 'Monitor', preco: 900, categoria: 'telas' }, { nome: 'Cabo HDMI', preco: 30, categoria: 'acessorios' }]).map(p => p.nome)
  ```
- **original intacto** → resultado esperado: `2`

  Teste executado pelo app:

  ```js
  (() => { const l = [{ preco: 2 }, { preco: 1 }];
  ordenarPorPreco(l);
  return l[0].preco;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Copie com `[...produtos]` antes do `sort`.
2. Comparação crescente: `(a, b) => a.preco - b.preco`.

---

### Exercício 8.8 — Total do carrinho
*map, filter, reduce e cia. · Médio*

Cada item do carrinho é `{ nome, preco, qtd }`. Crie `totalCarrinho(itens)` que retorna a soma de preço × quantidade.

**✅ Resultado esperado** — o exercício está certo quando:

- **carrinho com 2 itens** → resultado esperado: `46`

  Teste executado pelo app:

  ```js
  totalCarrinho([{ nome: 'Café', preco: 20, qtd: 2 }, { nome: 'Pão', preco: 1.5, qtd: 4 }])
  ```
- `totalCarrinho([])` → deve resultar em **`0`** _(vazio → 0)_

**💡 Dicas** (use só se travar):

1. No reduce, some `item.preco * item.qtd` ao acumulador.

---

### Exercício 8.9 — Agrupar por categoria
*map, filter, reduce e cia. · Desafio*

Crie `agruparPorCategoria(produtos)` que retorna um objeto cujas chaves são categorias e os valores são arrays com os nomes dos produtos.

```
{ perifericos: ['Teclado', 'Mouse'], telas: ['Monitor'], acessorios: ['Cabo HDMI'] }
```

**✅ Resultado esperado** — o exercício está certo quando:

- **agrupa** → resultado esperado: `{ perifericos: [ 'Teclado', 'Mouse' ], telas: [ 'Monitor' ], acessorios: [ 'Cabo HDMI' ] }`

  Teste executado pelo app:

  ```js
  agruparPorCategoria([{ nome: 'Teclado', preco: 150, categoria: 'perifericos' }, { nome: 'Mouse', preco: 80, categoria: 'perifericos' }, { nome: 'Monitor', preco: 900, categoria: 'telas' }, { nome: 'Cabo HDMI', preco: 30, categoria: 'acessorios' }])
  ```
- `agruparPorCategoria([])` → deve resultar em **`{}`** _(vazio → {})_

**💡 Dicas** (use só se travar):

1. Use reduce com valor inicial `{}`.
2. Se a categoria ainda não existe no acumulador, crie um array vazio para ela.
3. Não esqueça de `return grupos` dentro do callback.

---

### Exercício 8.10 — Estatísticas das notas
*map, filter, reduce e cia. · Desafio*

Crie `estatisticas(notas)` que retorna `{ media, maior, menor, aprovados }`, onde `aprovados` é a quantidade de notas ≥ 6 e a `media` é arredondada para 1 casa decimal.

**✅ Resultado esperado** — o exercício está certo quando:

- `estatisticas([5, 7, 9, 4])` → deve resultar em **`{ media: 6.3, maior: 9, menor: 4, aprovados: 2 }`** _([5, 7, 9, 4])_
- `estatisticas([10])` → deve resultar em **`{ media: 10, maior: 10, menor: 10, aprovados: 1 }`** _([10])_

**💡 Dicas** (use só se travar):

1. `Math.max(...notas)` espalha o array como argumentos.
2. Arredondar 1 casa: `Math.round(x * 10) / 10`.

## Quiz

1. Qual método retorna um array do **mesmo tamanho** com itens transformados?
   a) filter
   b) map
   c) find
   d) reduce

2. `[3, 1, 10].sort()` resulta em:
   a) [1, 3, 10]
   b) [1, 10, 3]
   c) [10, 3, 1]
   d) Erro

3. O que `find` retorna quando nenhum item satisfaz a condição?
   a) -1
   b) null
   c) undefined
   d) []

4. Em `reduce((acc, x) => acc + x, 0)`, o que é o `0`?
   a) O índice inicial
   b) O valor inicial do acumulador
   c) O tamanho
   d) Nada

5. `[1, 2, 3].some(n => n > 2)`
   a) true
   b) false
   c) [3]
   d) 3

## Desafio extra

Pegue os exercícios do dia 6 (somar, maior valor, duplicados) e reescreva-os com map/filter/reduce. Compare a legibilidade.


# Dia 9 — Funções avançadas: callbacks e closures

*Usar funções como valores, criar funções que geram funções e entender closures — base de React, eventos e bibliotecas.* · Tempo estimado: ~3.5h

## Objetivos

- Passar funções como argumento (callbacks) e retorná-las
- Entender closure: a função “lembra” das variáveis de onde nasceu
- Criar estado privado com closures
- Implementar suas próprias versões de map/filter

## Aula

### 9.1 Funções são valores

Em JavaScript uma função pode ser guardada em variável, passada como argumento e retornada por outra função. Funções que recebem ou retornam funções são chamadas de **funções de ordem superior**.

```js
function aplicar(valor, transformacao) {
  return transformacao(valor);
}
console.log(aplicar(5, n => n * 10));     // 50
console.log(aplicar('oi', s => s.toUpperCase())); // OI
```

### 9.2 Funções que criam funções

```js
function criarSaudacao(saudacao) {
  return function (nome) {
    return `${saudacao}, ${nome}!`;
  };
}
const ola = criarSaudacao('Olá');
const bomDia = criarSaudacao('Bom dia');
console.log(ola('Ana'), bomDia('Leo'));
```

### 9.3 Closure

Repare: `criarSaudacao` já terminou de executar, mas a função retornada ainda lembra o valor de `saudacao`. Isso é uma **closure**: a função carrega consigo as variáveis do escopo onde foi criada.

```js
function criarContador() {
  let contagem = 0;            // variável "privada"
  return {
    incrementar: () => ++contagem,
    valor: () => contagem,
  };
}
const c1 = criarContador();
const c2 = criarContador();
c1.incrementar(); c1.incrementar();
console.log(c1.valor(), c2.valor()); // 2 0
console.log(c1.contagem);            // undefined: ninguém acessa de fora
```

> 💡 **Dica:** Cada chamada de `criarContador()` cria uma **nova** variável `contagem`. Por isso c1 e c2 são independentes.

### 9.4 Callbacks no dia a dia

Você já usou callbacks em `map`, `filter` e `sort`. Eles também aparecem em eventos (`addEventListener`, dia 12) e em código assíncrono (`setTimeout`, dia 13).

```js
function repetir(vezes, acao) {
  for (let i = 1; i <= vezes; i++) acao(i);
}
repetir(3, i => console.log('Execução', i));
```

### 9.5 Por que isso importa?

- **Reaproveitamento**: uma função genérica + comportamentos plugáveis.
- **Encapsulamento**: closures escondem dados (como atributos privados).
- **Frameworks**: React, Vue e Node usam esses padrões o tempo todo (hooks, middlewares, handlers).


## Exercícios

### Exercício 9.1 — Calculadora com callback
*Escopo, closures e callbacks · Fácil*

Crie `calcular(a, b, operacao)` que retorna o resultado de chamar `operacao(a, b)`.

Ex.: `calcular(2, 3, (x, y) => x * y)` → 6.

**✅ Resultado esperado** — o exercício está certo quando:

- `calcular(2, 3, (x, y) => x * y)` → deve resultar em **`6`** _(multiplicação)_
- `calcular(10, 4, (x, y) => x - y)` → deve resultar em **`6`** _(subtração)_
- `calcular(7, 9, Math.max)` → deve resultar em **`9`** _(maior)_

**💡 Dicas** (use só se travar):

1. O parâmetro `operacao` é uma função: chame-a com `operacao(a, b)`.

---

### Exercício 9.2 — Fábrica de multiplicadores
*Escopo, closures e callbacks · Médio*

Crie `criarMultiplicador(fator)` que **retorna uma função**. A função retornada recebe um número e o multiplica pelo fator.

```
const dobro = criarMultiplicador(2);
dobro(5); // 10
```

**Código inicial:**

```js
function criarMultiplicador(fator) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `criarMultiplicador(2)(5)` → deve resultar em **`10`** _(dobro(5) → 10)_
- `(() => { const triplo = criarMultiplicador(3); return triplo(7); })()` → deve resultar em **`21`** _(triplo(7) → 21)_
- `typeof criarMultiplicador(1)` → deve resultar em **`'function'`** _(retorna função)_

**💡 Dicas** (use só se travar):

1. `return (n) => ...;` — a arrow function interna enxerga `fator`.

---

### Exercício 9.3 — Contador com estado privado
*Escopo, closures e callbacks · Médio*

Crie `criarContador(inicial)` (padrão 0) que retorna um objeto **somente com os métodos** `incrementar()`, `decrementar()` e `valor()`. A contagem deve ficar guardada numa variável da closure, não como propriedade do objeto.

**Código inicial:**

```js
function criarContador(inicial = 0) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **incrementa e decrementa** → resultado esperado: `1`

  Teste executado pelo app:

  ```js
  (() => { const c = criarContador();
  c.incrementar();
  c.incrementar();
  c.decrementar();
  return c.valor();
  })()
  ```
- `criarContador(10).valor()` → deve resultar em **`10`** _(valor inicial)_
- `Object.keys(criarContador()).sort()` → deve resultar em **`[ 'decrementar', 'incrementar', 'valor' ]`** _(só expõe os métodos)_
- **contadores independentes** → resultado esperado: `0`

  Teste executado pelo app:

  ```js
  (() => { const a = criarContador();
  const b = criarContador();
  a.incrementar();
  return b.valor();
  })()
  ```

**💡 Dicas** (use só se travar):

1. Declare `let contagem = inicial;` dentro da função e retorne o objeto com métodos que a usam.

---

### Exercício 9.4 — Seu próprio map
*Escopo, closures e callbacks · Médio*

Implemente `meuMap(lista, fn)` que funciona como `lista.map(fn)`, **sem usar** `.map`. A função deve receber (item, indice).

**Código inicial:**

```js
function meuMap(lista, fn) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `meuMap([1, 2, 3], n => n * 2)` → deve resultar em **`[ 2, 4, 6 ]`** _(dobra)_
- `meuMap(['a', 'b'], (x, i) => x + i)` → deve resultar em **`[ 'a0', 'b1' ]`** _(passa o índice)_
- 📏 Regra de código: Não usou .map

**💡 Dicas** (use só se travar):

1. Laço + push + chamar `fn(lista[i], i)`.

---

### Exercício 9.5 — Seu próprio filter
*Escopo, closures e callbacks · Médio*

Implemente `meuFilter(lista, condicao)` sem usar `.filter`.

**✅ Resultado esperado** — o exercício está certo quando:

- `meuFilter([1, 2, 3, 4], n => n > 2)` → deve resultar em **`[ 3, 4 ]`** _(maiores que 2)_
- `meuFilter([1], n => n > 5)` → deve resultar em **`[]`** _(nenhum)_
- 📏 Regra de código: Não usou .filter

**💡 Dicas** (use só se travar):

1. Só faça push quando `condicao(item)` for verdadeiro.

---

### Exercício 9.6 — Executar uma única vez
*Escopo, closures e callbacks · Desafio*

Crie `umaVez(fn)` que retorna uma nova função. Na primeira chamada ela executa `fn` com os argumentos recebidos e guarda o resultado; nas próximas, apenas retorna o resultado guardado, **sem executar fn de novo**.

Útil para evitar, por exemplo, que um botão de pagamento cobre duas vezes.

**Código inicial:**

```js
function umaVez(fn) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **retorna o primeiro resultado sempre** → resultado esperado: `[ 3, 3 ]`

  Teste executado pelo app:

  ```js
  (() => { const f = umaVez((a, b) => a + b);
  return [f(1, 2), f(10, 20)];
  })()
  ```
- **fn executa só uma vez** → resultado esperado: `1`

  Teste executado pelo app:

  ```js
  (() => { let n = 0;
  const f = umaVez(() => ++n);
  f();
  f();
  f();
  return n;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Guarde na closure uma bandeira `executou` e o `resultado`.
2. Para repassar argumentos: `(...args) => fn(...args)`.

---

### Exercício 9.7 — Memoização (cache)
*Escopo, closures e callbacks · Desafio*

Crie `memoizar(fn)` que retorna uma versão de `fn` (de 1 argumento) com cache: se for chamada de novo com o mesmo argumento, devolve o resultado guardado sem recalcular.

**Código inicial:**

```js
function memoizar(fn) {
  const cache = {};
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `memoizar(n => n * n)(9)` → deve resultar em **`81`** _(resultado correto)_
- **não recalcula** → resultado esperado: `2`

  Teste executado pelo app:

  ```js
  (() => { let chamadas = 0;
  const f = memoizar(n => { chamadas++;
  return n + 1;
  });
  f(1);
  f(1);
  f(2);
  f(1);
  return chamadas;
  })()
  ```
- **cacheia resultado 0** → resultado esperado: `1`

  Teste executado pelo app:

  ```js
  (() => { let chamadas = 0;
  const f = memoizar(() => { chamadas++;
  return 0;
  });
  f(5);
  f(5);
  return chamadas;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Retorne uma função que olha o `cache[arg]` antes de chamar `fn`.
2. Use `arg in cache` para saber se já calculou (funciona até se o resultado for 0).

---

### Exercício 9.8 — Linha de montagem (pipe)
*Escopo, closures e callbacks · Desafio*

Crie `pipe(...funcoes)` que retorna uma função que aplica as funções em sequência, da esquerda para a direita.

```
const processar = pipe(x => x + 1, x => x * 2);
processar(3); // (3 + 1) * 2 = 8
```

**Código inicial:**

```js
function pipe(...funcoes) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `pipe(x => x + 1, x => x * 2)(3)` → deve resultar em **`8`** _((3 + 1) * 2)_
- `pipe(s => s.trim(), s => s.toUpperCase(), s => s + '!')('  oi ')` → deve resultar em **`'OI!'`** _(textos)_
- `pipe()(7)` → deve resultar em **`7`** _(sem funções devolve o valor)_

**💡 Dicas** (use só se travar):

1. `...funcoes` junta todos os argumentos num array.
2. Percorra as funções passando o resultado de uma para a próxima (um laço ou `reduce`).

---

### Exercício 9.9 — Conta bancária com closure
*Escopo, closures e callbacks · Médio*

Crie `criarConta(saldoInicial)` que retorna `{ depositar(valor), sacar(valor), saldo() }`:

- `depositar` soma e retorna o novo saldo
- `sacar` só desconta se houver saldo suficiente; retorna `true` se sacou e `false` se não
- o saldo não pode ser acessado diretamente

**✅ Resultado esperado** — o exercício está certo quando:

- `criarConta(100).depositar(50)` → deve resultar em **`150`** _(depositar)_
- **saque permitido** → resultado esperado: `[ true, 70 ]`

  Teste executado pelo app:

  ```js
  (() => { const c = criarConta(100);
  return [c.sacar(30), c.saldo()];
  })()
  ```
- **saque negado** → resultado esperado: `[ false, 10 ]`

  Teste executado pelo app:

  ```js
  (() => { const c = criarConta(10);
  return [c.sacar(30), c.saldo()];
  })()
  ```

**💡 Dicas** (use só se travar):

1. Mesmo padrão do contador privado.

## Quiz

1. O que é uma closure?
   a) Um tipo de laço
   b) Uma função que lembra das variáveis do escopo onde foi criada
   c) Uma forma de fechar o programa
   d) Um método de array

2. Em `const f = criarMultiplicador(3);`, o que é `f`?
   a) O número 3
   b) Uma função
   c) Um objeto
   d) undefined

3. Qual destes recebe um callback?
   a) `Math.max`
   b) `array.forEach`
   c) `JSON.parse`
   d) `String`

4. Dois contadores criados com `criarContador()` compartilham a contagem?
   a) Sim
   b) Não, cada chamada cria um escopo novo

## Desafio extra

Leia o arquivo `src/runner/sandbox.js` deste app (no GitHub). Encontre uma closure e um callback no código real.


# Dia 10 — Classes e Programação Orientada a Objetos

*Criar “moldes” de objetos com class, encapsular dados, usar herança e polimorfismo.* · Tempo estimado: ~3.5h

## Objetivos

- Criar classes com constructor e métodos
- Usar getters, setters e métodos estáticos
- Proteger dados com campos privados (#)
- Reaproveitar código com herança (extends/super)
- Aplicar polimorfismo

## Aula

### 10.1 Classe = molde, objeto = instância

```js
class Produto {
  constructor(nome, preco) {
    this.nome = nome;     // propriedades da instância
    this.preco = preco;
  }

  aplicarDesconto(percentual) {
    this.preco = this.preco * (1 - percentual / 100);
    return this.preco;
  }

  descrever() {
    return `${this.nome}: R$ ${this.preco.toFixed(2)}`;
  }
}

const caneca = new Produto('Caneca', 40);
caneca.aplicarDesconto(10);
console.log(caneca.descrever());
console.log(caneca instanceof Produto); // true
```

O `constructor` roda quando usamos `new`. `this` é a instância sendo criada.

### 10.2 Getters, setters e static

```js
class Temperatura {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {              // acessado como propriedade
    return this.celsius * 9 / 5 + 32;
  }
  set fahrenheit(f) {
    this.celsius = (f - 32) * 5 / 9;
  }
  static deKelvin(k) {            // chamado na classe, não na instância
    return new Temperatura(k - 273.15);
  }
}
const t = new Temperatura(100);
console.log(t.fahrenheit);   // 212 (sem parênteses!)
t.fahrenheit = 32;
console.log(t.celsius);      // 0
console.log(Temperatura.deKelvin(273.15).celsius); // 0
```

### 10.3 Campos privados (#)

```js
class Cofre {
  #segredo;                  // só acessível dentro da classe
  constructor(segredo) {
    this.#segredo = segredo;
  }
  revelar(senha) {
    return senha === 1234 ? this.#segredo : 'Acesso negado';
  }
}
const c = new Cofre('tesouro');
console.log(c.revelar(1), c.revelar(1234));
console.log(c.segredo); // undefined
```

### 10.4 Herança

```js
class Animal {
  constructor(nome) {
    this.nome = nome;
  }
  falar() {
    return `${this.nome} faz um som`;
  }
}

class Gato extends Animal {
  constructor(nome, cor) {
    super(nome);           // chama o constructor de Animal
    this.cor = cor;
  }
  falar() {                // sobrescreve
    return `${this.nome} faz miau`;
  }
}

const bichos = [new Animal('Genérico'), new Gato('Mimi', 'preto')];
for (const b of bichos) console.log(b.falar()); // polimorfismo
```

> 💡 **Dica:** **Polimorfismo**: o mesmo método (`falar`) se comporta de forma diferente conforme a classe. Quem chama não precisa saber qual é o tipo.

> ⚠️ **Atenção:** Prefira composição (objetos que usam outros objetos) a hierarquias profundas de herança. 1 ou 2 níveis costuma bastar.


## Exercícios

### Exercício 10.1 — Classe Retângulo
*Classes e POO · Fácil*

Crie a classe `Retangulo` com `constructor(largura, altura)` e os métodos `area()` e `perimetro()`. Adicione também o método `ehQuadrado()`.

**Código inicial:**

```js
class Retangulo {
  constructor(largura, altura) {
    
  }
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `new Retangulo(3, 4).area()` → deve resultar em **`12`** _(area)_
- `new Retangulo(3, 4).perimetro()` → deve resultar em **`14`** _(perimetro)_
- `new Retangulo(3, 4).ehQuadrado()` → deve resultar em **`false`** _(ehQuadrado false)_
- `new Retangulo(5, 5).ehQuadrado()` → deve resultar em **`true`** _(ehQuadrado true)_

**💡 Dicas** (use só se travar):

1. Guarde os valores em `this.largura` e `this.altura`.

---

### Exercício 10.2 — Conta bancária com #saldo
*Classes e POO · Médio*

Crie a classe `ContaBancaria`:

- `constructor(titular, saldoInicial = 0)`
- campo privado `#saldo`
- `get saldo` para leitura
- `depositar(valor)`: ignora valores ≤ 0; retorna o saldo
- `sacar(valor)`: retorna `false` se não houver saldo; senão desconta e retorna `true`

**Código inicial:**

```js
class ContaBancaria {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **deposita** → resultado esperado: `150`

  Teste executado pelo app:

  ```js
  (() => { const c = new ContaBancaria('Ana', 100);
  c.depositar(50);
  return c.saldo;
  })()
  ```
- `new ContaBancaria('Ana', 10).depositar(-5)` → deve resultar em **`10`** _(ignora depósito negativo)_
- **saque** → resultado esperado: `[ true, false, 70 ]`

  Teste executado pelo app:

  ```js
  (() => { const c = new ContaBancaria('Ana', 100);
  return [c.sacar(30), c.sacar(500), c.saldo];
  })()
  ```
- **saldo não pode ser alterado por fora** → resultado esperado: `100`

  Teste executado pelo app:

  ```js
  (() => { const c = new ContaBancaria('Ana', 100);
  try { c.saldo = 1e9;
  } catch (e) {} return c.saldo;
  })()
  ```
- 📏 Regra de código: Usou campo privado #saldo

**💡 Dicas** (use só se travar):

1. Declare `#saldo;` no topo da classe.
2. Getter: `get saldo() { return this.#saldo; }`

---

### Exercício 10.3 — Herança: Funcionário e Gerente
*Classes e POO · Médio*

Crie `Funcionario` com `constructor(nome, salario)` e o método `bonus()` que retorna 10% do salário. Depois crie `Gerente extends Funcionario` cujo `bonus()` é 20% do salário + 500. Ambos devem ter `resumo()` retornando `'Ana: bônus de 300'`, definido **só** em Funcionario.

**Código inicial:**

```js
class Funcionario {
  
}

class Gerente extends Funcionario {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `new Funcionario('Ana', 3000).bonus()` → deve resultar em **`300`** _(bonus do funcionário)_
- `new Gerente('Bia', 5000).bonus()` → deve resultar em **`1500`** _(bonus do gerente)_
- `new Gerente('Bia', 5000).resumo()` → deve resultar em **`'Bia: bônus de 1500'`** _(resumo do gerente usa o bonus dele)_
- `new Gerente('Bia', 1) instanceof Funcionario` → deve resultar em **`true`** _(Gerente é um Funcionario)_

**💡 Dicas** (use só se travar):

1. Gerente não precisa de constructor próprio se não tiver propriedades novas.
2. `resumo()` chama `this.bonus()`: para um Gerente, será o bonus do Gerente (polimorfismo).

---

### Exercício 10.4 — Conversor com métodos estáticos
*Classes e POO · Fácil*

Crie a classe `Conversor` com os métodos **estáticos** `kmParaMilhas(km)` (km × 0.621371, arredondado para 2 casas) e `milhasParaKm(mi)` (mi ÷ 0.621371, arredondado para 2 casas).

**Código inicial:**

```js
class Conversor {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `Conversor.kmParaMilhas(10)` → deve resultar em **`6.21`** _(10 km)_
- `Conversor.milhasParaKm(26.2)` → deve resultar em **`42.16`** _(26.2 mi)_
- 📏 Regra de código: Usou static

**💡 Dicas** (use só se travar):

1. `static nome() { }` e chame com `Conversor.nome()`.

---

### Exercício 10.5 — Carrinho de compras
*Classes e POO · Médio*

Crie a classe `Carrinho` com:

- `itens`: array começando vazio
- `adicionar(nome, preco, qtd = 1)`: se o produto já existir, soma a quantidade
- `remover(nome)`
- `get total`: soma preço × qtd
- `get quantidade`: soma das quantidades

**Código inicial:**

```js
class Carrinho {
  constructor() {
    this.itens = [];
  }
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **total e quantidade** → resultado esperado: `[ 41, 3 ]`

  Teste executado pelo app:

  ```js
  (() => { const c = new Carrinho();
  c.adicionar('Café', 20, 2);
  c.adicionar('Pão', 1);
  return [c.total, c.quantidade];
  })()
  ```
- **soma quantidade de item repetido** → resultado esperado: `[ 1, 3 ]`

  Teste executado pelo app:

  ```js
  (() => { const c = new Carrinho();
  c.adicionar('Café', 20);
  c.adicionar('Café', 20, 2);
  return [c.itens.length, c.quantidade];
  })()
  ```
- **remover** → resultado esperado: `7`

  Teste executado pelo app:

  ```js
  (() => { const c = new Carrinho();
  c.adicionar('A', 5);
  c.adicionar('B', 7);
  c.remover('A');
  return c.total;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Use `find` para ver se o item já existe.
2. Para remover, reatribua `this.itens` com um `filter`.
3. Getters com `reduce`.

---

### Exercício 10.6 — Estrutura de dados: Pilha
*Classes e POO · Médio*

Uma pilha funciona como uma pilha de pratos: o último que entra é o primeiro que sai. Crie a classe `Pilha` com `empilhar(item)`, `desempilhar()` (retorna o item ou `undefined`), `topo()` (olha sem remover), `get tamanho` e `estaVazia()`. Os itens devem ficar num campo privado.

**Código inicial:**

```js
class Pilha {
  #itens = [];
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **LIFO** → resultado esperado: `[ 2, 1, undefined ]`

  Teste executado pelo app:

  ```js
  (() => { const p = new Pilha();
  p.empilhar(1);
  p.empilhar(2);
  return [p.desempilhar(), p.desempilhar(), p.desempilhar()];
  })()
  ```
- **topo não remove** → resultado esperado: `[ 'a', 1 ]`

  Teste executado pelo app:

  ```js
  (() => { const p = new Pilha();
  p.empilhar('a');
  return [p.topo(), p.tamanho];
  })()
  ```
- **estaVazia** → resultado esperado: `[ true, false ]`

  Teste executado pelo app:

  ```js
  (() => { const p = new Pilha();
  const antes = p.estaVazia();
  p.empilhar(1);
  return [antes, p.estaVazia()];
  })()
  ```

**💡 Dicas** (use só se travar):

1. `push` e `pop` já fazem exatamente o comportamento de pilha.

---

### Exercício 10.7 — Polimorfismo com formas
*Classes e POO · Desafio*

Crie as classes `Circulo(raio)` e `Quadrado(lado)`, ambas estendendo `Forma` (já pronta), cada uma com seu método `area()`. Depois crie a função `somaDasAreas(formas)` que soma as áreas, arredondando o total para 2 casas decimais.

**Código inicial:**

```js
class Forma {
  area() {
    throw new Error('Implemente area() na classe filha');
  }
}

// crie Circulo e Quadrado

function somaDasAreas(formas) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `new Quadrado(3).area()` → deve resultar em **`9`** _(área do quadrado)_
- `Math.round(new Circulo(1).area() * 100) / 100` → deve resultar em **`3.14`** _(área do círculo)_
- `new Circulo(1) instanceof Forma && new Quadrado(1) instanceof Forma` → deve resultar em **`true`** _(herdam de Forma)_
- `somaDasAreas([new Quadrado(2), new Circulo(1), new Quadrado(1)])` → deve resultar em **`8.14`** _(soma das áreas)_

**💡 Dicas** (use só se travar):

1. Em classes filhas com constructor, chame `super()` antes de usar `this`.
2. Área do círculo: `Math.PI * raio ** 2`.

---

### Exercício 10.8 — Getter e setter de nome completo
*Classes e POO · Médio*

Crie a classe `Pessoa` com `constructor(nome, sobrenome)`, um `get nomeCompleto` que retorna `'Ada Lovelace'` e um `set nomeCompleto(valor)` que separa o texto no primeiro espaço e atualiza `nome` e `sobrenome` (o sobrenome pode ter várias palavras).

**✅ Resultado esperado** — o exercício está certo quando:

- `new Pessoa('Ada', 'Lovelace').nomeCompleto` → deve resultar em **`'Ada Lovelace'`** _(get)_
- **set** → resultado esperado: `[ 'Grace', 'Brewster Hopper' ]`

  Teste executado pelo app:

  ```js
  (() => { const p = new Pessoa('a', 'b');
  p.nomeCompleto = 'Grace Brewster Hopper';
  return [p.nome, p.sobrenome];
  })()
  ```

**💡 Dicas** (use só se travar):

1. `const [primeiro, ...resto] = texto.split(' ');`

## Quiz

1. Qual palavra cria uma instância de uma classe?
   a) class
   b) new
   c) this
   d) extends

2. Em uma classe filha com constructor, o que deve ser chamado antes de usar `this`?
   a) this()
   b) super()
   c) parent()
   d) new()

3. Como acessar um getter `get total()`?
   a) `obj.total()`
   b) `obj.total`
   c) `obj.getTotal()`
   d) `obj[total]()`

4. Um método `static` é chamado:
   a) Na instância
   b) Na própria classe
   c) Apenas no constructor
   d) Nunca

5. O que `#` antes do nome de um campo significa?
   a) Comentário
   b) Campo privado
   c) Campo estático
   d) Número

## Desafio extra

Modele com classes um sistema pequeno do seu interesse (ex.: biblioteca com Livro e Emprestimo). Desenhe as classes antes de codar.


# Dia 11 — Erros, depuração, Map, Set e módulos

*Escrever código robusto: tratar e lançar erros, depurar com método, usar Map/Set e organizar código em módulos.* · Tempo estimado: ~3.5h

## Objetivos

- Tratar erros com try/catch/finally e lançar erros com throw
- Criar classes de erro personalizadas
- Seguir um método de depuração (ler a mensagem, isolar, inspecionar)
- Usar Set para valores únicos e Map para pares chave/valor
- Entender import/export (módulos)

## Aula

### 11.1 try / catch / finally

```js
try {
  const dados = JSON.parse('{ inválido }');
  console.log('não chega aqui');
} catch (erro) {
  console.log('Deu ruim:', erro.name, '-', erro.message);
} finally {
  console.log('finally sempre executa');
}
console.log('o programa continua!');
```

### 11.2 Lançando erros com throw

Quando a sua função recebe algo inválido, é melhor **falhar cedo e com uma mensagem clara** do que devolver um resultado errado em silêncio.

```js
function sacar(saldo, valor) {
  if (typeof valor !== 'number' || valor <= 0) {
    throw new Error('Valor de saque inválido');
  }
  if (valor > saldo) {
    throw new RangeError('Saldo insuficiente');
  }
  return saldo - valor;
}

try {
  sacar(100, 500);
} catch (e) {
  console.log(e instanceof RangeError, e.message);
}
```

### 11.3 Erros personalizados

```js
class ValidacaoError extends Error {
  constructor(campo, mensagem) {
    super(mensagem);
    this.name = 'ValidacaoError';
    this.campo = campo;
  }
}
try {
  throw new ValidacaoError('email', 'E-mail obrigatório');
} catch (e) {
  if (e instanceof ValidacaoError) console.log(`Campo ${e.campo}: ${e.message}`);
  else throw e; // erros que você não sabe tratar: relance!
}
```

### 11.4 Método de depuração

- **1. Leia a mensagem inteira**: tipo do erro, texto e número da linha. Este app traduz as mensagens para você.
- **2. Reproduza** com o menor exemplo possível.
- **3. Inspecione** valores com `console.log` antes da linha do erro (ou use `debugger` com o DevTools aberto — F12).
- **4. Formule uma hipótese** e teste uma mudança por vez.
- **5. Explique o código em voz alta** (técnica do “patinho de borracha”).

```js
const itens = [{ preco: 10 }, { preco: 20 }];
let total = 0;
for (let i = 0; i <= itens.length; i++) { // bug proposital
  console.log('i =', i, 'item =', itens[i]);
  // total += itens[i].preco; // descomente e veja o erro
}
```

### 11.5 Set: coleção de valores únicos

```js
const tags = new Set(['js', 'css', 'js']);
tags.add('html');
console.log(tags.size, tags.has('css')); // 3 true
tags.delete('css');
console.log([...tags]);                  // volta para array

const unicos = [...new Set([1, 1, 2, 3, 3])];
console.log(unicos);
```

### 11.6 Map: dicionário com qualquer tipo de chave

```js
const precos = new Map();
precos.set('café', 12);
precos.set('pão', 1.5);
console.log(precos.get('café'), precos.has('chá'), precos.size);
for (const [produto, preco] of precos) {
  console.log(produto, preco);
}
```

> 💡 **Dica:** Use objeto `{}` para registros com campos fixos (um usuário). Use `Map` para coleções dinâmicas de chave → valor, especialmente com adições/remoções frequentes.

### 11.7 Módulos: import e export

Em projetos reais, o código é dividido em arquivos. Cada arquivo é um **módulo** que exporta o que quer compartilhar. (O editor deste app roda um arquivo só, então aqui é só leitura — mas este próprio app é feito assim: veja a pasta `src/`.)

```js
// arquivo: matematica.js
export function somar(a, b) { return a + b; }
export const PI = 3.14159;
export default function media(lista) { /* ... */ }

// arquivo: app.js
import media, { somar, PI } from './matematica.js';
console.log(somar(1, 2), PI);
```


## Exercícios

### Exercício 11.1 — Divisão segura
*Erros e depuração · Fácil*

Crie `dividir(a, b)` que lança `new Error('Divisão por zero')` quando `b` for 0; caso contrário retorna a divisão.

**Código inicial:**

```js
function dividir(a, b) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `dividir(10, 2)` → deve resultar em **`5`**
- **dividir(1, 0) lança erro** → resultado esperado: `'Divisão por zero'`

  Teste executado pelo app:

  ```js
  (() => { try { dividir(1, 0);
  return 'não lançou';
  } catch (e) { return e.message;
  } })()
  ```

**💡 Dicas** (use só se travar):

1. `throw new Error('mensagem')` interrompe a função.

---

### Exercício 11.2 — JSON.parse sem quebrar
*Erros e depuração · Fácil*

Crie `lerJSON(texto)` que retorna o objeto convertido, ou `null` se o texto não for um JSON válido.

**✅ Resultado esperado** — o exercício está certo quando:

- `lerJSON('{"a":1}')` → deve resultar em **`{ a: 1 }`** _(válido)_
- `lerJSON('{a:1}')` → deve resultar em **`null`** _(inválido → null)_
- `lerJSON('')` → deve resultar em **`null`** _(vazio → null)_

**💡 Dicas** (use só se travar):

1. Envolva o `JSON.parse` em `try/catch`.

---

### Exercício 11.3 — Validar cadastro
*Erros e depuração · Médio*

Crie `validarUsuario(usuario)` que lança erros com estas mensagens exatas, na ordem:

- `'Nome obrigatório'` se não houver nome (ou for só espaços)
- `'E-mail inválido'` se o e-mail não contiver `@`
- `'Idade inválida'` se a idade não for um número inteiro entre 0 e 130
Se estiver tudo certo, retorne `true`.

**Código inicial:**

```js
function validarUsuario(usuario) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `validarUsuario({ nome: 'Ana', email: 'a@b.com', idade: 30 })` → deve resultar em **`true`** _(válido)_
- **sem nome** → resultado esperado: `'Nome obrigatório'`

  Teste executado pelo app:

  ```js
  (() => { try { validarUsuario({ nome: '  ', email: 'a@b', idade: 1 });
  } catch (e) { return e.message;
  } })()
  ```
- **e-mail sem @** → resultado esperado: `'E-mail inválido'`

  Teste executado pelo app:

  ```js
  (() => { try { validarUsuario({ nome: 'A', email: 'ab.com', idade: 1 });
  } catch (e) { return e.message;
  } })()
  ```
- **sem e-mail** → resultado esperado: `'E-mail inválido'`

  Teste executado pelo app:

  ```js
  (() => { try { validarUsuario({ nome: 'A', idade: 1 });
  } catch (e) { return e.message;
  } })()
  ```
- **idade texto** → resultado esperado: `'Idade inválida'`

  Teste executado pelo app:

  ```js
  (() => { try { validarUsuario({ nome: 'A', email: 'a@b', idade: '30' });
  } catch (e) { return e.message;
  } })()
  ```

**💡 Dicas** (use só se travar):

1. `Number.isInteger(x)` já retorna false para textos e decimais.
2. Cuidado: o e-mail pode estar ausente (`undefined`).

---

### Exercício 11.4 — Classe de erro personalizada
*Erros e depuração · Médio*

Crie `class EstoqueError extends Error` com `constructor(produto, mensagem)`, definindo `name = 'EstoqueError'` e a propriedade `produto`. Depois crie `retirar(estoque, produto, qtd)` que lança `EstoqueError` com a mensagem `'Estoque insuficiente'` se não houver quantidade, ou retorna a quantidade restante (alterando o estoque).

**Código inicial:**

```js
class EstoqueError extends Error {
  
}

function retirar(estoque, produto, qtd) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `retirar({ caneta: 10 }, 'caneta', 3)` → deve resultar em **`7`** _(retira)_
- **erro personalizado** → resultado esperado: `[ true, true, 'EstoqueError', 'caneta', 'Estoque insuficiente' ]`

  Teste executado pelo app:

  ```js
  (() => { try { retirar({ caneta: 1 }, 'caneta', 3);
  } catch (e) { return [e instanceof EstoqueError, e instanceof Error, e.name, e.produto, e.message];
  } })()
  ```
- **produto inexistente** → resultado esperado: `'EstoqueError'`

  Teste executado pelo app:

  ```js
  (() => { try { retirar({}, 'lápis', 1);
  return 'ok';
  } catch (e) { return e.name;
  } })()
  ```

**💡 Dicas** (use só se travar):

1. Chame `super(mensagem)` no constructor.
2. Produto inexistente conta como estoque 0.

---

### Exercício 11.5 — Depuração: média errada
*Erros e depuração · Médio*

A função abaixo deveria calcular a média, mas retorna `NaN`. Use `console.log` dentro do laço para descobrir por quê, e corrija. (Ela também deve retornar 0 para lista vazia.)

**Código inicial:**

```js
function media(notas) {
  let soma = 0;
  for (let i = 0; i <= notas.length; i++) {
    soma += notas[i];
  }
  return soma / notas.length;
}

console.log(media([7, 8, 9]));
```

**✅ Resultado esperado** — o exercício está certo quando:

- `media([7, 8, 9])` → deve resultar em **`8`**
- `media([])` → deve resultar em **`0`**

**💡 Dicas** (use só se travar):

1. Mostre `i` e `notas[i]` a cada volta. Na última volta, o que aparece?
2. Um índice igual a `length` está fora do array (erro “off-by-one”).

---

### Exercício 11.6 — Set: tags únicas
*Map e Set · Fácil*

Crie `tagsUnicas(posts)`: cada post tem `tags` (array). Retorne um array com todas as tags sem repetição, em ordem alfabética. Use `Set`.

**✅ Resultado esperado** — o exercício está certo quando:

- `tagsUnicas([{ tags: ['js', 'web'] }, { tags: ['css', 'js'] }])` → deve resultar em **`[ 'css', 'js', 'web' ]`** _(tags únicas ordenadas)_
- `tagsUnicas([])` → deve resultar em **`[]`** _(vazio)_
- 📏 Regra de código: Usou Set

**💡 Dicas** (use só se travar):

1. Adicione tudo num `new Set()` com `add`.
2. Converta de volta: `[...set]`.

---

### Exercício 11.7 — Set: amigos em comum
*Map e Set · Médio*

Crie `emComum(a, b)` que retorna os itens presentes nos dois arrays (sem repetição, na ordem em que aparecem em `a`).

**✅ Resultado esperado** — o exercício está certo quando:

- `emComum(['Ana', 'Bia', 'Caio'], ['Caio', 'Dani', 'Ana'])` → deve resultar em **`[ 'Ana', 'Caio' ]`** _(amigos)_
- `emComum([1, 1, 2], [1, 2, 2])` → deve resultar em **`[ 1, 2 ]`** _(repetidos)_
- `emComum([1], [2])` → deve resultar em **`[]`** _(nada em comum)_

**💡 Dicas** (use só se travar):

1. Transforme `b` num Set e use `has` — é muito mais rápido que `includes` em listas grandes.

---

### Exercício 11.8 — Map: contar palavras
*Map e Set · Médio*

Crie `contarPalavras(texto)` que retorna um `Map` com cada palavra (em minúsculas) e quantas vezes aparece.

**✅ Resultado esperado** — o exercício está certo quando:

- `contarPalavras('O gato e o rato')` → deve resultar em **`Map(4) { 'o' => 2, 'gato' => 1, 'e' => 1, 'rato' => 1 }`** _(conta)_
- `contarPalavras('a') instanceof Map` → deve resultar em **`true`** _(retorna Map)_

**💡 Dicas** (use só se travar):

1. `map.get(chave)` retorna `undefined` se não existir: use `?? 0`.

---

### Exercício 11.9 — Executar com segurança
*Erros e depuração · Médio*

Crie `tentar(fn)` que executa `fn()` e retorna `{ ok: true, valor }` se deu certo ou `{ ok: false, erro: mensagem }` se lançou erro.

**✅ Resultado esperado** — o exercício está certo quando:

- `tentar(() => 42)` → deve resultar em **`{ ok: true, valor: 42 }`** _(sucesso)_
- `tentar(() => { throw new Error('ops'); })` → deve resultar em **`{ ok: false, erro: 'ops' }`** _(falha)_

**💡 Dicas** (use só se travar):

1. Padrão muito usado em APIs: em vez de lançar, devolver um “resultado”.

## Quiz

1. Quando o bloco `finally` executa?
   a) Só se der erro
   b) Só se não der erro
   c) Sempre
   d) Nunca

2. `[...new Set([1, 2, 2, 3])]` resulta em:
   a) [1, 2, 2, 3]
   b) [1, 2, 3]
   c) Set {1,2,3}
   d) 3

3. Qual o primeiro passo ao encontrar um erro?
   a) Apagar o código
   b) Ler a mensagem e a linha indicada
   c) Pedir ajuda
   d) Reiniciar o computador

4. Como ler o valor da chave 'a' de um Map `m`?
   a) `m.a`
   b) `m['a']`
   c) `m.get('a')`
   d) `m.find('a')`

5. Em `import x, { y } from './m.js'`, `x` é:
   a) O export default
   b) Um export nomeado
   c) O arquivo inteiro
   d) Erro

## Desafio extra

Abra o DevTools (F12) do navegador, aba Sources, e coloque um breakpoint em algum site. Explore o painel de variáveis.


# Dia 12 — DOM e eventos: JavaScript na página

*Selecionar, criar e alterar elementos HTML e reagir a cliques, digitação e formulários.* · Tempo estimado: ~3.5h

## Objetivos

- Selecionar elementos com querySelector/querySelectorAll
- Alterar texto, classes e atributos
- Criar e inserir elementos a partir de dados
- Reagir a eventos com addEventListener
- Ler formulários e usar delegação de eventos

## Aula

### 12.1 O que é o DOM

Quando o navegador lê o HTML, ele cria uma árvore de objetos — o **DOM** (Document Object Model). O JavaScript manipula essa árvore através do objeto `document`, e a página se atualiza na hora.

Nos exercícios de hoje cada exercício já vem com um HTML pronto. Depois de executar, a aba **Página** mostra como o HTML ficou.

> ⚠️ **Atenção:** Aqui os exercícios rodam numa página simulada (sem CSS e sem layout). Para ver o resultado visual de verdade, faça o desafio extra no seu computador.

### 12.2 Selecionando e alterando

```js
// HTML: <h1 id="titulo">Olá</h1> <p class="info">a</p> <p class="info">b</p>
document.body.innerHTML = '<h1 id="titulo">Olá</h1><p class="info">a</p><p class="info">b</p>';

const titulo = document.querySelector('#titulo');  // por id
const infos = document.querySelectorAll('.info');  // todos com a classe
titulo.textContent = 'Novo título';
titulo.classList.add('destaque');
infos.forEach(p => p.style.color = 'red');
titulo.setAttribute('data-x', '1');
console.log(document.body.innerHTML);
```

- `textContent`: só texto (seguro).
- `innerHTML`: interpreta HTML. **Nunca** use com texto digitado pelo usuário (risco de XSS).
- `classList.add / remove / toggle / contains`: manipula classes CSS.

### 12.3 Criando elementos

```js
document.body.innerHTML = '<ul id="lista"></ul>';
const lista = document.querySelector('#lista');
for (const fruta of ['maçã', 'uva']) {
  const li = document.createElement('li');
  li.textContent = fruta;
  lista.append(li);
}
console.log(lista.outerHTML);
```

### 12.4 Eventos

```js
document.body.innerHTML = '<button id="btn">Clique</button><span id="n">0</span>';
const botao = document.querySelector('#btn');
const span = document.querySelector('#n');
let cliques = 0;
botao.addEventListener('click', (evento) => {
  cliques++;
  span.textContent = cliques;
  console.log('clicou em', evento.target.id);
});
botao.click(); // simula cliques
botao.click();
console.log(span.textContent);
```

Eventos comuns: `click`, `input` (a cada tecla), `change`, `submit` (formulário), `keydown`.

### 12.5 Formulários

```js
document.body.innerHTML = '<form id="f"><input id="nome" value="Ana"><button>Enviar</button></form>';
document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault(); // impede o recarregamento da página
  const nome = document.querySelector('#nome').value.trim();
  console.log('Enviado:', nome);
});
document.querySelector('#f').dispatchEvent(new Event('submit', { cancelable: true }));
```

### 12.6 Delegação de eventos

Em vez de colocar um listener em cada item de uma lista, coloque **um** no elemento pai e use `event.target`. Funciona inclusive para itens criados depois.

```js
document.body.innerHTML = '<ul id="tarefas"><li>Estudar</li><li>Treinar</li></ul>';
document.querySelector('#tarefas').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') e.target.classList.toggle('feita');
});
document.querySelectorAll('li')[1].click();
console.log(document.body.innerHTML);
```


## Exercícios

### Exercício 12.1 — Trocar o título
*DOM e eventos · Fácil*

HTML da página:

```
<h1 id="titulo">Olá</h1>
<p id="sub">texto antigo</p>
```

Mude o texto do `h1` para `Bem-vindo ao DOM` e o do parágrafo para `JavaScript manipulando a página`.

**HTML da página (simulada):**

```html
<h1 id="titulo">Olá</h1><p id="sub">texto antigo</p>
```

**Código inicial:**

```js
const titulo = document.querySelector('#titulo');
```

**✅ Resultado esperado** — o exercício está certo quando:

- `document.querySelector('#titulo').textContent` → deve resultar em **`'Bem-vindo ao DOM'`** _(título alterado)_
- `document.querySelector('#sub').textContent` → deve resultar em **`'JavaScript manipulando a página'`** _(parágrafo alterado)_

**💡 Dicas** (use só se travar):

1. `elemento.textContent = 'novo texto';`

---

### Exercício 12.2 — Mexendo em classes
*DOM e eventos · Fácil*

HTML: `<p id="aviso" class="aviso oculto">Atenção!</p>`

Remova a classe `oculto` e adicione a classe `destaque`.

**HTML da página (simulada):**

```html
<p id="aviso" class="aviso oculto">Atenção!</p>
```

**✅ Resultado esperado** — o exercício está certo quando:

- `document.querySelector('#aviso').classList.contains('oculto')` → deve resultar em **`false`** _(sem "oculto")_
- `document.querySelector('#aviso').classList.contains('destaque')` → deve resultar em **`true`** _(com "destaque")_
- `document.querySelector('#aviso').classList.contains('aviso')` → deve resultar em **`true`** _(mantém "aviso")_

**💡 Dicas** (use só se travar):

1. `classList.remove('x')` e `classList.add('y')`.

---

### Exercício 12.3 — Criar lista a partir de dados
*DOM e eventos · Médio*

HTML: `<ul id="lista"></ul>`

Para cada fruta do array, crie um `<li>` com o nome e adicione na lista. Use `createElement`.

**HTML da página (simulada):**

```html
<ul id="lista"></ul>
```

**Código inicial:**

```js
const frutas = ['maçã', 'banana', 'uva'];
```

**✅ Resultado esperado** — o exercício está certo quando:

- `document.querySelectorAll('#lista li').length` → deve resultar em **`3`** _(3 itens)_
- `[...document.querySelectorAll('#lista li')].map(li => li.textContent)` → deve resultar em **`[ 'maçã', 'banana', 'uva' ]`** _(textos corretos)_
- 📏 Regra de código: Usou createElement

**💡 Dicas** (use só se travar):

1. `document.createElement('li')` cria; `lista.append(li)` insere.

---

### Exercício 12.4 — Contador de cliques
*DOM e eventos · Médio*

HTML:

```
<button id="menos">-</button>
<span id="valor">0</span>
<button id="mais">+</button>
```

Faça os botões aumentarem e diminuírem o número mostrado no `span`. O valor nunca pode ficar negativo.

**HTML da página (simulada):**

```html
<button id="menos">-</button><span id="valor">0</span><button id="mais">+</button>
```

**✅ Resultado esperado** — o exercício está certo quando:

- **+ + + - → 2** → resultado esperado: `'2'`

  Teste executado pelo app:

  ```js
  (() => { const m = document.querySelector('#mais');
  m.click();
  m.click();
  m.click();
  document.querySelector('#menos').click();
  return document.querySelector('#valor').textContent;
  })()
  ```
- **não fica negativo** → resultado esperado: `'0'`

  Teste executado pelo app:

  ```js
  (() => { const menos = document.querySelector('#menos');
  for (let i = 0;
  i < 5;
  i++) menos.click();
  return document.querySelector('#valor').textContent;
  })()
  ```
- 📏 Regra de código: Usou addEventListener

**💡 Dicas** (use só se travar):

1. Guarde a contagem numa variável `let` e atualize o `textContent` a cada clique.
2. Antes de diminuir, verifique se é maior que 0.

---

### Exercício 12.5 — Formulário de saudação
*DOM e eventos · Médio*

HTML:

```
<form id="form">
  <input id="nome">
  <button>Saudar</button>
</form>
<p id="saida"></p>
```

Ao enviar o formulário (`submit`): impeça o recarregamento, leia o nome (sem espaços nas pontas) e mostre `Olá, Ana!` no parágrafo. Se o nome estiver vazio, mostre `Digite seu nome`.

**HTML da página (simulada):**

```html
<form id="form"><input id="nome" placeholder="Seu nome"><button>Saudar</button></form><p id="saida"></p>
```

**Código inicial:**

```js
const form = document.querySelector('#form');
```

**✅ Resultado esperado** — o exercício está certo quando:

- **saúda pelo nome** → resultado esperado: `'Olá, Ana!'`

  Teste executado pelo app:

  ```js
  (() => { document.querySelector('#nome').value = '  Ana ';
  document.querySelector('#form').dispatchEvent(new Event('submit', { cancelable: true }));
  return document.querySelector('#saida').textContent;
  })()
  ```
- **nome vazio** → resultado esperado: `'Digite seu nome'`

  Teste executado pelo app:

  ```js
  (() => { document.querySelector('#nome').value = '   ';
  document.querySelector('#form').dispatchEvent(new Event('submit', { cancelable: true }));
  return document.querySelector('#saida').textContent;
  })()
  ```
- **chama preventDefault** → resultado esperado: `true`

  Teste executado pelo app:

  ```js
  (() => { const ev = new Event('submit', { cancelable: true });
  document.querySelector('#form').dispatchEvent(ev);
  return ev.defaultPrevented;
  })()
  ```

**💡 Dicas** (use só se travar):

1. `form.addEventListener('submit', (e) => { e.preventDefault(); ... })`
2. O valor do input fica em `.value`.

---

### Exercício 12.6 — Lista de tarefas com delegação
*DOM e eventos · Médio*

HTML: uma `<ul id="tarefas">` com 3 `<li>`.

Com **um único** `addEventListener` na `ul`, faça com que clicar num `li` alterne a classe `feita`.

**HTML da página (simulada):**

```html
<ul id="tarefas"><li>Estudar JS</li><li>Fazer exercícios</li><li>Descansar</li></ul>
```

**✅ Resultado esperado** — o exercício está certo quando:

- **clicar marca** → resultado esperado: `true`

  Teste executado pelo app:

  ```js
  (() => { const li = document.querySelectorAll('#tarefas li')[1];
  li.click();
  return li.classList.contains('feita');
  })()
  ```
- **clicar de novo desmarca** → resultado esperado: `false`

  Teste executado pelo app:

  ```js
  (() => { const li = document.querySelectorAll('#tarefas li')[0];
  li.click();
  li.click();
  return li.classList.contains('feita');
  })()
  ```
- **funciona para itens novos** → resultado esperado: `true`

  Teste executado pelo app:

  ```js
  (() => { const li = document.createElement('li');
  li.textContent = 'Nova';
  document.querySelector('#tarefas').append(li);
  li.click();
  return li.classList.contains('feita');
  })()
  ```
- 📏 Regra de código: Usou apenas um addEventListener

**💡 Dicas** (use só se travar):

1. O evento “sobe” do `li` até a `ul` (bubbling).
2. Use `e.target` para saber qual li foi clicado e `classList.toggle`.

---

### Exercício 12.7 — Renderizar vitrine de produtos
*DOM e eventos · Desafio*

Crie `renderizar(produtos)` que preenche `<div id="vitrine">` com um card por produto:

```
<div class="card">
  <h3>Teclado</h3>
  <p>R$ 150.00</p>
</div>
```

Chamar `renderizar` de novo deve **substituir** os cards (não duplicar). Use `textContent` para os textos (segurança!).

**HTML da página (simulada):**

```html
<div id="vitrine"></div>
```

**Código inicial:**

```js
function renderizar(produtos) {
  const vitrine = document.querySelector('#vitrine');
  
}

renderizar([{ nome: 'Teclado', preco: 150 }, { nome: 'Mouse', preco: 80 }]);
```

**✅ Resultado esperado** — o exercício está certo quando:

- `document.querySelectorAll('#vitrine .card').length` → deve resultar em **`2`** _(2 cards na carga)_
- **conteúdo do card** → resultado esperado: `[ 'Teclado', 'R$ 150.00' ]`

  Teste executado pelo app:

  ```js
  [document.querySelector('.card h3').textContent, document.querySelector('.card p').textContent]
  ```
- **renderizar de novo substitui** → resultado esperado: `1`

  Teste executado pelo app:

  ```js
  (() => { renderizar([{ nome: 'Monitor', preco: 900 }]);
  return document.querySelectorAll('#vitrine .card').length;
  })()
  ```
- **não interpreta HTML do nome** → resultado esperado: `0`

  Teste executado pelo app:

  ```js
  (() => { renderizar([{ nome: '<b>x</b>', preco: 1 }]);
  return document.querySelectorAll('#vitrine b').length;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Limpe antes: `vitrine.innerHTML = ''` (seguro, pois é um texto fixo).
2. `card.append(h3, p)` aceita vários elementos.

---

### Exercício 12.8 — Filtro ao digitar
*DOM e eventos · Desafio*

HTML: um `<input id="busca">` e uma lista `<ul id="nomes">` com Ana, Bruno, Carla e Mariana.

No evento `input`, adicione a classe `oculto` aos `li` que **não** contêm o texto digitado (sem diferenciar maiúsculas) e remova dos que contêm.

**HTML da página (simulada):**

```html
<input id="busca" placeholder="Buscar"><ul id="nomes"><li>Ana</li><li>Bruno</li><li>Carla</li><li>Mariana</li></ul>
```

**✅ Resultado esperado** — o exercício está certo quando:

- **"an" mostra Ana e Mariana** → resultado esperado: `[ 'Ana', 'Mariana' ]`

  Teste executado pelo app:

  ```js
  (() => { const b = document.querySelector('#busca');
  b.value = 'an';
  b.dispatchEvent(new Event('input'));
  return [...document.querySelectorAll('#nomes li:not(.oculto)')].map(li => li.textContent);
  })()
  ```
- **maiúsculas** → resultado esperado: `[ 'Bruno' ]`

  Teste executado pelo app:

  ```js
  (() => { const b = document.querySelector('#busca');
  b.value = 'BR';
  b.dispatchEvent(new Event('input'));
  return [...document.querySelectorAll('#nomes li:not(.oculto)')].map(li => li.textContent);
  })()
  ```
- **vazio mostra todos** → resultado esperado: `0`

  Teste executado pelo app:

  ```js
  (() => { const b = document.querySelector('#busca');
  b.value = 'x';
  b.dispatchEvent(new Event('input'));
  b.value = '';
  b.dispatchEvent(new Event('input'));
  return document.querySelectorAll('#nomes li.oculto').length;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Percorra os li com `for...of` e compare com `includes`.
2. `classList.toggle('classe', condicao)` adiciona se a condição for true e remove se for false.

## Quiz

1. Qual método seleciona **todos** os elementos com a classe `item`?
   a) `getElementById('item')`
   b) `querySelector('.item')`
   c) `querySelectorAll('.item')`
   d) `select('item')`

2. Por que evitar `innerHTML` com texto digitado pelo usuário?
   a) É lento
   b) Risco de XSS (injeção de código)
   c) Não funciona no celular
   d) Apaga o CSS

3. O que `event.preventDefault()` faz num submit?
   a) Envia o formulário
   b) Impede o comportamento padrão (recarregar a página)
   c) Apaga os campos
   d) Para outros listeners

4. Na delegação de eventos, o listener fica:
   a) Em cada filho
   b) No elemento pai
   c) No window apenas
   d) No CSS

5. Qual evento dispara a cada tecla digitada num input?
   a) change
   b) submit
   c) input
   d) load

## Desafio extra

No seu computador, crie `index.html` + `app.js` e refaça a lista de tarefas com CSS de verdade. Publique na Vercel (arraste a pasta em vercel.com/new) para treinar o deploy.


# Dia 13 — JavaScript assíncrono: Promises e async/await

*Lidar com operações que demoram (rede, banco de dados, timers) sem travar o programa.* · Tempo estimado: ~4h

## Objetivos

- Entender por que existe código assíncrono e o event loop
- Usar setTimeout e callbacks
- Criar e consumir Promises (then/catch/finally)
- Escrever código assíncrono legível com async/await e try/catch
- Buscar dados com fetch e executar requisições em paralelo com Promise.all

## Aula

### 13.1 Por que assíncrono?

Buscar dados na internet ou no Firebase leva tempo. Se o JavaScript esperasse parado, a tela travaria. Em vez disso, ele **agenda** a continuação e segue executando o resto. Quando a resposta chega, o *event loop* executa a continuação.

```js
console.log('1. início');
setTimeout(() => console.log('3. depois de 500ms'), 500);
console.log('2. fim do código síncrono');
```

> 💡 **Dica:** Mesmo `setTimeout(fn, 0)` só executa depois que todo o código síncrono terminar.

### 13.2 Promises

Uma **Promise** representa um valor que ainda vai existir. Ela pode ser *resolvida* (sucesso) ou *rejeitada* (erro).

```js
function sortear() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.random();
      if (n > 0.3) resolve(n);
      else reject(new Error('Azar!'));
    }, 300);
  });
}

sortear()
  .then(valor => console.log('Sucesso:', valor.toFixed(2)))
  .catch(erro => console.log('Falhou:', erro.message))
  .finally(() => console.log('Terminou'));
```

### 13.3 async / await

`await` “pausa” a função `async` até a Promise resolver, deixando o código com cara de síncrono. Erros viram exceções que você trata com `try/catch`.

```js
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function preparar() {
  console.log('Fervendo água...');
  await esperar(300);
  console.log('Passando café...');
  await esperar(300);
  return 'Café pronto ☕';
}

preparar().then(msg => console.log(msg));
```

> ⚠️ **Atenção:** Uma função `async` **sempre** retorna uma Promise. Quem chama precisa usar `await` ou `.then` para pegar o valor.

### 13.4 fetch: buscando dados

Neste app, o `fetch` é simulado (funciona offline) com uma API de exemplo:

- `https://api.exemplo.com/usuarios` e `/usuarios/1`
- `https://api.exemplo.com/produtos` e `/produtos/1`
Qualquer outro recurso retorna status 404.

```js
async function carregar() {
  try {
    const resposta = await fetch('https://api.exemplo.com/usuarios/1');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    const usuario = await resposta.json();
    console.log(usuario);
  } catch (erro) {
    console.log('Erro:', erro.message);
  }
}
carregar();
```

### 13.5 Em paralelo: Promise.all

```js
async function carregarTudo() {
  const [usuarios, produtos] = await Promise.all([
    fetch('https://api.exemplo.com/usuarios').then(r => r.json()),
    fetch('https://api.exemplo.com/produtos').then(r => r.json()),
  ]);
  console.log(usuarios.length, 'usuários e', produtos.length, 'produtos');
}
carregarTudo();
```

- `Promise.all`: espera todas; falha se uma falhar.
- `Promise.allSettled`: espera todas e informa o status de cada uma.
- `Promise.race`: a primeira que terminar (sucesso ou erro) vence.

> 💡 **Dica:** É exatamente assim que você vai ler e gravar dados no Firestore: `await getDoc(...)`, `await setDoc(...)`.


## Exercícios

### Exercício 13.1 — Função esperar
*Assíncrono (Promises, async/await) · Fácil*

Crie `esperar(ms)` que retorna uma Promise resolvida depois de `ms` milissegundos.

**Código inicial:**

```js
function esperar(ms) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `esperar(1) instanceof Promise` → deve resultar em **`true`** _(retorna Promise)_
- **espera o tempo** → resultado esperado: `true`

  Teste executado pelo app:

  ```js
  (async () => { const t = Date.now();
  await esperar(120);
  return Date.now() - t >= 100;
  })()
  ```

**💡 Dicas** (use só se travar):

1. `return new Promise(resolve => setTimeout(resolve, ms));`

---

### Exercício 13.2 — Ordem de execução
*Assíncrono (Promises, async/await) · Fácil*

Usando `setTimeout`, faça o console mostrar `A`, `C`, `B` (nesta ordem), mas escrevendo os `console.log` na ordem A, B, C no código.

**Código inicial:**

```js
console.log('A');
console.log('B');
console.log('C');
```

**✅ Resultado esperado** — o exercício está certo quando:

- **Saída A, C, B** — o console deve mostrar exatamente:

```
A
C
B
```
- 📏 Regra de código: Usou setTimeout
- 📏 Regra de código: Logs escritos na ordem A, B, C

**💡 Dicas** (use só se travar):

1. Coloque o log do B dentro de um `setTimeout`.

---

### Exercício 13.3 — Buscar nome do usuário
*Assíncrono (Promises, async/await) · Médio*

Crie `async function nomeDoUsuario(id)` que busca `https://api.exemplo.com/usuarios/{id}` e retorna o `nome`. Se a resposta não for `ok`, retorne `null`.

**Código inicial:**

```js
async function nomeDoUsuario(id) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `nomeDoUsuario(1)` → deve resultar em **`'Ana'`** _(id 1 → "Ana")_
- `nomeDoUsuario(3)` → deve resultar em **`'Carla'`** _(id 3 → "Carla")_
- `nomeDoUsuario(99)` → deve resultar em **`null`** _(id 99 → null)_
- 📏 Regra de código: Usou await

**💡 Dicas** (use só se travar):

1. `const resposta = await fetch(url);`
2. `const dados = await resposta.json();`
3. Verifique `resposta.ok` antes.

---

### Exercício 13.4 — Promise que falha
*Assíncrono (Promises, async/await) · Médio*

Crie `dividirDepois(a, b)` que retorna uma Promise: após 50ms, resolve com `a / b`, ou rejeita com `new Error('Divisão por zero')` se `b` for 0.

**Código inicial:**

```js
function dividirDepois(a, b) {
  return new Promise((resolve, reject) => {
    
  });
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `dividirDepois(10, 4)` → deve resultar em **`2.5`** _(resolve 10 / 4)_
- `dividirDepois(1, 0).then(() => 'resolveu', e => e.message)` → deve resultar em **`'Divisão por zero'`** _(rejeita divisão por zero)_

**💡 Dicas** (use só se travar):

1. Dentro do `setTimeout`, chame `reject(...)` ou `resolve(...)`.

---

### Exercício 13.5 — Usuários ativos
*Assíncrono (Promises, async/await) · Médio*

Crie `async function nomesAtivos()` que busca `https://api.exemplo.com/usuarios` e retorna os nomes dos usuários com `ativo: true`.

**✅ Resultado esperado** — o exercício está certo quando:

- `nomesAtivos()` → deve resultar em **`[ 'Ana', 'Carla' ]`** _(Ana e Carla)_

**💡 Dicas** (use só se travar):

1. Busque, converta com `.json()` e use `filter` + `map` (dia 8!).

---

### Exercício 13.6 — Tratamento de erros com await
*Assíncrono (Promises, async/await) · Médio*

Crie `async function buscarProduto(id)` que retorna o produto de `https://api.exemplo.com/produtos/{id}`. Deve retornar `null` se o status não for ok **ou** se o fetch lançar um erro (use try/catch).

Dica: `fetch('https://url-invalida')` lança erro no simulador.

**✅ Resultado esperado** — o exercício está certo quando:

- `buscarProduto(2)` → deve resultar em **`{ id: 2, nome: 'Mouse', preco: 80 }`** _(produto 2)_
- `buscarProduto(50)` → deve resultar em **`null`** _(inexistente → null)_
- `buscarProduto('abc')` → deve resultar em **`null`** _(id inválido (erro de rede) → null)_

**💡 Dicas** (use só se travar):

1. Envolva tudo em `try { ... } catch { return null; }`.

---

### Exercício 13.7 — Requisições em paralelo
*Assíncrono (Promises, async/await) · Desafio*

Crie `async function somaDosPrecos(ids)` que busca todos os produtos **em paralelo** (com `Promise.all`) e retorna a soma dos preços.

**✅ Resultado esperado** — o exercício está certo quando:

- `somaDosPrecos([1, 3])` → deve resultar em **`1050`** _(ids 1 e 3 → 1050)_
- `somaDosPrecos([1, 2, 3])` → deve resultar em **`1130`** _(todos → 1130)_
- `somaDosPrecos([])` → deve resultar em **`0`** _(vazio → 0)_
- 📏 Regra de código: Usou Promise.all

**💡 Dicas** (use só se travar):

1. `ids.map(id => fetch(...).then(r => r.json()))` cria um array de Promises.
2. `await Promise.all(arrayDePromises)` devolve um array de resultados.

---

### Exercício 13.8 — Limite de tempo (Promise.race)
*Assíncrono (Promises, async/await) · Desafio*

Crie `comLimite(promise, ms)` que retorna uma Promise que resolve com o resultado de `promise`, ou rejeita com `new Error('Tempo esgotado')` se demorar mais que `ms`.

**✅ Resultado esperado** — o exercício está certo quando:

- `comLimite(new Promise(r => setTimeout(() => r('ok'), 20)), 200)` → deve resultar em **`'ok'`** _(rápida resolve)_
- **lenta rejeita** → resultado esperado: `'Tempo esgotado'`

  Teste executado pelo app:

  ```js
  comLimite(new Promise(r => setTimeout(() => r('ok'), 300)), 50).catch(e => e.message)
  ```

**💡 Dicas** (use só se travar):

1. Crie uma segunda Promise que só rejeita depois de `ms`.
2. `Promise.race([a, b])` fica com a que terminar primeiro.

---

### Exercício 13.9 — Tentar novamente
*Assíncrono (Promises, async/await) · Desafio*

Crie `async function tentarAte(fn, tentativas)` que chama a função assíncrona `fn()` até ela dar certo, no máximo `tentativas` vezes. Retorne o resultado do primeiro sucesso; se todas falharem, lance o último erro.

**✅ Resultado esperado** — o exercício está certo quando:

- **sucesso na 3ª tentativa** → resultado esperado: `'ok 3'`

  Teste executado pelo app:

  ```js
  (async () => { let n = 0;
  const r = await tentarAte(async () => { n++;
  if (n < 3) throw new Error('falhou');
  return 'ok ' + n;
  }, 5);
  return r;
  })()
  ```
- **esgota tentativas** → resultado esperado: `[ 'erro 2', 2 ]`

  Teste executado pelo app:

  ```js
  (async () => { let n = 0;
  try { await tentarAte(async () => { n++;
  throw new Error('erro ' + n);
  }, 2);
  } catch (e) { return [e.message, n];
  } })()
  ```

**💡 Dicas** (use só se travar):

1. Um laço for com try/catch dentro.
2. Use `return await fn()` dentro do try para capturar a rejeição.

## Quiz

1. O que este código imprime? `console.log(1); setTimeout(() => console.log(2), 0); console.log(3);`
   a) 1 2 3
   b) 1 3 2
   c) 2 1 3
   d) 3 2 1

2. O que uma função `async` sempre retorna?
   a) undefined
   b) Uma Promise
   c) Um callback
   d) O valor diretamente

3. Como tratar erro em `await fetch(...)`?
   a) Com if
   b) Com try/catch
   c) Não é possível
   d) Com switch

4. Para fazer 3 requisições ao mesmo tempo e esperar todas:
   a) 3 awaits seguidos
   b) Promise.all
   c) setTimeout
   d) for...of

5. Qual propriedade da resposta do fetch indica sucesso (status 200–299)?
   a) response.success
   b) response.ok
   c) response.done
   d) response.valid

## Desafio extra

No navegador, abra o console e rode `await (await fetch('https://api.github.com/users/github')).json()`. Você acabou de consumir uma API real!


# Dia 14 — Resolução de problemas e algoritmos

*Juntar tudo o que você aprendeu para resolver problemas clássicos — o tipo de exercício de entrevistas e do dia a dia.* · Tempo estimado: ~4h

## Objetivos

- Aplicar um método para resolver problemas (entender, exemplos, plano, código, revisão)
- Reconhecer padrões: contagem com objeto/Map, dois ponteiros, pilha, recursão
- Ter noção de eficiência (por que Set/Map são rápidos)
- Misturar conceitos dos dias anteriores (prática intercalada)

## Aula

### 14.1 Um método para qualquer problema

- **1. Entenda**: reescreva o problema com suas palavras. Quais as entradas e a saída?
- **2. Exemplos**: resolva 2 ou 3 casos à mão, incluindo casos extremos (vazio, um item, negativos).
- **3. Plano**: escreva os passos em português (pseudocódigo) antes de codar.
- **4. Código**: traduza o plano. Teste cedo, teste sempre.
- **5. Revise**: dá para simplificar? Os nomes estão claros?

> 💡 **Dica:** Se travar por mais de 20 minutos, abra uma dica, mas depois **refaça o exercício do zero** no dia seguinte (o app agenda isso na Revisão).

### 14.2 Padrão: contagem

```js
function maisFrequente(lista) {
  const contagem = new Map();
  let melhor = null;
  let maior = 0;
  for (const item of lista) {
    const qtd = (contagem.get(item) ?? 0) + 1;
    contagem.set(item, qtd);
    if (qtd > maior) { maior = qtd; melhor = item; }
  }
  return melhor;
}
console.log(maisFrequente(['a', 'b', 'a', 'c', 'a']));
```

### 14.3 Padrão: pilha

Pilhas resolvem problemas de “abrir e fechar”: parênteses, desfazer/refazer, navegação de páginas.

```js
function balanceado(texto) {
  const pilha = [];
  for (const c of texto) {
    if (c === '(') pilha.push(c);
    if (c === ')') {
      if (pilha.length === 0) return false;
      pilha.pop();
    }
  }
  return pilha.length === 0;
}
console.log(balanceado('(a(b)c)'), balanceado('(()'));
```

### 14.4 Noção de eficiência

Buscar com `array.includes` olha item por item (lento com milhares de itens). `Set.has` e `Map.get` respondem quase instantaneamente. Laços dentro de laços sobre a mesma lista crescem rápido: 1.000 itens → 1.000.000 de passos.

```js
const grande = Array.from({ length: 100000 }, (_, i) => i);
const conjunto = new Set(grande);
let t = Date.now();
for (let i = 0; i < 2000; i++) grande.includes(99999);
console.log('includes:', Date.now() - t, 'ms');
t = Date.now();
for (let i = 0; i < 2000; i++) conjunto.has(99999);
console.log('Set.has:', Date.now() - t, 'ms');
```


## Exercícios

### Exercício 14.1 — São anagramas?
*Algoritmos e resolução de problemas · Médio*

Crie `saoAnagramas(a, b)`: duas palavras são anagramas se têm exatamente as mesmas letras em outra ordem (ignore maiúsculas e espaços). `saoAnagramas('Roma', 'amor')` → true.

**✅ Resultado esperado** — o exercício está certo quando:

- `saoAnagramas('Roma', 'amor')` → deve resultar em **`true`** _(Roma / amor)_
- `saoAnagramas('Dormitory', 'dirty room')` → deve resultar em **`true`** _(com espaços)_
- `saoAnagramas('abc', 'abd')` → deve resultar em **`false`** _(diferentes)_
- `saoAnagramas('aab', 'ab')` → deve resultar em **`false`** _(tamanhos diferentes)_

**💡 Dicas** (use só se travar):

1. Ideia simples: se ordenar as letras das duas, devem ficar iguais.
2. `texto.split('').sort().join('')`

---

### Exercício 14.2 — Item mais frequente
*Algoritmos e resolução de problemas · Médio*

Crie `maisFrequente(lista)` que retorna o item que mais aparece. Em caso de empate, retorne o que atingiu a maior contagem primeiro. Lista vazia → `null`.

**✅ Resultado esperado** — o exercício está certo quando:

- `maisFrequente([1, 3, 3, 2, 3, 1])` → deve resultar em **`3`** _(números)_
- `maisFrequente(['js', 'py', 'js'])` → deve resultar em **`'js'`** _(textos)_
- `maisFrequente(['a', 'b', 'b', 'a'])` → deve resultar em **`'b'`** _(empate)_
- `maisFrequente([])` → deve resultar em **`null`** _(vazia)_

**💡 Dicas** (use só se travar):

1. Padrão de contagem com Map ou objeto.
2. Atualize o “melhor” só quando a contagem for **maior** (não maior ou igual).

---

### Exercício 14.3 — Achatar listas (recursão)
*Algoritmos e resolução de problemas · Desafio*

Crie `achatar(lista)` que transforma arrays aninhados em qualquer profundidade numa lista simples, **sem usar** `.flat`. `achatar([1, [2, [3, [4]]], 5])` → `[1, 2, 3, 4, 5]`.

**✅ Resultado esperado** — o exercício está certo quando:

- `achatar([1, [2, [3, [4]]], 5])` → deve resultar em **`[ 1, 2, 3, 4, 5 ]`** _(profundo)_
- `achatar([1, 2])` → deve resultar em **`[ 1, 2 ]`** _(já plano)_
- `achatar([[], [[]], 1])` → deve resultar em **`[ 1 ]`** _(vazios)_
- 📏 Regra de código: Não usou .flat

**💡 Dicas** (use só se travar):

1. `Array.isArray(x)` diz se é array.
2. Se o item for array, chame `achatar(item)` e adicione os resultados com `push(...)`.

---

### Exercício 14.4 — Busca binária
*Algoritmos e resolução de problemas · Desafio*

Em uma lista **ordenada**, a busca binária olha o meio e descarta metade a cada passo (como procurar uma palavra no dicionário). Crie `buscaBinaria(lista, alvo)` que retorna o índice do alvo ou -1, sem usar `indexOf`/`includes`/`find`.

**Código inicial:**

```js
function buscaBinaria(lista, alvo) {
  let inicio = 0;
  let fim = lista.length - 1;
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- `buscaBinaria([1, 3, 5, 7, 9, 11], 7)` → deve resultar em **`3`** _(acha no meio)_
- `buscaBinaria([1, 3, 5], 1)` → deve resultar em **`0`** _(primeiro)_
- `buscaBinaria([1, 3, 5], 5)` → deve resultar em **`2`** _(último)_
- `buscaBinaria([1, 3, 5], 4)` → deve resultar em **`-1`** _(ausente)_
- `buscaBinaria([], 4)` → deve resultar em **`-1`** _(lista vazia)_
- `buscaBinaria(Array.from({ length: 100000 }, (_, i) => i * 2), 123456)` → deve resultar em **`61728`** _(lista grande)_
- 📏 Regra de código: Não usou indexOf/includes/find

**💡 Dicas** (use só se travar):

1. Enquanto `inicio <= fim`: calcule o meio com `Math.floor`.
2. Se o valor do meio for menor que o alvo, descarte a metade esquerda (`inicio = meio + 1`).

---

### Exercício 14.5 — Validar ( [ { } ] )
*Algoritmos e resolução de problemas · Desafio*

Crie `validarSimbolos(texto)` que retorna `true` se todos os `()`, `[]` e `{}` estiverem corretamente abertos e fechados. Outros caracteres são ignorados.

`'{[()]}'` → true; `'([)]'` → false; `'(('` → false.

**✅ Resultado esperado** — o exercício está certo quando:

- `validarSimbolos('{[()]}')` → deve resultar em **`true`** _({[()]})_
- `validarSimbolos('function f(a) { return [a]; }')` → deve resultar em **`true`** _(código)_
- `validarSimbolos('([)]')` → deve resultar em **`false`** _(([)])_
- `validarSimbolos('((')` → deve resultar em **`false`** _((()_
- `validarSimbolos('))')` → deve resultar em **`false`** _()))_

**💡 Dicas** (use só se travar):

1. Use uma pilha (array com push/pop).
2. Um objeto que mapeia fechamento → abertura ajuda: `{ ')': '(' ... }`.
3. Ao encontrar um fechamento, o topo da pilha precisa ser a abertura correspondente.

---

### Exercício 14.6 — Compressão de texto
*Algoritmos e resolução de problemas · Médio*

Crie `comprimir(texto)` que substitui sequências de letras repetidas pela letra + quantidade. `'aaabccdddd'` → `'a3b1c2d4'`. Texto vazio → `''`.

**✅ Resultado esperado** — o exercício está certo quando:

- `comprimir('aaabccdddd')` → deve resultar em **`'a3b1c2d4'`** _(aaabccdddd)_
- `comprimir('abc')` → deve resultar em **`'a1b1c1'`** _(abc)_
- `comprimir('')` → deve resultar em **`''`** _(vazio)_

**💡 Dicas** (use só se travar):

1. Compare cada letra com a próxima (`texto[i + 1]`).
2. Quando mudar, escreva letra + contagem e reinicie a contagem.

---

### Exercício 14.7 — Ordenação (sem sort)
*Algoritmos e resolução de problemas · Desafio*

Implemente `ordenar(lista)` que retorna um **novo** array em ordem crescente **sem usar** `sort`. Sugestão: *bubble sort* (compare vizinhos e troque se estiverem fora de ordem; repita até não haver trocas) ou *selection sort*.

**✅ Resultado esperado** — o exercício está certo quando:

- `ordenar([5, 2, 9, 1, 5, 6])` → deve resultar em **`[ 1, 2, 5, 5, 6, 9 ]`** _(números)_
- `ordenar([0, -3, 10, -1])` → deve resultar em **`[ -3, -1, 0, 10 ]`** _(negativos)_
- `(() => { const l = [2, 1]; ordenar(l); return l; })()` → deve resultar em **`[ 2, 1 ]`** _(não muta)_
- 📏 Regra de código: Não usou sort

**💡 Dicas** (use só se travar):

1. Trabalhe numa cópia: `const a = [...lista]`.
2. Troca elegante: `[a[j], a[j + 1]] = [a[j + 1], a[j]]`.

---

### Exercício 14.8 — Relatório de vendas
*Algoritmos e resolução de problemas · Desafio*

Cada venda é `{ vendedor, valor }`. Crie `relatorio(vendas)` que retorna:

```
{
  total: 1000,
  porVendedor: { Ana: 600, Bia: 400 },
  melhor: 'Ana'
}
```

Para lista vazia: `{ total: 0, porVendedor: {}, melhor: null }`.

**✅ Resultado esperado** — o exercício está certo quando:

- **relatório** → resultado esperado: `{ total: 1000, porVendedor: { Ana: 600, Bia: 400 }, melhor: 'Ana' }`

  Teste executado pelo app:

  ```js
  relatorio([{ vendedor: 'Ana', valor: 200 }, { vendedor: 'Bia', valor: 400 }, { vendedor: 'Ana', valor: 400 }])
  ```
- `relatorio([])` → deve resultar em **`{ total: 0, porVendedor: {}, melhor: null }`** _(vazio)_

**💡 Dicas** (use só se travar):

1. Primeiro agrupe e some (padrão de contagem).
2. Depois percorra `Object.entries` para achar o maior.

---

### Exercício 14.9 — Paginação
*Algoritmos e resolução de problemas · Médio*

Crie `paginar(lista, pagina, porPagina)` (páginas começam em 1) que retorna `{ itens, pagina, totalPaginas, temAnterior, temProxima }`.

**✅ Resultado esperado** — o exercício está certo quando:

- `paginar([1, 2, 3, 4, 5, 6, 7], 2, 3)` → deve resultar em **`{ itens: [ 4, 5, 6 ], pagina: 2, totalPaginas: 3, temAnterior: true, temProxima: true }`** _(página 2 de 3)_
- `paginar([1, 2, 3, 4, 5, 6, 7], 3, 3)` → deve resultar em **`{ itens: [ 7 ], pagina: 3, totalPaginas: 3, temAnterior: true, temProxima: false }`** _(última página)_
- `paginar(['a', 'b'], 1, 5)` → deve resultar em **`{ itens: [ 'a', 'b' ], pagina: 1, totalPaginas: 1, temAnterior: false, temProxima: false }`** _(primeira página)_

**💡 Dicas** (use só se travar):

1. Índice inicial: `(pagina - 1) * porPagina`.
2. Total de páginas: `Math.ceil(lista.length / porPagina)`.

## Quiz

1. Qual estrutura é ideal para verificar parênteses balanceados?
   a) Fila
   b) Pilha
   c) Set
   d) Map

2. Por que a busca binária exige uma lista ordenada?
   a) Por estética
   b) Para saber qual metade descartar
   c) Porque é recursiva
   d) Não exige

3. Qual é mais rápido para verificar se um item existe numa coleção grande?
   a) array.includes
   b) Set.has
   c) Iguais
   d) array.indexOf

4. Qual o primeiro passo do método de resolução de problemas?
   a) Codar
   b) Entender o problema e as entradas/saídas
   c) Pesquisar no Google
   d) Otimizar

## Desafio extra

Resolva 3 problemas “Easy” no site Exercism (trilha JavaScript) ou no LeetCode. Use o método de 5 passos.


# Dia 15 — Projeto final: gerenciador de tarefas

*Construir, passo a passo, um gerenciador de tarefas que usa tudo: classes, arrays, erros, JSON, DOM e async. E fazer o simulado final.* · Tempo estimado: ~4h

## Objetivos

- Construir um projeto incrementalmente, uma funcionalidade por vez
- Integrar classes, métodos de array, validação e JSON
- Conectar a lógica a uma interface (DOM)
- Avaliar o próprio aprendizado com o simulado final

## Aula

### 15.1 Como desenvolvedores constroem projetos

Ninguém escreve um app inteiro de uma vez. O ciclo é: **uma pequena funcionalidade → testar → melhorar → próxima**. Os exercícios de hoje seguem esse ciclo: cada etapa reaproveita a anterior.

- Etapa 1: o modelo (classe com adicionar/concluir/remover/listar)
- Etapa 2: estatísticas e ordenação
- Etapa 3: salvar e carregar (JSON)
- Etapa 4: sincronização assíncrona
- Etapa 5: interface (DOM)

### 15.2 Separe lógica e interface

A classe `GerenciadorTarefas` não sabe nada de HTML. A interface só chama seus métodos e desenha o resultado. Isso deixa o código testável e fácil de trocar (por exemplo, migrar para React depois).

```js
// lógica
const tarefas = [];
const adicionar = (titulo) => tarefas.push({ titulo, feita: false });

// interface
function renderizar() {
  console.log(tarefas.map(t => (t.feita ? '[x] ' : '[ ] ') + t.titulo).join('\n'));
}

adicionar('Estudar closures');
adicionar('Fazer o simulado');
tarefas[0].feita = true;
renderizar();
```

### 15.3 E depois dos 15 dias?

- **Git e GitHub**: versione cada projeto (você já fará isso com este app).
- **Node.js e npm**: JavaScript fora do navegador; instalar bibliotecas.
- **Firebase**: autenticação e Firestore — leia o código `src/firebase.js` e `src/data/store.js` deste app.
- **Um framework**: React (o mais pedido no mercado) ou Vue.
- **TypeScript**: JavaScript com tipos, padrão em empresas.
- **Projetos próprios**: fluência vem de construir. Meta: 1 projeto pequeno por semana.


## Exercícios

### Exercício 15.1 — Etapa 1: GerenciadorTarefas
*Projeto integrador · Médio*

Crie a classe `GerenciadorTarefas` com:

- `adicionar(titulo, prioridade = 'media')`: cria `{ id, titulo, prioridade, concluida: false }` com ids sequenciais (1, 2, 3...), retira espaços das pontas do título e retorna a tarefa. Lança `Error('Título obrigatório')` se o título for vazio e `Error('Prioridade inválida')` se não for alta/media/baixa.
- `concluir(id)`: marca como concluída; retorna `true`, ou `false` se o id não existir.
- `remover(id)`: retorna `true` se removeu.
- `listar(filtro = 'todas')`: `'todas'`, `'pendentes'` ou `'concluidas'`.

**Código inicial:**

```js
class GerenciadorTarefas {
  #tarefas = [];
  #proximoId = 1;

  adicionar(titulo, prioridade = 'media') {
    
  }
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **adicionar** → resultado esperado: `{ id: 2, titulo: 'B', prioridade: 'alta', concluida: false }`

  Teste executado pelo app:

  ```js
  (() => { const g = new GerenciadorTarefas();
  g.adicionar('A');
  return g.adicionar('  B ', 'alta');
  })()
  ```
- **título vazio** → resultado esperado: `'Título obrigatório'`

  Teste executado pelo app:

  ```js
  (() => { try { new GerenciadorTarefas().adicionar('  ');
  } catch (e) { return e.message;
  } })()
  ```
- **prioridade inválida** → resultado esperado: `'Prioridade inválida'`

  Teste executado pelo app:

  ```js
  (() => { try { new GerenciadorTarefas().adicionar('x', 'urgente');
  } catch (e) { return e.message;
  } })()
  ```
- **concluir e listar** → resultado esperado: `[ true, false, [ 'B' ], [ 'A' ], 2 ]`

  Teste executado pelo app:

  ```js
  (() => { const g = new GerenciadorTarefas();
  g.adicionar('A');
  g.adicionar('B');
  return [g.concluir(1), g.concluir(9), g.listar('pendentes').map(t => t.titulo), g.listar('concluidas').map(t => t.titulo), g.listar().length];
  })()
  ```
- **remover** → resultado esperado: `[ true, false, 0 ]`

  Teste executado pelo app:

  ```js
  (() => { const g = new GerenciadorTarefas();
  g.adicionar('A');
  return [g.remover(1), g.remover(1), g.listar().length];
  })()
  ```

**💡 Dicas** (use só se travar):

1. Use os campos privados já declarados.
2. `this.#proximoId++` usa o valor atual e depois incrementa.
3. Para listar, use `filter`; para “todas”, devolva uma cópia.

---

### Exercício 15.2 — Etapa 2: estatísticas e ordenação
*Projeto integrador · Médio*

A classe da etapa 1 já está pronta no editor. Adicione:

- `estatisticas()` → `{ total, concluidas, pendentes, percentual }` (percentual de concluídas, inteiro arredondado; 0 se não houver tarefas)
- `ordenadasPorPrioridade()` → nova lista: alta, depois media, depois baixa (mantendo a ordem de criação dentro de cada prioridade)

**Código inicial:**

```js
class GerenciadorTarefas {
  #tarefas = [];
  #proximoId = 1;

  adicionar(titulo, prioridade = 'media') {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Título obrigatório');
    }
    if (!['alta', 'media', 'baixa'].includes(prioridade)) {
      throw new Error('Prioridade inválida');
    }
    const tarefa = { id: this.#proximoId++, titulo: titulo.trim(), prioridade, concluida: false };
    this.#tarefas.push(tarefa);
    return tarefa;
  }

  concluir(id) {
    const tarefa = this.#tarefas.find(t => t.id === id);
    if (!tarefa) return false;
    tarefa.concluida = true;
    return true;
  }

  remover(id) {
    const antes = this.#tarefas.length;
    this.#tarefas = this.#tarefas.filter(t => t.id !== id);
    return this.#tarefas.length < antes;
  }

  listar(filtro = 'todas') {
    if (filtro === 'pendentes') return this.#tarefas.filter(t => !t.concluida);
    if (filtro === 'concluidas') return this.#tarefas.filter(t => t.concluida);
    return [...this.#tarefas];
  }

  // adicione os novos métodos aqui
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **estatísticas** → resultado esperado: `{ total: 3, concluidas: 1, pendentes: 2, percentual: 33 }`

  Teste executado pelo app:

  ```js
  (() => { const g = new GerenciadorTarefas();
  g.adicionar('A');
  g.adicionar('B');
  g.adicionar('C');
  g.concluir(2);
  return g.estatisticas();
  })()
  ```
- `new GerenciadorTarefas().estatisticas()` → deve resultar em **`{ total: 0, concluidas: 0, pendentes: 0, percentual: 0 }`** _(estatísticas vazias)_
- **ordenação** → resultado esperado: `[ 'a1', 'a2', 'm1', 'b1' ]`

  Teste executado pelo app:

  ```js
  (() => { const g = new GerenciadorTarefas();
  g.adicionar('b1', 'baixa');
  g.adicionar('a1', 'alta');
  g.adicionar('m1');
  g.adicionar('a2', 'alta');
  return g.ordenadasPorPrioridade().map(t => t.titulo);
  })()
  ```

**💡 Dicas** (use só se travar):

1. Reaproveite `this.listar(...)`.
2. Para ordenar por prioridade, crie um objeto de pesos: `{ alta: 0, media: 1, baixa: 2 }`.
3. O `sort` moderno é estável: mantém a ordem original entre empates.

---

### Exercício 15.3 — Etapa 3: salvar e carregar
*Projeto integrador · Desafio*

Adicione à classe:

- `exportar()` → texto JSON com o array de tarefas
- `static importar(json)` → cria um novo `GerenciadorTarefas` com as tarefas do JSON; os próximos ids devem continuar a partir do maior id importado. Se o JSON for inválido, lance `Error('Arquivo inválido')`.
Dica: como `#tarefas` é privado, `importar` pode criar a instância e usar um método interno — métodos estáticos **podem** acessar campos privados de instâncias da própria classe.

**Código inicial:**

```js
class GerenciadorTarefas {
  #tarefas = [];
  #proximoId = 1;

  adicionar(titulo, prioridade = 'media') {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Título obrigatório');
    }
    if (!['alta', 'media', 'baixa'].includes(prioridade)) {
      throw new Error('Prioridade inválida');
    }
    const tarefa = { id: this.#proximoId++, titulo: titulo.trim(), prioridade, concluida: false };
    this.#tarefas.push(tarefa);
    return tarefa;
  }

  concluir(id) {
    const tarefa = this.#tarefas.find(t => t.id === id);
    if (!tarefa) return false;
    tarefa.concluida = true;
    return true;
  }

  remover(id) {
    const antes = this.#tarefas.length;
    this.#tarefas = this.#tarefas.filter(t => t.id !== id);
    return this.#tarefas.length < antes;
  }

  listar(filtro = 'todas') {
    if (filtro === 'pendentes') return this.#tarefas.filter(t => !t.concluida);
    if (filtro === 'concluidas') return this.#tarefas.filter(t => t.concluida);
    return [...this.#tarefas];
  }

  // exportar() e static importar(json)
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **exportar** → resultado esperado: `[ { id: 1, titulo: 'A', prioridade: 'media', concluida: false } ]`

  Teste executado pelo app:

  ```js
  (() => { const g = new GerenciadorTarefas();
  g.adicionar('A');
  return JSON.parse(g.exportar());
  })()
  ```
- **importar continua ids** → resultado esperado: `[ 2, 8, 'X' ]`

  Teste executado pelo app:

  ```js
  (() => { const g = GerenciadorTarefas.importar('[{"id":7,"titulo":"X","prioridade":"alta","concluida":true}]');
  const nova = g.adicionar('Y');
  return [g.listar().length, nova.id, g.listar('concluidas')[0].titulo];
  })()
  ```
- **JSON inválido** → resultado esperado: `'Arquivo inválido'`

  Teste executado pelo app:

  ```js
  (() => { try { GerenciadorTarefas.importar('{oops');
  } catch (e) { return e.message;
  } })()
  ```

**💡 Dicas** (use só se travar):

1. `JSON.parse` dentro de try/catch.
2. Próximo id = maior id + 1 (use reduce ou Math.max(...ids)).

---

### Exercício 15.4 — Etapa 4: sincronizar (async)
*Projeto integrador · Desafio*

Simulando o envio para a nuvem (como o Firestore faria), crie a função `async function sincronizar(tarefas, enviar)`:

- `enviar(tarefa)` é uma função assíncrona que pode falhar.
- Envie todas as tarefas **em paralelo**.
- Retorne `{ enviadas, falhas }` com as quantidades — uma falha não pode impedir as outras.

**Código inicial:**

```js
async function sincronizar(tarefas, enviar) {
  
}
```

**✅ Resultado esperado** — o exercício está certo quando:

- **conta sucessos e falhas** → resultado esperado: `{ enviadas: 2, falhas: 1 }`

  Teste executado pelo app:

  ```js
  sincronizar([{ id: 1 }, { id: 2 }, { id: 3 }], async (t) => { if (t.id === 2) throw new Error('rede');
  return true;
  })
  ```
- **em paralelo** → resultado esperado: `true`

  Teste executado pelo app:

  ```js
  (async () => { const t = Date.now();
  await sincronizar([1, 2, 3, 4], () => new Promise(r => setTimeout(r, 150)));
  return Date.now() - t < 450;
  })()
  ```
- `sincronizar([], async () => true)` → deve resultar em **`{ enviadas: 0, falhas: 0 }`** _(lista vazia)_

**💡 Dicas** (use só se travar):

1. `Promise.all` falha na primeira rejeição. Existe um parente que espera todas: `Promise.allSettled`.
2. Cada resultado tem `status: 'fulfilled'` ou `'rejected'`.

---

### Exercício 15.5 — Etapa 5: interface com DOM
*Projeto integrador · Desafio*

A classe está pronta. Ligue-a à página:

```
<form id="nova"> <input id="titulo"> <select id="prioridade">...</select> </form>
<p id="erro"></p>
<ul id="lista"></ul>
<p id="resumo"></p>
```

- No `submit`: adicione a tarefa (título + prioridade do select), limpe o input e o erro e re-renderize. Se der erro, mostre a mensagem em `#erro`.
- `renderizar()`: um `<li>` por tarefa com o título como texto e `data-id` com o id; tarefas concluídas recebem a classe `concluida`.
- Clicar num `li` conclui a tarefa (delegação).
- `#resumo` mostra `1 de 3 concluídas`.

**HTML da página (simulada):**

```html
<form id="nova"><input id="titulo" placeholder="Nova tarefa"><select id="prioridade"><option value="alta">Alta</option><option value="media" selected>Média</option><option value="baixa">Baixa</option></select><button>Adicionar</button></form><p id="erro"></p><ul id="lista"></ul><p id="resumo"></p>
```

**Código inicial:**

```js
class GerenciadorTarefas {
  #tarefas = [];
  #proximoId = 1;

  adicionar(titulo, prioridade = 'media') {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Título obrigatório');
    }
    if (!['alta', 'media', 'baixa'].includes(prioridade)) {
      throw new Error('Prioridade inválida');
    }
    const tarefa = { id: this.#proximoId++, titulo: titulo.trim(), prioridade, concluida: false };
    this.#tarefas.push(tarefa);
    return tarefa;
  }

  concluir(id) {
    const tarefa = this.#tarefas.find(t => t.id === id);
    if (!tarefa) return false;
    tarefa.concluida = true;
    return true;
  }

  remover(id) {
    const antes = this.#tarefas.length;
    this.#tarefas = this.#tarefas.filter(t => t.id !== id);
    return this.#tarefas.length < antes;
  }

  listar(filtro = 'todas') {
    if (filtro === 'pendentes') return this.#tarefas.filter(t => !t.concluida);
    if (filtro === 'concluidas') return this.#tarefas.filter(t => t.concluida);
    return [...this.#tarefas];
  }
}

const gerenciador = new GerenciadorTarefas();

function renderizar() {
  
}

// eventos aqui

renderizar();
```

**✅ Resultado esperado** — o exercício está certo quando:

- `document.querySelector('#resumo').textContent` → deve resultar em **`'0 de 0 concluídas'`** _(resumo inicial)_
- **adiciona pelo formulário** → resultado esperado: `[ [ 'Estudar', 'Treinar' ], '', 'alta' ]`

  Teste executado pelo app:

  ```js
  (() => { const f = document.querySelector('#nova');
  const i = document.querySelector('#titulo');
  i.value = 'Estudar';
  f.dispatchEvent(new Event('submit', { cancelable: true }));
  i.value = 'Treinar';
  document.querySelector('#prioridade option[value=alta]').selected = true;
  f.dispatchEvent(new Event('submit', { cancelable: true }));
  return [[...document.querySelectorAll('#lista li')].map(li => li.textContent), i.value, gerenciador.listar()[1].prioridade];
  })()
  ```
- **clicar conclui** → resultado esperado: `[ true, '1 de 2 concluídas' ]`

  Teste executado pelo app:

  ```js
  (() => { document.querySelector('#lista li').click();
  return [document.querySelector('#lista li').classList.contains('concluida'), document.querySelector('#resumo').textContent];
  })()
  ```
- **mostra erro** → resultado esperado: `'Título obrigatório'`

  Teste executado pelo app:

  ```js
  (() => { document.querySelector('#titulo').value = ' ';
  document.querySelector('#nova').dispatchEvent(new Event('submit', { cancelable: true }));
  return document.querySelector('#erro').textContent;
  })()
  ```

**💡 Dicas** (use só se travar):

1. Em `renderizar`, limpe a lista e recrie todos os li a partir de `gerenciador.listar()`.
2. `li.dataset.id = t.id` gera o atributo `data-id`; ao ler, converta com `Number(li.dataset.id)`.
3. Use try/catch no submit para exibir o erro.

## Quiz

1. Simulado — Qual o resultado de `[1, 2, 3].map(n => n * 2).filter(n => n > 2)`?
   a) [2, 4, 6]
   b) [4, 6]
   c) [3]
   d) [6]

2. Simulado — `typeof []` retorna:
   a) 'array'
   b) 'object'
   c) 'list'
   d) 'undefined'

3. Simulado — O que acontece? `const x = 1; x = 2;`
   a) x vale 2
   b) TypeError: Assignment to constant variable
   c) x vale 1
   d) SyntaxError

4. Simulado — `let a = { v: 1 }; let b = a; b.v = 2;` Quanto vale `a.v`?
   a) 1
   b) 2
   c) undefined
   d) Erro

5. Simulado — Qual forma lê o valor de uma Promise dentro de uma função async?
   a) promise.value
   b) await promise
   c) promise()
   d) return promise

6. Simulado — O que uma closure permite?
   a) Fechar o navegador
   b) Que uma função acesse variáveis do escopo onde foi criada
   c) Criar classes
   d) Tratar erros

7. Simulado — Qual NÃO é falsy?
   a) 0
   b) ''
   c) 'false'
   d) null

8. Simulado — Para impedir que um formulário recarregue a página:
   a) return false no HTML
   b) event.preventDefault()
   c) event.stop()
   d) form.cancel()

9. Simulado — Em `class B extends A`, o constructor de B deve chamar:
   a) A()
   b) super()
   c) this.A()
   d) new A()

10. Simulado — Qual estrutura guarda valores únicos?
   a) Array
   b) Object
   c) Set
   d) Map

11. Simulado — `[10, 1, 2].sort()` resulta em:
   a) [1, 2, 10]
   b) [1, 10, 2]
   c) [10, 2, 1]
   d) [2, 1, 10]

12. Simulado — Qual destes executa requisições em paralelo?
   a) await a; await b;
   b) await Promise.all([a, b])
   c) a.then(b)
   d) for await

## Desafio extra

🏁 Parabéns por chegar aqui! Recrie o gerenciador de tarefas como um projeto de verdade: `index.html` + `app.js` + CSS, salve no `localStorage`, publique no GitHub e faça deploy na Vercel. Depois, troque o localStorage pelo Firestore.


# Gabarito

> Consulte apenas depois de tentar. Uma solução diferente da sua pode estar igualmente certa: o que vale é passar nas verificações do "resultado esperado".

### Dia 1 — Primeiros passos: console, variáveis e tipos

#### 1.1 — Olá, console

```js
console.log('Olá, mundo!');
console.log('Estou aprendendo JavaScript');
```

#### 1.2 — let ou const?

```js
const linguagem = 'JavaScript';
let ano = 1995;
ano = 2026;
```

#### 1.3 — Um de cada tipo

```js
const texto = 'oi';
const numero = 7;
const ativo = true;
const vazio = null;
let indefinido;
```

#### 1.4 — Calculadora

```js
const a = 17;
const b = 5;
const soma = a + b;
const subtracao = a - b;
const multiplicacao = a * b;
const divisao = a / b;
const resto = a % b;
const potencia = a ** b;
```

#### 1.5 — Apresentação com template string

```js
const nome = 'Rafa';
const idade = 30;
const frase = `Meu nome é ${nome} e tenho ${idade} anos.`;
console.log(frase);
```

#### 1.6 — Conversor de temperatura

```js
const celsius = 25;
const fahrenheit = celsius * 9 / 5 + 32;
console.log(`${celsius}°C = ${fahrenheit}°F`);
```

#### 1.7 — Troca de valores

```js
let a = 'primeiro';
let b = 'segundo';
const temp = a;
a = b;
b = temp;
```

#### 1.8 — Preço com desconto

```js
const preco = 80;
const desconto = 15;
const valorDesconto = preco * desconto / 100;
const precoFinal = preco - valorDesconto;
```

**Quiz do dia 1:**

1. **b)** `const` não permite reatribuir o valor; `let` permite — `const` impede uma nova atribuição (`x = ...`). Use `const` por padrão e `let` quando precisar mudar.
2. **b)** 1 — `%` é o resto da divisão: 10 = 3×3 + **1**.
3. **b)** '53' — Quando um dos lados é string, `+` concatena.
4. **c)** 'object' — É um bug histórico do JavaScript mantido por compatibilidade.
5. **b)** `` `Olá ${nome}` `` — A interpolação `${}` só funciona com crases.

### Dia 2 — Decisões: condicionais e lógica

#### 2.1 — Maior de idade

```js
function ehMaiorDeIdade(idade) {
  return idade >= 18;
}
```

#### 2.2 — Par ou ímpar

```js
function parOuImpar(n) {
  if (n % 2 === 0) {
    return 'par';
  }
  return 'ímpar';
}
```

#### 2.3 — Conceito da nota

```js
function conceito(nota) {
  if (nota >= 9) return 'A';
  if (nota >= 7) return 'B';
  if (nota >= 5) return 'C';
  return 'D';
}
```

#### 2.4 — Pode entrar no show?

```js
function podeEntrar(idade, temIngresso, ehVip) {
  return ehVip || (idade >= 18 && temIngresso);
}
```

#### 2.5 — Dia da semana com switch

```js
function diaDaSemana(n) {
  switch (n) {
    case 1: return 'domingo';
    case 2: return 'segunda';
    case 3: return 'terça';
    case 4: return 'quarta';
    case 5: return 'quinta';
    case 6: return 'sexta';
    case 7: return 'sábado';
    default: return 'inválido';
  }
}
```

#### 2.6 — Status do pedido (ternário)

```js
function statusPedido(pago) {
  return pago ? 'Enviar' : 'Aguardando pagamento';
}
```

#### 2.7 — Detector de falsy

```js
function ehFalsy(valor) {
  return !valor;
}
```

#### 2.8 — Maior de três (sem Math.max)

```js
function maiorDeTres(a, b, c) {
  let maior = a;
  if (b > maior) maior = b;
  if (c > maior) maior = c;
  return maior;
}
```

#### 2.9 — Calculadora de frete

```js
function calcularFrete(peso, regiao) {
  let base = 15;
  if (regiao === 'sul') base = 10;
  else if (regiao === 'norte') base = 20;
  const extra = peso > 5 ? (peso - 5) * 2 : 0;
  return base + extra;
}
```

**Quiz do dia 2:**

1. **b)** false — `===` compara valor e tipo: number ≠ string.
2. **c)** `'0'` — `'0'` é um texto não vazio, portanto truthy.
3. **a)** true — `&&` é avaliado antes de `||`: `true || (false && false)` → `true`.
4. **b)** A execução continua nos próximos cases — É o “fall-through”: executa os cases seguintes até encontrar um break/return.
5. **b)** `x > 10 ? 'sim' : 'não'` — Ternário: `condição ? seVerdadeiro : seFalso`.

### Dia 3 — Repetição: laços for, while e for...of

#### 3.1 — Contagem de 1 a 5

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

#### 3.2 — Somar de 1 até n

```js
function somaAte(n) {
  let soma = 0;
  for (let i = 1; i <= n; i++) {
    soma += i;
  }
  return soma;
}
```

#### 3.3 — FizzBuzz

```js
for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) console.log('FizzBuzz');
  else if (i % 3 === 0) console.log('Fizz');
  else if (i % 5 === 0) console.log('Buzz');
  else console.log(i);
}
```

#### 3.4 — Contar vogais

```js
function contarVogais(texto) {
  let total = 0;
  for (const letra of texto.toLowerCase()) {
    if ('aeiou'.includes(letra)) total++;
  }
  return total;
}
```

#### 3.5 — Fatorial

```js
function fatorial(n) {
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}
```

#### 3.6 — É primo?

```js
function ehPrimo(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
```

#### 3.7 — Inverter texto (sem reverse)

```js
function inverterTexto(texto) {
  let invertido = '';
  for (let i = texto.length - 1; i >= 0; i--) {
    invertido += texto[i];
  }
  return invertido;
}
```

#### 3.8 — Escada de #

```js
function escada(n) {
  let resultado = '';
  for (let i = 1; i <= n; i++) {
    resultado += '#'.repeat(i);
    if (i < n) resultado += '\n';
  }
  return resultado;
}

console.log(escada(4));
```

#### 3.9 — Menor divisor (break)

```js
function menorDivisor(n) {
  let divisor = n;
  for (let i = 2; i <= n; i++) {
    if (n % i === 0) {
      divisor = i;
      break;
    }
  }
  return divisor;
}
```

**Quiz do dia 3:**

1. **b)** 5 — i assume 0, 1, 2, 3, 4 → 5 vezes.
2. **b)** Pula para a próxima volta — `continue` pula o restante do bloco e vai para a próxima iteração; `break` encerra.
3. **b)** 1 — Qualquer número multiplicado por 0 é 0. O elemento neutro da multiplicação é 1.
4. **b)** while — `while` repete enquanto a condição for verdadeira.
5. **b)** `texto.length - 1` — Índices começam em 0, então o último é length - 1.

### Dia 4 — Funções: o bloco de construção de tudo

#### 4.1 — Primeira arrow function

```js
const triplo = (n) => n * 3;
```

#### 4.2 — Saudação com valor padrão

```js
function saudacao(nome = 'visitante', periodo = 'dia') {
  return `Bom ${periodo}, ${nome}!`;
}
```

#### 4.3 — Retorne, não imprima

```js
function areaRetangulo(largura, altura) {
  return largura * altura;
}

const areaTotal = areaRetangulo(3, 4) + areaRetangulo(2, 5);
console.log('Área total:', areaTotal);
```

#### 4.4 — IMC em duas funções

```js
function calcularIMC(peso, altura) {
  return Math.round((peso / altura ** 2) * 10) / 10;
}

function classificarIMC(imc) {
  if (imc < 18.5) return 'abaixo';
  if (imc < 25) return 'normal';
  if (imc < 30) return 'sobrepeso';
  return 'obesidade';
}

function diagnostico(peso, altura) {
  const imc = calcularIMC(peso, altura);
  return `IMC ${imc}: ${classificarIMC(imc)}`;
}
```

#### 4.5 — Caça ao bug: escopo

```js
function descontoCliente(ehVip) {
  let desconto;
  if (ehVip) {
    desconto = 0.2;
  } else {
    desconto = 0.05;
  }
  return desconto;
}

console.log(descontoCliente(true));
```

#### 4.6 — Contar uma letra

```js
function contarLetra(texto, letra) {
  let total = 0;
  for (const l of texto) {
    if (l === letra) total++;
  }
  return total;
}
```

#### 4.7 — Validador de senha

```js
function senhaForte(senha) {
  if (senha.length < 8) return false;
  let temNumero = false;
  let temMaiuscula = false;
  for (const c of senha) {
    if (c >= '0' && c <= '9') temNumero = true;
    if (c >= 'A' && c <= 'Z') temMaiuscula = true;
  }
  return temNumero && temMaiuscula;
}
```

#### 4.8 — Potência recursiva

```js
function potencia(base, expoente) {
  if (expoente === 0) return 1;
  return base * potencia(base, expoente - 1);
}
```

**Quiz do dia 4:**

1. **b)** 3 — Arrow sem chaves retorna a expressão automaticamente.
2. **c)** undefined — Toda função sem return explícito devolve `undefined`.
3. **b)** A função termina imediatamente — `return` encerra a execução da função.
4. **b)** undefined — Com chaves é necessário `return`. Sem ele, retorna undefined.
5. **b)** Um caso base — Sem caso base a recursão nunca termina (estouro de pilha).

### Dia 5 — Strings e números a fundo

#### 5.1 — Capitalizar palavra

```js
function capitalizar(palavra) {
  return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
}
```

#### 5.2 — Formatar nome completo

```js
function formatarNome(nome) {
  const palavras = nome.trim().split(' ');
  let resultado = [];
  for (const p of palavras) {
    if (p === '') continue;
    resultado.push(p[0].toUpperCase() + p.slice(1).toLowerCase());
  }
  return resultado.join(' ');
}
```

#### 5.3 — Palíndromo

```js
function ehPalindromo(texto) {
  const limpo = texto.toLowerCase().replaceAll(' ', '');
  const invertido = limpo.split('').reverse().join('');
  return limpo === invertido;
}
```

#### 5.4 — Mascarar cartão

```js
function mascararCartao(numero) {
  return numero.slice(-4).padStart(numero.length, '*');
}
```

#### 5.5 — Contar palavras

```js
function contarPalavras(frase) {
  const limpa = frase.trim();
  if (limpa === '') return 0;
  return limpa.split(/\s+/).length;
}
```

#### 5.6 — Formatar moeda

```js
function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}
```

#### 5.7 — Somar valores digitados

```js
function somarTextos(a, b) {
  const x = Number(a.replace(',', '.'));
  const y = Number(b.replace(',', '.'));
  if (Number.isNaN(x) || Number.isNaN(y)) return null;
  return x + y;
}
```

#### 5.8 — Sorteio entre min e max

```js
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

#### 5.9 — Iniciais do nome

```js
function iniciais(nome) {
  let resultado = '';
  for (const parte of nome.trim().split(' ')) {
    if (parte) resultado += parte[0].toUpperCase();
  }
  return resultado;
}
```

**Quiz do dia 5:**

1. **b)** 'oi' — Strings são imutáveis; o método retorna um texto novo que foi descartado.
2. **a)** 'Java' — O índice final não é incluído: posições 0, 1, 2, 3.
3. **c)** NaN — Em JS o separador decimal é ponto; vírgula torna o texto inválido.
4. **b)** string — `toFixed` retorna texto, útil para exibição.
5. **b)** `Math.floor(Math.random() * 10) + 1` — floor(0..9.99) → 0 a 9; +1 → 1 a 10.

### Dia 6 — Arrays: trabalhando com listas

#### 6.1 — Primeiro e último

```js
function pontas(lista) {
  return [lista[0], lista[lista.length - 1]];
}
```

#### 6.2 — Fila de atendimento

```js
function entrarNaFila(fila, nome) {
  return fila.push(nome);
}

function atenderProximo(fila) {
  if (fila.length === 0) return null;
  return fila.shift();
}
```

#### 6.3 — Somar e calcular média

```js
function somar(numeros) {
  let total = 0;
  for (const n of numeros) total += n;
  return total;
}

function media(numeros) {
  if (numeros.length === 0) return 0;
  return somar(numeros) / numeros.length;
}
```

#### 6.4 — Maior valor (sem Math.max)

```js
function maiorValor(numeros) {
  if (numeros.length === 0) return undefined;
  let maior = numeros[0];
  for (const n of numeros) {
    if (n > maior) maior = n;
  }
  return maior;
}
```

#### 6.5 — Remover duplicados

```js
function semDuplicados(lista) {
  const resultado = [];
  for (const item of lista) {
    if (!resultado.includes(item)) resultado.push(item);
  }
  return resultado;
}
```

#### 6.6 — Contar ocorrências

```js
function contarOcorrencias(lista, valor) {
  let total = 0;
  for (const item of lista) {
    if (item === valor) total++;
  }
  return total;
}
```

#### 6.7 — Inverter sem alterar o original

```js
function invertido(lista) {
  const resultado = [];
  for (let i = lista.length - 1; i >= 0; i--) {
    resultado.push(lista[i]);
  }
  return resultado;
}
```

#### 6.8 — Adicionar sem mutar

```js
function comItem(lista, item) {
  return [...lista, item];
}
```

#### 6.9 — Soma da diagonal

```js
function somaDiagonal(matriz) {
  let soma = 0;
  for (let i = 0; i < matriz.length; i++) {
    soma += matriz[i][i];
  }
  return soma;
}
```

#### 6.10 — Dividir em grupos

```js
function dividirEmGrupos(lista, tamanho) {
  const grupos = [];
  for (let i = 0; i < lista.length; i += tamanho) {
    grupos.push(lista.slice(i, i + tamanho));
  }
  return grupos;
}
```

**Quiz do dia 6:**

1. **b)** pop — `pop` remove do fim; `shift` remove do início.
2. **b)** [1, 2] — `b` e `a` apontam para o mesmo array.
3. **c)** slice — `slice` retorna uma cópia de um trecho.
4. **c)** -1 — -1 significa “não encontrado”.
5. **b)** m[1][2] — Linha 1 (segunda), coluna 2 (terceira).

### Dia 7 — Objetos, desestruturação e JSON

#### 7.1 — Fábrica de pessoas

```js
function criarPessoa(nome, idade) {
  return { nome, idade, maiorDeIdade: idade >= 18 };
}
```

#### 7.2 — Descrever com desestruturação

```js
function descreverCarro({ marca, modelo, ano }) {
  return `${marca} ${modelo} (${ano})`;
}
```

#### 7.3 — Quantas propriedades?

```js
function contarPropriedades(obj) {
  return Object.keys(obj).length;
}
```

#### 7.4 — Frequência de letras

```js
function frequencia(palavra) {
  const contagem = {};
  for (const letra of palavra) {
    contagem[letra] = (contagem[letra] || 0) + 1;
  }
  return contagem;
}
```

#### 7.5 — Atualizar estoque sem mutar

```js
function adicionarAoEstoque(estoque, produto, qtd) {
  return { ...estoque, [produto]: (estoque[produto] ?? 0) + qtd };
}
```

#### 7.6 — Cidade com segurança (?. e ??)

```js
function cidadeDoUsuario(usuario) {
  return usuario?.endereco?.cidade ?? 'Desconhecida';
}
```

#### 7.7 — Inverter chaves e valores

```js
function inverterObjeto(obj) {
  const resultado = {};
  for (const [chave, valor] of Object.entries(obj)) {
    resultado[valor] = chave;
  }
  return resultado;
}
```

#### 7.8 — Ida e volta em JSON

```js
function salvar(dados) {
  return JSON.stringify(dados);
}

function carregar(texto) {
  return JSON.parse(texto);
}
```

#### 7.9 — Objeto com métodos e this

```js
function criarPlacar() {
  return {
    pontos: 0,
    marcar(qtd = 1) {
      this.pontos += qtd;
      return this.pontos;
    },
    zerar() {
      this.pontos = 0;
    },
  };
}
```

#### 7.10 — Mesclar configurações

```js
function mesclarConfig(padrao, usuario) {
  return { ...padrao, ...usuario };
}
```

**Quiz do dia 7:**

1. **b)** `obj[campo]` — Com colchetes o JS usa o *valor* da variável como chave.
2. **b)** { b: 2, c: 3 } — O rest agrupa as propriedades restantes num novo objeto.
3. **a)** 0 — `??` só troca `null` e `undefined`.
4. **b)** O texto `{"a":1}` — stringify converte para texto JSON.
5. **b)** undefined — Optional chaining interrompe e retorna undefined.

### Dia 8 — map, filter, reduce e companhia

#### 8.1 — Dobrar com map

```js
function dobrarTodos(numeros) {
  return numeros.map(n => n * 2);
}
```

#### 8.2 — Somente pares com filter

```js
const apenasPares = (numeros) => numeros.filter(n => n % 2 === 0);
```

#### 8.3 — Somar com reduce

```js
const somaTotal = (numeros) => numeros.reduce((acc, n) => acc + n, 0);
```

#### 8.4 — Nomes dos produtos baratos

```js
function nomesBaratos(produtos, limite) {
  return produtos.filter(p => p.preco <= limite).map(p => p.nome);
}
```

#### 8.5 — Encontrar usuário

```js
function buscarPorId(usuarios, id) {
  return usuarios.find(u => u.id === id) ?? null;
}
```

#### 8.6 — Situação da turma

```js
function situacaoTurma(notas) {
  if (notas.every(n => n >= 6)) return 'todos aprovados';
  if (!notas.some(n => n >= 6)) return 'todos reprovados';
  return 'alguns reprovados';
}
```

#### 8.7 — Ordenar por preço (sem mutar)

```js
function ordenarPorPreco(produtos) {
  return [...produtos].sort((a, b) => a.preco - b.preco);
}
```

#### 8.8 — Total do carrinho

```js
function totalCarrinho(itens) {
  return itens.reduce((total, item) => total + item.preco * item.qtd, 0);
}
```

#### 8.9 — Agrupar por categoria

```js
function agruparPorCategoria(produtos) {
  return produtos.reduce((grupos, p) => {
    if (!grupos[p.categoria]) grupos[p.categoria] = [];
    grupos[p.categoria].push(p.nome);
    return grupos;
  }, {});
}
```

#### 8.10 — Estatísticas das notas

```js
function estatisticas(notas) {
  const soma = notas.reduce((a, n) => a + n, 0);
  return {
    media: Math.round((soma / notas.length) * 10) / 10,
    maior: Math.max(...notas),
    menor: Math.min(...notas),
    aprovados: notas.filter(n => n >= 6).length,
  };
}
```

**Quiz do dia 8:**

1. **b)** map — map transforma cada item, mantendo o tamanho.
2. **b)** [1, 10, 3] — Sem função de comparação, sort compara como texto: '10' vem antes de '3'.
3. **c)** undefined — find retorna undefined; findIndex retorna -1; filter retorna [].
4. **b)** O valor inicial do acumulador — É o valor de partida do acumulador.
5. **a)** true — some retorna true se ao menos um item passar.

### Dia 9 — Funções avançadas: callbacks e closures

#### 9.1 — Calculadora com callback

```js
function calcular(a, b, operacao) {
  return operacao(a, b);
}
```

#### 9.2 — Fábrica de multiplicadores

```js
function criarMultiplicador(fator) {
  return (n) => n * fator;
}
```

#### 9.3 — Contador com estado privado

```js
function criarContador(inicial = 0) {
  let contagem = inicial;
  return {
    incrementar() { contagem++; return contagem; },
    decrementar() { contagem--; return contagem; },
    valor() { return contagem; },
  };
}
```

#### 9.4 — Seu próprio map

```js
function meuMap(lista, fn) {
  const resultado = [];
  for (let i = 0; i < lista.length; i++) {
    resultado.push(fn(lista[i], i));
  }
  return resultado;
}
```

#### 9.5 — Seu próprio filter

```js
function meuFilter(lista, condicao) {
  const resultado = [];
  for (const item of lista) {
    if (condicao(item)) resultado.push(item);
  }
  return resultado;
}
```

#### 9.6 — Executar uma única vez

```js
function umaVez(fn) {
  let executou = false;
  let resultado;
  return (...args) => {
    if (!executou) {
      resultado = fn(...args);
      executou = true;
    }
    return resultado;
  };
}
```

#### 9.7 — Memoização (cache)

```js
function memoizar(fn) {
  const cache = {};
  return (arg) => {
    if (!(arg in cache)) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}
```

#### 9.8 — Linha de montagem (pipe)

```js
function pipe(...funcoes) {
  return (valor) => funcoes.reduce((acc, fn) => fn(acc), valor);
}
```

#### 9.9 — Conta bancária com closure

```js
function criarConta(saldoInicial = 0) {
  let saldo = saldoInicial;
  return {
    depositar(valor) {
      saldo += valor;
      return saldo;
    },
    sacar(valor) {
      if (valor > saldo) return false;
      saldo -= valor;
      return true;
    },
    saldo: () => saldo,
  };
}
```

**Quiz do dia 9:**

1. **b)** Uma função que lembra das variáveis do escopo onde foi criada — A função mantém acesso ao escopo léxico em que nasceu.
2. **b)** Uma função — criarMultiplicador retorna uma função.
3. **b)** `array.forEach` — forEach recebe uma função para executar em cada item.
4. **b)** Não, cada chamada cria um escopo novo — Cada execução da função externa cria novas variáveis locais.

### Dia 10 — Classes e Programação Orientada a Objetos

#### 10.1 — Classe Retângulo

```js
class Retangulo {
  constructor(largura, altura) {
    this.largura = largura;
    this.altura = altura;
  }
  area() {
    return this.largura * this.altura;
  }
  perimetro() {
    return 2 * (this.largura + this.altura);
  }
  ehQuadrado() {
    return this.largura === this.altura;
  }
}
```

#### 10.2 — Conta bancária com #saldo

```js
class ContaBancaria {
  #saldo;
  constructor(titular, saldoInicial = 0) {
    this.titular = titular;
    this.#saldo = saldoInicial;
  }
  get saldo() {
    return this.#saldo;
  }
  depositar(valor) {
    if (valor > 0) this.#saldo += valor;
    return this.#saldo;
  }
  sacar(valor) {
    if (valor > this.#saldo) return false;
    this.#saldo -= valor;
    return true;
  }
}
```

#### 10.3 — Herança: Funcionário e Gerente

```js
class Funcionario {
  constructor(nome, salario) {
    this.nome = nome;
    this.salario = salario;
  }
  bonus() {
    return this.salario * 0.1;
  }
  resumo() {
    return `${this.nome}: bônus de ${this.bonus()}`;
  }
}

class Gerente extends Funcionario {
  bonus() {
    return this.salario * 0.2 + 500;
  }
}
```

#### 10.4 — Conversor com métodos estáticos

```js
class Conversor {
  static kmParaMilhas(km) {
    return Math.round(km * 0.621371 * 100) / 100;
  }
  static milhasParaKm(mi) {
    return Math.round((mi / 0.621371) * 100) / 100;
  }
}
```

#### 10.5 — Carrinho de compras

```js
class Carrinho {
  constructor() {
    this.itens = [];
  }
  adicionar(nome, preco, qtd = 1) {
    const existente = this.itens.find(i => i.nome === nome);
    if (existente) existente.qtd += qtd;
    else this.itens.push({ nome, preco, qtd });
  }
  remover(nome) {
    this.itens = this.itens.filter(i => i.nome !== nome);
  }
  get total() {
    return this.itens.reduce((s, i) => s + i.preco * i.qtd, 0);
  }
  get quantidade() {
    return this.itens.reduce((s, i) => s + i.qtd, 0);
  }
}
```

#### 10.6 — Estrutura de dados: Pilha

```js
class Pilha {
  #itens = [];
  empilhar(item) {
    this.#itens.push(item);
  }
  desempilhar() {
    return this.#itens.pop();
  }
  topo() {
    return this.#itens[this.#itens.length - 1];
  }
  get tamanho() {
    return this.#itens.length;
  }
  estaVazia() {
    return this.#itens.length === 0;
  }
}
```

#### 10.7 — Polimorfismo com formas

```js
class Forma {
  area() {
    throw new Error('Implemente area() na classe filha');
  }
}

class Circulo extends Forma {
  constructor(raio) {
    super();
    this.raio = raio;
  }
  area() {
    return Math.PI * this.raio ** 2;
  }
}

class Quadrado extends Forma {
  constructor(lado) {
    super();
    this.lado = lado;
  }
  area() {
    return this.lado ** 2;
  }
}

function somaDasAreas(formas) {
  const total = formas.reduce((s, f) => s + f.area(), 0);
  return Math.round(total * 100) / 100;
}
```

#### 10.8 — Getter e setter de nome completo

```js
class Pessoa {
  constructor(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
  }
  get nomeCompleto() {
    return `${this.nome} ${this.sobrenome}`;
  }
  set nomeCompleto(valor) {
    const [nome, ...resto] = valor.split(' ');
    this.nome = nome;
    this.sobrenome = resto.join(' ');
  }
}
```

**Quiz do dia 10:**

1. **b)** new — `new Classe()` executa o constructor e retorna o objeto.
2. **b)** super() — super() executa o constructor da classe pai.
3. **b)** `obj.total` — Getters são lidos como propriedades, sem parênteses.
4. **b)** Na própria classe — Ex.: `Math.max` e `Array.isArray` são estáticos.
5. **b)** Campo privado — Campos com # só podem ser acessados dentro da classe.

### Dia 11 — Erros, depuração, Map, Set e módulos

#### 11.1 — Divisão segura

```js
function dividir(a, b) {
  if (b === 0) throw new Error('Divisão por zero');
  return a / b;
}
```

#### 11.2 — JSON.parse sem quebrar

```js
function lerJSON(texto) {
  try {
    return JSON.parse(texto);
  } catch {
    return null;
  }
}
```

#### 11.3 — Validar cadastro

```js
function validarUsuario(usuario) {
  if (!usuario.nome || usuario.nome.trim() === '') throw new Error('Nome obrigatório');
  if (!usuario.email || !usuario.email.includes('@')) throw new Error('E-mail inválido');
  const { idade } = usuario;
  if (!Number.isInteger(idade) || idade < 0 || idade > 130) throw new Error('Idade inválida');
  return true;
}
```

#### 11.4 — Classe de erro personalizada

```js
class EstoqueError extends Error {
  constructor(produto, mensagem) {
    super(mensagem);
    this.name = 'EstoqueError';
    this.produto = produto;
  }
}

function retirar(estoque, produto, qtd) {
  const atual = estoque[produto] ?? 0;
  if (qtd > atual) throw new EstoqueError(produto, 'Estoque insuficiente');
  estoque[produto] = atual - qtd;
  return estoque[produto];
}
```

#### 11.5 — Depuração: média errada

```js
function media(notas) {
  if (notas.length === 0) return 0;
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  return soma / notas.length;
}

console.log(media([7, 8, 9]));
```

#### 11.6 — Set: tags únicas

```js
function tagsUnicas(posts) {
  const todas = new Set();
  for (const post of posts) {
    for (const tag of post.tags) todas.add(tag);
  }
  return [...todas].sort();
}
```

#### 11.7 — Set: amigos em comum

```js
function emComum(a, b) {
  const conjuntoB = new Set(b);
  return [...new Set(a)].filter(x => conjuntoB.has(x));
}
```

#### 11.8 — Map: contar palavras

```js
function contarPalavras(texto) {
  const contagem = new Map();
  for (const palavra of texto.toLowerCase().split(/\s+/)) {
    if (!palavra) continue;
    contagem.set(palavra, (contagem.get(palavra) ?? 0) + 1);
  }
  return contagem;
}
```

#### 11.9 — Executar com segurança

```js
function tentar(fn) {
  try {
    return { ok: true, valor: fn() };
  } catch (e) {
    return { ok: false, erro: e.message };
  }
}
```

**Quiz do dia 11:**

1. **c)** Sempre — finally roda em ambos os casos — útil para “limpeza”.
2. **b)** [1, 2, 3] — Set descarta repetidos; o spread volta para array.
3. **b)** Ler a mensagem e a linha indicada — A mensagem de erro geralmente diz exatamente o problema.
4. **c)** `m.get('a')` — Map usa os métodos get/set/has/delete.
5. **a)** O export default — Sem chaves importamos o default; com chaves, exports nomeados.

### Dia 12 — DOM e eventos: JavaScript na página

#### 12.1 — Trocar o título

```js
document.querySelector('#titulo').textContent = 'Bem-vindo ao DOM';
document.querySelector('#sub').textContent = 'JavaScript manipulando a página';
```

#### 12.2 — Mexendo em classes

```js
const aviso = document.querySelector('#aviso');
aviso.classList.remove('oculto');
aviso.classList.add('destaque');
```

#### 12.3 — Criar lista a partir de dados

```js
const frutas = ['maçã', 'banana', 'uva'];
const lista = document.querySelector('#lista');
for (const fruta of frutas) {
  const li = document.createElement('li');
  li.textContent = fruta;
  lista.append(li);
}
```

#### 12.4 — Contador de cliques

```js
const valor = document.querySelector('#valor');
let contagem = 0;
function atualizar() {
  valor.textContent = contagem;
}
document.querySelector('#mais').addEventListener('click', () => {
  contagem++;
  atualizar();
});
document.querySelector('#menos').addEventListener('click', () => {
  if (contagem > 0) contagem--;
  atualizar();
});
```

#### 12.5 — Formulário de saudação

```js
const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.querySelector('#nome').value.trim();
  const saida = document.querySelector('#saida');
  saida.textContent = nome ? `Olá, ${nome}!` : 'Digite seu nome';
});
```

#### 12.6 — Lista de tarefas com delegação

```js
document.querySelector('#tarefas').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('feita');
  }
});
```

#### 12.7 — Renderizar vitrine de produtos

```js
function renderizar(produtos) {
  const vitrine = document.querySelector('#vitrine');
  vitrine.innerHTML = '';
  for (const p of produtos) {
    const card = document.createElement('div');
    card.className = 'card';
    const h3 = document.createElement('h3');
    h3.textContent = p.nome;
    const preco = document.createElement('p');
    preco.textContent = `R$ ${p.preco.toFixed(2)}`;
    card.append(h3, preco);
    vitrine.append(card);
  }
}

renderizar([{ nome: 'Teclado', preco: 150 }, { nome: 'Mouse', preco: 80 }]);
```

#### 12.8 — Filtro ao digitar

```js
const busca = document.querySelector('#busca');
busca.addEventListener('input', () => {
  const termo = busca.value.toLowerCase();
  for (const li of document.querySelectorAll('#nomes li')) {
    const combina = li.textContent.toLowerCase().includes(termo);
    li.classList.toggle('oculto', !combina);
  }
});
```

**Quiz do dia 12:**

1. **c)** `querySelectorAll('.item')` — querySelector retorna só o primeiro.
2. **b)** Risco de XSS (injeção de código) — O HTML seria interpretado; um atacante poderia injetar scripts. Use textContent.
3. **b)** Impede o comportamento padrão (recarregar a página) — Assim você trata o envio com JavaScript.
4. **b)** No elemento pai — O evento borbulha até o pai, que usa event.target para saber a origem.
5. **c)** input — `change` dispara só ao sair do campo.

### Dia 13 — JavaScript assíncrono: Promises e async/await

#### 13.1 — Função esperar

```js
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

#### 13.2 — Ordem de execução

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
```

#### 13.3 — Buscar nome do usuário

```js
async function nomeDoUsuario(id) {
  const resposta = await fetch(`https://api.exemplo.com/usuarios/${id}`);
  if (!resposta.ok) return null;
  const usuario = await resposta.json();
  return usuario.nome;
}
```

#### 13.4 — Promise que falha

```js
function dividirDepois(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (b === 0) reject(new Error('Divisão por zero'));
      else resolve(a / b);
    }, 50);
  });
}
```

#### 13.5 — Usuários ativos

```js
async function nomesAtivos() {
  const resposta = await fetch('https://api.exemplo.com/usuarios');
  const usuarios = await resposta.json();
  return usuarios.filter(u => u.ativo).map(u => u.nome);
}
```

#### 13.6 — Tratamento de erros com await

```js
async function buscarProduto(id) {
  try {
    const r = await fetch(`https://api.exemplo.com/produtos/${id}`);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}
```

#### 13.7 — Requisições em paralelo

```js
async function somaDosPrecos(ids) {
  const produtos = await Promise.all(
    ids.map(id => fetch(`https://api.exemplo.com/produtos/${id}`).then(r => r.json()))
  );
  return produtos.reduce((s, p) => s + p.preco, 0);
}
```

#### 13.8 — Limite de tempo (Promise.race)

```js
function comLimite(promise, ms) {
  const limite = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Tempo esgotado')), ms);
  });
  return Promise.race([promise, limite]);
}
```

#### 13.9 — Tentar novamente

```js
async function tentarAte(fn, tentativas) {
  let ultimoErro;
  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn();
    } catch (e) {
      ultimoErro = e;
    }
  }
  throw ultimoErro;
}
```

**Quiz do dia 13:**

1. **b)** 1 3 2 — O callback do setTimeout só roda depois do código síncrono.
2. **b)** Uma Promise — Mesmo com `return 5`, o retorno é uma Promise que resolve com 5.
3. **b)** Com try/catch — Rejeições viram exceções dentro de funções async.
4. **b)** Promise.all — awaits seguidos executam em sequência (mais lento).
5. **b)** response.ok — fetch só rejeita em erro de rede; 404/500 chegam como resposta com ok = false.

### Dia 14 — Resolução de problemas e algoritmos

#### 14.1 — São anagramas?

```js
function saoAnagramas(a, b) {
  const normalizar = (s) => s.toLowerCase().replaceAll(' ', '').split('').sort().join('');
  return normalizar(a) === normalizar(b);
}
```

#### 14.2 — Item mais frequente

```js
function maisFrequente(lista) {
  const contagem = new Map();
  let melhor = null;
  let maior = 0;
  for (const item of lista) {
    const qtd = (contagem.get(item) ?? 0) + 1;
    contagem.set(item, qtd);
    if (qtd > maior) {
      maior = qtd;
      melhor = item;
    }
  }
  return melhor;
}
```

#### 14.3 — Achatar listas (recursão)

```js
function achatar(lista) {
  const resultado = [];
  for (const item of lista) {
    if (Array.isArray(item)) resultado.push(...achatar(item));
    else resultado.push(item);
  }
  return resultado;
}
```

#### 14.4 — Busca binária

```js
function buscaBinaria(lista, alvo) {
  let inicio = 0;
  let fim = lista.length - 1;
  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);
    if (lista[meio] === alvo) return meio;
    if (lista[meio] < alvo) inicio = meio + 1;
    else fim = meio - 1;
  }
  return -1;
}
```

#### 14.5 — Validar ( [ { } ] )

```js
function validarSimbolos(texto) {
  const pares = { ')': '(', ']': '[', '}': '{' };
  const pilha = [];
  for (const c of texto) {
    if ('([{'.includes(c)) pilha.push(c);
    else if (c in pares) {
      if (pilha.pop() !== pares[c]) return false;
    }
  }
  return pilha.length === 0;
}
```

#### 14.6 — Compressão de texto

```js
function comprimir(texto) {
  let resultado = '';
  let contagem = 1;
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] === texto[i + 1]) {
      contagem++;
    } else {
      resultado += texto[i] + contagem;
      contagem = 1;
    }
  }
  return resultado;
}
```

#### 14.7 — Ordenação (sem sort)

```js
function ordenar(lista) {
  const a = [...lista];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}
```

#### 14.8 — Relatório de vendas

```js
function relatorio(vendas) {
  const porVendedor = {};
  let total = 0;
  for (const { vendedor, valor } of vendas) {
    porVendedor[vendedor] = (porVendedor[vendedor] ?? 0) + valor;
    total += valor;
  }
  let melhor = null;
  for (const [nome, soma] of Object.entries(porVendedor)) {
    if (melhor === null || soma > porVendedor[melhor]) melhor = nome;
  }
  return { total, porVendedor, melhor };
}
```

#### 14.9 — Paginação

```js
function paginar(lista, pagina, porPagina) {
  const totalPaginas = Math.ceil(lista.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  return {
    itens: lista.slice(inicio, inicio + porPagina),
    pagina,
    totalPaginas,
    temAnterior: pagina > 1,
    temProxima: pagina < totalPaginas,
  };
}
```

**Quiz do dia 14:**

1. **b)** Pilha — O último aberto deve ser o primeiro fechado (LIFO).
2. **b)** Para saber qual metade descartar — Comparando com o meio, a ordem diz em qual metade o alvo pode estar.
3. **b)** Set.has — Set e Map usam tabelas hash: tempo praticamente constante.
4. **b)** Entender o problema e as entradas/saídas — Sem entender o problema, o código resolve a coisa errada.

### Dia 15 — Projeto final: gerenciador de tarefas

#### 15.1 — Etapa 1: GerenciadorTarefas

```js
class GerenciadorTarefas {
  #tarefas = [];
  #proximoId = 1;

  adicionar(titulo, prioridade = 'media') {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Título obrigatório');
    }
    if (!['alta', 'media', 'baixa'].includes(prioridade)) {
      throw new Error('Prioridade inválida');
    }
    const tarefa = { id: this.#proximoId++, titulo: titulo.trim(), prioridade, concluida: false };
    this.#tarefas.push(tarefa);
    return tarefa;
  }

  concluir(id) {
    const tarefa = this.#tarefas.find(t => t.id === id);
    if (!tarefa) return false;
    tarefa.concluida = true;
    return true;
  }

  remover(id) {
    const antes = this.#tarefas.length;
    this.#tarefas = this.#tarefas.filter(t => t.id !== id);
    return this.#tarefas.length < antes;
  }

  listar(filtro = 'todas') {
    if (filtro === 'pendentes') return this.#tarefas.filter(t => !t.concluida);
    if (filtro === 'concluidas') return this.#tarefas.filter(t => t.concluida);
    return [...this.#tarefas];
  }
}
```

#### 15.2 — Etapa 2: estatísticas e ordenação

```js
class GerenciadorTarefas {
  #tarefas = [];
  #proximoId = 1;

  adicionar(titulo, prioridade = 'media') {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Título obrigatório');
    }
    if (!['alta', 'media', 'baixa'].includes(prioridade)) {
      throw new Error('Prioridade inválida');
    }
    const tarefa = { id: this.#proximoId++, titulo: titulo.trim(), prioridade, concluida: false };
    this.#tarefas.push(tarefa);
    return tarefa;
  }

  concluir(id) {
    const tarefa = this.#tarefas.find(t => t.id === id);
    if (!tarefa) return false;
    tarefa.concluida = true;
    return true;
  }

  remover(id) {
    const antes = this.#tarefas.length;
    this.#tarefas = this.#tarefas.filter(t => t.id !== id);
    return this.#tarefas.length < antes;
  }

  listar(filtro = 'todas') {
    if (filtro === 'pendentes') return this.#tarefas.filter(t => !t.concluida);
    if (filtro === 'concluidas') return this.#tarefas.filter(t => t.concluida);
    return [...this.#tarefas];
  }

  estatisticas() {
    const total = this.listar().length;
    const concluidas = this.listar('concluidas').length;
    return {
      total,
      concluidas,
      pendentes: total - concluidas,
      percentual: total === 0 ? 0 : Math.round((concluidas / total) * 100),
    };
  }

  ordenadasPorPrioridade() {
    const peso = { alta: 0, media: 1, baixa: 2 };
    return this.listar().sort((a, b) => peso[a.prioridade] - peso[b.prioridade]);
  }
}
```

#### 15.3 — Etapa 3: salvar e carregar

```js
class GerenciadorTarefas {
  #tarefas = [];
  #proximoId = 1;

  adicionar(titulo, prioridade = 'media') {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Título obrigatório');
    }
    if (!['alta', 'media', 'baixa'].includes(prioridade)) {
      throw new Error('Prioridade inválida');
    }
    const tarefa = { id: this.#proximoId++, titulo: titulo.trim(), prioridade, concluida: false };
    this.#tarefas.push(tarefa);
    return tarefa;
  }

  concluir(id) {
    const tarefa = this.#tarefas.find(t => t.id === id);
    if (!tarefa) return false;
    tarefa.concluida = true;
    return true;
  }

  remover(id) {
    const antes = this.#tarefas.length;
    this.#tarefas = this.#tarefas.filter(t => t.id !== id);
    return this.#tarefas.length < antes;
  }

  listar(filtro = 'todas') {
    if (filtro === 'pendentes') return this.#tarefas.filter(t => !t.concluida);
    if (filtro === 'concluidas') return this.#tarefas.filter(t => t.concluida);
    return [...this.#tarefas];
  }

  exportar() {
    return JSON.stringify(this.#tarefas);
  }

  static importar(json) {
    let dados;
    try {
      dados = JSON.parse(json);
    } catch {
      throw new Error('Arquivo inválido');
    }
    if (!Array.isArray(dados)) throw new Error('Arquivo inválido');
    const g = new GerenciadorTarefas();
    g.#tarefas = dados;
    g.#proximoId = dados.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    return g;
  }
}
```

#### 15.4 — Etapa 4: sincronizar (async)

```js
async function sincronizar(tarefas, enviar) {
  const resultados = await Promise.allSettled(tarefas.map(t => enviar(t)));
  const enviadas = resultados.filter(r => r.status === 'fulfilled').length;
  return { enviadas, falhas: resultados.length - enviadas };
}
```

#### 15.5 — Etapa 5: interface com DOM

```js
class GerenciadorTarefas {
  #tarefas = [];
  #proximoId = 1;

  adicionar(titulo, prioridade = 'media') {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Título obrigatório');
    }
    if (!['alta', 'media', 'baixa'].includes(prioridade)) {
      throw new Error('Prioridade inválida');
    }
    const tarefa = { id: this.#proximoId++, titulo: titulo.trim(), prioridade, concluida: false };
    this.#tarefas.push(tarefa);
    return tarefa;
  }

  concluir(id) {
    const tarefa = this.#tarefas.find(t => t.id === id);
    if (!tarefa) return false;
    tarefa.concluida = true;
    return true;
  }

  remover(id) {
    const antes = this.#tarefas.length;
    this.#tarefas = this.#tarefas.filter(t => t.id !== id);
    return this.#tarefas.length < antes;
  }

  listar(filtro = 'todas') {
    if (filtro === 'pendentes') return this.#tarefas.filter(t => !t.concluida);
    if (filtro === 'concluidas') return this.#tarefas.filter(t => t.concluida);
    return [...this.#tarefas];
  }
}

const gerenciador = new GerenciadorTarefas();

function renderizar() {
  const lista = document.querySelector('#lista');
  lista.innerHTML = '';
  for (const t of gerenciador.listar()) {
    const li = document.createElement('li');
    li.textContent = t.titulo;
    li.dataset.id = t.id;
    if (t.concluida) li.classList.add('concluida');
    lista.append(li);
  }
  const concluidas = gerenciador.listar('concluidas').length;
  document.querySelector('#resumo').textContent = `${concluidas} de ${gerenciador.listar().length} concluídas`;
}

document.querySelector('#nova').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#titulo');
  const erro = document.querySelector('#erro');
  try {
    gerenciador.adicionar(input.value, document.querySelector('#prioridade').value);
    input.value = '';
    erro.textContent = '';
    renderizar();
  } catch (err) {
    erro.textContent = err.message;
  }
});

document.querySelector('#lista').addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  gerenciador.concluir(Number(li.dataset.id));
  renderizar();
});

renderizar();
```

**Quiz do dia 15:**

1. **b)** [4, 6] — map → [2,4,6]; filter > 2 → [4,6].
2. **b)** 'object' — Arrays são objetos. Use `Array.isArray` para testar.
3. **b)** TypeError: Assignment to constant variable — const não pode ser reatribuída.
4. **b)** 2 — Objetos são compartilhados por referência.
5. **b)** await promise — await espera a Promise resolver.
6. **b)** Que uma função acesse variáveis do escopo onde foi criada — Base de contadores privados, fábricas de funções e hooks.
7. **c)** 'false' — 'false' é uma string não vazia: truthy.
8. **b)** event.preventDefault() — preventDefault cancela o comportamento padrão do evento.
9. **b)** super() — super() antes de usar this.
10. **c)** Set — Set descarta duplicados automaticamente.
11. **b)** [1, 10, 2] — Sem comparador, sort ordena como texto.
12. **b)** await Promise.all([a, b]) — Promise.all inicia e espera todas juntas.
