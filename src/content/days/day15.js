const BASE_TAREFAS = `class GerenciadorTarefas {
  #tarefas = [];
  #proximoId = 1;

  adicionar(titulo, prioridade = 'media') {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Título obrigatório');
    }
    if (!['alta', 'media', 'baixa'].includes(prioridade)) {
      throw new Error('Prioridade inválida');
    }
    const tarefa = { id: this.#proximoId++, titulo: titulo.trim(), prioridade, concluida: false };
    this.#tarefas.push(tarefa);
    return tarefa;
  }

  concluir(id) {
    const tarefa = this.#tarefas.find(t => t.id === id);
    if (!tarefa) return false;
    tarefa.concluida = true;
    return true;
  }

  remover(id) {
    const antes = this.#tarefas.length;
    this.#tarefas = this.#tarefas.filter(t => t.id !== id);
    return this.#tarefas.length < antes;
  }

  listar(filtro = 'todas') {
    if (filtro === 'pendentes') return this.#tarefas.filter(t => !t.concluida);
    if (filtro === 'concluidas') return this.#tarefas.filter(t => t.concluida);
    return [...this.#tarefas];
  }
}`;

export default {
  day: 15,
  title: 'Projeto final: gerenciador de tarefas',
  summary: 'Construir, passo a passo, um gerenciador de tarefas que usa tudo: classes, arrays, erros, JSON, DOM e async. E fazer o simulado final.',
  hours: 4,
  goals: [
    'Construir um projeto incrementalmente, uma funcionalidade por vez',
    'Integrar classes, métodos de array, validação e JSON',
    'Conectar a lógica a uma interface (DOM)',
    'Avaliar o próprio aprendizado com o simulado final',
  ],
  lesson: [
    {
      title: 'Como desenvolvedores constroem projetos',
      blocks: [
        { p: 'Ninguém escreve um app inteiro de uma vez. O ciclo é: <strong>uma pequena funcionalidade → testar → melhorar → próxima</strong>. Os exercícios de hoje seguem esse ciclo: cada etapa reaproveita a anterior.' },
        { list: [
          'Etapa 1: o modelo (classe com adicionar/concluir/remover/listar)',
          'Etapa 2: estatísticas e ordenação',
          'Etapa 3: salvar e carregar (JSON)',
          'Etapa 4: sincronização assíncrona',
          'Etapa 5: interface (DOM)',
        ] },
      ],
    },
    {
      title: 'Separe lógica e interface',
      blocks: [
        { p: 'A classe <code>GerenciadorTarefas</code> não sabe nada de HTML. A interface só chama seus métodos e desenha o resultado. Isso deixa o código testável e fácil de trocar (por exemplo, migrar para React depois).' },
        { code: `// lógica
const tarefas = [];
const adicionar = (titulo) => tarefas.push({ titulo, feita: false });

// interface
function renderizar() {
  console.log(tarefas.map(t => (t.feita ? '[x] ' : '[ ] ') + t.titulo).join('\\n'));
}

adicionar('Estudar closures');
adicionar('Fazer o simulado');
tarefas[0].feita = true;
renderizar();`, run: true },
      ],
    },
    {
      title: 'E depois dos 15 dias?',
      blocks: [
        { list: [
          '<strong>Git e GitHub</strong>: versione cada projeto (você já fará isso com este app).',
          '<strong>Node.js e npm</strong>: JavaScript fora do navegador; instalar bibliotecas.',
          '<strong>Firebase</strong>: autenticação e Firestore — leia o código <code>src/firebase.js</code> e <code>src/data/store.js</code> deste app.',
          '<strong>Um framework</strong>: React (o mais pedido no mercado) ou Vue.',
          '<strong>TypeScript</strong>: JavaScript com tipos, padrão em empresas.',
          '<strong>Projetos próprios</strong>: fluência vem de construir. Meta: 1 projeto pequeno por semana.',
        ] },
      ],
    },
  ],
  exercises: [
    {
      id: 'd15-gerenciador',
      title: 'Etapa 1: GerenciadorTarefas',
      topic: 'projeto',
      difficulty: 2,
      prompt: '<p>Crie a classe <code>GerenciadorTarefas</code> com:</p><ul><li><code>adicionar(titulo, prioridade = \'media\')</code>: cria <code>{ id, titulo, prioridade, concluida: false }</code> com ids sequenciais (1, 2, 3...), retira espaços das pontas do título e retorna a tarefa. Lança <code>Error(\'Título obrigatório\')</code> se o título for vazio e <code>Error(\'Prioridade inválida\')</code> se não for alta/media/baixa.</li><li><code>concluir(id)</code>: marca como concluída; retorna <code>true</code>, ou <code>false</code> se o id não existir.</li><li><code>remover(id)</code>: retorna <code>true</code> se removeu.</li><li><code>listar(filtro = \'todas\')</code>: <code>\'todas\'</code>, <code>\'pendentes\'</code> ou <code>\'concluidas\'</code>.</li></ul>',
      starter: `class GerenciadorTarefas {\n  #tarefas = [];\n  #proximoId = 1;\n\n  adicionar(titulo, prioridade = 'media') {\n    \n  }\n}\n`,
      solution: BASE_TAREFAS,
      hints: ['Use os campos privados já declarados.', '<code>this.#proximoId++</code> usa o valor atual e depois incrementa.', 'Para listar, use <code>filter</code>; para “todas”, devolva uma cópia.'],
      tests: [
        { name: 'adicionar', run: `(() => { const g = new GerenciadorTarefas(); g.adicionar('A'); return g.adicionar('  B ', 'alta'); })()`, expected: { id: 2, titulo: 'B', prioridade: 'alta', concluida: false } },
        { name: 'título vazio', run: `(() => { try { new GerenciadorTarefas().adicionar('  '); } catch (e) { return e.message; } })()`, expected: 'Título obrigatório' },
        { name: 'prioridade inválida', run: `(() => { try { new GerenciadorTarefas().adicionar('x', 'urgente'); } catch (e) { return e.message; } })()`, expected: 'Prioridade inválida' },
        { name: 'concluir e listar', run: `(() => { const g = new GerenciadorTarefas(); g.adicionar('A'); g.adicionar('B'); return [g.concluir(1), g.concluir(9), g.listar('pendentes').map(t => t.titulo), g.listar('concluidas').map(t => t.titulo), g.listar().length]; })()`, expected: [true, false, ['B'], ['A'], 2] },
        { name: 'remover', run: `(() => { const g = new GerenciadorTarefas(); g.adicionar('A'); return [g.remover(1), g.remover(1), g.listar().length]; })()`, expected: [true, false, 0] },
      ],
    },
    {
      id: 'd15-estatisticas',
      title: 'Etapa 2: estatísticas e ordenação',
      topic: 'projeto',
      difficulty: 2,
      prompt: '<p>A classe da etapa 1 já está pronta no editor. Adicione:</p><ul><li><code>estatisticas()</code> → <code>{ total, concluidas, pendentes, percentual }</code> (percentual de concluídas, inteiro arredondado; 0 se não houver tarefas)</li><li><code>ordenadasPorPrioridade()</code> → nova lista: alta, depois media, depois baixa (mantendo a ordem de criação dentro de cada prioridade)</li></ul>',
      starter: BASE_TAREFAS.replace(/\n}$/, '\n\n  // adicione os novos métodos aqui\n}') + '\n',
      solution: BASE_TAREFAS.replace(/\n}$/, `

  estatisticas() {
    const total = this.listar().length;
    const concluidas = this.listar('concluidas').length;
    return {
      total,
      concluidas,
      pendentes: total - concluidas,
      percentual: total === 0 ? 0 : Math.round((concluidas / total) * 100),
    };
  }

  ordenadasPorPrioridade() {
    const peso = { alta: 0, media: 1, baixa: 2 };
    return this.listar().sort((a, b) => peso[a.prioridade] - peso[b.prioridade]);
  }
}`),
      hints: ['Reaproveite <code>this.listar(...)</code>.', 'Para ordenar por prioridade, crie um objeto de pesos: <code>{ alta: 0, media: 1, baixa: 2 }</code>.', 'O <code>sort</code> moderno é estável: mantém a ordem original entre empates.'],
      tests: [
        { name: 'estatísticas', run: `(() => { const g = new GerenciadorTarefas(); g.adicionar('A'); g.adicionar('B'); g.adicionar('C'); g.concluir(2); return g.estatisticas(); })()`, expected: { total: 3, concluidas: 1, pendentes: 2, percentual: 33 } },
        { name: 'estatísticas vazias', run: `new GerenciadorTarefas().estatisticas()`, expected: { total: 0, concluidas: 0, pendentes: 0, percentual: 0 } },
        { name: 'ordenação', run: `(() => { const g = new GerenciadorTarefas(); g.adicionar('b1', 'baixa'); g.adicionar('a1', 'alta'); g.adicionar('m1'); g.adicionar('a2', 'alta'); return g.ordenadasPorPrioridade().map(t => t.titulo); })()`, expected: ['a1', 'a2', 'm1', 'b1'] },
      ],
    },
    {
      id: 'd15-json',
      title: 'Etapa 3: salvar e carregar',
      topic: 'projeto',
      difficulty: 3,
      prompt: '<p>Adicione à classe:</p><ul><li><code>exportar()</code> → texto JSON com o array de tarefas</li><li><code>static importar(json)</code> → cria um novo <code>GerenciadorTarefas</code> com as tarefas do JSON; os próximos ids devem continuar a partir do maior id importado. Se o JSON for inválido, lance <code>Error(\'Arquivo inválido\')</code>.</li></ul><p>Dica: como <code>#tarefas</code> é privado, <code>importar</code> pode criar a instância e usar um método interno — métodos estáticos <strong>podem</strong> acessar campos privados de instâncias da própria classe.</p>',
      starter: BASE_TAREFAS.replace(/\n}$/, '\n\n  // exportar() e static importar(json)\n}') + '\n',
      solution: BASE_TAREFAS.replace(/\n}$/, `

  exportar() {
    return JSON.stringify(this.#tarefas);
  }

  static importar(json) {
    let dados;
    try {
      dados = JSON.parse(json);
    } catch {
      throw new Error('Arquivo inválido');
    }
    if (!Array.isArray(dados)) throw new Error('Arquivo inválido');
    const g = new GerenciadorTarefas();
    g.#tarefas = dados;
    g.#proximoId = dados.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    return g;
  }
}`),
      hints: ['<code>JSON.parse</code> dentro de try/catch.', 'Próximo id = maior id + 1 (use reduce ou Math.max(...ids)).'],
      tests: [
        { name: 'exportar', run: `(() => { const g = new GerenciadorTarefas(); g.adicionar('A'); return JSON.parse(g.exportar()); })()`, expected: [{ id: 1, titulo: 'A', prioridade: 'media', concluida: false }] },
        { name: 'importar continua ids', run: `(() => { const g = GerenciadorTarefas.importar('[{"id":7,"titulo":"X","prioridade":"alta","concluida":true}]'); const nova = g.adicionar('Y'); return [g.listar().length, nova.id, g.listar('concluidas')[0].titulo]; })()`, expected: [2, 8, 'X'] },
        { name: 'JSON inválido', run: `(() => { try { GerenciadorTarefas.importar('{oops'); } catch (e) { return e.message; } })()`, expected: 'Arquivo inválido' },
      ],
    },
    {
      id: 'd15-sync',
      title: 'Etapa 4: sincronizar (async)',
      topic: 'projeto',
      difficulty: 3,
      prompt: '<p>Simulando o envio para a nuvem (como o Firestore faria), crie a função <code>async function sincronizar(tarefas, enviar)</code>:</p><ul><li><code>enviar(tarefa)</code> é uma função assíncrona que pode falhar.</li><li>Envie todas as tarefas <strong>em paralelo</strong>.</li><li>Retorne <code>{ enviadas, falhas }</code> com as quantidades — uma falha não pode impedir as outras.</li></ul>',
      starter: `async function sincronizar(tarefas, enviar) {\n  \n}\n`,
      solution: `async function sincronizar(tarefas, enviar) {\n  const resultados = await Promise.allSettled(tarefas.map(t => enviar(t)));\n  const enviadas = resultados.filter(r => r.status === 'fulfilled').length;\n  return { enviadas, falhas: resultados.length - enviadas };\n}`,
      hints: ['<code>Promise.all</code> falha na primeira rejeição. Existe um parente que espera todas: <code>Promise.allSettled</code>.', 'Cada resultado tem <code>status: \'fulfilled\'</code> ou <code>\'rejected\'</code>.'],
      tests: [
        { name: 'conta sucessos e falhas', run: `sincronizar([{ id: 1 }, { id: 2 }, { id: 3 }], async (t) => { if (t.id === 2) throw new Error('rede'); return true; })`, expected: { enviadas: 2, falhas: 1 } },
        { name: 'em paralelo', run: `(async () => { const t = Date.now(); await sincronizar([1, 2, 3, 4], () => new Promise(r => setTimeout(r, 150))); return Date.now() - t < 450; })()`, expected: true },
        { name: 'lista vazia', run: `sincronizar([], async () => true)`, expected: { enviadas: 0, falhas: 0 } },
      ],
    },
    {
      id: 'd15-interface',
      title: 'Etapa 5: interface com DOM',
      topic: 'projeto',
      env: 'dom',
      html: '<form id="nova"><input id="titulo" placeholder="Nova tarefa"><select id="prioridade"><option value="alta">Alta</option><option value="media" selected>Média</option><option value="baixa">Baixa</option></select><button>Adicionar</button></form><p id="erro"></p><ul id="lista"></ul><p id="resumo"></p>',
      difficulty: 3,
      prompt: '<p>A classe está pronta. Ligue-a à página:</p><pre>&lt;form id="nova"&gt; &lt;input id="titulo"&gt; &lt;select id="prioridade"&gt;...&lt;/select&gt; &lt;/form&gt;\n&lt;p id="erro"&gt;&lt;/p&gt;\n&lt;ul id="lista"&gt;&lt;/ul&gt;\n&lt;p id="resumo"&gt;&lt;/p&gt;</pre><ul><li>No <code>submit</code>: adicione a tarefa (título + prioridade do select), limpe o input e o erro e re-renderize. Se der erro, mostre a mensagem em <code>#erro</code>.</li><li><code>renderizar()</code>: um <code>&lt;li&gt;</code> por tarefa com o título como texto e <code>data-id</code> com o id; tarefas concluídas recebem a classe <code>concluida</code>.</li><li>Clicar num <code>li</code> conclui a tarefa (delegação).</li><li><code>#resumo</code> mostra <code>1 de 3 concluídas</code>.</li></ul>',
      starter: BASE_TAREFAS + `\n\nconst gerenciador = new GerenciadorTarefas();\n\nfunction renderizar() {\n  \n}\n\n// eventos aqui\n\nrenderizar();\n`,
      solution: BASE_TAREFAS + `

const gerenciador = new GerenciadorTarefas();

function renderizar() {
  const lista = document.querySelector('#lista');
  lista.innerHTML = '';
  for (const t of gerenciador.listar()) {
    const li = document.createElement('li');
    li.textContent = t.titulo;
    li.dataset.id = t.id;
    if (t.concluida) li.classList.add('concluida');
    lista.append(li);
  }
  const concluidas = gerenciador.listar('concluidas').length;
  document.querySelector('#resumo').textContent = \`\${concluidas} de \${gerenciador.listar().length} concluídas\`;
}

document.querySelector('#nova').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#titulo');
  const erro = document.querySelector('#erro');
  try {
    gerenciador.adicionar(input.value, document.querySelector('#prioridade').value);
    input.value = '';
    erro.textContent = '';
    renderizar();
  } catch (err) {
    erro.textContent = err.message;
  }
});

document.querySelector('#lista').addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  gerenciador.concluir(Number(li.dataset.id));
  renderizar();
});

renderizar();`,
      hints: ['Em <code>renderizar</code>, limpe a lista e recrie todos os li a partir de <code>gerenciador.listar()</code>.', '<code>li.dataset.id = t.id</code> gera o atributo <code>data-id</code>; ao ler, converta com <code>Number(li.dataset.id)</code>.', 'Use try/catch no submit para exibir o erro.'],
      tests: [
        { name: 'resumo inicial', run: `document.querySelector('#resumo').textContent`, expected: '0 de 0 concluídas' },
        { name: 'adiciona pelo formulário', run: `(() => { const f = document.querySelector('#nova'); const i = document.querySelector('#titulo'); i.value = 'Estudar'; f.dispatchEvent(new Event('submit', { cancelable: true })); i.value = 'Treinar'; document.querySelector('#prioridade option[value=alta]').selected = true; f.dispatchEvent(new Event('submit', { cancelable: true })); return [[...document.querySelectorAll('#lista li')].map(li => li.textContent), i.value, gerenciador.listar()[1].prioridade]; })()`, expected: [['Estudar', 'Treinar'], '', 'alta'] },
        { name: 'clicar conclui', run: `(() => { document.querySelector('#lista li').click(); return [document.querySelector('#lista li').classList.contains('concluida'), document.querySelector('#resumo').textContent]; })()`, expected: [true, '1 de 2 concluídas'] },
        { name: 'mostra erro', run: `(() => { document.querySelector('#titulo').value = ' '; document.querySelector('#nova').dispatchEvent(new Event('submit', { cancelable: true })); return document.querySelector('#erro').textContent; })()`, expected: 'Título obrigatório' },
      ],
    },
  ],
  quiz: [
    { q: 'Simulado — Qual o resultado de <code>[1, 2, 3].map(n => n * 2).filter(n => n > 2)</code>?', options: ['[2, 4, 6]', '[4, 6]', '[3]', '[6]'], answer: 1, explain: 'map → [2,4,6]; filter > 2 → [4,6].' },
    { q: 'Simulado — <code>typeof []</code> retorna:', options: ['\'array\'', '\'object\'', '\'list\'', '\'undefined\''], answer: 1, explain: 'Arrays são objetos. Use <code>Array.isArray</code> para testar.' },
    { q: 'Simulado — O que acontece? <code>const x = 1; x = 2;</code>', options: ['x vale 2', 'TypeError: Assignment to constant variable', 'x vale 1', 'SyntaxError'], answer: 1, explain: 'const não pode ser reatribuída.' },
    { q: 'Simulado — <code>let a = { v: 1 }; let b = a; b.v = 2;</code> Quanto vale <code>a.v</code>?', options: ['1', '2', 'undefined', 'Erro'], answer: 1, explain: 'Objetos são compartilhados por referência.' },
    { q: 'Simulado — Qual forma lê o valor de uma Promise dentro de uma função async?', options: ['promise.value', 'await promise', 'promise()', 'return promise'], answer: 1, explain: 'await espera a Promise resolver.' },
    { q: 'Simulado — O que uma closure permite?', options: ['Fechar o navegador', 'Que uma função acesse variáveis do escopo onde foi criada', 'Criar classes', 'Tratar erros'], answer: 1, explain: 'Base de contadores privados, fábricas de funções e hooks.' },
    { q: 'Simulado — Qual NÃO é falsy?', options: ['0', '\'\'', '\'false\'', 'null'], answer: 2, explain: '\'false\' é uma string não vazia: truthy.' },
    { q: 'Simulado — Para impedir que um formulário recarregue a página:', options: ['return false no HTML', 'event.preventDefault()', 'event.stop()', 'form.cancel()'], answer: 1, explain: 'preventDefault cancela o comportamento padrão do evento.' },
    { q: 'Simulado — Em <code>class B extends A</code>, o constructor de B deve chamar:', options: ['A()', 'super()', 'this.A()', 'new A()'], answer: 1, explain: 'super() antes de usar this.' },
    { q: 'Simulado — Qual estrutura guarda valores únicos?', options: ['Array', 'Object', 'Set', 'Map'], answer: 2, explain: 'Set descarta duplicados automaticamente.' },
    { q: 'Simulado — <code>[10, 1, 2].sort()</code> resulta em:', options: ['[1, 2, 10]', '[1, 10, 2]', '[10, 2, 1]', '[2, 1, 10]'], answer: 1, explain: 'Sem comparador, sort ordena como texto.' },
    { q: 'Simulado — Qual destes executa requisições em paralelo?', options: ['await a; await b;', 'await Promise.all([a, b])', 'a.then(b)', 'for await'], answer: 1, explain: 'Promise.all inicia e espera todas juntas.' },
  ],
  extra: '🏁 Parabéns por chegar aqui! Recrie o gerenciador de tarefas como um projeto de verdade: <code>index.html</code> + <code>app.js</code> + CSS, salve no <code>localStorage</code>, publique no GitHub e faça deploy na Vercel. Depois, troque o localStorage pelo Firestore.',
};
