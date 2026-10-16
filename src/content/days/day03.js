export default {
  day: 3,
  title: 'Repetição: laços for, while e for...of',
  summary: 'Repetir ações sem copiar código, acumular resultados e controlar o fluxo com break/continue.',
  hours: 3,
  goals: [
    'Escrever laços for com início, condição e incremento',
    'Usar while quando não se sabe quantas repetições serão necessárias',
    'Percorrer textos com for...of',
    'Usar acumuladores (soma, contagem, texto) e break/continue',
  ],
  lesson: [
    {
      title: 'O laço for',
      blocks: [
        { p: 'O <code>for</code> tem três partes: <strong>início</strong>; <strong>condição</strong> para continuar; <strong>passo</strong> executado ao fim de cada volta.' },
        { code: `for (let i = 1; i <= 5; i++) {
  console.log('Volta número', i);
}`, run: true },
        { tip: 'Leia em voz alta: “começando com i = 1, enquanto i ≤ 5, execute o bloco e depois some 1 em i”.' },
      ],
    },
    {
      title: 'Acumuladores',
      blocks: [
        { p: 'Um padrão que você usará o tempo todo: criar uma variável <strong>antes</strong> do laço e atualizá-la <strong>dentro</strong> dele.' },
        { code: `let soma = 0;
for (let i = 1; i <= 4; i++) {
  soma += i;          // 1, 3, 6, 10
}
console.log(soma);    // 10

let texto = '';
for (let i = 0; i < 3; i++) {
  texto += '*';
}
console.log(texto);   // ***`, run: true },
      ],
    },
    {
      title: 'while',
      blocks: [
        { p: 'Use <code>while</code> quando a repetição depende de uma condição e não de uma contagem fixa.' },
        { code: `let saldo = 100;
let meses = 0;
while (saldo < 200) {
  saldo = saldo * 1.1; // rende 10% ao mês
  meses++;
}
console.log(\`Dobrou em \${meses} meses\`);`, run: true },
        { warn: 'Se a condição nunca ficar falsa, o laço é infinito. O app interrompe o código após alguns segundos, mas sempre garanta que algo muda dentro do laço.' },
      ],
    },
    {
      title: 'for...of: percorrendo textos (e listas)',
      blocks: [
        { code: `const palavra = 'casa';
for (const letra of palavra) {
  console.log(letra);
}`, run: true },
        { p: 'Também dá para usar índices: <code>palavra[0]</code> é a primeira letra e <code>palavra.length</code> é o tamanho.' },
      ],
    },
    {
      title: 'break e continue',
      blocks: [
        { code: `for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue; // pula os pares
  if (i > 7) break;          // para o laço de vez
  console.log(i);            // 1 3 5 7
}`, run: true },
      ],
    },
    {
      title: 'Laços aninhados',
      blocks: [
        { code: `for (let linha = 1; linha <= 3; linha++) {
  let desenho = '';
  for (let col = 1; col <= linha; col++) {
    desenho += '#';
  }
  console.log(desenho);
}`, run: true },
        { tip: 'Para entender um laço, simule no papel uma tabela com o valor de cada variável a cada volta (“teste de mesa”). É a habilidade mais valiosa para iniciantes.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'd03-contagem',
      title: 'Contagem de 1 a 5',
      topic: 'lacos',
      difficulty: 1,
      prompt: '<p>Use um laço <code>for</code> para mostrar no console os números de 1 a 5, um por linha.</p>',
      starter: `// use um for\n`,
      solution: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`,
      hints: ['<code>for (let i = 1; i <= 5; i++) { ... }</code>'],
      tests: [{ name: 'Mostra 1, 2, 3, 4, 5', logs: ['1', '2', '3', '4', '5'] }],
      checks: [{ type: 'must', pattern: 'for\\s*\\(', message: 'Usou um laço for' }],
    },
    {
      id: 'd03-soma-ate',
      title: 'Somar de 1 até n',
      topic: 'lacos',
      difficulty: 1,
      prompt: '<p>Complete <code>somaAte(n)</code> para retornar 1 + 2 + ... + n usando um laço.</p>',
      starter: `function somaAte(n) {\n  let soma = 0;\n  // seu laço aqui\n  return soma;\n}\n`,
      solution: `function somaAte(n) {\n  let soma = 0;\n  for (let i = 1; i <= n; i++) {\n    soma += i;\n  }\n  return soma;\n}`,
      hints: ['Some <code>i</code> ao acumulador a cada volta.'],
      tests: [
        { name: 'somaAte(4) → 10', run: `somaAte(4)`, expected: 10 },
        { name: 'somaAte(100) → 5050', run: `somaAte(100)`, expected: 5050 },
        { name: 'somaAte(0) → 0', run: `somaAte(0)`, expected: 0 },
      ],
    },
    {
      id: 'd03-fizzbuzz',
      title: 'FizzBuzz',
      topic: 'lacos',
      difficulty: 2,
      prompt: '<p>O clássico de entrevistas! Mostre os números de 1 a 15, um por linha, mas:</p><ul><li>múltiplos de 3 → <code>Fizz</code></li><li>múltiplos de 5 → <code>Buzz</code></li><li>múltiplos de 3 e 5 → <code>FizzBuzz</code></li></ul>',
      starter: `for (let i = 1; i <= 15; i++) {\n  \n}\n`,
      solution: `for (let i = 1; i <= 15; i++) {\n  if (i % 15 === 0) console.log('FizzBuzz');\n  else if (i % 3 === 0) console.log('Fizz');\n  else if (i % 5 === 0) console.log('Buzz');\n  else console.log(i);\n}`,
      hints: ['Teste o caso “3 e 5” <strong>primeiro</strong>. Por quê? Se testar só o 3 antes, o 15 nunca chegaria no FizzBuzz.', 'Múltiplo de 3 e 5 é o mesmo que múltiplo de 15.'],
      tests: [{ name: 'Saída de 1 a 15', logs: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] }],
    },
    {
      id: 'd03-vogais',
      title: 'Contar vogais',
      topic: 'lacos',
      difficulty: 2,
      prompt: '<p>Complete <code>contarVogais(texto)</code> para retornar quantas vogais (a, e, i, o, u, sem acento) existem no texto, ignorando maiúsculas/minúsculas.</p>',
      starter: `function contarVogais(texto) {\n  \n}\n`,
      solution: `function contarVogais(texto) {\n  let total = 0;\n  for (const letra of texto.toLowerCase()) {\n    if ('aeiou'.includes(letra)) total++;\n  }\n  return total;\n}`,
      hints: ['Percorra com <code>for (const letra of texto)</code>.', '<code>texto.toLowerCase()</code> deixa tudo minúsculo.', 'Truque: <code>\'aeiou\'.includes(letra)</code> diz se a letra é vogal.'],
      tests: [
        { name: 'contarVogais("banana") → 3', run: `contarVogais('banana')`, expected: 3 },
        { name: 'contarVogais("JavaScript") → 3', run: `contarVogais('JavaScript')`, expected: 3 },
        { name: 'contarVogais("xyz") → 0', run: `contarVogais('xyz')`, expected: 0 },
        { name: 'contarVogais("AEIOU") → 5', run: `contarVogais('AEIOU')`, expected: 5 },
      ],
    },
    {
      id: 'd03-fatorial',
      title: 'Fatorial',
      topic: 'lacos',
      difficulty: 1,
      prompt: '<p>Complete <code>fatorial(n)</code>. O fatorial de 5 é 5 × 4 × 3 × 2 × 1 = 120. O fatorial de 0 é 1.</p>',
      starter: `function fatorial(n) {\n  \n}\n`,
      solution: `function fatorial(n) {\n  let resultado = 1;\n  for (let i = 2; i <= n; i++) {\n    resultado *= i;\n  }\n  return resultado;\n}`,
      hints: ['Para multiplicações, o acumulador começa em <strong>1</strong> (não em 0).'],
      tests: [
        { name: 'fatorial(5) → 120', run: `fatorial(5)`, expected: 120 },
        { name: 'fatorial(0) → 1', run: `fatorial(0)`, expected: 1 },
        { name: 'fatorial(1) → 1', run: `fatorial(1)`, expected: 1 },
        { name: 'fatorial(10) → 3628800', run: `fatorial(10)`, expected: 3628800 },
      ],
    },
    {
      id: 'd03-primo',
      title: 'É primo?',
      topic: 'lacos',
      difficulty: 2,
      prompt: '<p>Complete <code>ehPrimo(n)</code>: um número primo é maior que 1 e só é divisível por 1 e por ele mesmo. Retorne <code>true</code> ou <code>false</code>.</p>',
      starter: `function ehPrimo(n) {\n  \n}\n`,
      solution: `function ehPrimo(n) {\n  if (n < 2) return false;\n  for (let i = 2; i * i <= n; i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}`,
      hints: ['Teste divisores de 2 até n - 1. Se algum dividir (resto 0), não é primo.', 'Você pode retornar <code>false</code> no meio do laço: o <code>return</code> encerra a função.', 'Otimização opcional: basta testar até a raiz quadrada (<code>i * i <= n</code>).'],
      tests: [
        { name: 'ehPrimo(2) → true', run: `ehPrimo(2)`, expected: true },
        { name: 'ehPrimo(17) → true', run: `ehPrimo(17)`, expected: true },
        { name: 'ehPrimo(1) → false', run: `ehPrimo(1)`, expected: false },
        { name: 'ehPrimo(21) → false', run: `ehPrimo(21)`, expected: false },
        { name: 'ehPrimo(97) → true', run: `ehPrimo(97)`, expected: true },
      ],
    },
    {
      id: 'd03-inverter',
      title: 'Inverter texto (sem reverse)',
      topic: 'lacos',
      difficulty: 2,
      prompt: '<p>Complete <code>inverterTexto(texto)</code> para retornar o texto de trás para frente usando um laço. Não use <code>reverse</code>.</p>',
      starter: `function inverterTexto(texto) {\n  \n}\n`,
      solution: `function inverterTexto(texto) {\n  let invertido = '';\n  for (let i = texto.length - 1; i >= 0; i--) {\n    invertido += texto[i];\n  }\n  return invertido;\n}`,
      hints: ['O último índice é <code>texto.length - 1</code>.', 'Um laço pode contar para trás: <code>i--</code>.', 'Alternativa: <code>for (const l of texto) invertido = l + invertido;</code>'],
      tests: [
        { name: 'inverterTexto("abc") → "cba"', run: `inverterTexto('abc')`, expected: 'cba' },
        { name: 'inverterTexto("roma") → "amor"', run: `inverterTexto('roma')`, expected: 'amor' },
        { name: 'inverterTexto("") → ""', run: `inverterTexto('')`, expected: '' },
      ],
      checks: [{ type: 'mustNot', pattern: 'reverse', message: 'Não usou reverse' }],
    },
    {
      id: 'd03-escada',
      title: 'Escada de #',
      topic: 'lacos',
      difficulty: 2,
      prompt: '<p>Complete <code>escada(n)</code> para retornar um texto com n degraus separados por quebra de linha (<code>\'\\n\'</code>). Para n = 3:</p><pre>#\n##\n###</pre><p>Ou seja, o retorno é <code>\'#\\n##\\n###\'</code> (sem quebra de linha no final).</p>',
      starter: `function escada(n) {\n  \n}\n\nconsole.log(escada(4));\n`,
      solution: `function escada(n) {\n  let resultado = '';\n  for (let i = 1; i <= n; i++) {\n    resultado += '#'.repeat(i);\n    if (i < n) resultado += '\\n';\n  }\n  return resultado;\n}\n\nconsole.log(escada(4));`,
      hints: ['<code>\'#\'.repeat(3)</code> gera <code>\'###\'</code> — ou use um laço interno.', 'Só adicione <code>\'\\n\'</code> se não for o último degrau.'],
      tests: [
        { name: 'escada(1) → "#"', run: `escada(1)`, expected: '#' },
        { name: 'escada(3)', run: `escada(3)`, expected: '#\n##\n###' },
        { name: 'escada(5) tem 5 linhas', run: `escada(5).split('\\n').length`, expected: 5 },
      ],
    },
    {
      id: 'd03-primeiro-divisor',
      title: 'Menor divisor (break)',
      topic: 'lacos',
      difficulty: 2,
      prompt: '<p>Complete <code>menorDivisor(n)</code> para retornar o menor divisor de n maior que 1. Use um laço que <strong>pare</strong> assim que encontrar (com <code>break</code> ou <code>return</code>).</p><p>Ex.: <code>menorDivisor(15)</code> → 3; <code>menorDivisor(13)</code> → 13.</p>',
      starter: `function menorDivisor(n) {\n  \n}\n`,
      solution: `function menorDivisor(n) {\n  let divisor = n;\n  for (let i = 2; i <= n; i++) {\n    if (n % i === 0) {\n      divisor = i;\n      break;\n    }\n  }\n  return divisor;\n}`,
      hints: ['Comece em 2 e suba até n.', 'Todo número é divisível por ele mesmo, então o laço sempre encontra algo.'],
      tests: [
        { name: 'menorDivisor(15) → 3', run: `menorDivisor(15)`, expected: 3 },
        { name: 'menorDivisor(13) → 13', run: `menorDivisor(13)`, expected: 13 },
        { name: 'menorDivisor(100) → 2', run: `menorDivisor(100)`, expected: 2 },
        { name: 'menorDivisor(49) → 7', run: `menorDivisor(49)`, expected: 7 },
      ],
    },
  ],
  quiz: [
    { q: 'Quantas vezes <code>for (let i = 0; i < 5; i++)</code> executa o bloco?', options: ['4', '5', '6', 'Infinitas'], answer: 1, explain: 'i assume 0, 1, 2, 3, 4 → 5 vezes.' },
    { q: 'O que <code>continue</code> faz?', options: ['Encerra o laço', 'Pula para a próxima volta', 'Reinicia o laço do zero', 'Nada'], answer: 1, explain: '<code>continue</code> pula o restante do bloco e vai para a próxima iteração; <code>break</code> encerra.' },
    { q: 'Para calcular um produto (multiplicação acumulada), o acumulador deve começar em:', options: ['0', '1', 'null', '\'\''], answer: 1, explain: 'Qualquer número multiplicado por 0 é 0. O elemento neutro da multiplicação é 1.' },
    { q: 'Qual laço é mais indicado quando não sabemos quantas repetições teremos?', options: ['for', 'while', 'switch', 'if'], answer: 1, explain: '<code>while</code> repete enquanto a condição for verdadeira.' },
    { q: 'Qual é o índice do último caractere de <code>texto</code>?', options: ['<code>texto.length</code>', '<code>texto.length - 1</code>', '<code>-1</code>', '<code>texto.last</code>'], answer: 1, explain: 'Índices começam em 0, então o último é length - 1.' },
  ],
  extra: 'Faça o “teste de mesa” do FizzBuzz no papel para i de 1 a 6, anotando qual if é verdadeiro a cada volta.',
};
