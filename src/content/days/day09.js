export default {
  day: 9,
  title: 'Funções avançadas: callbacks e closures',
  summary: 'Usar funções como valores, criar funções que geram funções e entender closures — base de React, eventos e bibliotecas.',
  hours: 3.5,
  goals: [
    'Passar funções como argumento (callbacks) e retorná-las',
    'Entender closure: a função “lembra” das variáveis de onde nasceu',
    'Criar estado privado com closures',
    'Implementar suas próprias versões de map/filter',
  ],
  lesson: [
    {
      title: 'Funções são valores',
      blocks: [
        { p: 'Em JavaScript uma função pode ser guardada em variável, passada como argumento e retornada por outra função. Funções que recebem ou retornam funções são chamadas de <strong>funções de ordem superior</strong>.' },
        { code: `function aplicar(valor, transformacao) {
  return transformacao(valor);
}
console.log(aplicar(5, n => n * 10));     // 50
console.log(aplicar('oi', s => s.toUpperCase())); // OI`, run: true },
      ],
    },
    {
      title: 'Funções que criam funções',
      blocks: [
        { code: `function criarSaudacao(saudacao) {
  return function (nome) {
    return \`\${saudacao}, \${nome}!\`;
  };
}
const ola = criarSaudacao('Olá');
const bomDia = criarSaudacao('Bom dia');
console.log(ola('Ana'), bomDia('Leo'));`, run: true },
      ],
    },
    {
      title: 'Closure',
      blocks: [
        { p: 'Repare: <code>criarSaudacao</code> já terminou de executar, mas a função retornada ainda lembra o valor de <code>saudacao</code>. Isso é uma <strong>closure</strong>: a função carrega consigo as variáveis do escopo onde foi criada.' },
        { code: `function criarContador() {
  let contagem = 0;            // variável "privada"
  return {
    incrementar: () => ++contagem,
    valor: () => contagem,
  };
}
const c1 = criarContador();
const c2 = criarContador();
c1.incrementar(); c1.incrementar();
console.log(c1.valor(), c2.valor()); // 2 0
console.log(c1.contagem);            // undefined: ninguém acessa de fora`, run: true },
        { tip: 'Cada chamada de <code>criarContador()</code> cria uma <strong>nova</strong> variável <code>contagem</code>. Por isso c1 e c2 são independentes.' },
      ],
    },
    {
      title: 'Callbacks no dia a dia',
      blocks: [
        { p: 'Você já usou callbacks em <code>map</code>, <code>filter</code> e <code>sort</code>. Eles também aparecem em eventos (<code>addEventListener</code>, dia 12) e em código assíncrono (<code>setTimeout</code>, dia 13).' },
        { code: `function repetir(vezes, acao) {
  for (let i = 1; i <= vezes; i++) acao(i);
}
repetir(3, i => console.log('Execução', i));`, run: true },
      ],
    },
    {
      title: 'Por que isso importa?',
      blocks: [
        { list: [
          '<strong>Reaproveitamento</strong>: uma função genérica + comportamentos plugáveis.',
          '<strong>Encapsulamento</strong>: closures escondem dados (como atributos privados).',
          '<strong>Frameworks</strong>: React, Vue e Node usam esses padrões o tempo todo (hooks, middlewares, handlers).',
        ] },
      ],
    },
  ],
  exercises: [
    {
      id: 'd09-operacao',
      title: 'Calculadora com callback',
      topic: 'closures',
      difficulty: 1,
      prompt: '<p>Crie <code>calcular(a, b, operacao)</code> que retorna o resultado de chamar <code>operacao(a, b)</code>.</p><p>Ex.: <code>calcular(2, 3, (x, y) => x * y)</code> → 6.</p>',
      starter: ``,
      solution: `function calcular(a, b, operacao) {\n  return operacao(a, b);\n}`,
      hints: ['O parâmetro <code>operacao</code> é uma função: chame-a com <code>operacao(a, b)</code>.'],
      tests: [
        { name: 'multiplicação', run: `calcular(2, 3, (x, y) => x * y)`, expected: 6 },
        { name: 'subtração', run: `calcular(10, 4, (x, y) => x - y)`, expected: 6 },
        { name: 'maior', run: `calcular(7, 9, Math.max)`, expected: 9 },
      ],
    },
    {
      id: 'd09-multiplicador',
      title: 'Fábrica de multiplicadores',
      topic: 'closures',
      difficulty: 2,
      prompt: '<p>Crie <code>criarMultiplicador(fator)</code> que <strong>retorna uma função</strong>. A função retornada recebe um número e o multiplica pelo fator.</p><pre>const dobro = criarMultiplicador(2);\ndobro(5); // 10</pre>',
      starter: `function criarMultiplicador(fator) {\n  \n}\n`,
      solution: `function criarMultiplicador(fator) {\n  return (n) => n * fator;\n}`,
      hints: ['<code>return (n) => ...;</code> — a arrow function interna enxerga <code>fator</code>.'],
      tests: [
        { name: 'dobro(5) → 10', run: `criarMultiplicador(2)(5)`, expected: 10 },
        { name: 'triplo(7) → 21', run: `(() => { const triplo = criarMultiplicador(3); return triplo(7); })()`, expected: 21 },
        { name: 'retorna função', run: `typeof criarMultiplicador(1)`, expected: 'function' },
      ],
    },
    {
      id: 'd09-contador-privado',
      title: 'Contador com estado privado',
      topic: 'closures',
      difficulty: 2,
      prompt: '<p>Crie <code>criarContador(inicial)</code> (padrão 0) que retorna um objeto <strong>somente com os métodos</strong> <code>incrementar()</code>, <code>decrementar()</code> e <code>valor()</code>. A contagem deve ficar guardada numa variável da closure, não como propriedade do objeto.</p>',
      starter: `function criarContador(inicial = 0) {\n  \n}\n`,
      solution: `function criarContador(inicial = 0) {\n  let contagem = inicial;\n  return {\n    incrementar() { contagem++; return contagem; },\n    decrementar() { contagem--; return contagem; },\n    valor() { return contagem; },\n  };\n}`,
      hints: ['Declare <code>let contagem = inicial;</code> dentro da função e retorne o objeto com métodos que a usam.'],
      tests: [
        { name: 'incrementa e decrementa', run: `(() => { const c = criarContador(); c.incrementar(); c.incrementar(); c.decrementar(); return c.valor(); })()`, expected: 1 },
        { name: 'valor inicial', run: `criarContador(10).valor()`, expected: 10 },
        { name: 'só expõe os métodos', run: `Object.keys(criarContador()).sort()`, expected: ['decrementar', 'incrementar', 'valor'] },
        { name: 'contadores independentes', run: `(() => { const a = criarContador(); const b = criarContador(); a.incrementar(); return b.valor(); })()`, expected: 0 },
      ],
    },
    {
      id: 'd09-meu-map',
      title: 'Seu próprio map',
      topic: 'closures',
      difficulty: 2,
      prompt: '<p>Implemente <code>meuMap(lista, fn)</code> que funciona como <code>lista.map(fn)</code>, <strong>sem usar</strong> <code>.map</code>. A função deve receber (item, indice).</p>',
      starter: `function meuMap(lista, fn) {\n  \n}\n`,
      solution: `function meuMap(lista, fn) {\n  const resultado = [];\n  for (let i = 0; i < lista.length; i++) {\n    resultado.push(fn(lista[i], i));\n  }\n  return resultado;\n}`,
      hints: ['Laço + push + chamar <code>fn(lista[i], i)</code>.'],
      tests: [
        { name: 'dobra', run: `meuMap([1, 2, 3], n => n * 2)`, expected: [2, 4, 6] },
        { name: 'passa o índice', run: `meuMap(['a', 'b'], (x, i) => x + i)`, expected: ['a0', 'b1'] },
      ],
      checks: [{ type: 'mustNot', pattern: '\\.map\\(', message: 'Não usou .map' }],
    },
    {
      id: 'd09-meu-filter',
      title: 'Seu próprio filter',
      topic: 'closures',
      difficulty: 2,
      prompt: '<p>Implemente <code>meuFilter(lista, condicao)</code> sem usar <code>.filter</code>.</p>',
      starter: ``,
      solution: `function meuFilter(lista, condicao) {\n  const resultado = [];\n  for (const item of lista) {\n    if (condicao(item)) resultado.push(item);\n  }\n  return resultado;\n}`,
      hints: ['Só faça push quando <code>condicao(item)</code> for verdadeiro.'],
      tests: [
        { name: 'maiores que 2', run: `meuFilter([1, 2, 3, 4], n => n > 2)`, expected: [3, 4] },
        { name: 'nenhum', run: `meuFilter([1], n => n > 5)`, expected: [] },
      ],
      checks: [{ type: 'mustNot', pattern: '\\.filter\\(', message: 'Não usou .filter' }],
    },
    {
      id: 'd09-uma-vez',
      title: 'Executar uma única vez',
      topic: 'closures',
      difficulty: 3,
      prompt: '<p>Crie <code>umaVez(fn)</code> que retorna uma nova função. Na primeira chamada ela executa <code>fn</code> com os argumentos recebidos e guarda o resultado; nas próximas, apenas retorna o resultado guardado, <strong>sem executar fn de novo</strong>.</p><p>Útil para evitar, por exemplo, que um botão de pagamento cobre duas vezes.</p>',
      starter: `function umaVez(fn) {\n  \n}\n`,
      solution: `function umaVez(fn) {\n  let executou = false;\n  let resultado;\n  return (...args) => {\n    if (!executou) {\n      resultado = fn(...args);\n      executou = true;\n    }\n    return resultado;\n  };\n}`,
      hints: ['Guarde na closure uma bandeira <code>executou</code> e o <code>resultado</code>.', 'Para repassar argumentos: <code>(...args) => fn(...args)</code>.'],
      tests: [
        { name: 'retorna o primeiro resultado sempre', run: `(() => { const f = umaVez((a, b) => a + b); return [f(1, 2), f(10, 20)]; })()`, expected: [3, 3] },
        { name: 'fn executa só uma vez', run: `(() => { let n = 0; const f = umaVez(() => ++n); f(); f(); f(); return n; })()`, expected: 1 },
      ],
    },
    {
      id: 'd09-memoizar',
      title: 'Memoização (cache)',
      topic: 'closures',
      difficulty: 3,
      prompt: '<p>Crie <code>memoizar(fn)</code> que retorna uma versão de <code>fn</code> (de 1 argumento) com cache: se for chamada de novo com o mesmo argumento, devolve o resultado guardado sem recalcular.</p>',
      starter: `function memoizar(fn) {\n  const cache = {};\n  \n}\n`,
      solution: `function memoizar(fn) {\n  const cache = {};\n  return (arg) => {\n    if (!(arg in cache)) {\n      cache[arg] = fn(arg);\n    }\n    return cache[arg];\n  };\n}`,
      hints: ['Retorne uma função que olha o <code>cache[arg]</code> antes de chamar <code>fn</code>.', 'Use <code>arg in cache</code> para saber se já calculou (funciona até se o resultado for 0).'],
      tests: [
        { name: 'resultado correto', run: `memoizar(n => n * n)(9)`, expected: 81 },
        { name: 'não recalcula', run: `(() => { let chamadas = 0; const f = memoizar(n => { chamadas++; return n + 1; }); f(1); f(1); f(2); f(1); return chamadas; })()`, expected: 2 },
        { name: 'cacheia resultado 0', run: `(() => { let chamadas = 0; const f = memoizar(() => { chamadas++; return 0; }); f(5); f(5); return chamadas; })()`, expected: 1 },
      ],
    },
    {
      id: 'd09-compor',
      title: 'Linha de montagem (pipe)',
      topic: 'closures',
      difficulty: 3,
      prompt: '<p>Crie <code>pipe(...funcoes)</code> que retorna uma função que aplica as funções em sequência, da esquerda para a direita.</p><pre>const processar = pipe(x => x + 1, x => x * 2);\nprocessar(3); // (3 + 1) * 2 = 8</pre>',
      starter: `function pipe(...funcoes) {\n  \n}\n`,
      solution: `function pipe(...funcoes) {\n  return (valor) => funcoes.reduce((acc, fn) => fn(acc), valor);\n}`,
      hints: ['<code>...funcoes</code> junta todos os argumentos num array.', 'Percorra as funções passando o resultado de uma para a próxima (um laço ou <code>reduce</code>).'],
      tests: [
        { name: '(3 + 1) * 2', run: `pipe(x => x + 1, x => x * 2)(3)`, expected: 8 },
        { name: 'textos', run: `pipe(s => s.trim(), s => s.toUpperCase(), s => s + '!')('  oi ')`, expected: 'OI!' },
        { name: 'sem funções devolve o valor', run: `pipe()(7)`, expected: 7 },
      ],
    },
    {
      id: 'd09-conta',
      title: 'Conta bancária com closure',
      topic: 'closures',
      difficulty: 2,
      prompt: '<p>Crie <code>criarConta(saldoInicial)</code> que retorna <code>{ depositar(valor), sacar(valor), saldo() }</code>:</p><ul><li><code>depositar</code> soma e retorna o novo saldo</li><li><code>sacar</code> só desconta se houver saldo suficiente; retorna <code>true</code> se sacou e <code>false</code> se não</li><li>o saldo não pode ser acessado diretamente</li></ul>',
      starter: ``,
      solution: `function criarConta(saldoInicial = 0) {\n  let saldo = saldoInicial;\n  return {\n    depositar(valor) {\n      saldo += valor;\n      return saldo;\n    },\n    sacar(valor) {\n      if (valor > saldo) return false;\n      saldo -= valor;\n      return true;\n    },\n    saldo: () => saldo,\n  };\n}`,
      hints: ['Mesmo padrão do contador privado.'],
      tests: [
        { name: 'depositar', run: `criarConta(100).depositar(50)`, expected: 150 },
        { name: 'saque permitido', run: `(() => { const c = criarConta(100); return [c.sacar(30), c.saldo()]; })()`, expected: [true, 70] },
        { name: 'saque negado', run: `(() => { const c = criarConta(10); return [c.sacar(30), c.saldo()]; })()`, expected: [false, 10] },
      ],
    },
  ],
  quiz: [
    { q: 'O que é uma closure?', options: ['Um tipo de laço', 'Uma função que lembra das variáveis do escopo onde foi criada', 'Uma forma de fechar o programa', 'Um método de array'], answer: 1, explain: 'A função mantém acesso ao escopo léxico em que nasceu.' },
    { q: 'Em <code>const f = criarMultiplicador(3);</code>, o que é <code>f</code>?', options: ['O número 3', 'Uma função', 'Um objeto', 'undefined'], answer: 1, explain: 'criarMultiplicador retorna uma função.' },
    { q: 'Qual destes recebe um callback?', options: ['<code>Math.max</code>', '<code>array.forEach</code>', '<code>JSON.parse</code>', '<code>String</code>'], answer: 1, explain: 'forEach recebe uma função para executar em cada item.' },
    { q: 'Dois contadores criados com <code>criarContador()</code> compartilham a contagem?', options: ['Sim', 'Não, cada chamada cria um escopo novo'], answer: 1, explain: 'Cada execução da função externa cria novas variáveis locais.' },
  ],
  extra: 'Leia o arquivo <code>src/runner/sandbox.js</code> deste app (no GitHub). Encontre uma closure e um callback no código real.',
};
