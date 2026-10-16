export default {
  day: 12,
  title: 'DOM e eventos: JavaScript na página',
  summary: 'Selecionar, criar e alterar elementos HTML e reagir a cliques, digitação e formulários.',
  hours: 3.5,
  goals: [
    'Selecionar elementos com querySelector/querySelectorAll',
    'Alterar texto, classes e atributos',
    'Criar e inserir elementos a partir de dados',
    'Reagir a eventos com addEventListener',
    'Ler formulários e usar delegação de eventos',
  ],
  lesson: [
    {
      title: 'O que é o DOM',
      blocks: [
        { p: 'Quando o navegador lê o HTML, ele cria uma árvore de objetos — o <strong>DOM</strong> (Document Object Model). O JavaScript manipula essa árvore através do objeto <code>document</code>, e a página se atualiza na hora.' },
        { p: 'Nos exercícios de hoje cada exercício já vem com um HTML pronto. Depois de executar, a aba <strong>Página</strong> mostra como o HTML ficou.' },
        { warn: 'Aqui os exercícios rodam numa página simulada (sem CSS e sem layout). Para ver o resultado visual de verdade, faça o desafio extra no seu computador.' },
      ],
    },
    {
      title: 'Selecionando e alterando',
      blocks: [
        { code: `// HTML: <h1 id="titulo">Olá</h1> <p class="info">a</p> <p class="info">b</p>
document.body.innerHTML = '<h1 id="titulo">Olá</h1><p class="info">a</p><p class="info">b</p>';

const titulo = document.querySelector('#titulo');  // por id
const infos = document.querySelectorAll('.info');  // todos com a classe
titulo.textContent = 'Novo título';
titulo.classList.add('destaque');
infos.forEach(p => p.style.color = 'red');
titulo.setAttribute('data-x', '1');
console.log(document.body.innerHTML);`, run: true },
        { list: [
          '<code>textContent</code>: só texto (seguro).',
          '<code>innerHTML</code>: interpreta HTML. <strong>Nunca</strong> use com texto digitado pelo usuário (risco de XSS).',
          '<code>classList.add / remove / toggle / contains</code>: manipula classes CSS.',
        ] },
      ],
    },
    {
      title: 'Criando elementos',
      blocks: [
        { code: `document.body.innerHTML = '<ul id="lista"></ul>';
const lista = document.querySelector('#lista');
for (const fruta of ['maçã', 'uva']) {
  const li = document.createElement('li');
  li.textContent = fruta;
  lista.append(li);
}
console.log(lista.outerHTML);`, run: true },
      ],
    },
    {
      title: 'Eventos',
      blocks: [
        { code: `document.body.innerHTML = '<button id="btn">Clique</button><span id="n">0</span>';
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
console.log(span.textContent);`, run: true },
        { p: 'Eventos comuns: <code>click</code>, <code>input</code> (a cada tecla), <code>change</code>, <code>submit</code> (formulário), <code>keydown</code>.' },
      ],
    },
    {
      title: 'Formulários',
      blocks: [
        { code: `document.body.innerHTML = '<form id="f"><input id="nome" value="Ana"><button>Enviar</button></form>';
document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault(); // impede o recarregamento da página
  const nome = document.querySelector('#nome').value.trim();
  console.log('Enviado:', nome);
});
document.querySelector('#f').dispatchEvent(new Event('submit', { cancelable: true }));`, run: true },
      ],
    },
    {
      title: 'Delegação de eventos',
      blocks: [
        { p: 'Em vez de colocar um listener em cada item de uma lista, coloque <strong>um</strong> no elemento pai e use <code>event.target</code>. Funciona inclusive para itens criados depois.' },
        { code: `document.body.innerHTML = '<ul id="tarefas"><li>Estudar</li><li>Treinar</li></ul>';
document.querySelector('#tarefas').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') e.target.classList.toggle('feita');
});
document.querySelectorAll('li')[1].click();
console.log(document.body.innerHTML);`, run: true },
      ],
    },
  ],
  exercises: [
    {
      id: 'd12-titulo',
      title: 'Trocar o título',
      topic: 'dom',
      env: 'dom',
      html: '<h1 id="titulo">Olá</h1><p id="sub">texto antigo</p>',
      difficulty: 1,
      prompt: '<p>HTML da página:</p><pre>&lt;h1 id="titulo"&gt;Olá&lt;/h1&gt;\n&lt;p id="sub"&gt;texto antigo&lt;/p&gt;</pre><p>Mude o texto do <code>h1</code> para <code>Bem-vindo ao DOM</code> e o do parágrafo para <code>JavaScript manipulando a página</code>.</p>',
      starter: `const titulo = document.querySelector('#titulo');\n`,
      solution: `document.querySelector('#titulo').textContent = 'Bem-vindo ao DOM';\ndocument.querySelector('#sub').textContent = 'JavaScript manipulando a página';`,
      hints: ['<code>elemento.textContent = \'novo texto\';</code>'],
      tests: [
        { name: 'título alterado', run: `document.querySelector('#titulo').textContent`, expected: 'Bem-vindo ao DOM' },
        { name: 'parágrafo alterado', run: `document.querySelector('#sub').textContent`, expected: 'JavaScript manipulando a página' },
      ],
    },
    {
      id: 'd12-classes',
      title: 'Mexendo em classes',
      topic: 'dom',
      env: 'dom',
      html: '<p id="aviso" class="aviso oculto">Atenção!</p>',
      difficulty: 1,
      prompt: '<p>HTML: <code>&lt;p id="aviso" class="aviso oculto"&gt;Atenção!&lt;/p&gt;</code></p><p>Remova a classe <code>oculto</code> e adicione a classe <code>destaque</code>.</p>',
      starter: ``,
      solution: `const aviso = document.querySelector('#aviso');\naviso.classList.remove('oculto');\naviso.classList.add('destaque');`,
      hints: ['<code>classList.remove(\'x\')</code> e <code>classList.add(\'y\')</code>.'],
      tests: [
        { name: 'sem "oculto"', run: `document.querySelector('#aviso').classList.contains('oculto')`, expected: false },
        { name: 'com "destaque"', run: `document.querySelector('#aviso').classList.contains('destaque')`, expected: true },
        { name: 'mantém "aviso"', run: `document.querySelector('#aviso').classList.contains('aviso')`, expected: true },
      ],
    },
    {
      id: 'd12-lista',
      title: 'Criar lista a partir de dados',
      topic: 'dom',
      env: 'dom',
      html: '<ul id="lista"></ul>',
      difficulty: 2,
      prompt: '<p>HTML: <code>&lt;ul id="lista"&gt;&lt;/ul&gt;</code></p><p>Para cada fruta do array, crie um <code>&lt;li&gt;</code> com o nome e adicione na lista. Use <code>createElement</code>.</p>',
      starter: `const frutas = ['maçã', 'banana', 'uva'];\n`,
      solution: `const frutas = ['maçã', 'banana', 'uva'];\nconst lista = document.querySelector('#lista');\nfor (const fruta of frutas) {\n  const li = document.createElement('li');\n  li.textContent = fruta;\n  lista.append(li);\n}`,
      hints: ['<code>document.createElement(\'li\')</code> cria; <code>lista.append(li)</code> insere.'],
      tests: [
        { name: '3 itens', run: `document.querySelectorAll('#lista li').length`, expected: 3 },
        { name: 'textos corretos', run: `[...document.querySelectorAll('#lista li')].map(li => li.textContent)`, expected: ['maçã', 'banana', 'uva'] },
      ],
      checks: [{ type: 'must', pattern: 'createElement', message: 'Usou createElement' }],
    },
    {
      id: 'd12-contador',
      title: 'Contador de cliques',
      topic: 'dom',
      env: 'dom',
      html: '<button id="menos">-</button><span id="valor">0</span><button id="mais">+</button>',
      difficulty: 2,
      prompt: '<p>HTML:</p><pre>&lt;button id="menos"&gt;-&lt;/button&gt;\n&lt;span id="valor"&gt;0&lt;/span&gt;\n&lt;button id="mais"&gt;+&lt;/button&gt;</pre><p>Faça os botões aumentarem e diminuírem o número mostrado no <code>span</code>. O valor nunca pode ficar negativo.</p>',
      starter: ``,
      solution: `const valor = document.querySelector('#valor');\nlet contagem = 0;\nfunction atualizar() {\n  valor.textContent = contagem;\n}\ndocument.querySelector('#mais').addEventListener('click', () => {\n  contagem++;\n  atualizar();\n});\ndocument.querySelector('#menos').addEventListener('click', () => {\n  if (contagem > 0) contagem--;\n  atualizar();\n});`,
      hints: ['Guarde a contagem numa variável <code>let</code> e atualize o <code>textContent</code> a cada clique.', 'Antes de diminuir, verifique se é maior que 0.'],
      tests: [
        { name: '+ + + - → 2', run: `(() => { const m = document.querySelector('#mais'); m.click(); m.click(); m.click(); document.querySelector('#menos').click(); return document.querySelector('#valor').textContent; })()`, expected: '2' },
        { name: 'não fica negativo', run: `(() => { const menos = document.querySelector('#menos'); for (let i = 0; i < 5; i++) menos.click(); return document.querySelector('#valor').textContent; })()`, expected: '0' },
      ],
      checks: [{ type: 'must', pattern: 'addEventListener', message: 'Usou addEventListener' }],
    },
    {
      id: 'd12-saudar',
      title: 'Formulário de saudação',
      topic: 'dom',
      env: 'dom',
      html: '<form id="form"><input id="nome" placeholder="Seu nome"><button>Saudar</button></form><p id="saida"></p>',
      difficulty: 2,
      prompt: '<p>HTML:</p><pre>&lt;form id="form"&gt;\n  &lt;input id="nome"&gt;\n  &lt;button&gt;Saudar&lt;/button&gt;\n&lt;/form&gt;\n&lt;p id="saida"&gt;&lt;/p&gt;</pre><p>Ao enviar o formulário (<code>submit</code>): impeça o recarregamento, leia o nome (sem espaços nas pontas) e mostre <code>Olá, Ana!</code> no parágrafo. Se o nome estiver vazio, mostre <code>Digite seu nome</code>.</p>',
      starter: `const form = document.querySelector('#form');\n`,
      solution: "const form = document.querySelector('#form');\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n  const nome = document.querySelector('#nome').value.trim();\n  const saida = document.querySelector('#saida');\n  saida.textContent = nome ? `Olá, ${nome}!` : 'Digite seu nome';\n});",
      hints: ['<code>form.addEventListener(\'submit\', (e) => { e.preventDefault(); ... })</code>', 'O valor do input fica em <code>.value</code>.'],
      tests: [
        { name: 'saúda pelo nome', run: `(() => { document.querySelector('#nome').value = '  Ana '; document.querySelector('#form').dispatchEvent(new Event('submit', { cancelable: true })); return document.querySelector('#saida').textContent; })()`, expected: 'Olá, Ana!' },
        { name: 'nome vazio', run: `(() => { document.querySelector('#nome').value = '   '; document.querySelector('#form').dispatchEvent(new Event('submit', { cancelable: true })); return document.querySelector('#saida').textContent; })()`, expected: 'Digite seu nome' },
        { name: 'chama preventDefault', run: `(() => { const ev = new Event('submit', { cancelable: true }); document.querySelector('#form').dispatchEvent(ev); return ev.defaultPrevented; })()`, expected: true },
      ],
    },
    {
      id: 'd12-delegacao',
      title: 'Lista de tarefas com delegação',
      topic: 'dom',
      env: 'dom',
      html: '<ul id="tarefas"><li>Estudar JS</li><li>Fazer exercícios</li><li>Descansar</li></ul>',
      difficulty: 2,
      prompt: '<p>HTML: uma <code>&lt;ul id="tarefas"&gt;</code> com 3 <code>&lt;li&gt;</code>.</p><p>Com <strong>um único</strong> <code>addEventListener</code> na <code>ul</code>, faça com que clicar num <code>li</code> alterne a classe <code>feita</code>.</p>',
      starter: ``,
      solution: `document.querySelector('#tarefas').addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI') {\n    e.target.classList.toggle('feita');\n  }\n});`,
      hints: ['O evento “sobe” do <code>li</code> até a <code>ul</code> (bubbling).', 'Use <code>e.target</code> para saber qual li foi clicado e <code>classList.toggle</code>.'],
      tests: [
        { name: 'clicar marca', run: `(() => { const li = document.querySelectorAll('#tarefas li')[1]; li.click(); return li.classList.contains('feita'); })()`, expected: true },
        { name: 'clicar de novo desmarca', run: `(() => { const li = document.querySelectorAll('#tarefas li')[0]; li.click(); li.click(); return li.classList.contains('feita'); })()`, expected: false },
        { name: 'funciona para itens novos', run: `(() => { const li = document.createElement('li'); li.textContent = 'Nova'; document.querySelector('#tarefas').append(li); li.click(); return li.classList.contains('feita'); })()`, expected: true },
      ],
      checks: [{ type: 'mustNot', pattern: 'addEventListener[\\s\\S]*addEventListener', message: 'Usou apenas um addEventListener' }],
    },
    {
      id: 'd12-vitrine',
      title: 'Renderizar vitrine de produtos',
      topic: 'dom',
      env: 'dom',
      html: '<div id="vitrine"></div>',
      difficulty: 3,
      prompt: '<p>Crie <code>renderizar(produtos)</code> que preenche <code>&lt;div id="vitrine"&gt;</code> com um card por produto:</p><pre>&lt;div class="card"&gt;\n  &lt;h3&gt;Teclado&lt;/h3&gt;\n  &lt;p&gt;R$ 150.00&lt;/p&gt;\n&lt;/div&gt;</pre><p>Chamar <code>renderizar</code> de novo deve <strong>substituir</strong> os cards (não duplicar). Use <code>textContent</code> para os textos (segurança!).</p>',
      starter: `function renderizar(produtos) {\n  const vitrine = document.querySelector('#vitrine');\n  \n}\n\nrenderizar([{ nome: 'Teclado', preco: 150 }, { nome: 'Mouse', preco: 80 }]);\n`,
      solution: "function renderizar(produtos) {\n  const vitrine = document.querySelector('#vitrine');\n  vitrine.innerHTML = '';\n  for (const p of produtos) {\n    const card = document.createElement('div');\n    card.className = 'card';\n    const h3 = document.createElement('h3');\n    h3.textContent = p.nome;\n    const preco = document.createElement('p');\n    preco.textContent = `R$ ${p.preco.toFixed(2)}`;\n    card.append(h3, preco);\n    vitrine.append(card);\n  }\n}\n\nrenderizar([{ nome: 'Teclado', preco: 150 }, { nome: 'Mouse', preco: 80 }]);",
      hints: ['Limpe antes: <code>vitrine.innerHTML = \'\'</code> (seguro, pois é um texto fixo).', '<code>card.append(h3, p)</code> aceita vários elementos.'],
      tests: [
        { name: '2 cards na carga', run: `document.querySelectorAll('#vitrine .card').length`, expected: 2 },
        { name: 'conteúdo do card', run: `[document.querySelector('.card h3').textContent, document.querySelector('.card p').textContent]`, expected: ['Teclado', 'R$ 150.00'] },
        { name: 'renderizar de novo substitui', run: `(() => { renderizar([{ nome: 'Monitor', preco: 900 }]); return document.querySelectorAll('#vitrine .card').length; })()`, expected: 1 },
        { name: 'não interpreta HTML do nome', run: `(() => { renderizar([{ nome: '<b>x</b>', preco: 1 }]); return document.querySelectorAll('#vitrine b').length; })()`, expected: 0 },
      ],
    },
    {
      id: 'd12-busca',
      title: 'Filtro ao digitar',
      topic: 'dom',
      env: 'dom',
      html: '<input id="busca" placeholder="Buscar"><ul id="nomes"><li>Ana</li><li>Bruno</li><li>Carla</li><li>Mariana</li></ul>',
      difficulty: 3,
      prompt: '<p>HTML: um <code>&lt;input id="busca"&gt;</code> e uma lista <code>&lt;ul id="nomes"&gt;</code> com Ana, Bruno, Carla e Mariana.</p><p>No evento <code>input</code>, adicione a classe <code>oculto</code> aos <code>li</code> que <strong>não</strong> contêm o texto digitado (sem diferenciar maiúsculas) e remova dos que contêm.</p>',
      starter: ``,
      solution: `const busca = document.querySelector('#busca');\nbusca.addEventListener('input', () => {\n  const termo = busca.value.toLowerCase();\n  for (const li of document.querySelectorAll('#nomes li')) {\n    const combina = li.textContent.toLowerCase().includes(termo);\n    li.classList.toggle('oculto', !combina);\n  }\n});`,
      hints: ['Percorra os li com <code>for...of</code> e compare com <code>includes</code>.', '<code>classList.toggle(\'classe\', condicao)</code> adiciona se a condição for true e remove se for false.'],
      tests: [
        { name: '"an" mostra Ana e Mariana', run: `(() => { const b = document.querySelector('#busca'); b.value = 'an'; b.dispatchEvent(new Event('input')); return [...document.querySelectorAll('#nomes li:not(.oculto)')].map(li => li.textContent); })()`, expected: ['Ana', 'Mariana'] },
        { name: 'maiúsculas', run: `(() => { const b = document.querySelector('#busca'); b.value = 'BR'; b.dispatchEvent(new Event('input')); return [...document.querySelectorAll('#nomes li:not(.oculto)')].map(li => li.textContent); })()`, expected: ['Bruno'] },
        { name: 'vazio mostra todos', run: `(() => { const b = document.querySelector('#busca'); b.value = 'x'; b.dispatchEvent(new Event('input')); b.value = ''; b.dispatchEvent(new Event('input')); return document.querySelectorAll('#nomes li.oculto').length; })()`, expected: 0 },
      ],
    },
  ],
  quiz: [
    { q: 'Qual método seleciona <strong>todos</strong> os elementos com a classe <code>item</code>?', options: ['<code>getElementById(\'item\')</code>', '<code>querySelector(\'.item\')</code>', '<code>querySelectorAll(\'.item\')</code>', '<code>select(\'item\')</code>'], answer: 2, explain: 'querySelector retorna só o primeiro.' },
    { q: 'Por que evitar <code>innerHTML</code> com texto digitado pelo usuário?', options: ['É lento', 'Risco de XSS (injeção de código)', 'Não funciona no celular', 'Apaga o CSS'], answer: 1, explain: 'O HTML seria interpretado; um atacante poderia injetar scripts. Use textContent.' },
    { q: 'O que <code>event.preventDefault()</code> faz num submit?', options: ['Envia o formulário', 'Impede o comportamento padrão (recarregar a página)', 'Apaga os campos', 'Para outros listeners'], answer: 1, explain: 'Assim você trata o envio com JavaScript.' },
    { q: 'Na delegação de eventos, o listener fica:', options: ['Em cada filho', 'No elemento pai', 'No window apenas', 'No CSS'], answer: 1, explain: 'O evento borbulha até o pai, que usa event.target para saber a origem.' },
    { q: 'Qual evento dispara a cada tecla digitada num input?', options: ['change', 'submit', 'input', 'load'], answer: 2, explain: '<code>change</code> dispara só ao sair do campo.' },
  ],
  extra: 'No seu computador, crie <code>index.html</code> + <code>app.js</code> e refaça a lista de tarefas com CSS de verdade. Publique na Vercel (arraste a pasta em vercel.com/new) para treinar o deploy.',
};
