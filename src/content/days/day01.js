export default {
  day: 1,
  title: 'Primeiros passos: console, variáveis e tipos',
  summary: 'Escrever e executar seus primeiros programas, guardar valores em variáveis e fazer contas.',
  hours: 3,
  goals: [
    'Usar console.log para mostrar valores',
    'Declarar variáveis com let e const (e saber quando usar cada uma)',
    'Reconhecer os tipos primitivos: string, number, boolean, null e undefined',
    'Fazer contas com operadores aritméticos e montar textos com template strings',
  ],
  lesson: [
    {
      title: 'Como estudar com este app',
      blocks: [
        { p: 'Cada dia tem <strong>teoria curta</strong>, <strong>exercícios com correção automática</strong>, um <strong>quiz</strong> e um <strong>diário</strong>. A ordem recomendada é: leia a teoria testando os exemplos (botão <em>▶ Testar</em>), faça os exercícios, responda ao quiz e escreva no diário o que aprendeu.' },
        { p: 'Nos exercícios, escreva o código no editor e toque em <strong>Executar</strong> (ou <kbd>Ctrl</kbd>+<kbd>Enter</kbd>). Os testes dizem o que passou e o que falhou. Errar faz parte: cada erro é registrado para o app descobrir onde você precisa reforçar.' },
        { tip: 'Tente resolver sozinho por pelo menos 10 minutos antes de abrir uma dica. A dificuldade na medida certa é o que faz o cérebro aprender (isso se chama <em>dificuldade desejável</em>).' },
      ],
    },
    {
      title: 'console.log: o seu megafone',
      blocks: [
        { p: '<code>console.log()</code> mostra valores na área de saída. É a ferramenta nº 1 para entender o que o código está fazendo.' },
        { code: `console.log('Olá, mundo!');
console.log(2 + 3);
console.log('A soma é', 2 + 3);`, run: true },
        { p: 'Textos (strings) vão entre aspas simples <code>\'...\'</code>, duplas <code>"..."</code> ou crases <code>`...`</code>. Números não usam aspas.' },
      ],
    },
    {
      title: 'Variáveis: let e const',
      blocks: [
        { p: 'Uma variável é uma “caixa com nome” que guarda um valor. Use <code>const</code> quando o valor <strong>não</strong> será trocado e <code>let</code> quando ele vai mudar.' },
        { code: `const nome = 'Ana';      // não muda
let pontos = 10;         // vai mudar
pontos = pontos + 5;     // agora vale 15
console.log(nome, pontos);`, run: true },
        { warn: 'Evite <code>var</code>: é a forma antiga, com regras de escopo confusas. Em código moderno usamos apenas <code>let</code> e <code>const</code>.' },
        { p: 'Regras de nomes: comece com letra, <code>_</code> ou <code>$</code>; sem espaços; maiúsculas importam (<code>idade</code> ≠ <code>Idade</code>). Por convenção usamos <em>camelCase</em>: <code>precoFinal</code>, <code>nomeCompleto</code>.' },
      ],
    },
    {
      title: 'Tipos primitivos',
      blocks: [
        { list: [
          '<code>string</code>: textos — <code>\'café\'</code>',
          '<code>number</code>: números inteiros e decimais — <code>42</code>, <code>3.14</code> (decimal usa ponto!)',
          '<code>boolean</code>: <code>true</code> ou <code>false</code>',
          '<code>undefined</code>: variável declarada sem valor',
          '<code>null</code>: “vazio de propósito”',
        ] },
        { code: `let semValor;
console.log(typeof 'oi');      // string
console.log(typeof 10);        // number
console.log(typeof true);      // boolean
console.log(typeof semValor);  // undefined
console.log(typeof null);      // object (um bug histórico do JS!)`, run: true },
      ],
    },
    {
      title: 'Operadores aritméticos',
      blocks: [
        { code: `console.log(7 + 2);   // 9  soma
console.log(7 - 2);   // 5  subtração
console.log(7 * 2);   // 14 multiplicação
console.log(7 / 2);   // 3.5 divisão
console.log(7 % 2);   // 1  resto da divisão
console.log(2 ** 3);  // 8  potência

let vidas = 3;
vidas += 2;  // o mesmo que vidas = vidas + 2
vidas++;     // soma 1
console.log(vidas); // 6`, run: true },
        { p: 'A precedência segue a matemática: <code>*</code>, <code>/</code> e <code>%</code> antes de <code>+</code> e <code>-</code>. Use parênteses para deixar claro.' },
        { warn: 'Cuidado com <code>+</code> entre texto e número: <code>\'5\' + 3</code> resulta em <code>\'53\'</code> (concatenação), não 8.' },
      ],
    },
    {
      title: 'Template strings',
      blocks: [
        { p: 'Com crases você coloca valores dentro do texto usando <code>${ }</code>. É a forma mais legível de montar mensagens.' },
        { code: `const produto = 'Café';
const preco = 12.5;
console.log(\`O \${produto} custa R$ \${preco}\`);
console.log(\`O dobro custa R$ \${preco * 2}\`);`, run: true },
      ],
    },
  ],
  exercises: [
    {
      id: 'd01-ola',
      title: 'Olá, console',
      topic: 'fundamentos',
      difficulty: 1,
      prompt: '<p>Use <code>console.log</code> para mostrar exatamente estas duas linhas, nesta ordem:</p><pre>Olá, mundo!\nEstou aprendendo JavaScript</pre>',
      starter: `// Escreva seu código abaixo\n`,
      solution: `console.log('Olá, mundo!');\nconsole.log('Estou aprendendo JavaScript');`,
      hints: ['Cada <code>console.log(...)</code> imprime uma linha.', 'O texto precisa estar entre aspas e ser idêntico, inclusive acentos e pontuação.'],
      tests: [{ name: 'Saída correta', logs: ['Olá, mundo!', 'Estou aprendendo JavaScript'] }],
    },
    {
      id: 'd01-variaveis',
      title: 'let ou const?',
      topic: 'fundamentos',
      difficulty: 1,
      prompt: '<p>Crie uma <strong>constante</strong> <code>linguagem</code> com o valor <code>\'JavaScript\'</code> e uma variável <code>ano</code> (com <code>let</code>) valendo <code>1995</code>. Na linha seguinte, mude <code>ano</code> para <code>2026</code>.</p>',
      starter: `// 1) declare linguagem com const\n\n// 2) declare ano com let\n\n// 3) mude o valor de ano\n`,
      solution: `const linguagem = 'JavaScript';\nlet ano = 1995;\nano = 2026;`,
      hints: ['<code>const nome = valor;</code> e <code>let nome = valor;</code>', 'Para trocar o valor depois, não repita o <code>let</code>: escreva só <code>ano = 2026;</code>'],
      tests: [
        { name: 'linguagem vale "JavaScript"', run: `linguagem`, expected: 'JavaScript' },
        { name: 'ano vale 2026 no final', run: `ano`, expected: 2026 },
      ],
      checks: [
        { type: 'must', pattern: 'const\\s+linguagem', message: 'linguagem foi declarada com const' },
        { type: 'must', pattern: 'let\\s+ano\\s*=\\s*1995', message: 'ano começou com let valendo 1995' },
      ],
    },
    {
      id: 'd01-tipos',
      title: 'Um de cada tipo',
      topic: 'fundamentos',
      difficulty: 1,
      prompt: '<p>Declare cinco variáveis:</p><ul><li><code>texto</code>: qualquer string</li><li><code>numero</code>: qualquer number</li><li><code>ativo</code>: um boolean</li><li><code>vazio</code>: <code>null</code></li><li><code>indefinido</code>: declarada sem valor</li></ul>',
      starter: `// declare as 5 variáveis\n`,
      solution: `const texto = 'oi';\nconst numero = 7;\nconst ativo = true;\nconst vazio = null;\nlet indefinido;`,
      hints: ['Para ter <code>undefined</code>, basta <code>let indefinido;</code> (sem <code>=</code>).', 'Use <code>typeof</code> com <code>console.log</code> para conferir o tipo de cada uma.'],
      tests: [
        { name: 'texto é string', run: `typeof texto`, expected: 'string' },
        { name: 'numero é number', run: `typeof numero`, expected: 'number' },
        { name: 'ativo é boolean', run: `typeof ativo`, expected: 'boolean' },
        { name: 'vazio é null', run: `vazio`, expected: null },
        { name: 'indefinido é undefined', run: `typeof indefinido`, expected: 'undefined' },
      ],
    },
    {
      id: 'd01-calculadora',
      title: 'Calculadora',
      topic: 'operadores',
      difficulty: 1,
      prompt: '<p>Usando <code>a</code> e <code>b</code>, crie as constantes <code>soma</code>, <code>subtracao</code>, <code>multiplicacao</code>, <code>divisao</code>, <code>resto</code> e <code>potencia</code> (a elevado a b). Use as variáveis, não os números diretamente.</p>',
      starter: `const a = 17;\nconst b = 5;\n\n// crie as constantes aqui\n`,
      solution: `const a = 17;\nconst b = 5;\nconst soma = a + b;\nconst subtracao = a - b;\nconst multiplicacao = a * b;\nconst divisao = a / b;\nconst resto = a % b;\nconst potencia = a ** b;`,
      hints: ['O resto da divisão é o operador <code>%</code>.', 'Potência: <code>**</code>.'],
      tests: [
        { name: 'soma = 22', run: `soma`, expected: 22 },
        { name: 'subtracao = 12', run: `subtracao`, expected: 12 },
        { name: 'multiplicacao = 85', run: `multiplicacao`, expected: 85 },
        { name: 'divisao = 3.4', run: `divisao`, expected: 3.4 },
        { name: 'resto = 2', run: `resto`, expected: 2 },
        { name: 'potencia = 1419857', run: `potencia`, expected: 1419857 },
      ],
      checks: [{ type: 'mustNot', pattern: '=\\s*1[47]19857|=\\s*22\\b|=\\s*85\\b', message: 'Usou as variáveis a e b (sem escrever o resultado direto)' }],
    },
    {
      id: 'd01-template',
      title: 'Apresentação com template string',
      topic: 'fundamentos',
      difficulty: 1,
      prompt: '<p>Crie a constante <code>frase</code> usando <strong>template string</strong> (crases e <code>${ }</code>) para que o valor seja exatamente:</p><pre>Meu nome é Rafa e tenho 30 anos.</pre><p>Depois mostre a frase no console.</p>',
      starter: `const nome = 'Rafa';\nconst idade = 30;\n\n`,
      solution: "const nome = 'Rafa';\nconst idade = 30;\nconst frase = `Meu nome é ${nome} e tenho ${idade} anos.`;\nconsole.log(frase);",
      hints: ['Crase é a tecla <kbd>`</kbd> (no celular, use a barra de símbolos acima do teclado).', 'Dentro da crase: <code>${nome}</code> insere o valor da variável.'],
      tests: [
        { name: 'frase correta', run: `frase`, expected: 'Meu nome é Rafa e tenho 30 anos.' },
        { name: 'frase aparece no console', logs: ['Meu nome é Rafa e tenho 30 anos.'] },
      ],
      checks: [{ type: 'must', pattern: '`[^`]*\\$\\{\\s*nome\\s*\\}[^`]*\\$\\{\\s*idade\\s*\\}', message: 'Usou template string com ${nome} e ${idade}' }],
    },
    {
      id: 'd01-temperatura',
      title: 'Conversor de temperatura',
      topic: 'operadores',
      difficulty: 1,
      prompt: '<p>Calcule <code>fahrenheit</code> a partir de <code>celsius</code> com a fórmula <code>F = C × 9 / 5 + 32</code> e mostre no console a mensagem:</p><pre>25°C = 77°F</pre>',
      starter: `const celsius = 25;\n`,
      solution: "const celsius = 25;\nconst fahrenheit = celsius * 9 / 5 + 32;\nconsole.log(`${celsius}°C = ${fahrenheit}°F`);",
      hints: ['Multiplicação é <code>*</code>.', 'Monte a mensagem com template string usando as duas variáveis.'],
      tests: [
        { name: 'fahrenheit = 77', run: `fahrenheit`, expected: 77 },
        { name: 'mensagem no console', logs: ['25°C = 77°F'] },
      ],
    },
    {
      id: 'd01-troca',
      title: 'Troca de valores',
      topic: 'fundamentos',
      difficulty: 2,
      prompt: '<p>Troque os valores de <code>a</code> e <code>b</code> <strong>sem escrever os textos de novo</strong>. Ao final, <code>a</code> deve valer <code>\'segundo\'</code> e <code>b</code> deve valer <code>\'primeiro\'</code>.</p>',
      starter: `let a = 'primeiro';\nlet b = 'segundo';\n\n// troque os valores aqui\n`,
      solution: `let a = 'primeiro';\nlet b = 'segundo';\nconst temp = a;\na = b;\nb = temp;`,
      hints: ['Pense em dois copos: para trocar o conteúdo você precisa de um terceiro copo.', 'Crie <code>const temp = a;</code> antes de sobrescrever <code>a</code>.'],
      tests: [
        { name: 'a vale "segundo"', run: `a`, expected: 'segundo' },
        { name: 'b vale "primeiro"', run: `b`, expected: 'primeiro' },
      ],
      checks: [{ type: 'mustNot', pattern: "['\"`](primeiro|segundo)['\"`][\\s\\S]*['\"`](primeiro|segundo)['\"`][\\s\\S]*['\"`](primeiro|segundo)['\"`]", message: 'Não reescreveu os textos (usou variáveis para trocar)' }],
    },
    {
      id: 'd01-desconto',
      title: 'Preço com desconto',
      topic: 'operadores',
      difficulty: 2,
      prompt: '<p>Uma loja dá <code>desconto</code> por cento sobre o <code>preco</code>. Calcule <code>valorDesconto</code> e <code>precoFinal</code>.</p><p>Exemplo: preço 80 com 15% → desconto 12 → preço final 68.</p>',
      starter: `const preco = 80;\nconst desconto = 15; // em %\n\n`,
      solution: `const preco = 80;\nconst desconto = 15;\nconst valorDesconto = preco * desconto / 100;\nconst precoFinal = preco - valorDesconto;`,
      hints: ['15% de 80 é <code>80 * 15 / 100</code>.'],
      tests: [
        { name: 'valorDesconto = 12', run: `valorDesconto`, expected: 12 },
        { name: 'precoFinal = 68', run: `precoFinal`, expected: 68 },
      ],
    },
  ],
  quiz: [
    { q: 'Qual a diferença entre <code>let</code> e <code>const</code>?', options: ['Nenhuma', '<code>const</code> não permite reatribuir o valor; <code>let</code> permite', '<code>let</code> só guarda números', '<code>const</code> é mais lento'], answer: 1, explain: '<code>const</code> impede uma nova atribuição (<code>x = ...</code>). Use <code>const</code> por padrão e <code>let</code> quando precisar mudar.' },
    { q: 'Quanto vale <code>10 % 3</code>?', options: ['3.33', '1', '3', '0'], answer: 1, explain: '<code>%</code> é o resto da divisão: 10 = 3×3 + <strong>1</strong>.' },
    { q: 'Qual o resultado de <code>\'5\' + 3</code>?', options: ['8', '\'53\'', 'Erro', 'NaN'], answer: 1, explain: 'Quando um dos lados é string, <code>+</code> concatena.' },
    { q: 'O que <code>typeof null</code> retorna?', options: ['\'null\'', '\'undefined\'', '\'object\'', '\'boolean\''], answer: 2, explain: 'É um bug histórico do JavaScript mantido por compatibilidade.' },
    { q: 'Qual linha monta corretamente um texto com variável?', options: ['<code>\'Olá ${nome}\'</code>', '<code>`Olá ${nome}`</code>', '<code>"Olá {nome}"</code>', '<code>`Olá $nome`</code>'], answer: 1, explain: 'A interpolação <code>${}</code> só funciona com crases.' },
  ],
  extra: 'Instale o Node.js no computador e rode <code>node</code> no terminal: digite expressões e veja os resultados. Repita os exemplos de hoje lá.',
};
