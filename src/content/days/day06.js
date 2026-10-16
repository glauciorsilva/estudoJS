export default {
  day: 6,
  title: 'Arrays: trabalhando com listas',
  summary: 'Criar, ler, alterar e percorrer listas; entender mutação x cópia.',
  hours: 3,
  goals: [
    'Criar arrays e acessar itens por índice',
    'Adicionar e remover itens (push, pop, shift, unshift, splice)',
    'Buscar itens (includes, indexOf) e copiar trechos (slice, spread)',
    'Saber quais métodos alteram o array original e quais criam um novo',
    'Trabalhar com arrays de arrays (matrizes)',
  ],
  lesson: [
    {
      title: 'Criando e acessando',
      blocks: [
        { code: `const frutas = ['maçã', 'banana', 'uva'];
console.log(frutas[0]);          // maçã
console.log(frutas.length);      // 3
console.log(frutas.at(-1));      // uva (último)
frutas[1] = 'kiwi';              // altera um item
console.log(frutas);`, run: true },
        { p: 'Note que <code>const</code> impede trocar o array <em>inteiro</em> (<code>frutas = [...]</code>), mas permite alterar o conteúdo dele.' },
      ],
    },
    {
      title: 'Adicionando e removendo',
      blocks: [
        { code: `const fila = ['Ana', 'Bruno'];
fila.push('Carla');       // adiciona no fim
fila.unshift('Zé');       // adiciona no início
console.log(fila);        // [ 'Zé', 'Ana', 'Bruno', 'Carla' ]
const ultimo = fila.pop();     // remove do fim e retorna
const primeiro = fila.shift(); // remove do início e retorna
console.log(primeiro, ultimo, fila);

const letras = ['a', 'b', 'c', 'd'];
letras.splice(1, 2);      // a partir do índice 1, remove 2 itens
console.log(letras);      // [ 'a', 'd' ]`, run: true },
      ],
    },
    {
      title: 'Buscando',
      blocks: [
        { code: `const nums = [10, 20, 30, 20];
console.log(nums.includes(20));   // true
console.log(nums.indexOf(20));    // 1 (primeira ocorrência)
console.log(nums.indexOf(99));    // -1 (não achou)
console.log(nums.lastIndexOf(20)); // 3`, run: true },
      ],
    },
    {
      title: 'Percorrendo',
      blocks: [
        { code: `const notas = [7, 9, 6];
for (let i = 0; i < notas.length; i++) {
  console.log(\`Nota \${i + 1}: \${notas[i]}\`);
}
for (const nota of notas) {
  console.log(nota);
}`, run: true },
        { tip: 'Use <code>for...of</code> quando só precisa dos valores; use o <code>for</code> clássico quando precisa do índice.' },
      ],
    },
    {
      title: 'Mutação x cópia (muito importante!)',
      blocks: [
        { p: 'Arrays são guardados por <strong>referência</strong>: atribuir um array a outra variável <strong>não copia</strong>, as duas apontam para a mesma lista.' },
        { code: `const a = [1, 2, 3];
const b = a;          // mesma lista!
b.push(4);
console.log(a);       // [ 1, 2, 3, 4 ]  😮

const c = [...a];     // spread: cópia nova
c.push(5);
console.log(a, c);

const parte = a.slice(1, 3); // slice também cria cópia
console.log(parte);`, run: true },
        { list: [
          'Alteram o original: <code>push, pop, shift, unshift, splice, sort, reverse</code>',
          'Criam um novo: <code>slice, concat, [...spread], map, filter</code> (dia 8)',
        ] },
        { warn: 'Funções que recebem um array e o alteram causam bugs difíceis. Prefira retornar um array novo.' },
      ],
    },
    {
      title: 'Matrizes (arrays de arrays)',
      blocks: [
        { code: `const tabuleiro = [
  ['X', 'O', 'X'],
  ['O', 'X', 'O'],
  ['O', 'X', 'X'],
];
console.log(tabuleiro[1][2]); // linha 1, coluna 2 → 'O'
for (const linha of tabuleiro) {
  console.log(linha.join(' | '));
}`, run: true },
      ],
    },
  ],
  exercises: [
    {
      id: 'd06-pontas',
      title: 'Primeiro e último',
      topic: 'arrays',
      difficulty: 1,
      prompt: '<p>Crie <code>pontas(lista)</code> que retorna um novo array com o primeiro e o último item. <code>pontas([4, 8, 15, 16])</code> → <code>[4, 16]</code>.</p>',
      starter: `function pontas(lista) {\n  \n}\n`,
      solution: `function pontas(lista) {\n  return [lista[0], lista[lista.length - 1]];\n}`,
      hints: ['O último índice é <code>lista.length - 1</code>.', 'Retorne um array literal: <code>[a, b]</code>.'],
      tests: [
        { name: '[4, 8, 15, 16] → [4, 16]', run: `pontas([4, 8, 15, 16])`, expected: [4, 16] },
        { name: '["a", "b"] → ["a", "b"]', run: `pontas(['a', 'b'])`, expected: ['a', 'b'] },
      ],
    },
    {
      id: 'd06-fila',
      title: 'Fila de atendimento',
      topic: 'arrays',
      difficulty: 1,
      prompt: '<p>Implemente duas funções que <strong>alteram</strong> a fila recebida:</p><ul><li><code>entrarNaFila(fila, nome)</code>: coloca o nome no fim e retorna o novo tamanho da fila.</li><li><code>atenderProximo(fila)</code>: remove e retorna o primeiro da fila. Se a fila estiver vazia, retorne <code>null</code>.</li></ul>',
      starter: `function entrarNaFila(fila, nome) {\n  \n}\n\nfunction atenderProximo(fila) {\n  \n}\n`,
      solution: `function entrarNaFila(fila, nome) {\n  return fila.push(nome);\n}\n\nfunction atenderProximo(fila) {\n  if (fila.length === 0) return null;\n  return fila.shift();\n}`,
      hints: ['<code>push</code> já retorna o novo tamanho.', '<code>shift</code> remove do início.'],
      tests: [
        { name: 'entrarNaFila retorna o tamanho', run: `entrarNaFila(['Ana'], 'Bia')`, expected: 2 },
        { name: 'Atende na ordem de chegada', run: `(() => { const f = []; entrarNaFila(f, 'Ana'); entrarNaFila(f, 'Bia'); return [atenderProximo(f), atenderProximo(f), f.length]; })()`, expected: ['Ana', 'Bia', 0] },
        { name: 'Fila vazia → null', run: `atenderProximo([])`, expected: null },
      ],
    },
    {
      id: 'd06-somar',
      title: 'Somar e calcular média',
      topic: 'arrays',
      difficulty: 1,
      prompt: '<p>Crie <code>somar(numeros)</code> e <code>media(numeros)</code>. A média de um array vazio deve ser 0.</p>',
      starter: `function somar(numeros) {\n  \n}\n\nfunction media(numeros) {\n  \n}\n`,
      solution: `function somar(numeros) {\n  let total = 0;\n  for (const n of numeros) total += n;\n  return total;\n}\n\nfunction media(numeros) {\n  if (numeros.length === 0) return 0;\n  return somar(numeros) / numeros.length;\n}`,
      hints: ['Reaproveite <code>somar</code> dentro de <code>media</code>.', 'Cuidado: dividir por zero dá <code>NaN</code>.'],
      tests: [
        { name: 'somar([1, 2, 3, 4]) → 10', run: `somar([1, 2, 3, 4])`, expected: 10 },
        { name: 'somar([]) → 0', run: `somar([])`, expected: 0 },
        { name: 'media([7, 8, 9]) → 8', run: `media([7, 8, 9])`, expected: 8 },
        { name: 'media([]) → 0', run: `media([])`, expected: 0 },
      ],
    },
    {
      id: 'd06-maior',
      title: 'Maior valor (sem Math.max)',
      topic: 'arrays',
      difficulty: 2,
      prompt: '<p>Crie <code>maiorValor(numeros)</code> que retorna o maior número do array, sem <code>Math.max</code> nem <code>sort</code>. Para array vazio retorne <code>undefined</code>.</p>',
      starter: `function maiorValor(numeros) {\n  \n}\n`,
      solution: `function maiorValor(numeros) {\n  if (numeros.length === 0) return undefined;\n  let maior = numeros[0];\n  for (const n of numeros) {\n    if (n > maior) maior = n;\n  }\n  return maior;\n}`,
      hints: ['Comece com <code>maior = numeros[0]</code> — e não com 0. Por quê? Pense num array só de negativos.'],
      tests: [
        { name: '[3, 9, 2] → 9', run: `maiorValor([3, 9, 2])`, expected: 9 },
        { name: '[-5, -2, -8] → -2', run: `maiorValor([-5, -2, -8])`, expected: -2 },
        { name: '[] → undefined', run: `maiorValor([])`, expected: undefined },
      ],
      checks: [{ type: 'mustNot', pattern: 'Math\\.max|\\.sort\\(', message: 'Não usou Math.max nem sort' }],
    },
    {
      id: 'd06-duplicados',
      title: 'Remover duplicados',
      topic: 'arrays',
      difficulty: 2,
      prompt: '<p>Crie <code>semDuplicados(lista)</code> que retorna um <strong>novo</strong> array sem itens repetidos, mantendo a ordem da primeira aparição.</p>',
      starter: `function semDuplicados(lista) {\n  \n}\n`,
      solution: `function semDuplicados(lista) {\n  const resultado = [];\n  for (const item of lista) {\n    if (!resultado.includes(item)) resultado.push(item);\n  }\n  return resultado;\n}`,
      hints: ['Crie um array vazio e só adicione o item se ele ainda não estiver lá (<code>includes</code>).'],
      tests: [
        { name: '[1, 2, 2, 3, 1] → [1, 2, 3]', run: `semDuplicados([1, 2, 2, 3, 1])`, expected: [1, 2, 3] },
        { name: 'textos', run: `semDuplicados(['a', 'b', 'a'])`, expected: ['a', 'b'] },
        { name: 'Não altera o original', run: `(() => { const l = [1, 1]; semDuplicados(l); return l; })()`, expected: [1, 1] },
      ],
    },
    {
      id: 'd06-ocorrencias',
      title: 'Contar ocorrências',
      topic: 'arrays',
      difficulty: 1,
      prompt: '<p>Crie <code>contarOcorrencias(lista, valor)</code> que retorna quantas vezes <code>valor</code> aparece na lista.</p>',
      starter: ``,
      solution: `function contarOcorrencias(lista, valor) {\n  let total = 0;\n  for (const item of lista) {\n    if (item === valor) total++;\n  }\n  return total;\n}`,
      hints: ['Acumulador + for...of + if.'],
      tests: [
        { name: 'conta 2 em [1, 2, 2, 3, 2]', run: `contarOcorrencias([1, 2, 2, 3, 2], 2)`, expected: 3 },
        { name: 'conta "x" em ["a"]', run: `contarOcorrencias(['a'], 'x')`, expected: 0 },
      ],
    },
    {
      id: 'd06-inverter',
      title: 'Inverter sem alterar o original',
      topic: 'arrays',
      difficulty: 2,
      prompt: '<p>Crie <code>invertido(lista)</code> que retorna um <strong>novo</strong> array com os itens em ordem inversa, sem usar <code>reverse</code> e sem alterar o array recebido.</p>',
      starter: `function invertido(lista) {\n  \n}\n`,
      solution: `function invertido(lista) {\n  const resultado = [];\n  for (let i = lista.length - 1; i >= 0; i--) {\n    resultado.push(lista[i]);\n  }\n  return resultado;\n}`,
      hints: ['Percorra de trás para frente e faça <code>push</code> num array novo.'],
      tests: [
        { name: '[1, 2, 3] → [3, 2, 1]', run: `invertido([1, 2, 3])`, expected: [3, 2, 1] },
        { name: 'Original intacto', run: `(() => { const l = [1, 2]; invertido(l); return l; })()`, expected: [1, 2] },
      ],
      checks: [{ type: 'mustNot', pattern: 'reverse', message: 'Não usou reverse' }],
    },
    {
      id: 'd06-adicionar-imutavel',
      title: 'Adicionar sem mutar',
      topic: 'arrays',
      difficulty: 2,
      prompt: '<p>Crie <code>comItem(lista, item)</code> que retorna um <strong>novo</strong> array com o item no final, sem alterar o original. Use o operador spread <code>...</code>.</p>',
      starter: `function comItem(lista, item) {\n  \n}\n`,
      solution: `function comItem(lista, item) {\n  return [...lista, item];\n}`,
      hints: ['<code>[...lista, item]</code> cria um array novo com todos os itens de lista e mais um.'],
      tests: [
        { name: 'Adiciona no fim', run: `comItem([1, 2], 3)`, expected: [1, 2, 3] },
        { name: 'Não altera o original', run: `(() => { const l = [1]; comItem(l, 2); return l; })()`, expected: [1] },
      ],
      checks: [{ type: 'must', pattern: '\\.\\.\\.', message: 'Usou spread (...)' }],
    },
    {
      id: 'd06-diagonal',
      title: 'Soma da diagonal',
      topic: 'arrays',
      difficulty: 2,
      prompt: '<p>Crie <code>somaDiagonal(matriz)</code> que soma a diagonal principal de uma matriz quadrada (posições [0][0], [1][1], [2][2]...).</p>',
      starter: `function somaDiagonal(matriz) {\n  \n}\n`,
      solution: `function somaDiagonal(matriz) {\n  let soma = 0;\n  for (let i = 0; i < matriz.length; i++) {\n    soma += matriz[i][i];\n  }\n  return soma;\n}`,
      hints: ['Na diagonal, o índice da linha é igual ao da coluna: <code>matriz[i][i]</code>.'],
      tests: [
        { name: '3x3', run: `somaDiagonal([[1, 2, 3], [4, 5, 6], [7, 8, 9]])`, expected: 15 },
        { name: '2x2', run: `somaDiagonal([[10, 0], [0, 5]])`, expected: 15 },
      ],
    },
    {
      id: 'd06-grupos',
      title: 'Dividir em grupos',
      topic: 'arrays',
      difficulty: 3,
      prompt: '<p>Crie <code>dividirEmGrupos(lista, tamanho)</code> que divide a lista em pedaços. <code>dividirEmGrupos([1,2,3,4,5], 2)</code> → <code>[[1,2],[3,4],[5]]</code>.</p>',
      starter: `function dividirEmGrupos(lista, tamanho) {\n  \n}\n`,
      solution: `function dividirEmGrupos(lista, tamanho) {\n  const grupos = [];\n  for (let i = 0; i < lista.length; i += tamanho) {\n    grupos.push(lista.slice(i, i + tamanho));\n  }\n  return grupos;\n}`,
      hints: ['Um laço que pula de <code>tamanho</code> em <code>tamanho</code>: <code>i += tamanho</code>.', '<code>lista.slice(i, i + tamanho)</code> pega um pedaço.'],
      tests: [
        { name: '[1..5] em 2', run: `dividirEmGrupos([1, 2, 3, 4, 5], 2)`, expected: [[1, 2], [3, 4], [5]] },
        { name: '[1..6] em 3', run: `dividirEmGrupos([1, 2, 3, 4, 5, 6], 3)`, expected: [[1, 2, 3], [4, 5, 6]] },
        { name: '[] → []', run: `dividirEmGrupos([], 3)`, expected: [] },
      ],
    },
  ],
  quiz: [
    { q: 'Qual método remove o <strong>último</strong> item de um array?', options: ['shift', 'pop', 'slice', 'splice(0)'], answer: 1, explain: '<code>pop</code> remove do fim; <code>shift</code> remove do início.' },
    { q: 'Após <code>const a = [1]; const b = a; b.push(2);</code>, quanto vale <code>a</code>?', options: ['[1]', '[1, 2]', '[2]', 'Erro, a é const'], answer: 1, explain: '<code>b</code> e <code>a</code> apontam para o mesmo array.' },
    { q: 'Qual destes <strong>não</strong> altera o array original?', options: ['sort', 'splice', 'slice', 'push'], answer: 2, explain: '<code>slice</code> retorna uma cópia de um trecho.' },
    { q: '<code>[10, 20, 30].indexOf(40)</code> retorna:', options: ['undefined', 'null', '-1', '0'], answer: 2, explain: '-1 significa “não encontrado”.' },
    { q: 'Como acessar o número 6 em <code>const m = [[1,2,3],[4,5,6]]</code>?', options: ['m[2][1]', 'm[1][2]', 'm[6]', 'm[1,2]'], answer: 1, explain: 'Linha 1 (segunda), coluna 2 (terceira).' },
  ],
  extra: 'Desenhe numa folha as “caixas e setas” do exemplo de mutação x cópia: duas variáveis apontando para o mesmo array.',
};
