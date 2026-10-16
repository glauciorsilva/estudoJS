export default {
  day: 5,
  title: 'Strings e números a fundo',
  summary: 'Manipular textos com os principais métodos de string e trabalhar bem com números, conversões e Math.',
  hours: 3,
  goals: [
    'Usar os métodos de string mais comuns: toUpperCase, trim, includes, slice, split, replace, padStart...',
    'Converter entre texto e número com segurança (Number, parseInt, parseFloat)',
    'Arredondar e formatar números (Math.round, toFixed)',
    'Gerar números aleatórios em um intervalo',
  ],
  lesson: [
    {
      title: 'Strings são imutáveis',
      blocks: [
        { p: 'Métodos de string <strong>não alteram</strong> o texto original: eles retornam um <strong>novo</strong> texto. Por isso, guarde o resultado.' },
        { code: `const nome = 'ana';
nome.toUpperCase();            // não muda nome
const maiusculo = nome.toUpperCase();
console.log(nome, maiusculo);  // ana ANA`, run: true },
      ],
    },
    {
      title: 'Métodos essenciais',
      blocks: [
        { code: `const frase = '  Aprender JavaScript é divertido  ';
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
console.log('Olá'[0], 'Olá'.at(-1));       // O á`, run: true },
      ],
    },
    {
      title: 'Convertendo texto ↔ número',
      blocks: [
        { code: `console.log(Number('42'));        // 42
console.log(Number('42abc'));     // NaN (Not a Number)
console.log(parseInt('42px'));    // 42 (lê até onde der)
console.log(parseFloat('3.5kg')); // 3.5
console.log(Number('3,5'));       // NaN — vírgula não é decimal em JS!
console.log(String(10) + 1);      // '101'
console.log(Number.isNaN(Number('x'))); // true`, run: true },
        { warn: 'Dados digitados pelo usuário (formulários) chegam sempre como <strong>texto</strong>. Converta antes de fazer contas.' },
      ],
    },
    {
      title: 'Math e arredondamento',
      blocks: [
        { code: `console.log(Math.round(2.5), Math.floor(2.9), Math.ceil(2.1)); // 3 2 3
console.log(Math.max(4, 9, 1), Math.min(4, 9, 1));             // 9 1
console.log(Math.abs(-7), Math.sqrt(16));                      // 7 4
console.log((19.987).toFixed(2));  // '19.99' (retorna TEXTO)
console.log(0.1 + 0.2);            // 0.30000000000000004 😱`, run: true },
        { p: 'O último resultado acontece em quase todas as linguagens: decimais binários são aproximações. Para dinheiro, arredonde na hora de mostrar ou trabalhe em centavos (inteiros).' },
      ],
    },
    {
      title: 'Números aleatórios',
      blocks: [
        { code: `// Math.random() → decimal entre 0 (incluso) e 1 (excluso)
const dado = Math.floor(Math.random() * 6) + 1; // 1 a 6
console.log(dado);`, run: true },
        { tip: 'Fórmula geral para inteiros de <code>min</code> a <code>max</code> (inclusive): <code>Math.floor(Math.random() * (max - min + 1)) + min</code>.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'd05-capitalizar',
      title: 'Capitalizar palavra',
      topic: 'strings',
      difficulty: 1,
      prompt: '<p>Crie <code>capitalizar(palavra)</code>: primeira letra maiúscula e o resto minúsculo. <code>capitalizar(\'jAVASCRIPT\')</code> → <code>\'Javascript\'</code>.</p>',
      starter: `function capitalizar(palavra) {\n  \n}\n`,
      solution: `function capitalizar(palavra) {\n  return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();\n}`,
      hints: ['<code>palavra[0]</code> ou <code>palavra.charAt(0)</code> pega a primeira letra.', '<code>palavra.slice(1)</code> pega do segundo caractere até o fim.'],
      tests: [
        { name: 'capitalizar("jAVASCRIPT")', run: `capitalizar('jAVASCRIPT')`, expected: 'Javascript' },
        { name: 'capitalizar("ana")', run: `capitalizar('ana')`, expected: 'Ana' },
        { name: 'capitalizar("a")', run: `capitalizar('a')`, expected: 'A' },
      ],
    },
    {
      id: 'd05-nome-proprio',
      title: 'Formatar nome completo',
      topic: 'strings',
      difficulty: 2,
      prompt: '<p>Crie <code>formatarNome(nome)</code> que remove espaços extras nas pontas e capitaliza cada palavra. <code>formatarNome(\'  maria  da silva \')</code> → <code>\'Maria Da Silva\'</code>. Considere que entre as palavras pode haver mais de um espaço.</p>',
      starter: `function formatarNome(nome) {\n  \n}\n`,
      solution: `function formatarNome(nome) {\n  const palavras = nome.trim().split(' ');\n  let resultado = [];\n  for (const p of palavras) {\n    if (p === '') continue;\n    resultado.push(p[0].toUpperCase() + p.slice(1).toLowerCase());\n  }\n  return resultado.join(' ');\n}`,
      hints: ['<code>trim()</code> e depois <code>split(\' \')</code> para separar as palavras.', 'Espaços duplos geram itens vazios <code>\'\'</code> no split: pule-os com <code>continue</code>.', 'Junte com <code>join(\' \')</code>.'],
      tests: [
        { name: '"  maria  da silva "', run: `formatarNome('  maria  da silva ')`, expected: 'Maria Da Silva' },
        { name: '"JOÃO pedro"', run: `formatarNome('JOÃO pedro')`, expected: 'João Pedro' },
        { name: '"ana"', run: `formatarNome('ana')`, expected: 'Ana' },
      ],
    },
    {
      id: 'd05-palindromo',
      title: 'Palíndromo',
      topic: 'strings',
      difficulty: 2,
      prompt: '<p>Crie <code>ehPalindromo(texto)</code>: retorna <code>true</code> se o texto for igual lido de trás para frente, ignorando espaços e maiúsculas. Ex.: <code>\'Socorram me subi no onibus em Marrocos\'</code> → true.</p>',
      starter: `function ehPalindromo(texto) {\n  \n}\n`,
      solution: `function ehPalindromo(texto) {\n  const limpo = texto.toLowerCase().replaceAll(' ', '');\n  const invertido = limpo.split('').reverse().join('');\n  return limpo === invertido;\n}`,
      hints: ['Primeiro “limpe” o texto: minúsculas e sem espaços (<code>replaceAll(\' \', \'\')</code>).', 'Para inverter: <code>texto.split(\'\').reverse().join(\'\')</code>.'],
      tests: [
        { name: '"arara" → true', run: `ehPalindromo('arara')`, expected: true },
        { name: 'frase longa → true', run: `ehPalindromo('Socorram me subi no onibus em Marrocos')`, expected: true },
        { name: '"javascript" → false', run: `ehPalindromo('javascript')`, expected: false },
      ],
    },
    {
      id: 'd05-cartao',
      title: 'Mascarar cartão',
      topic: 'strings',
      difficulty: 1,
      prompt: '<p>Crie <code>mascararCartao(numero)</code> que mantém só os 4 últimos dígitos e troca os demais por <code>*</code>, mantendo o tamanho. <code>\'1234567812345678\'</code> → <code>\'************5678\'</code>.</p>',
      starter: `function mascararCartao(numero) {\n  \n}\n`,
      solution: `function mascararCartao(numero) {\n  return numero.slice(-4).padStart(numero.length, '*');\n}`,
      hints: ['<code>slice(-4)</code> pega os 4 últimos.', '<code>padStart(tamanho, \'*\')</code> completa à esquerda.'],
      tests: [
        { name: '16 dígitos', run: `mascararCartao('1234567812345678')`, expected: '************5678' },
        { name: '8 dígitos', run: `mascararCartao('98765432')`, expected: '****5432' },
      ],
    },
    {
      id: 'd05-contar-palavras',
      title: 'Contar palavras',
      topic: 'strings',
      difficulty: 2,
      prompt: '<p>Crie <code>contarPalavras(frase)</code>. Atenção aos casos: espaços nas pontas, espaços duplos e frase vazia (retorna 0).</p>',
      starter: `function contarPalavras(frase) {\n  \n}\n`,
      solution: `function contarPalavras(frase) {\n  const limpa = frase.trim();\n  if (limpa === '') return 0;\n  return limpa.split(/\\s+/).length;\n}`,
      hints: ['<code>split(/\\s+/)</code> separa por “um ou mais espaços” (isso é uma expressão regular).', 'Trate a frase vazia antes: <code>\'\'.split(\' \')</code> retorna <code>[\'\']</code>, que tem tamanho 1!'],
      tests: [
        { name: '"Olá mundo" → 2', run: `contarPalavras('Olá mundo')`, expected: 2 },
        { name: '"  muitos   espaços  aqui " → 3', run: `contarPalavras('  muitos   espaços  aqui ')`, expected: 3 },
        { name: '"" → 0', run: `contarPalavras('')`, expected: 0 },
        { name: '"   " → 0', run: `contarPalavras('   ')`, expected: 0 },
      ],
    },
    {
      id: 'd05-moeda',
      title: 'Formatar moeda',
      topic: 'numeros',
      difficulty: 1,
      prompt: '<p>Crie <code>formatarMoeda(valor)</code> que retorna o valor no formato brasileiro simples: <code>formatarMoeda(10.5)</code> → <code>\'R$ 10,50\'</code>.</p>',
      starter: `function formatarMoeda(valor) {\n  \n}\n`,
      solution: "function formatarMoeda(valor) {\n  return `R$ ${valor.toFixed(2).replace('.', ',')}`;\n}",
      hints: ['<code>toFixed(2)</code> garante 2 casas decimais (e retorna texto).', 'Troque o ponto pela vírgula com <code>replace</code>.', 'Curiosidade: no mundo real use <code>valor.toLocaleString(\'pt-BR\', { style: \'currency\', currency: \'BRL\' })</code>.'],
      tests: [
        { name: '10.5 → "R$ 10,50"', run: `formatarMoeda(10.5)`, expected: 'R$ 10,50' },
        { name: '3 → "R$ 3,00"', run: `formatarMoeda(3)`, expected: 'R$ 3,00' },
        { name: '19.999 → "R$ 20,00"', run: `formatarMoeda(19.999)`, expected: 'R$ 20,00' },
      ],
    },
    {
      id: 'd05-somar-textos',
      title: 'Somar valores digitados',
      topic: 'numeros',
      difficulty: 2,
      prompt: '<p>Valores vindos de formulários chegam como texto, às vezes com vírgula. Crie <code>somarTextos(a, b)</code> que converte e soma. <code>somarTextos(\'10\', \'5,5\')</code> → <code>15.5</code>. Se algum não for número válido, retorne <code>null</code>.</p>',
      starter: `function somarTextos(a, b) {\n  \n}\n`,
      solution: `function somarTextos(a, b) {\n  const x = Number(a.replace(',', '.'));\n  const y = Number(b.replace(',', '.'));\n  if (Number.isNaN(x) || Number.isNaN(y)) return null;\n  return x + y;\n}`,
      hints: ['Troque a vírgula por ponto antes de converter.', 'Use <code>Number.isNaN(x)</code> para detectar valor inválido.'],
      tests: [
        { name: '"10" + "5,5" → 15.5', run: `somarTextos('10', '5,5')`, expected: 15.5 },
        { name: '"1.5" + "2" → 3.5', run: `somarTextos('1.5', '2')`, expected: 3.5 },
        { name: '"abc" + "2" → null', run: `somarTextos('abc', '2')`, expected: null },
      ],
    },
    {
      id: 'd05-aleatorio',
      title: 'Sorteio entre min e max',
      topic: 'numeros',
      difficulty: 2,
      prompt: '<p>Crie <code>numeroAleatorio(min, max)</code> que retorna um <strong>inteiro</strong> sorteado entre min e max, <strong>incluindo</strong> os dois.</p>',
      starter: `function numeroAleatorio(min, max) {\n  \n}\n`,
      solution: `function numeroAleatorio(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}`,
      hints: ['Veja a fórmula na teoria do dia.', 'Por que <code>+ 1</code>? Porque <code>Math.random()</code> nunca chega a 1.'],
      tests: [
        { name: 'Sempre inteiro entre 1 e 3, e sorteia todos', run: `(() => { const vistos = new Set(); for (let i = 0; i < 3000; i++) { const n = numeroAleatorio(1, 3); if (!Number.isInteger(n) || n < 1 || n > 3) return false; vistos.add(n); } return vistos.size === 3; })()`, expected: true },
        { name: 'Funciona com negativos (-2 a 2)', run: `(() => { const vistos = new Set(); for (let i = 0; i < 3000; i++) { const n = numeroAleatorio(-2, 2); if (!Number.isInteger(n) || n < -2 || n > 2) return false; vistos.add(n); } return vistos.size === 5; })()`, expected: true },
      ],
    },
    {
      id: 'd05-iniciais',
      title: 'Iniciais do nome',
      topic: 'strings',
      difficulty: 1,
      prompt: '<p>Crie <code>iniciais(nome)</code> que retorna as iniciais em maiúsculas. <code>iniciais(\'ada lovelace byron\')</code> → <code>\'ALB\'</code>.</p>',
      starter: ``,
      solution: `function iniciais(nome) {\n  let resultado = '';\n  for (const parte of nome.trim().split(' ')) {\n    if (parte) resultado += parte[0].toUpperCase();\n  }\n  return resultado;\n}`,
      hints: ['Separe as palavras com <code>split(\' \')</code> e pegue <code>[0]</code> de cada uma.'],
      tests: [
        { name: '"ada lovelace byron" → "ALB"', run: `iniciais('ada lovelace byron')`, expected: 'ALB' },
        { name: '"Grace Hopper" → "GH"', run: `iniciais('Grace Hopper')`, expected: 'GH' },
      ],
    },
  ],
  quiz: [
    { q: 'Depois de <code>let s = \'oi\'; s.toUpperCase();</code>, quanto vale <code>s</code>?', options: ['\'OI\'', '\'oi\'', 'undefined', 'Erro'], answer: 1, explain: 'Strings são imutáveis; o método retorna um texto novo que foi descartado.' },
    { q: '<code>\'JavaScript\'.slice(0, 4)</code> retorna:', options: ['\'Java\'', '\'JavaS\'', '\'avaS\'', '\'Scri\''], answer: 0, explain: 'O índice final não é incluído: posições 0, 1, 2, 3.' },
    { q: '<code>Number(\'3,5\')</code> retorna:', options: ['3.5', '3', 'NaN', '\'3,5\''], answer: 2, explain: 'Em JS o separador decimal é ponto; vírgula torna o texto inválido.' },
    { q: 'Qual o tipo do retorno de <code>(2.5).toFixed(1)</code>?', options: ['number', 'string', 'boolean'], answer: 1, explain: '<code>toFixed</code> retorna texto, útil para exibição.' },
    { q: 'Qual expressão sorteia um inteiro de 1 a 10?', options: ['<code>Math.random() * 10</code>', '<code>Math.floor(Math.random() * 10) + 1</code>', '<code>Math.round(Math.random() * 10)</code>', '<code>Math.ceil(Math.random()) * 10</code>'], answer: 1, explain: 'floor(0..9.99) → 0 a 9; +1 → 1 a 10.' },
  ],
  extra: 'Abra o console do navegador (F12) em qualquer site e experimente métodos de string em textos da página, como <code>document.title.toUpperCase()</code>.',
};
