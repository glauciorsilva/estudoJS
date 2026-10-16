export default {
  day: 14,
  title: 'Resolução de problemas e algoritmos',
  summary: 'Juntar tudo o que você aprendeu para resolver problemas clássicos — o tipo de exercício de entrevistas e do dia a dia.',
  hours: 4,
  goals: [
    'Aplicar um método para resolver problemas (entender, exemplos, plano, código, revisão)',
    'Reconhecer padrões: contagem com objeto/Map, dois ponteiros, pilha, recursão',
    'Ter noção de eficiência (por que Set/Map são rápidos)',
    'Misturar conceitos dos dias anteriores (prática intercalada)',
  ],
  lesson: [
    {
      title: 'Um método para qualquer problema',
      blocks: [
        { list: [
          '<strong>1. Entenda</strong>: reescreva o problema com suas palavras. Quais as entradas e a saída?',
          '<strong>2. Exemplos</strong>: resolva 2 ou 3 casos à mão, incluindo casos extremos (vazio, um item, negativos).',
          '<strong>3. Plano</strong>: escreva os passos em português (pseudocódigo) antes de codar.',
          '<strong>4. Código</strong>: traduza o plano. Teste cedo, teste sempre.',
          '<strong>5. Revise</strong>: dá para simplificar? Os nomes estão claros?',
        ] },
        { tip: 'Se travar por mais de 20 minutos, abra uma dica, mas depois <strong>refaça o exercício do zero</strong> no dia seguinte (o app agenda isso na Revisão).' },
      ],
    },
    {
      title: 'Padrão: contagem',
      blocks: [
        { code: `function maisFrequente(lista) {
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
console.log(maisFrequente(['a', 'b', 'a', 'c', 'a']));`, run: true },
      ],
    },
    {
      title: 'Padrão: pilha',
      blocks: [
        { p: 'Pilhas resolvem problemas de “abrir e fechar”: parênteses, desfazer/refazer, navegação de páginas.' },
        { code: `function balanceado(texto) {
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
console.log(balanceado('(a(b)c)'), balanceado('(()'));`, run: true },
      ],
    },
    {
      title: 'Noção de eficiência',
      blocks: [
        { p: 'Buscar com <code>array.includes</code> olha item por item (lento com milhares de itens). <code>Set.has</code> e <code>Map.get</code> respondem quase instantaneamente. Laços dentro de laços sobre a mesma lista crescem rápido: 1.000 itens → 1.000.000 de passos.' },
        { code: `const grande = Array.from({ length: 100000 }, (_, i) => i);
const conjunto = new Set(grande);
let t = Date.now();
for (let i = 0; i < 2000; i++) grande.includes(99999);
console.log('includes:', Date.now() - t, 'ms');
t = Date.now();
for (let i = 0; i < 2000; i++) conjunto.has(99999);
console.log('Set.has:', Date.now() - t, 'ms');`, run: true },
      ],
    },
  ],
  exercises: [
    {
      id: 'd14-anagramas',
      title: 'São anagramas?',
      topic: 'algoritmos',
      difficulty: 2,
      prompt: '<p>Crie <code>saoAnagramas(a, b)</code>: duas palavras são anagramas se têm exatamente as mesmas letras em outra ordem (ignore maiúsculas e espaços). <code>saoAnagramas(\'Roma\', \'amor\')</code> → true.</p>',
      starter: ``,
      solution: `function saoAnagramas(a, b) {\n  const normalizar = (s) => s.toLowerCase().replaceAll(' ', '').split('').sort().join('');\n  return normalizar(a) === normalizar(b);\n}`,
      hints: ['Ideia simples: se ordenar as letras das duas, devem ficar iguais.', '<code>texto.split(\'\').sort().join(\'\')</code>'],
      tests: [
        { name: 'Roma / amor', run: `saoAnagramas('Roma', 'amor')`, expected: true },
        { name: 'com espaços', run: `saoAnagramas('Dormitory', 'dirty room')`, expected: true },
        { name: 'diferentes', run: `saoAnagramas('abc', 'abd')`, expected: false },
        { name: 'tamanhos diferentes', run: `saoAnagramas('aab', 'ab')`, expected: false },
      ],
    },
    {
      id: 'd14-mais-frequente',
      title: 'Item mais frequente',
      topic: 'algoritmos',
      difficulty: 2,
      prompt: '<p>Crie <code>maisFrequente(lista)</code> que retorna o item que mais aparece. Em caso de empate, retorne o que atingiu a maior contagem primeiro. Lista vazia → <code>null</code>.</p>',
      starter: ``,
      solution: `function maisFrequente(lista) {\n  const contagem = new Map();\n  let melhor = null;\n  let maior = 0;\n  for (const item of lista) {\n    const qtd = (contagem.get(item) ?? 0) + 1;\n    contagem.set(item, qtd);\n    if (qtd > maior) {\n      maior = qtd;\n      melhor = item;\n    }\n  }\n  return melhor;\n}`,
      hints: ['Padrão de contagem com Map ou objeto.', 'Atualize o “melhor” só quando a contagem for <strong>maior</strong> (não maior ou igual).'],
      tests: [
        { name: 'números', run: `maisFrequente([1, 3, 3, 2, 3, 1])`, expected: 3 },
        { name: 'textos', run: `maisFrequente(['js', 'py', 'js'])`, expected: 'js' },
        { name: 'empate', run: `maisFrequente(['a', 'b', 'b', 'a'])`, expected: 'b' },
        { name: 'vazia', run: `maisFrequente([])`, expected: null },
      ],
    },
    {
      id: 'd14-achatar',
      title: 'Achatar listas (recursão)',
      topic: 'algoritmos',
      difficulty: 3,
      prompt: '<p>Crie <code>achatar(lista)</code> que transforma arrays aninhados em qualquer profundidade numa lista simples, <strong>sem usar</strong> <code>.flat</code>. <code>achatar([1, [2, [3, [4]]], 5])</code> → <code>[1, 2, 3, 4, 5]</code>.</p>',
      starter: ``,
      solution: `function achatar(lista) {\n  const resultado = [];\n  for (const item of lista) {\n    if (Array.isArray(item)) resultado.push(...achatar(item));\n    else resultado.push(item);\n  }\n  return resultado;\n}`,
      hints: ['<code>Array.isArray(x)</code> diz se é array.', 'Se o item for array, chame <code>achatar(item)</code> e adicione os resultados com <code>push(...)</code>.'],
      tests: [
        { name: 'profundo', run: `achatar([1, [2, [3, [4]]], 5])`, expected: [1, 2, 3, 4, 5] },
        { name: 'já plano', run: `achatar([1, 2])`, expected: [1, 2] },
        { name: 'vazios', run: `achatar([[], [[]], 1])`, expected: [1] },
      ],
      checks: [{ type: 'mustNot', pattern: '\\.flat', message: 'Não usou .flat' }],
    },
    {
      id: 'd14-busca-binaria',
      title: 'Busca binária',
      topic: 'algoritmos',
      difficulty: 3,
      prompt: '<p>Em uma lista <strong>ordenada</strong>, a busca binária olha o meio e descarta metade a cada passo (como procurar uma palavra no dicionário). Crie <code>buscaBinaria(lista, alvo)</code> que retorna o índice do alvo ou -1, sem usar <code>indexOf</code>/<code>includes</code>/<code>find</code>.</p>',
      starter: `function buscaBinaria(lista, alvo) {\n  let inicio = 0;\n  let fim = lista.length - 1;\n  \n}\n`,
      solution: `function buscaBinaria(lista, alvo) {\n  let inicio = 0;\n  let fim = lista.length - 1;\n  while (inicio <= fim) {\n    const meio = Math.floor((inicio + fim) / 2);\n    if (lista[meio] === alvo) return meio;\n    if (lista[meio] < alvo) inicio = meio + 1;\n    else fim = meio - 1;\n  }\n  return -1;\n}`,
      hints: ['Enquanto <code>inicio <= fim</code>: calcule o meio com <code>Math.floor</code>.', 'Se o valor do meio for menor que o alvo, descarte a metade esquerda (<code>inicio = meio + 1</code>).'],
      tests: [
        { name: 'acha no meio', run: `buscaBinaria([1, 3, 5, 7, 9, 11], 7)`, expected: 3 },
        { name: 'primeiro', run: `buscaBinaria([1, 3, 5], 1)`, expected: 0 },
        { name: 'último', run: `buscaBinaria([1, 3, 5], 5)`, expected: 2 },
        { name: 'ausente', run: `buscaBinaria([1, 3, 5], 4)`, expected: -1 },
        { name: 'lista vazia', run: `buscaBinaria([], 4)`, expected: -1 },
        { name: 'lista grande', run: `buscaBinaria(Array.from({ length: 100000 }, (_, i) => i * 2), 123456)`, expected: 61728 },
      ],
      checks: [{ type: 'mustNot', pattern: 'indexOf|includes|\\.find', message: 'Não usou indexOf/includes/find' }],
    },
    {
      id: 'd14-parenteses',
      title: 'Validar ( [ { } ] )',
      topic: 'algoritmos',
      difficulty: 3,
      prompt: '<p>Crie <code>validarSimbolos(texto)</code> que retorna <code>true</code> se todos os <code>()</code>, <code>[]</code> e <code>{}</code> estiverem corretamente abertos e fechados. Outros caracteres são ignorados.</p><p><code>\'{[()]}\'</code> → true; <code>\'([)]\'</code> → false; <code>\'((\'</code> → false.</p>',
      starter: ``,
      solution: `function validarSimbolos(texto) {\n  const pares = { ')': '(', ']': '[', '}': '{' };\n  const pilha = [];\n  for (const c of texto) {\n    if ('([{'.includes(c)) pilha.push(c);\n    else if (c in pares) {\n      if (pilha.pop() !== pares[c]) return false;\n    }\n  }\n  return pilha.length === 0;\n}`,
      hints: ['Use uma pilha (array com push/pop).', 'Um objeto que mapeia fechamento → abertura ajuda: <code>{ \')\': \'(\' ... }</code>.', 'Ao encontrar um fechamento, o topo da pilha precisa ser a abertura correspondente.'],
      tests: [
        { name: '{[()]}', run: `validarSimbolos('{[()]}')`, expected: true },
        { name: 'código', run: `validarSimbolos('function f(a) { return [a]; }')`, expected: true },
        { name: '([)]', run: `validarSimbolos('([)]')`, expected: false },
        { name: '((', run: `validarSimbolos('((')`, expected: false },
        { name: '))', run: `validarSimbolos('))')`, expected: false },
      ],
    },
    {
      id: 'd14-comprimir',
      title: 'Compressão de texto',
      topic: 'algoritmos',
      difficulty: 2,
      prompt: '<p>Crie <code>comprimir(texto)</code> que substitui sequências de letras repetidas pela letra + quantidade. <code>\'aaabccdddd\'</code> → <code>\'a3b1c2d4\'</code>. Texto vazio → <code>\'\'</code>.</p>',
      starter: ``,
      solution: `function comprimir(texto) {\n  let resultado = '';\n  let contagem = 1;\n  for (let i = 0; i < texto.length; i++) {\n    if (texto[i] === texto[i + 1]) {\n      contagem++;\n    } else {\n      resultado += texto[i] + contagem;\n      contagem = 1;\n    }\n  }\n  return resultado;\n}`,
      hints: ['Compare cada letra com a próxima (<code>texto[i + 1]</code>).', 'Quando mudar, escreva letra + contagem e reinicie a contagem.'],
      tests: [
        { name: 'aaabccdddd', run: `comprimir('aaabccdddd')`, expected: 'a3b1c2d4' },
        { name: 'abc', run: `comprimir('abc')`, expected: 'a1b1c1' },
        { name: 'vazio', run: `comprimir('')`, expected: '' },
      ],
    },
    {
      id: 'd14-bolha',
      title: 'Ordenação (sem sort)',
      topic: 'algoritmos',
      difficulty: 3,
      prompt: '<p>Implemente <code>ordenar(lista)</code> que retorna um <strong>novo</strong> array em ordem crescente <strong>sem usar</strong> <code>sort</code>. Sugestão: <em>bubble sort</em> (compare vizinhos e troque se estiverem fora de ordem; repita até não haver trocas) ou <em>selection sort</em>.</p>',
      starter: ``,
      solution: `function ordenar(lista) {\n  const a = [...lista];\n  for (let i = 0; i < a.length; i++) {\n    for (let j = 0; j < a.length - 1 - i; j++) {\n      if (a[j] > a[j + 1]) {\n        [a[j], a[j + 1]] = [a[j + 1], a[j]];\n      }\n    }\n  }\n  return a;\n}`,
      hints: ['Trabalhe numa cópia: <code>const a = [...lista]</code>.', 'Troca elegante: <code>[a[j], a[j + 1]] = [a[j + 1], a[j]]</code>.'],
      tests: [
        { name: 'números', run: `ordenar([5, 2, 9, 1, 5, 6])`, expected: [1, 2, 5, 5, 6, 9] },
        { name: 'negativos', run: `ordenar([0, -3, 10, -1])`, expected: [-3, -1, 0, 10] },
        { name: 'não muta', run: `(() => { const l = [2, 1]; ordenar(l); return l; })()`, expected: [2, 1] },
      ],
      checks: [{ type: 'mustNot', pattern: '\\.sort\\(', message: 'Não usou sort' }],
    },
    {
      id: 'd14-relatorio',
      title: 'Relatório de vendas',
      topic: 'algoritmos',
      difficulty: 3,
      prompt: '<p>Cada venda é <code>{ vendedor, valor }</code>. Crie <code>relatorio(vendas)</code> que retorna:</p><pre>{\n  total: 1000,\n  porVendedor: { Ana: 600, Bia: 400 },\n  melhor: \'Ana\'\n}</pre><p>Para lista vazia: <code>{ total: 0, porVendedor: {}, melhor: null }</code>.</p>',
      starter: ``,
      solution: `function relatorio(vendas) {\n  const porVendedor = {};\n  let total = 0;\n  for (const { vendedor, valor } of vendas) {\n    porVendedor[vendedor] = (porVendedor[vendedor] ?? 0) + valor;\n    total += valor;\n  }\n  let melhor = null;\n  for (const [nome, soma] of Object.entries(porVendedor)) {\n    if (melhor === null || soma > porVendedor[melhor]) melhor = nome;\n  }\n  return { total, porVendedor, melhor };\n}`,
      hints: ['Primeiro agrupe e some (padrão de contagem).', 'Depois percorra <code>Object.entries</code> para achar o maior.'],
      tests: [
        { name: 'relatório', run: `relatorio([{ vendedor: 'Ana', valor: 200 }, { vendedor: 'Bia', valor: 400 }, { vendedor: 'Ana', valor: 400 }])`, expected: { total: 1000, porVendedor: { Ana: 600, Bia: 400 }, melhor: 'Ana' } },
        { name: 'vazio', run: `relatorio([])`, expected: { total: 0, porVendedor: {}, melhor: null } },
      ],
    },
    {
      id: 'd14-paginar',
      title: 'Paginação',
      topic: 'algoritmos',
      difficulty: 2,
      prompt: '<p>Crie <code>paginar(lista, pagina, porPagina)</code> (páginas começam em 1) que retorna <code>{ itens, pagina, totalPaginas, temAnterior, temProxima }</code>.</p>',
      starter: ``,
      solution: `function paginar(lista, pagina, porPagina) {\n  const totalPaginas = Math.ceil(lista.length / porPagina);\n  const inicio = (pagina - 1) * porPagina;\n  return {\n    itens: lista.slice(inicio, inicio + porPagina),\n    pagina,\n    totalPaginas,\n    temAnterior: pagina > 1,\n    temProxima: pagina < totalPaginas,\n  };\n}`,
      hints: ['Índice inicial: <code>(pagina - 1) * porPagina</code>.', 'Total de páginas: <code>Math.ceil(lista.length / porPagina)</code>.'],
      tests: [
        { name: 'página 2 de 3', run: `paginar([1, 2, 3, 4, 5, 6, 7], 2, 3)`, expected: { itens: [4, 5, 6], pagina: 2, totalPaginas: 3, temAnterior: true, temProxima: true } },
        { name: 'última página', run: `paginar([1, 2, 3, 4, 5, 6, 7], 3, 3)`, expected: { itens: [7], pagina: 3, totalPaginas: 3, temAnterior: true, temProxima: false } },
        { name: 'primeira página', run: `paginar(['a', 'b'], 1, 5)`, expected: { itens: ['a', 'b'], pagina: 1, totalPaginas: 1, temAnterior: false, temProxima: false } },
      ],
    },
  ],
  quiz: [
    { q: 'Qual estrutura é ideal para verificar parênteses balanceados?', options: ['Fila', 'Pilha', 'Set', 'Map'], answer: 1, explain: 'O último aberto deve ser o primeiro fechado (LIFO).' },
    { q: 'Por que a busca binária exige uma lista ordenada?', options: ['Por estética', 'Para saber qual metade descartar', 'Porque é recursiva', 'Não exige'], answer: 1, explain: 'Comparando com o meio, a ordem diz em qual metade o alvo pode estar.' },
    { q: 'Qual é mais rápido para verificar se um item existe numa coleção grande?', options: ['array.includes', 'Set.has', 'Iguais', 'array.indexOf'], answer: 1, explain: 'Set e Map usam tabelas hash: tempo praticamente constante.' },
    { q: 'Qual o primeiro passo do método de resolução de problemas?', options: ['Codar', 'Entender o problema e as entradas/saídas', 'Pesquisar no Google', 'Otimizar'], answer: 1, explain: 'Sem entender o problema, o código resolve a coisa errada.' },
  ],
  extra: 'Resolva 3 problemas “Easy” no site Exercism (trilha JavaScript) ou no LeetCode. Use o método de 5 passos.',
};
