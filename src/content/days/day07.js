export default {
  day: 7,
  title: 'Objetos, desestruturação e JSON',
  summary: 'Modelar dados do mundo real com objetos, copiar sem efeitos colaterais e converter para JSON.',
  hours: 3.5,
  goals: [
    'Criar objetos e acessar propriedades com ponto e colchetes',
    'Percorrer objetos com Object.keys, Object.values e Object.entries',
    'Usar desestruturação, spread e rest',
    'Evitar erros com optional chaining (?.) e nullish coalescing (??)',
    'Converter objetos para JSON e de volta',
  ],
  lesson: [
    {
      title: 'Objetos literais',
      blocks: [
        { p: 'Um objeto agrupa dados relacionados em pares <strong>chave: valor</strong>. É a forma como o JavaScript representa “coisas”: um usuário, um produto, um pedido.' },
        { code: `const usuario = {
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
console.log(usuario);`, run: true },
      ],
    },
    {
      title: 'Atalhos: propriedades e métodos',
      blocks: [
        { code: `const nome = 'Leo';
const idade = 30;
const pessoa = {
  nome,          // o mesmo que nome: nome
  idade,
  apresentar() { // método
    return \`Oi, sou \${this.nome}\`;
  },
};
console.log(pessoa.apresentar());`, run: true },
        { p: 'Dentro de um método, <code>this</code> é o próprio objeto antes do ponto (<code>pessoa</code>).' },
      ],
    },
    {
      title: 'Percorrendo objetos',
      blocks: [
        { code: `const estoque = { maca: 10, banana: 4, uva: 0 };
console.log(Object.keys(estoque));    // [ 'maca', 'banana', 'uva' ]
console.log(Object.values(estoque));  // [ 10, 4, 0 ]
for (const [fruta, qtd] of Object.entries(estoque)) {
  console.log(\`\${fruta}: \${qtd}\`);
}
console.log('uva' in estoque); // true`, run: true },
      ],
    },
    {
      title: 'Desestruturação, spread e rest',
      blocks: [
        { code: `const produto = { nome: 'Caneca', preco: 30, cor: 'azul' };
const { nome, preco } = produto;           // tira propriedades para variáveis
console.log(nome, preco);

const { cor, ...resto } = produto;          // rest: “o resto”
console.log(cor, resto);

const [primeiro, segundo] = ['a', 'b', 'c']; // também funciona com arrays
console.log(primeiro, segundo);

const atualizado = { ...produto, preco: 25 }; // cópia com alteração
console.log(produto.preco, atualizado.preco);  // 30 25

function mostrar({ nome, preco }) {          // desestruturar parâmetros
  return \`\${nome}: R$ \${preco}\`;
}
console.log(mostrar(produto));`, run: true },
        { warn: 'Objetos também são passados por referência (como arrays). Use <code>{ ...obj }</code> para copiar. Atenção: essa cópia é <em>rasa</em> — objetos internos continuam compartilhados.' },
      ],
    },
    {
      title: '?. e ??',
      blocks: [
        { code: `const cliente = { nome: 'Bia' };
// console.log(cliente.endereco.cidade); // TypeError!
console.log(cliente.endereco?.cidade);   // undefined, sem erro
console.log(cliente.endereco?.cidade ?? 'Sem cidade');

// ?? só usa o padrão se o valor for null/undefined
console.log(0 ?? 10);  // 0
console.log(0 || 10);  // 10 (|| usa o padrão para qualquer falsy)`, run: true },
      ],
    },
    {
      title: 'JSON',
      blocks: [
        { p: 'JSON é o formato de texto usado para trocar dados entre sistemas (APIs, Firebase, arquivos). Parece um objeto JS, mas as chaves e textos usam sempre aspas duplas.' },
        { code: `const pedido = { id: 1, itens: ['café'], pago: false };
const texto = JSON.stringify(pedido);
console.log(texto, typeof texto);

const deVolta = JSON.parse(texto);
console.log(deVolta.itens[0]);

console.log(JSON.stringify(pedido, null, 2)); // formatado`, run: true },
      ],
    },
  ],
  exercises: [
    {
      id: 'd07-criar-pessoa',
      title: 'Fábrica de pessoas',
      topic: 'objetos',
      difficulty: 1,
      prompt: '<p>Crie <code>criarPessoa(nome, idade)</code> que retorna um objeto <code>{ nome, idade, maiorDeIdade }</code>, onde <code>maiorDeIdade</code> é um boolean.</p>',
      starter: `function criarPessoa(nome, idade) {\n  \n}\n`,
      solution: `function criarPessoa(nome, idade) {\n  return { nome, idade, maiorDeIdade: idade >= 18 };\n}`,
      hints: ['Atalho: <code>{ nome, idade }</code> equivale a <code>{ nome: nome, idade: idade }</code>.'],
      tests: [
        { name: 'criarPessoa("Ana", 20)', run: `criarPessoa('Ana', 20)`, expected: { nome: 'Ana', idade: 20, maiorDeIdade: true } },
        { name: 'criarPessoa("Léo", 12)', run: `criarPessoa('Léo', 12)`, expected: { nome: 'Léo', idade: 12, maiorDeIdade: false } },
      ],
    },
    {
      id: 'd07-descrever-carro',
      title: 'Descrever com desestruturação',
      topic: 'objetos',
      difficulty: 1,
      prompt: '<p>Crie <code>descreverCarro(carro)</code> que recebe <code>{ marca, modelo, ano }</code> e retorna <code>\'Fiat Uno (2010)\'</code>. Use <strong>desestruturação</strong>.</p>',
      starter: `function descreverCarro(carro) {\n  \n}\n`,
      solution: "function descreverCarro({ marca, modelo, ano }) {\n  return `${marca} ${modelo} (${ano})`;\n}",
      hints: ['Dentro da função: <code>const { marca, modelo, ano } = carro;</code>', 'Ou direto no parâmetro: <code>function descreverCarro({ marca, modelo, ano })</code>.'],
      tests: [
        { name: 'Fiat Uno 2010', run: `descreverCarro({ marca: 'Fiat', modelo: 'Uno', ano: 2010 })`, expected: 'Fiat Uno (2010)' },
        { name: 'VW Gol 1999', run: `descreverCarro({ ano: 1999, modelo: 'Gol', marca: 'VW' })`, expected: 'VW Gol (1999)' },
      ],
      checks: [{ type: 'must', pattern: '(const|let)\\s*\\{[^}]+\\}\\s*=|\\(\\s*\\{[^}]+\\}\\s*\\)', message: 'Usou desestruturação' }],
    },
    {
      id: 'd07-contar-props',
      title: 'Quantas propriedades?',
      topic: 'objetos',
      difficulty: 1,
      prompt: '<p>Crie <code>contarPropriedades(obj)</code> que retorna quantas chaves o objeto tem.</p>',
      starter: ``,
      solution: `function contarPropriedades(obj) {\n  return Object.keys(obj).length;\n}`,
      hints: ['<code>Object.keys(obj)</code> retorna um array com as chaves.'],
      tests: [
        { name: '{a:1, b:2} → 2', run: `contarPropriedades({ a: 1, b: 2 })`, expected: 2 },
        { name: '{} → 0', run: `contarPropriedades({})`, expected: 0 },
      ],
    },
    {
      id: 'd07-frequencia',
      title: 'Frequência de letras',
      topic: 'objetos',
      difficulty: 2,
      prompt: '<p>Crie <code>frequencia(palavra)</code> que retorna um objeto com quantas vezes cada letra aparece. <code>frequencia(\'banana\')</code> → <code>{ b: 1, a: 3, n: 2 }</code>.</p>',
      starter: `function frequencia(palavra) {\n  const contagem = {};\n  \n  return contagem;\n}\n`,
      solution: `function frequencia(palavra) {\n  const contagem = {};\n  for (const letra of palavra) {\n    contagem[letra] = (contagem[letra] || 0) + 1;\n  }\n  return contagem;\n}`,
      hints: ['Use colchetes com variável: <code>contagem[letra]</code>.', 'Na primeira vez, <code>contagem[letra]</code> é <code>undefined</code>. Truque: <code>(contagem[letra] || 0) + 1</code>.'],
      tests: [
        { name: 'banana', run: `frequencia('banana')`, expected: { b: 1, a: 3, n: 2 } },
        { name: 'vazio', run: `frequencia('')`, expected: {} },
      ],
    },
    {
      id: 'd07-estoque',
      title: 'Atualizar estoque sem mutar',
      topic: 'objetos',
      difficulty: 2,
      prompt: '<p>Crie <code>adicionarAoEstoque(estoque, produto, qtd)</code> que retorna um <strong>novo</strong> objeto com a quantidade somada (ou criada, se o produto não existir). O objeto original não pode mudar.</p>',
      starter: `function adicionarAoEstoque(estoque, produto, qtd) {\n  \n}\n`,
      solution: `function adicionarAoEstoque(estoque, produto, qtd) {\n  return { ...estoque, [produto]: (estoque[produto] ?? 0) + qtd };\n}`,
      hints: ['Copie com spread: <code>{ ...estoque }</code>.', 'Chave dinâmica num objeto literal: <code>{ [produto]: valor }</code>.'],
      tests: [
        { name: 'Soma em produto existente', run: `adicionarAoEstoque({ maca: 2 }, 'maca', 3)`, expected: { maca: 5 } },
        { name: 'Cria produto novo', run: `adicionarAoEstoque({ maca: 2 }, 'uva', 1)`, expected: { maca: 2, uva: 1 } },
        { name: 'Original intacto', run: `(() => { const e = { maca: 2 }; adicionarAoEstoque(e, 'maca', 3); return e; })()`, expected: { maca: 2 } },
      ],
    },
    {
      id: 'd07-cidade',
      title: 'Cidade com segurança (?. e ??)',
      topic: 'objetos',
      difficulty: 2,
      prompt: '<p>Crie <code>cidadeDoUsuario(usuario)</code> que retorna <code>usuario.endereco.cidade</code> ou <code>\'Desconhecida\'</code> se qualquer parte não existir. Não deve dar erro mesmo se <code>usuario</code> for <code>null</code>.</p>',
      starter: `function cidadeDoUsuario(usuario) {\n  return usuario.endereco.cidade;\n}\n`,
      solution: `function cidadeDoUsuario(usuario) {\n  return usuario?.endereco?.cidade ?? 'Desconhecida';\n}`,
      hints: ['<code>?.</code> para no primeiro <code>null</code>/<code>undefined</code> e retorna <code>undefined</code>.', 'Depois use <code>??</code> para o valor padrão.'],
      tests: [
        { name: 'Com cidade', run: `cidadeDoUsuario({ endereco: { cidade: 'Natal' } })`, expected: 'Natal' },
        { name: 'Sem endereço', run: `cidadeDoUsuario({ nome: 'Ana' })`, expected: 'Desconhecida' },
        { name: 'usuario null', run: `cidadeDoUsuario(null)`, expected: 'Desconhecida' },
      ],
    },
    {
      id: 'd07-inverter-obj',
      title: 'Inverter chaves e valores',
      topic: 'objetos',
      difficulty: 2,
      prompt: '<p>Crie <code>inverterObjeto(obj)</code>: <code>{ a: \'x\', b: \'y\' }</code> → <code>{ x: \'a\', y: \'b\' }</code>.</p>',
      starter: ``,
      solution: `function inverterObjeto(obj) {\n  const resultado = {};\n  for (const [chave, valor] of Object.entries(obj)) {\n    resultado[valor] = chave;\n  }\n  return resultado;\n}`,
      hints: ['<code>Object.entries</code> dá pares <code>[chave, valor]</code>.'],
      tests: [
        { name: '{a:"x", b:"y"}', run: `inverterObjeto({ a: 'x', b: 'y' })`, expected: { x: 'a', y: 'b' } },
        { name: 'cores', run: `inverterObjeto({ vermelho: '#f00' })`, expected: { '#f00': 'vermelho' } },
      ],
    },
    {
      id: 'd07-json',
      title: 'Ida e volta em JSON',
      topic: 'objetos',
      difficulty: 1,
      prompt: '<p>Crie <code>salvar(dados)</code> que retorna o texto JSON dos dados e <code>carregar(texto)</code> que transforma o texto JSON de volta em objeto.</p>',
      starter: `function salvar(dados) {\n  \n}\n\nfunction carregar(texto) {\n  \n}\n`,
      solution: `function salvar(dados) {\n  return JSON.stringify(dados);\n}\n\nfunction carregar(texto) {\n  return JSON.parse(texto);\n}`,
      hints: ['<code>JSON.stringify</code> e <code>JSON.parse</code>.'],
      tests: [
        { name: 'salvar retorna texto', run: `salvar({ a: 1 })`, expected: '{"a":1}' },
        { name: 'carregar retorna objeto', run: `carregar('{"nome":"Ana","tags":[1,2]}')`, expected: { nome: 'Ana', tags: [1, 2] } },
        { name: 'ida e volta mantém os dados', run: `carregar(salvar({ x: [1, { y: true }] }))`, expected: { x: [1, { y: true }] } },
      ],
    },
    {
      id: 'd07-contador-metodo',
      title: 'Objeto com métodos e this',
      topic: 'objetos',
      difficulty: 2,
      prompt: '<p>Crie <code>criarPlacar()</code> que retorna um objeto com:</p><ul><li><code>pontos</code>: começa em 0</li><li><code>marcar(qtd)</code>: soma qtd (padrão 1) aos pontos e retorna o total</li><li><code>zerar()</code>: volta para 0</li></ul>',
      starter: `function criarPlacar() {\n  return {\n    pontos: 0,\n    // métodos aqui\n  };\n}\n`,
      solution: `function criarPlacar() {\n  return {\n    pontos: 0,\n    marcar(qtd = 1) {\n      this.pontos += qtd;\n      return this.pontos;\n    },\n    zerar() {\n      this.pontos = 0;\n    },\n  };\n}`,
      hints: ['Dentro dos métodos, acesse a propriedade com <code>this.pontos</code>.', 'Evite arrow functions como métodos: nelas o <code>this</code> não é o objeto.'],
      tests: [
        { name: 'marcar soma e retorna', run: `(() => { const p = criarPlacar(); p.marcar(); return p.marcar(3); })()`, expected: 4 },
        { name: 'zerar', run: `(() => { const p = criarPlacar(); p.marcar(5); p.zerar(); return p.pontos; })()`, expected: 0 },
        { name: 'placares independentes', run: `(() => { const a = criarPlacar(); const b = criarPlacar(); a.marcar(2); return b.pontos; })()`, expected: 0 },
      ],
    },
    {
      id: 'd07-config',
      title: 'Mesclar configurações',
      topic: 'objetos',
      difficulty: 1,
      prompt: '<p>Crie <code>mesclarConfig(padrao, usuario)</code> que retorna um novo objeto com as configurações padrão sobrescritas pelas do usuário.</p>',
      starter: ``,
      solution: `function mesclarConfig(padrao, usuario) {\n  return { ...padrao, ...usuario };\n}`,
      hints: ['No spread, o que vem por último vence.'],
      tests: [
        { name: 'sobrescreve tema', run: `mesclarConfig({ tema: 'claro', fonte: 14 }, { tema: 'escuro' })`, expected: { tema: 'escuro', fonte: 14 } },
        { name: 'usuario vazio', run: `mesclarConfig({ a: 1 }, {})`, expected: { a: 1 } },
      ],
    },
  ],
  quiz: [
    { q: 'Como acessar uma propriedade cujo nome está na variável <code>campo</code>?', options: ['<code>obj.campo</code>', '<code>obj[campo]</code>', '<code>obj->campo</code>', '<code>obj{campo}</code>'], answer: 1, explain: 'Com colchetes o JS usa o <em>valor</em> da variável como chave.' },
    { q: '<code>const { a, ...r } = { a: 1, b: 2, c: 3 }</code>. Quanto vale <code>r</code>?', options: ['{ a: 1 }', '{ b: 2, c: 3 }', '[2, 3]', 'undefined'], answer: 1, explain: 'O rest agrupa as propriedades restantes num novo objeto.' },
    { q: '<code>0 ?? 5</code> resulta em:', options: ['0', '5', 'null', 'false'], answer: 0, explain: '<code>??</code> só troca <code>null</code> e <code>undefined</code>.' },
    { q: 'O que <code>JSON.stringify({ a: 1 })</code> retorna?', options: ['Um objeto', 'O texto <code>{"a":1}</code>', 'undefined', 'Um array'], answer: 1, explain: 'stringify converte para texto JSON.' },
    { q: '<code>usuario?.perfil?.foto</code> quando <code>usuario</code> é <code>undefined</code>:', options: ['TypeError', 'undefined', 'null', '\'\''], answer: 1, explain: 'Optional chaining interrompe e retorna undefined.' },
  ],
  extra: '🎯 Checkpoint da semana 1! Vá em <strong>Revisão</strong> e refaça os exercícios sugeridos. Depois, modele em um objeto JS algo da sua vida (seu carro, uma receita, sua playlist).',
};
