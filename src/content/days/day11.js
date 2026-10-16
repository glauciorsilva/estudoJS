export default {
  day: 11,
  title: 'Erros, depuração, Map, Set e módulos',
  summary: 'Escrever código robusto: tratar e lançar erros, depurar com método, usar Map/Set e organizar código em módulos.',
  hours: 3.5,
  goals: [
    'Tratar erros com try/catch/finally e lançar erros com throw',
    'Criar classes de erro personalizadas',
    'Seguir um método de depuração (ler a mensagem, isolar, inspecionar)',
    'Usar Set para valores únicos e Map para pares chave/valor',
    'Entender import/export (módulos)',
  ],
  lesson: [
    {
      title: 'try / catch / finally',
      blocks: [
        { code: `try {
  const dados = JSON.parse('{ inválido }');
  console.log('não chega aqui');
} catch (erro) {
  console.log('Deu ruim:', erro.name, '-', erro.message);
} finally {
  console.log('finally sempre executa');
}
console.log('o programa continua!');`, run: true },
      ],
    },
    {
      title: 'Lançando erros com throw',
      blocks: [
        { p: 'Quando a sua função recebe algo inválido, é melhor <strong>falhar cedo e com uma mensagem clara</strong> do que devolver um resultado errado em silêncio.' },
        { code: `function sacar(saldo, valor) {
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
}`, run: true },
      ],
    },
    {
      title: 'Erros personalizados',
      blocks: [
        { code: `class ValidacaoError extends Error {
  constructor(campo, mensagem) {
    super(mensagem);
    this.name = 'ValidacaoError';
    this.campo = campo;
  }
}
try {
  throw new ValidacaoError('email', 'E-mail obrigatório');
} catch (e) {
  if (e instanceof ValidacaoError) console.log(\`Campo \${e.campo}: \${e.message}\`);
  else throw e; // erros que você não sabe tratar: relance!
}`, run: true },
      ],
    },
    {
      title: 'Método de depuração',
      blocks: [
        { list: [
          '<strong>1. Leia a mensagem inteira</strong>: tipo do erro, texto e número da linha. Este app traduz as mensagens para você.',
          '<strong>2. Reproduza</strong> com o menor exemplo possível.',
          '<strong>3. Inspecione</strong> valores com <code>console.log</code> antes da linha do erro (ou use <code>debugger</code> com o DevTools aberto — F12).',
          '<strong>4. Formule uma hipótese</strong> e teste uma mudança por vez.',
          '<strong>5. Explique o código em voz alta</strong> (técnica do “patinho de borracha”).',
        ] },
        { code: `const itens = [{ preco: 10 }, { preco: 20 }];
let total = 0;
for (let i = 0; i <= itens.length; i++) { // bug proposital
  console.log('i =', i, 'item =', itens[i]);
  // total += itens[i].preco; // descomente e veja o erro
}`, run: true },
      ],
    },
    {
      title: 'Set: coleção de valores únicos',
      blocks: [
        { code: `const tags = new Set(['js', 'css', 'js']);
tags.add('html');
console.log(tags.size, tags.has('css')); // 3 true
tags.delete('css');
console.log([...tags]);                  // volta para array

const unicos = [...new Set([1, 1, 2, 3, 3])];
console.log(unicos);`, run: true },
      ],
    },
    {
      title: 'Map: dicionário com qualquer tipo de chave',
      blocks: [
        { code: `const precos = new Map();
precos.set('café', 12);
precos.set('pão', 1.5);
console.log(precos.get('café'), precos.has('chá'), precos.size);
for (const [produto, preco] of precos) {
  console.log(produto, preco);
}`, run: true },
        { tip: 'Use objeto <code>{}</code> para registros com campos fixos (um usuário). Use <code>Map</code> para coleções dinâmicas de chave → valor, especialmente com adições/remoções frequentes.' },
      ],
    },
    {
      title: 'Módulos: import e export',
      blocks: [
        { p: 'Em projetos reais, o código é dividido em arquivos. Cada arquivo é um <strong>módulo</strong> que exporta o que quer compartilhar. (O editor deste app roda um arquivo só, então aqui é só leitura — mas este próprio app é feito assim: veja a pasta <code>src/</code>.)' },
        { code: `// arquivo: matematica.js
export function somar(a, b) { return a + b; }
export const PI = 3.14159;
export default function media(lista) { /* ... */ }

// arquivo: app.js
import media, { somar, PI } from './matematica.js';
console.log(somar(1, 2), PI);` },
      ],
    },
  ],
  exercises: [
    {
      id: 'd11-dividir',
      title: 'Divisão segura',
      topic: 'erros',
      difficulty: 1,
      prompt: '<p>Crie <code>dividir(a, b)</code> que lança <code>new Error(\'Divisão por zero\')</code> quando <code>b</code> for 0; caso contrário retorna a divisão.</p>',
      starter: `function dividir(a, b) {\n  \n}\n`,
      solution: `function dividir(a, b) {\n  if (b === 0) throw new Error('Divisão por zero');\n  return a / b;\n}`,
      hints: ['<code>throw new Error(\'mensagem\')</code> interrompe a função.'],
      tests: [
        { name: 'dividir(10, 2) → 5', run: `dividir(10, 2)`, expected: 5 },
        { name: 'dividir(1, 0) lança erro', run: `(() => { try { dividir(1, 0); return 'não lançou'; } catch (e) { return e.message; } })()`, expected: 'Divisão por zero' },
      ],
    },
    {
      id: 'd11-json-seguro',
      title: 'JSON.parse sem quebrar',
      topic: 'erros',
      difficulty: 1,
      prompt: '<p>Crie <code>lerJSON(texto)</code> que retorna o objeto convertido, ou <code>null</code> se o texto não for um JSON válido.</p>',
      starter: ``,
      solution: `function lerJSON(texto) {\n  try {\n    return JSON.parse(texto);\n  } catch {\n    return null;\n  }\n}`,
      hints: ['Envolva o <code>JSON.parse</code> em <code>try/catch</code>.'],
      tests: [
        { name: 'válido', run: `lerJSON('{"a":1}')`, expected: { a: 1 } },
        { name: 'inválido → null', run: `lerJSON('{a:1}')`, expected: null },
        { name: 'vazio → null', run: `lerJSON('')`, expected: null },
      ],
    },
    {
      id: 'd11-validar',
      title: 'Validar cadastro',
      topic: 'erros',
      difficulty: 2,
      prompt: '<p>Crie <code>validarUsuario(usuario)</code> que lança erros com estas mensagens exatas, na ordem:</p><ul><li><code>\'Nome obrigatório\'</code> se não houver nome (ou for só espaços)</li><li><code>\'E-mail inválido\'</code> se o e-mail não contiver <code>@</code></li><li><code>\'Idade inválida\'</code> se a idade não for um número inteiro entre 0 e 130</li></ul><p>Se estiver tudo certo, retorne <code>true</code>.</p>',
      starter: `function validarUsuario(usuario) {\n  \n}\n`,
      solution: `function validarUsuario(usuario) {\n  if (!usuario.nome || usuario.nome.trim() === '') throw new Error('Nome obrigatório');\n  if (!usuario.email || !usuario.email.includes('@')) throw new Error('E-mail inválido');\n  const { idade } = usuario;\n  if (!Number.isInteger(idade) || idade < 0 || idade > 130) throw new Error('Idade inválida');\n  return true;\n}`,
      hints: ['<code>Number.isInteger(x)</code> já retorna false para textos e decimais.', 'Cuidado: o e-mail pode estar ausente (<code>undefined</code>).'],
      tests: [
        { name: 'válido', run: `validarUsuario({ nome: 'Ana', email: 'a@b.com', idade: 30 })`, expected: true },
        { name: 'sem nome', run: `(() => { try { validarUsuario({ nome: '  ', email: 'a@b', idade: 1 }); } catch (e) { return e.message; } })()`, expected: 'Nome obrigatório' },
        { name: 'e-mail sem @', run: `(() => { try { validarUsuario({ nome: 'A', email: 'ab.com', idade: 1 }); } catch (e) { return e.message; } })()`, expected: 'E-mail inválido' },
        { name: 'sem e-mail', run: `(() => { try { validarUsuario({ nome: 'A', idade: 1 }); } catch (e) { return e.message; } })()`, expected: 'E-mail inválido' },
        { name: 'idade texto', run: `(() => { try { validarUsuario({ nome: 'A', email: 'a@b', idade: '30' }); } catch (e) { return e.message; } })()`, expected: 'Idade inválida' },
      ],
    },
    {
      id: 'd11-erro-custom',
      title: 'Classe de erro personalizada',
      topic: 'erros',
      difficulty: 2,
      prompt: '<p>Crie <code>class EstoqueError extends Error</code> com <code>constructor(produto, mensagem)</code>, definindo <code>name = \'EstoqueError\'</code> e a propriedade <code>produto</code>. Depois crie <code>retirar(estoque, produto, qtd)</code> que lança <code>EstoqueError</code> com a mensagem <code>\'Estoque insuficiente\'</code> se não houver quantidade, ou retorna a quantidade restante (alterando o estoque).</p>',
      starter: `class EstoqueError extends Error {\n  \n}\n\nfunction retirar(estoque, produto, qtd) {\n  \n}\n`,
      solution: `class EstoqueError extends Error {\n  constructor(produto, mensagem) {\n    super(mensagem);\n    this.name = 'EstoqueError';\n    this.produto = produto;\n  }\n}\n\nfunction retirar(estoque, produto, qtd) {\n  const atual = estoque[produto] ?? 0;\n  if (qtd > atual) throw new EstoqueError(produto, 'Estoque insuficiente');\n  estoque[produto] = atual - qtd;\n  return estoque[produto];\n}`,
      hints: ['Chame <code>super(mensagem)</code> no constructor.', 'Produto inexistente conta como estoque 0.'],
      tests: [
        { name: 'retira', run: `retirar({ caneta: 10 }, 'caneta', 3)`, expected: 7 },
        { name: 'erro personalizado', run: `(() => { try { retirar({ caneta: 1 }, 'caneta', 3); } catch (e) { return [e instanceof EstoqueError, e instanceof Error, e.name, e.produto, e.message]; } })()`, expected: [true, true, 'EstoqueError', 'caneta', 'Estoque insuficiente'] },
        { name: 'produto inexistente', run: `(() => { try { retirar({}, 'lápis', 1); return 'ok'; } catch (e) { return e.name; } })()`, expected: 'EstoqueError' },
      ],
    },
    {
      id: 'd11-depurar',
      title: 'Depuração: média errada',
      topic: 'erros',
      difficulty: 2,
      prompt: '<p>A função abaixo deveria calcular a média, mas retorna <code>NaN</code>. Use <code>console.log</code> dentro do laço para descobrir por quê, e corrija. (Ela também deve retornar 0 para lista vazia.)</p>',
      starter: `function media(notas) {\n  let soma = 0;\n  for (let i = 0; i <= notas.length; i++) {\n    soma += notas[i];\n  }\n  return soma / notas.length;\n}\n\nconsole.log(media([7, 8, 9]));\n`,
      solution: `function media(notas) {\n  if (notas.length === 0) return 0;\n  let soma = 0;\n  for (let i = 0; i < notas.length; i++) {\n    soma += notas[i];\n  }\n  return soma / notas.length;\n}\n\nconsole.log(media([7, 8, 9]));`,
      hints: ['Mostre <code>i</code> e <code>notas[i]</code> a cada volta. Na última volta, o que aparece?', 'Um índice igual a <code>length</code> está fora do array (erro “off-by-one”).'],
      tests: [
        { name: 'media([7, 8, 9]) → 8', run: `media([7, 8, 9])`, expected: 8 },
        { name: 'media([]) → 0', run: `media([])`, expected: 0 },
      ],
    },
    {
      id: 'd11-set-unicos',
      title: 'Set: tags únicas',
      topic: 'colecoes',
      difficulty: 1,
      prompt: '<p>Crie <code>tagsUnicas(posts)</code>: cada post tem <code>tags</code> (array). Retorne um array com todas as tags sem repetição, em ordem alfabética. Use <code>Set</code>.</p>',
      starter: ``,
      solution: `function tagsUnicas(posts) {\n  const todas = new Set();\n  for (const post of posts) {\n    for (const tag of post.tags) todas.add(tag);\n  }\n  return [...todas].sort();\n}`,
      hints: ['Adicione tudo num <code>new Set()</code> com <code>add</code>.', 'Converta de volta: <code>[...set]</code>.'],
      tests: [
        { name: 'tags únicas ordenadas', run: `tagsUnicas([{ tags: ['js', 'web'] }, { tags: ['css', 'js'] }])`, expected: ['css', 'js', 'web'] },
        { name: 'vazio', run: `tagsUnicas([])`, expected: [] },
      ],
      checks: [{ type: 'must', pattern: 'new\\s+Set', message: 'Usou Set' }],
    },
    {
      id: 'd11-set-comum',
      title: 'Set: amigos em comum',
      topic: 'colecoes',
      difficulty: 2,
      prompt: '<p>Crie <code>emComum(a, b)</code> que retorna os itens presentes nos dois arrays (sem repetição, na ordem em que aparecem em <code>a</code>).</p>',
      starter: ``,
      solution: `function emComum(a, b) {\n  const conjuntoB = new Set(b);\n  return [...new Set(a)].filter(x => conjuntoB.has(x));\n}`,
      hints: ['Transforme <code>b</code> num Set e use <code>has</code> — é muito mais rápido que <code>includes</code> em listas grandes.'],
      tests: [
        { name: 'amigos', run: `emComum(['Ana', 'Bia', 'Caio'], ['Caio', 'Dani', 'Ana'])`, expected: ['Ana', 'Caio'] },
        { name: 'repetidos', run: `emComum([1, 1, 2], [1, 2, 2])`, expected: [1, 2] },
        { name: 'nada em comum', run: `emComum([1], [2])`, expected: [] },
      ],
    },
    {
      id: 'd11-map-palavras',
      title: 'Map: contar palavras',
      topic: 'colecoes',
      difficulty: 2,
      prompt: '<p>Crie <code>contarPalavras(texto)</code> que retorna um <code>Map</code> com cada palavra (em minúsculas) e quantas vezes aparece.</p>',
      starter: ``,
      solution: `function contarPalavras(texto) {\n  const contagem = new Map();\n  for (const palavra of texto.toLowerCase().split(/\\s+/)) {\n    if (!palavra) continue;\n    contagem.set(palavra, (contagem.get(palavra) ?? 0) + 1);\n  }\n  return contagem;\n}`,
      hints: ['<code>map.get(chave)</code> retorna <code>undefined</code> se não existir: use <code>?? 0</code>.'],
      tests: [
        { name: 'conta', run: `contarPalavras('O gato e o rato')`, expected: new Map([['o', 2], ['gato', 1], ['e', 1], ['rato', 1]]) },
        { name: 'retorna Map', run: `contarPalavras('a') instanceof Map`, expected: true },
      ],
    },
    {
      id: 'd11-executar-seguro',
      title: 'Executar com segurança',
      topic: 'erros',
      difficulty: 2,
      prompt: '<p>Crie <code>tentar(fn)</code> que executa <code>fn()</code> e retorna <code>{ ok: true, valor }</code> se deu certo ou <code>{ ok: false, erro: mensagem }</code> se lançou erro.</p>',
      starter: ``,
      solution: `function tentar(fn) {\n  try {\n    return { ok: true, valor: fn() };\n  } catch (e) {\n    return { ok: false, erro: e.message };\n  }\n}`,
      hints: ['Padrão muito usado em APIs: em vez de lançar, devolver um “resultado”.'],
      tests: [
        { name: 'sucesso', run: `tentar(() => 42)`, expected: { ok: true, valor: 42 } },
        { name: 'falha', run: `tentar(() => { throw new Error('ops'); })`, expected: { ok: false, erro: 'ops' } },
      ],
    },
  ],
  quiz: [
    { q: 'Quando o bloco <code>finally</code> executa?', options: ['Só se der erro', 'Só se não der erro', 'Sempre', 'Nunca'], answer: 2, explain: 'finally roda em ambos os casos — útil para “limpeza”.' },
    { q: '<code>[...new Set([1, 2, 2, 3])]</code> resulta em:', options: ['[1, 2, 2, 3]', '[1, 2, 3]', 'Set {1,2,3}', '3'], answer: 1, explain: 'Set descarta repetidos; o spread volta para array.' },
    { q: 'Qual o primeiro passo ao encontrar um erro?', options: ['Apagar o código', 'Ler a mensagem e a linha indicada', 'Pedir ajuda', 'Reiniciar o computador'], answer: 1, explain: 'A mensagem de erro geralmente diz exatamente o problema.' },
    { q: 'Como ler o valor da chave \'a\' de um Map <code>m</code>?', options: ['<code>m.a</code>', '<code>m[\'a\']</code>', '<code>m.get(\'a\')</code>', '<code>m.find(\'a\')</code>'], answer: 2, explain: 'Map usa os métodos get/set/has/delete.' },
    { q: 'Em <code>import x, { y } from \'./m.js\'</code>, <code>x</code> é:', options: ['O export default', 'Um export nomeado', 'O arquivo inteiro', 'Erro'], answer: 0, explain: 'Sem chaves importamos o default; com chaves, exports nomeados.' },
  ],
  extra: 'Abra o DevTools (F12) do navegador, aba Sources, e coloque um breakpoint em algum site. Explore o painel de variáveis.',
};
