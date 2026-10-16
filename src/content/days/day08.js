const PRODUTOS = `[{ nome: 'Teclado', preco: 150, categoria: 'perifericos' }, { nome: 'Mouse', preco: 80, categoria: 'perifericos' }, { nome: 'Monitor', preco: 900, categoria: 'telas' }, { nome: 'Cabo HDMI', preco: 30, categoria: 'acessorios' }]`;

export default {
  day: 8,
  title: 'map, filter, reduce e companhia',
  summary: 'Transformar, filtrar e resumir listas com os métodos funcionais de array — o dia a dia do JS moderno.',
  hours: 3.5,
  goals: [
    'Transformar listas com map',
    'Selecionar itens com filter e find',
    'Resumir listas com reduce',
    'Verificar condições com some e every',
    'Ordenar com sort e uma função de comparação',
    'Encadear métodos (map + filter + reduce)',
  ],
  lesson: [
    {
      title: 'Funções como argumento',
      blocks: [
        { p: 'Os métodos de hoje recebem uma <strong>função</strong> (chamada de <em>callback</em>) e a executam para cada item. Normalmente usamos arrow functions.' },
        { code: `const nums = [1, 2, 3];
nums.forEach((n, indice) => {
  console.log(\`índice \${indice}: \${n}\`);
});`, run: true },
      ],
    },
    {
      title: 'map: transformar cada item',
      blocks: [
        { p: '<code>map</code> retorna um <strong>novo array do mesmo tamanho</strong>, com o resultado da função para cada item.' },
        { code: `const precos = [10, 20, 30];
const comDesconto = precos.map(p => p * 0.9);
console.log(comDesconto); // [ 9, 18, 27 ]

const usuarios = [{ nome: 'Ana' }, { nome: 'Bia' }];
console.log(usuarios.map(u => u.nome)); // [ 'Ana', 'Bia' ]`, run: true },
      ],
    },
    {
      title: 'filter e find: selecionar',
      blocks: [
        { code: `const idades = [12, 25, 17, 40];
const adultos = idades.filter(i => i >= 18);
console.log(adultos);                 // [ 25, 40 ] (todos que passam)
console.log(idades.find(i => i > 18)); // 25 (o primeiro que passa)
console.log(idades.find(i => i > 99)); // undefined
console.log(idades.findIndex(i => i === 17)); // 2`, run: true },
      ],
    },
    {
      title: 'reduce: resumir em um valor',
      blocks: [
        { p: '<code>reduce</code> percorre a lista carregando um <strong>acumulador</strong>. É o mesmo padrão de acumulador do dia 3, num formato compacto.' },
        { code: `const valores = [5, 10, 15];
const total = valores.reduce((acumulador, atual) => acumulador + atual, 0);
console.log(total); // 30

// Também pode resumir em um objeto
const frutas = ['maçã', 'uva', 'maçã'];
const contagem = frutas.reduce((acc, f) => {
  acc[f] = (acc[f] || 0) + 1;
  return acc;
}, {});
console.log(contagem);`, run: true },
        { tip: 'Sempre passe o valor inicial (o segundo argumento: <code>0</code>, <code>{}</code>, <code>[]</code>). Sem ele, reduce em array vazio dá erro.' },
      ],
    },
    {
      title: 'some e every',
      blocks: [
        { code: `const notas = [7, 8, 4];
console.log(notas.some(n => n < 5));   // true  (pelo menos um)
console.log(notas.every(n => n >= 5)); // false (todos?)`, run: true },
      ],
    },
    {
      title: 'sort com comparação',
      blocks: [
        { code: `console.log([10, 9, 1].sort());          // [ 1, 10, 9 ] 😱 ordena como TEXTO
console.log([10, 9, 1].sort((a, b) => a - b)); // crescente
console.log([10, 9, 1].sort((a, b) => b - a)); // decrescente

const pessoas = [{ nome: 'Caio', idade: 30 }, { nome: 'Ana', idade: 25 }];
const porIdade = [...pessoas].sort((a, b) => a.idade - b.idade); // copia antes!
const porNome = [...pessoas].sort((a, b) => a.nome.localeCompare(b.nome));
console.log(porIdade.map(p => p.nome), porNome.map(p => p.nome));`, run: true },
        { warn: '<code>sort</code> altera o array original. Copie com <code>[...lista]</code> antes de ordenar.' },
      ],
    },
    {
      title: 'Encadeando',
      blocks: [
        { code: `const pedidos = [
  { cliente: 'Ana', valor: 120, pago: true },
  { cliente: 'Bia', valor: 80, pago: false },
  { cliente: 'Caio', valor: 200, pago: true },
];
const totalPago = pedidos
  .filter(p => p.pago)
  .map(p => p.valor)
  .reduce((soma, v) => soma + v, 0);
console.log(totalPago); // 320`, run: true },
      ],
    },
  ],
  exercises: [
    {
      id: 'd08-dobrar',
      title: 'Dobrar com map',
      topic: 'metodos-array',
      difficulty: 1,
      prompt: '<p>Crie <code>dobrarTodos(numeros)</code> usando <code>map</code>.</p>',
      starter: `function dobrarTodos(numeros) {\n  \n}\n`,
      solution: `function dobrarTodos(numeros) {\n  return numeros.map(n => n * 2);\n}`,
      hints: ['<code>return numeros.map(n => ...);</code>'],
      tests: [
        { name: '[1, 2, 3] → [2, 4, 6]', run: `dobrarTodos([1, 2, 3])`, expected: [2, 4, 6] },
        { name: '[] → []', run: `dobrarTodos([])`, expected: [] },
      ],
      checks: [{ type: 'must', pattern: '\\.map\\(', message: 'Usou map' }],
    },
    {
      id: 'd08-pares',
      title: 'Somente pares com filter',
      topic: 'metodos-array',
      difficulty: 1,
      prompt: '<p>Crie <code>apenasPares(numeros)</code> usando <code>filter</code>.</p>',
      starter: ``,
      solution: `const apenasPares = (numeros) => numeros.filter(n => n % 2 === 0);`,
      hints: ['O callback do filter deve retornar true para os itens que ficam.'],
      tests: [
        { name: '[1..6] → [2, 4, 6]', run: `apenasPares([1, 2, 3, 4, 5, 6])`, expected: [2, 4, 6] },
        { name: 'sem pares → []', run: `apenasPares([1, 3])`, expected: [] },
      ],
      checks: [{ type: 'must', pattern: '\\.filter\\(', message: 'Usou filter' }],
    },
    {
      id: 'd08-soma-reduce',
      title: 'Somar com reduce',
      topic: 'metodos-array',
      difficulty: 1,
      prompt: '<p>Crie <code>somaTotal(numeros)</code> usando <code>reduce</code>. Para array vazio, retorne 0.</p>',
      starter: ``,
      solution: `const somaTotal = (numeros) => numeros.reduce((acc, n) => acc + n, 0);`,
      hints: ['Não esqueça o valor inicial <code>0</code>.'],
      tests: [
        { name: '[1, 2, 3] → 6', run: `somaTotal([1, 2, 3])`, expected: 6 },
        { name: '[] → 0', run: `somaTotal([])`, expected: 0 },
      ],
      checks: [{ type: 'must', pattern: '\\.reduce\\(', message: 'Usou reduce' }],
    },
    {
      id: 'd08-baratos',
      title: 'Nomes dos produtos baratos',
      topic: 'metodos-array',
      difficulty: 2,
      prompt: `<p>Crie <code>nomesBaratos(produtos, limite)</code> que retorna os <strong>nomes</strong> dos produtos com preço menor ou igual ao limite. Encadeie <code>filter</code> e <code>map</code>.</p><p>Exemplo de produtos:</p><pre>${PRODUTOS}</pre>`,
      starter: `function nomesBaratos(produtos, limite) {\n  \n}\n`,
      solution: `function nomesBaratos(produtos, limite) {\n  return produtos.filter(p => p.preco <= limite).map(p => p.nome);\n}`,
      hints: ['Primeiro filtre pelo preço, depois transforme cada produto em seu nome.'],
      tests: [
        { name: 'limite 100', run: `nomesBaratos(${PRODUTOS}, 100)`, expected: ['Mouse', 'Cabo HDMI'] },
        { name: 'limite 10', run: `nomesBaratos(${PRODUTOS}, 10)`, expected: [] },
      ],
      checks: [{ type: 'must', pattern: '\\.filter\\([\\s\\S]*\\.map\\(|\\.map\\([\\s\\S]*\\.filter\\(', message: 'Usou filter e map' }],
    },
    {
      id: 'd08-find',
      title: 'Encontrar usuário',
      topic: 'metodos-array',
      difficulty: 1,
      prompt: '<p>Crie <code>buscarPorId(usuarios, id)</code> que retorna o usuário com aquele id usando <code>find</code>, ou <code>null</code> se não existir.</p>',
      starter: ``,
      solution: `function buscarPorId(usuarios, id) {\n  return usuarios.find(u => u.id === id) ?? null;\n}`,
      hints: ['<code>find</code> retorna <code>undefined</code> quando não acha. Converta com <code>?? null</code>.'],
      tests: [
        { name: 'acha id 2', run: `buscarPorId([{ id: 1, nome: 'Ana' }, { id: 2, nome: 'Bia' }], 2)`, expected: { id: 2, nome: 'Bia' } },
        { name: 'id inexistente → null', run: `buscarPorId([{ id: 1 }], 5)`, expected: null },
      ],
      checks: [{ type: 'must', pattern: '\\.find\\(', message: 'Usou find' }],
    },
    {
      id: 'd08-some-every',
      title: 'Situação da turma',
      topic: 'metodos-array',
      difficulty: 2,
      prompt: '<p>Crie <code>situacaoTurma(notas)</code> que retorna:</p><ul><li><code>\'todos aprovados\'</code> se todas as notas forem ≥ 6 (<code>every</code>)</li><li><code>\'alguns reprovados\'</code> se pelo menos uma for menor que 6, mas não todas</li><li><code>\'todos reprovados\'</code> se nenhuma for ≥ 6 (<code>some</code>)</li></ul>',
      starter: `function situacaoTurma(notas) {\n  \n}\n`,
      solution: `function situacaoTurma(notas) {\n  if (notas.every(n => n >= 6)) return 'todos aprovados';\n  if (!notas.some(n => n >= 6)) return 'todos reprovados';\n  return 'alguns reprovados';\n}`,
      hints: ['“Nenhuma aprovada” é o mesmo que <code>!notas.some(n => n >= 6)</code>.'],
      tests: [
        { name: '[7, 8, 9]', run: `situacaoTurma([7, 8, 9])`, expected: 'todos aprovados' },
        { name: '[7, 3, 9]', run: `situacaoTurma([7, 3, 9])`, expected: 'alguns reprovados' },
        { name: '[1, 2]', run: `situacaoTurma([1, 2])`, expected: 'todos reprovados' },
      ],
    },
    {
      id: 'd08-ordenar',
      title: 'Ordenar por preço (sem mutar)',
      topic: 'metodos-array',
      difficulty: 2,
      prompt: '<p>Crie <code>ordenarPorPreco(produtos)</code> que retorna um <strong>novo</strong> array ordenado do mais barato para o mais caro, sem alterar o original.</p>',
      starter: ``,
      solution: `function ordenarPorPreco(produtos) {\n  return [...produtos].sort((a, b) => a.preco - b.preco);\n}`,
      hints: ['Copie com <code>[...produtos]</code> antes do <code>sort</code>.', 'Comparação crescente: <code>(a, b) => a.preco - b.preco</code>.'],
      tests: [
        { name: 'ordem por preço', run: `ordenarPorPreco(${PRODUTOS}).map(p => p.nome)`, expected: ['Cabo HDMI', 'Mouse', 'Teclado', 'Monitor'] },
        { name: 'original intacto', run: `(() => { const l = [{ preco: 2 }, { preco: 1 }]; ordenarPorPreco(l); return l[0].preco; })()`, expected: 2 },
      ],
    },
    {
      id: 'd08-carrinho',
      title: 'Total do carrinho',
      topic: 'metodos-array',
      difficulty: 2,
      prompt: '<p>Cada item do carrinho é <code>{ nome, preco, qtd }</code>. Crie <code>totalCarrinho(itens)</code> que retorna a soma de preço × quantidade.</p>',
      starter: ``,
      solution: `function totalCarrinho(itens) {\n  return itens.reduce((total, item) => total + item.preco * item.qtd, 0);\n}`,
      hints: ['No reduce, some <code>item.preco * item.qtd</code> ao acumulador.'],
      tests: [
        { name: 'carrinho com 2 itens', run: `totalCarrinho([{ nome: 'Café', preco: 20, qtd: 2 }, { nome: 'Pão', preco: 1.5, qtd: 4 }])`, expected: 46 },
        { name: 'vazio → 0', run: `totalCarrinho([])`, expected: 0 },
      ],
    },
    {
      id: 'd08-agrupar',
      title: 'Agrupar por categoria',
      topic: 'metodos-array',
      difficulty: 3,
      prompt: '<p>Crie <code>agruparPorCategoria(produtos)</code> que retorna um objeto cujas chaves são categorias e os valores são arrays com os nomes dos produtos.</p><pre>{ perifericos: [\'Teclado\', \'Mouse\'], telas: [\'Monitor\'], acessorios: [\'Cabo HDMI\'] }</pre>',
      starter: ``,
      solution: `function agruparPorCategoria(produtos) {\n  return produtos.reduce((grupos, p) => {\n    if (!grupos[p.categoria]) grupos[p.categoria] = [];\n    grupos[p.categoria].push(p.nome);\n    return grupos;\n  }, {});\n}`,
      hints: ['Use reduce com valor inicial <code>{}</code>.', 'Se a categoria ainda não existe no acumulador, crie um array vazio para ela.', 'Não esqueça de <code>return grupos</code> dentro do callback.'],
      tests: [
        { name: 'agrupa', run: `agruparPorCategoria(${PRODUTOS})`, expected: { perifericos: ['Teclado', 'Mouse'], telas: ['Monitor'], acessorios: ['Cabo HDMI'] } },
        { name: 'vazio → {}', run: `agruparPorCategoria([])`, expected: {} },
      ],
    },
    {
      id: 'd08-estatisticas',
      title: 'Estatísticas das notas',
      topic: 'metodos-array',
      difficulty: 3,
      prompt: '<p>Crie <code>estatisticas(notas)</code> que retorna <code>{ media, maior, menor, aprovados }</code>, onde <code>aprovados</code> é a quantidade de notas ≥ 6 e a <code>media</code> é arredondada para 1 casa decimal.</p>',
      starter: ``,
      solution: `function estatisticas(notas) {\n  const soma = notas.reduce((a, n) => a + n, 0);\n  return {\n    media: Math.round((soma / notas.length) * 10) / 10,\n    maior: Math.max(...notas),\n    menor: Math.min(...notas),\n    aprovados: notas.filter(n => n >= 6).length,\n  };\n}`,
      hints: ['<code>Math.max(...notas)</code> espalha o array como argumentos.', 'Arredondar 1 casa: <code>Math.round(x * 10) / 10</code>.'],
      tests: [
        { name: '[5, 7, 9, 4]', run: `estatisticas([5, 7, 9, 4])`, expected: { media: 6.3, maior: 9, menor: 4, aprovados: 2 } },
        { name: '[10]', run: `estatisticas([10])`, expected: { media: 10, maior: 10, menor: 10, aprovados: 1 } },
      ],
    },
  ],
  quiz: [
    { q: 'Qual método retorna um array do <strong>mesmo tamanho</strong> com itens transformados?', options: ['filter', 'map', 'find', 'reduce'], answer: 1, explain: 'map transforma cada item, mantendo o tamanho.' },
    { q: '<code>[3, 1, 10].sort()</code> resulta em:', options: ['[1, 3, 10]', '[1, 10, 3]', '[10, 3, 1]', 'Erro'], answer: 1, explain: 'Sem função de comparação, sort compara como texto: \'10\' vem antes de \'3\'.' },
    { q: 'O que <code>find</code> retorna quando nenhum item satisfaz a condição?', options: ['-1', 'null', 'undefined', '[]'], answer: 2, explain: 'find retorna undefined; findIndex retorna -1; filter retorna [].' },
    { q: 'Em <code>reduce((acc, x) => acc + x, 0)</code>, o que é o <code>0</code>?', options: ['O índice inicial', 'O valor inicial do acumulador', 'O tamanho', 'Nada'], answer: 1, explain: 'É o valor de partida do acumulador.' },
    { q: '<code>[1, 2, 3].some(n => n > 2)</code>', options: ['true', 'false', '[3]', '3'], answer: 0, explain: 'some retorna true se ao menos um item passar.' },
  ],
  extra: 'Pegue os exercícios do dia 6 (somar, maior valor, duplicados) e reescreva-os com map/filter/reduce. Compare a legibilidade.',
};
