export default {
  day: 4,
  title: 'Funções: o bloco de construção de tudo',
  summary: 'Criar funções reutilizáveis, entender parâmetros, retorno, escopo e recursão.',
  hours: 3.5,
  goals: [
    'Declarar funções de três formas: declaração, expressão e arrow function',
    'Diferenciar return de console.log',
    'Usar parâmetros com valor padrão',
    'Entender escopo de bloco e de função',
    'Compor funções e escrever uma recursão simples',
  ],
  lesson: [
    {
      title: 'Três formas de criar funções',
      blocks: [
        { code: `// 1. Declaração
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

console.log(somar(2, 3), subtrair(5, 1), multiplicar(3, 4), quadrado(5));`, run: true },
        { tip: 'Na arrow function sem chaves, o valor após <code>=></code> é retornado automaticamente. Com chaves <code>{ }</code>, você precisa escrever <code>return</code>.' },
      ],
    },
    {
      title: 'return x console.log',
      blocks: [
        { p: 'Este é o erro nº 1 de iniciantes. <code>console.log</code> só <strong>mostra</strong>; <code>return</code> <strong>devolve</strong> o valor para quem chamou, que pode usá-lo em outras contas.' },
        { code: `function dobroMostra(n) { console.log(n * 2); }
function dobroRetorna(n) { return n * 2; }

const a = dobroMostra(5);   // mostra 10, mas a = undefined
const b = dobroRetorna(5);  // não mostra nada, b = 10
console.log(a, b);`, run: true },
        { p: 'O <code>return</code> também <strong>encerra</strong> a função imediatamente: nada depois dele é executado.' },
      ],
    },
    {
      title: 'Parâmetros padrão',
      blocks: [
        { code: `function saudar(nome = 'visitante') {
  return \`Olá, \${nome}!\`;
}
console.log(saudar('Bia')); // Olá, Bia!
console.log(saudar());      // Olá, visitante!`, run: true },
      ],
    },
    {
      title: 'Escopo',
      blocks: [
        { p: 'Variáveis criadas com <code>let</code>/<code>const</code> só existem dentro do bloco <code>{ }</code> onde foram declaradas. Funções enxergam variáveis de fora, mas o de fora não enxerga o que está dentro.' },
        { code: `const global = 'sou global';
function teste() {
  const local = 'sou local';
  console.log(global); // funciona
  if (true) {
    const doBloco = 'só existo no if';
  }
  // console.log(doBloco); // ReferenceError!
}
teste();
// console.log(local); // ReferenceError!`, run: true },
      ],
    },
    {
      title: 'Funções chamando funções',
      blocks: [
        { p: 'Programas grandes são feitos de funções pequenas, cada uma com <strong>uma responsabilidade</strong>.' },
        { code: `const precoComImposto = (preco) => preco * 1.1;
const aplicarCupom = (preco, cupom) => cupom ? preco - 10 : preco;
const precoFinal = (preco, cupom) => aplicarCupom(precoComImposto(preco), cupom);
console.log(precoFinal(100, true)); // 100`, run: true },
      ],
    },
    {
      title: 'Recursão',
      blocks: [
        { p: 'Uma função recursiva chama a si mesma com um problema menor, até chegar a um <strong>caso base</strong> que para as chamadas.' },
        { code: `function contagemRegressiva(n) {
  if (n === 0) {          // caso base
    console.log('Fogo!');
    return;
  }
  console.log(n);
  contagemRegressiva(n - 1); // passo recursivo
}
contagemRegressiva(3);`, run: true },
      ],
    },
  ],
  exercises: [
    {
      id: 'd04-arrow',
      title: 'Primeira arrow function',
      topic: 'funcoes',
      difficulty: 1,
      prompt: '<p>Crie a constante <code>triplo</code> com uma <strong>arrow function</strong> que recebe um número e retorna o triplo dele.</p>',
      starter: `// const triplo = ...\n`,
      solution: `const triplo = (n) => n * 3;`,
      hints: ['Formato: <code>const nome = (param) => expressão;</code>'],
      tests: [
        { name: 'triplo(3) → 9', run: `triplo(3)`, expected: 9 },
        { name: 'triplo(-2) → -6', run: `triplo(-2)`, expected: -6 },
      ],
      checks: [{ type: 'must', pattern: '=>', message: 'Usou arrow function' }],
    },
    {
      id: 'd04-saudacao',
      title: 'Saudação com valor padrão',
      topic: 'funcoes',
      difficulty: 1,
      prompt: '<p>Crie a função <code>saudacao(nome, periodo)</code> que retorna <code>\'Bom dia, Ana!\'</code> para <code>saudacao(\'Ana\', \'dia\')</code>. Se o período não for informado, use <code>\'dia\'</code>; se o nome não for informado, use <code>\'visitante\'</code>.</p>',
      starter: `function saudacao(nome, periodo) {\n  \n}\n`,
      solution: "function saudacao(nome = 'visitante', periodo = 'dia') {\n  return `Bom ${periodo}, ${nome}!`;\n}",
      hints: ['Valores padrão: <code>function f(a = 1, b = 2)</code>.', 'Monte o texto com template string.'],
      tests: [
        { name: 'saudacao("Ana", "dia")', run: `saudacao('Ana', 'dia')`, expected: 'Bom dia, Ana!' },
        { name: 'saudacao("Leo", "tarde")', run: `saudacao('Leo', 'tarde')`, expected: 'Bom tarde, Leo!' },
        { name: 'saudacao("Bia")', run: `saudacao('Bia')`, expected: 'Bom dia, Bia!' },
        { name: 'saudacao()', run: `saudacao()`, expected: 'Bom dia, visitante!' },
      ],
    },
    {
      id: 'd04-return',
      title: 'Retorne, não imprima',
      topic: 'funcoes',
      difficulty: 1,
      prompt: '<p>A função abaixo <strong>mostra</strong> a área, mas quem chama precisa <strong>receber</strong> o valor para fazer outras contas. Corrija <code>areaRetangulo</code> para retornar a área. O código já usa o retorno para calcular <code>areaTotal</code>.</p>',
      starter: `function areaRetangulo(largura, altura) {\n  console.log(largura * altura);\n}\n\nconst areaTotal = areaRetangulo(3, 4) + areaRetangulo(2, 5);\nconsole.log('Área total:', areaTotal);\n`,
      solution: `function areaRetangulo(largura, altura) {\n  return largura * altura;\n}\n\nconst areaTotal = areaRetangulo(3, 4) + areaRetangulo(2, 5);\nconsole.log('Área total:', areaTotal);`,
      hints: ['Rode o código original e observe: <code>undefined + undefined</code> dá <code>NaN</code>.'],
      tests: [
        { name: 'areaRetangulo(3, 4) → 12', run: `areaRetangulo(3, 4)`, expected: 12 },
        { name: 'areaTotal = 22', run: `areaTotal`, expected: 22 },
      ],
    },
    {
      id: 'd04-imc',
      title: 'IMC em duas funções',
      topic: 'funcoes',
      difficulty: 2,
      prompt: '<p>Crie duas funções:</p><ol><li><code>calcularIMC(peso, altura)</code>: retorna peso ÷ altura², arredondado para 1 casa decimal (<code>Math.round(x * 10) / 10</code>).</li><li><code>classificarIMC(imc)</code>: abaixo de 18.5 → <code>\'abaixo\'</code>; abaixo de 25 → <code>\'normal\'</code>; abaixo de 30 → <code>\'sobrepeso\'</code>; senão → <code>\'obesidade\'</code>.</li></ol><p>Por fim, <code>diagnostico(peso, altura)</code> deve usar as duas e retornar, por ex., <code>\'IMC 22.9: normal\'</code>.</p>',
      starter: `function calcularIMC(peso, altura) {\n  \n}\n\nfunction classificarIMC(imc) {\n  \n}\n\nfunction diagnostico(peso, altura) {\n  \n}\n`,
      solution: "function calcularIMC(peso, altura) {\n  return Math.round((peso / altura ** 2) * 10) / 10;\n}\n\nfunction classificarIMC(imc) {\n  if (imc < 18.5) return 'abaixo';\n  if (imc < 25) return 'normal';\n  if (imc < 30) return 'sobrepeso';\n  return 'obesidade';\n}\n\nfunction diagnostico(peso, altura) {\n  const imc = calcularIMC(peso, altura);\n  return `IMC ${imc}: ${classificarIMC(imc)}`;\n}",
      hints: ['Altura ao quadrado: <code>altura ** 2</code>.', 'Em <code>diagnostico</code>, guarde o IMC numa constante e passe-o para <code>classificarIMC</code>.'],
      tests: [
        { name: 'calcularIMC(70, 1.75) → 22.9', run: `calcularIMC(70, 1.75)`, expected: 22.9 },
        { name: 'classificarIMC(17) → "abaixo"', run: `classificarIMC(17)`, expected: 'abaixo' },
        { name: 'classificarIMC(27.5) → "sobrepeso"', run: `classificarIMC(27.5)`, expected: 'sobrepeso' },
        { name: 'classificarIMC(31) → "obesidade"', run: `classificarIMC(31)`, expected: 'obesidade' },
        { name: 'diagnostico(70, 1.75)', run: `diagnostico(70, 1.75)`, expected: 'IMC 22.9: normal' },
      ],
    },
    {
      id: 'd04-escopo',
      title: 'Caça ao bug: escopo',
      topic: 'funcoes',
      difficulty: 2,
      prompt: '<p>Esta função deveria retornar 0.2 para clientes VIP e 0.05 para os demais, mas dá erro. Execute, leia a mensagem de erro e corrija.</p>',
      starter: `function descontoCliente(ehVip) {\n  if (ehVip) {\n    let desconto = 0.2;\n  } else {\n    let desconto = 0.05;\n  }\n  return desconto;\n}\n\nconsole.log(descontoCliente(true));\n`,
      solution: `function descontoCliente(ehVip) {\n  let desconto;\n  if (ehVip) {\n    desconto = 0.2;\n  } else {\n    desconto = 0.05;\n  }\n  return desconto;\n}\n\nconsole.log(descontoCliente(true));`,
      hints: ['Uma variável <code>let</code> declarada dentro do <code>if { }</code> deixa de existir quando o bloco termina.', 'Declare <code>let desconto;</code> antes do <code>if</code> e só atribua dentro dos blocos.'],
      tests: [
        { name: 'descontoCliente(true) → 0.2', run: `descontoCliente(true)`, expected: 0.2 },
        { name: 'descontoCliente(false) → 0.05', run: `descontoCliente(false)`, expected: 0.05 },
      ],
    },
    {
      id: 'd04-contar-letra',
      title: 'Contar uma letra',
      topic: 'funcoes',
      difficulty: 1,
      prompt: '<p>Crie <code>contarLetra(texto, letra)</code> que retorna quantas vezes <code>letra</code> aparece em <code>texto</code> (diferenciando maiúsculas).</p>',
      starter: ``,
      solution: `function contarLetra(texto, letra) {\n  let total = 0;\n  for (const l of texto) {\n    if (l === letra) total++;\n  }\n  return total;\n}`,
      hints: ['Você já fez algo parecido com vogais no dia 3.'],
      tests: [
        { name: 'contarLetra("banana", "a") → 3', run: `contarLetra('banana', 'a')`, expected: 3 },
        { name: 'contarLetra("Arara", "a") → 2', run: `contarLetra('Arara', 'a')`, expected: 2 },
        { name: 'contarLetra("teste", "x") → 0', run: `contarLetra('teste', 'x')`, expected: 0 },
      ],
    },
    {
      id: 'd04-senha',
      title: 'Validador de senha',
      topic: 'funcoes',
      difficulty: 2,
      prompt: '<p>Crie <code>senhaForte(senha)</code> que retorna <code>true</code> se a senha tiver <strong>pelo menos 8 caracteres</strong>, <strong>pelo menos um número</strong> e <strong>pelo menos uma letra maiúscula</strong>.</p>',
      starter: `function senhaForte(senha) {\n  \n}\n`,
      solution: `function senhaForte(senha) {\n  if (senha.length < 8) return false;\n  let temNumero = false;\n  let temMaiuscula = false;\n  for (const c of senha) {\n    if (c >= '0' && c <= '9') temNumero = true;\n    if (c >= 'A' && c <= 'Z') temMaiuscula = true;\n  }\n  return temNumero && temMaiuscula;\n}`,
      hints: ['Use variáveis “bandeira” (<code>let temNumero = false</code>) e mude para true quando encontrar.', 'Um caractere é dígito se <code>c >= \'0\' && c <= \'9\'</code>.', 'É maiúscula se <code>c >= \'A\' && c <= \'Z\'</code> (ou <code>c !== c.toLowerCase()</code>).'],
      tests: [
        { name: '"Abcdefg1" → true', run: `senhaForte('Abcdefg1')`, expected: true },
        { name: '"abcdefg1" (sem maiúscula) → false', run: `senhaForte('abcdefg1')`, expected: false },
        { name: '"Abcdefgh" (sem número) → false', run: `senhaForte('Abcdefgh')`, expected: false },
        { name: '"Ab1" (curta) → false', run: `senhaForte('Ab1')`, expected: false },
      ],
    },
    {
      id: 'd04-potencia-recursiva',
      title: 'Potência recursiva',
      topic: 'funcoes',
      difficulty: 3,
      prompt: '<p>Crie <code>potencia(base, expoente)</code> de forma <strong>recursiva</strong> (a função chama a si mesma), sem usar <code>**</code> nem <code>Math.pow</code>. Considere expoente inteiro ≥ 0.</p><p>Ideia: base<sup>n</sup> = base × base<sup>n-1</sup>, e base<sup>0</sup> = 1.</p>',
      starter: `function potencia(base, expoente) {\n  \n}\n`,
      solution: `function potencia(base, expoente) {\n  if (expoente === 0) return 1;\n  return base * potencia(base, expoente - 1);\n}`,
      hints: ['Caso base: expoente 0 → retorna 1.', 'Passo recursivo: <code>return base * potencia(base, expoente - 1);</code>'],
      tests: [
        { name: 'potencia(2, 10) → 1024', run: `potencia(2, 10)`, expected: 1024 },
        { name: 'potencia(5, 0) → 1', run: `potencia(5, 0)`, expected: 1 },
        { name: 'potencia(3, 4) → 81', run: `potencia(3, 4)`, expected: 81 },
      ],
      checks: [
        { type: 'mustNot', pattern: '\\*\\*|Math\\.pow', message: 'Não usou ** nem Math.pow' },
        { type: 'must', pattern: 'potencia\\s*\\([^)]*\\)[\\s\\S]*potencia\\s*\\(', message: 'A função chama a si mesma (recursão)' },
      ],
    },
  ],
  quiz: [
    { q: 'O que <code>const f = (x) => x + 1;</code> retorna para <code>f(2)</code>?', options: ['undefined', '3', '\'21\'', 'Erro'], answer: 1, explain: 'Arrow sem chaves retorna a expressão automaticamente.' },
    { q: 'Uma função sem <code>return</code> retorna:', options: ['0', 'null', 'undefined', 'false'], answer: 2, explain: 'Toda função sem return explícito devolve <code>undefined</code>.' },
    { q: 'O que acontece depois de um <code>return</code> dentro da função?', options: ['O código continua', 'A função termina imediatamente', 'O valor é impresso', 'A função recomeça'], answer: 1, explain: '<code>return</code> encerra a execução da função.' },
    { q: 'Em <code>const g = (a) => { a * 2 };</code>, quanto vale <code>g(3)</code>?', options: ['6', 'undefined', '\'a*2\'', 'Erro'], answer: 1, explain: 'Com chaves é necessário <code>return</code>. Sem ele, retorna undefined.' },
    { q: 'O que é indispensável em toda função recursiva?', options: ['Um laço for', 'Um caso base', 'Parâmetro padrão', 'Uma arrow function'], answer: 1, explain: 'Sem caso base a recursão nunca termina (estouro de pilha).' },
  ],
  extra: 'Reescreva 3 exercícios dos dias anteriores como arrow functions. Qual forma você achou mais legível?',
};
