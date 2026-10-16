export default {
  day: 13,
  title: 'JavaScript assíncrono: Promises e async/await',
  summary: 'Lidar com operações que demoram (rede, banco de dados, timers) sem travar o programa.',
  hours: 4,
  goals: [
    'Entender por que existe código assíncrono e o event loop',
    'Usar setTimeout e callbacks',
    'Criar e consumir Promises (then/catch/finally)',
    'Escrever código assíncrono legível com async/await e try/catch',
    'Buscar dados com fetch e executar requisições em paralelo com Promise.all',
  ],
  lesson: [
    {
      title: 'Por que assíncrono?',
      blocks: [
        { p: 'Buscar dados na internet ou no Firebase leva tempo. Se o JavaScript esperasse parado, a tela travaria. Em vez disso, ele <strong>agenda</strong> a continuação e segue executando o resto. Quando a resposta chega, o <em>event loop</em> executa a continuação.' },
        { code: `console.log('1. início');
setTimeout(() => console.log('3. depois de 500ms'), 500);
console.log('2. fim do código síncrono');`, run: true },
        { tip: 'Mesmo <code>setTimeout(fn, 0)</code> só executa depois que todo o código síncrono terminar.' },
      ],
    },
    {
      title: 'Promises',
      blocks: [
        { p: 'Uma <strong>Promise</strong> representa um valor que ainda vai existir. Ela pode ser <em>resolvida</em> (sucesso) ou <em>rejeitada</em> (erro).' },
        { code: `function sortear() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.random();
      if (n > 0.3) resolve(n);
      else reject(new Error('Azar!'));
    }, 300);
  });
}

sortear()
  .then(valor => console.log('Sucesso:', valor.toFixed(2)))
  .catch(erro => console.log('Falhou:', erro.message))
  .finally(() => console.log('Terminou'));`, run: true },
      ],
    },
    {
      title: 'async / await',
      blocks: [
        { p: '<code>await</code> “pausa” a função <code>async</code> até a Promise resolver, deixando o código com cara de síncrono. Erros viram exceções que você trata com <code>try/catch</code>.' },
        { code: `const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function preparar() {
  console.log('Fervendo água...');
  await esperar(300);
  console.log('Passando café...');
  await esperar(300);
  return 'Café pronto ☕';
}

preparar().then(msg => console.log(msg));`, run: true },
        { warn: 'Uma função <code>async</code> <strong>sempre</strong> retorna uma Promise. Quem chama precisa usar <code>await</code> ou <code>.then</code> para pegar o valor.' },
      ],
    },
    {
      title: 'fetch: buscando dados',
      blocks: [
        { p: 'Neste app, o <code>fetch</code> é simulado (funciona offline) com uma API de exemplo:</p><ul><li><code>https://api.exemplo.com/usuarios</code> e <code>/usuarios/1</code></li><li><code>https://api.exemplo.com/produtos</code> e <code>/produtos/1</code></li></ul><p>Qualquer outro recurso retorna status 404.' },
        { code: `async function carregar() {
  try {
    const resposta = await fetch('https://api.exemplo.com/usuarios/1');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    const usuario = await resposta.json();
    console.log(usuario);
  } catch (erro) {
    console.log('Erro:', erro.message);
  }
}
carregar();`, run: true },
      ],
    },
    {
      title: 'Em paralelo: Promise.all',
      blocks: [
        { code: `async function carregarTudo() {
  const [usuarios, produtos] = await Promise.all([
    fetch('https://api.exemplo.com/usuarios').then(r => r.json()),
    fetch('https://api.exemplo.com/produtos').then(r => r.json()),
  ]);
  console.log(usuarios.length, 'usuários e', produtos.length, 'produtos');
}
carregarTudo();`, run: true },
        { list: [
          '<code>Promise.all</code>: espera todas; falha se uma falhar.',
          '<code>Promise.allSettled</code>: espera todas e informa o status de cada uma.',
          '<code>Promise.race</code>: a primeira que terminar (sucesso ou erro) vence.',
        ] },
        { tip: 'É exatamente assim que você vai ler e gravar dados no Firestore: <code>await getDoc(...)</code>, <code>await setDoc(...)</code>.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'd13-esperar',
      title: 'Função esperar',
      topic: 'async',
      difficulty: 1,
      prompt: '<p>Crie <code>esperar(ms)</code> que retorna uma Promise resolvida depois de <code>ms</code> milissegundos.</p>',
      starter: `function esperar(ms) {\n  \n}\n`,
      solution: `function esperar(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}`,
      hints: ['<code>return new Promise(resolve => setTimeout(resolve, ms));</code>'],
      tests: [
        { name: 'retorna Promise', run: `esperar(1) instanceof Promise`, expected: true },
        { name: 'espera o tempo', run: `(async () => { const t = Date.now(); await esperar(120); return Date.now() - t >= 100; })()`, expected: true },
      ],
    },
    {
      id: 'd13-ordem',
      title: 'Ordem de execução',
      topic: 'async',
      difficulty: 1,
      prompt: '<p>Usando <code>setTimeout</code>, faça o console mostrar <code>A</code>, <code>C</code>, <code>B</code> (nesta ordem), mas escrevendo os <code>console.log</code> na ordem A, B, C no código.</p>',
      starter: `console.log('A');\nconsole.log('B');\nconsole.log('C');\n`,
      solution: `console.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');`,
      hints: ['Coloque o log do B dentro de um <code>setTimeout</code>.'],
      tests: [{ name: 'Saída A, C, B', logs: ['A', 'C', 'B'] }],
      checks: [
        { type: 'must', pattern: 'setTimeout', message: 'Usou setTimeout' },
        { type: 'must', pattern: "log\\(\\s*['\"`]A[\\s\\S]*log\\(\\s*['\"`]B[\\s\\S]*log\\(\\s*['\"`]C", message: 'Logs escritos na ordem A, B, C' },
      ],
    },
    {
      id: 'd13-nome-usuario',
      title: 'Buscar nome do usuário',
      topic: 'async',
      difficulty: 2,
      prompt: '<p>Crie <code>async function nomeDoUsuario(id)</code> que busca <code>https://api.exemplo.com/usuarios/{id}</code> e retorna o <code>nome</code>. Se a resposta não for <code>ok</code>, retorne <code>null</code>.</p>',
      starter: `async function nomeDoUsuario(id) {\n  \n}\n`,
      solution: "async function nomeDoUsuario(id) {\n  const resposta = await fetch(`https://api.exemplo.com/usuarios/${id}`);\n  if (!resposta.ok) return null;\n  const usuario = await resposta.json();\n  return usuario.nome;\n}",
      hints: ['<code>const resposta = await fetch(url);</code>', '<code>const dados = await resposta.json();</code>', 'Verifique <code>resposta.ok</code> antes.'],
      tests: [
        { name: 'id 1 → "Ana"', run: `nomeDoUsuario(1)`, expected: 'Ana' },
        { name: 'id 3 → "Carla"', run: `nomeDoUsuario(3)`, expected: 'Carla' },
        { name: 'id 99 → null', run: `nomeDoUsuario(99)`, expected: null },
      ],
      checks: [{ type: 'must', pattern: 'await', message: 'Usou await' }],
    },
    {
      id: 'd13-rejeitar',
      title: 'Promise que falha',
      topic: 'async',
      difficulty: 2,
      prompt: '<p>Crie <code>dividirDepois(a, b)</code> que retorna uma Promise: após 50ms, resolve com <code>a / b</code>, ou rejeita com <code>new Error(\'Divisão por zero\')</code> se <code>b</code> for 0.</p>',
      starter: `function dividirDepois(a, b) {\n  return new Promise((resolve, reject) => {\n    \n  });\n}\n`,
      solution: `function dividirDepois(a, b) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (b === 0) reject(new Error('Divisão por zero'));\n      else resolve(a / b);\n    }, 50);\n  });\n}`,
      hints: ['Dentro do <code>setTimeout</code>, chame <code>reject(...)</code> ou <code>resolve(...)</code>.'],
      tests: [
        { name: 'resolve 10 / 4', run: `dividirDepois(10, 4)`, expected: 2.5 },
        { name: 'rejeita divisão por zero', run: `dividirDepois(1, 0).then(() => 'resolveu', e => e.message)`, expected: 'Divisão por zero' },
      ],
    },
    {
      id: 'd13-ativos',
      title: 'Usuários ativos',
      topic: 'async',
      difficulty: 2,
      prompt: '<p>Crie <code>async function nomesAtivos()</code> que busca <code>https://api.exemplo.com/usuarios</code> e retorna os nomes dos usuários com <code>ativo: true</code>.</p>',
      starter: ``,
      solution: `async function nomesAtivos() {\n  const resposta = await fetch('https://api.exemplo.com/usuarios');\n  const usuarios = await resposta.json();\n  return usuarios.filter(u => u.ativo).map(u => u.nome);\n}`,
      hints: ['Busque, converta com <code>.json()</code> e use <code>filter</code> + <code>map</code> (dia 8!).'],
      tests: [{ name: 'Ana e Carla', run: `nomesAtivos()`, expected: ['Ana', 'Carla'] }],
    },
    {
      id: 'd13-produto-seguro',
      title: 'Tratamento de erros com await',
      topic: 'async',
      difficulty: 2,
      prompt: '<p>Crie <code>async function buscarProduto(id)</code> que retorna o produto de <code>https://api.exemplo.com/produtos/{id}</code>. Deve retornar <code>null</code> se o status não for ok <strong>ou</strong> se o fetch lançar um erro (use try/catch).</p><p>Dica: <code>fetch(\'https://url-invalida\')</code> lança erro no simulador.</p>',
      starter: ``,
      solution: "async function buscarProduto(id) {\n  try {\n    const r = await fetch(`https://api.exemplo.com/produtos/${id}`);\n    if (!r.ok) return null;\n    return await r.json();\n  } catch {\n    return null;\n  }\n}",
      hints: ['Envolva tudo em <code>try { ... } catch { return null; }</code>.'],
      tests: [
        { name: 'produto 2', run: `buscarProduto(2)`, expected: { id: 2, nome: 'Mouse', preco: 80 } },
        { name: 'inexistente → null', run: `buscarProduto(50)`, expected: null },
        { name: 'id inválido (erro de rede) → null', run: `buscarProduto('abc')`, expected: null },
      ],
    },
    {
      id: 'd13-paralelo',
      title: 'Requisições em paralelo',
      topic: 'async',
      difficulty: 3,
      prompt: '<p>Crie <code>async function somaDosPrecos(ids)</code> que busca todos os produtos <strong>em paralelo</strong> (com <code>Promise.all</code>) e retorna a soma dos preços.</p>',
      starter: ``,
      solution: "async function somaDosPrecos(ids) {\n  const produtos = await Promise.all(\n    ids.map(id => fetch(`https://api.exemplo.com/produtos/${id}`).then(r => r.json()))\n  );\n  return produtos.reduce((s, p) => s + p.preco, 0);\n}",
      hints: ['<code>ids.map(id => fetch(...).then(r => r.json()))</code> cria um array de Promises.', '<code>await Promise.all(arrayDePromises)</code> devolve um array de resultados.'],
      tests: [
        { name: 'ids 1 e 3 → 1050', run: `somaDosPrecos([1, 3])`, expected: 1050 },
        { name: 'todos → 1130', run: `somaDosPrecos([1, 2, 3])`, expected: 1130 },
        { name: 'vazio → 0', run: `somaDosPrecos([])`, expected: 0 },
      ],
      checks: [{ type: 'must', pattern: 'Promise\\.all', message: 'Usou Promise.all' }],
    },
    {
      id: 'd13-timeout',
      title: 'Limite de tempo (Promise.race)',
      topic: 'async',
      difficulty: 3,
      prompt: '<p>Crie <code>comLimite(promise, ms)</code> que retorna uma Promise que resolve com o resultado de <code>promise</code>, ou rejeita com <code>new Error(\'Tempo esgotado\')</code> se demorar mais que <code>ms</code>.</p>',
      starter: ``,
      solution: `function comLimite(promise, ms) {\n  const limite = new Promise((_, reject) => {\n    setTimeout(() => reject(new Error('Tempo esgotado')), ms);\n  });\n  return Promise.race([promise, limite]);\n}`,
      hints: ['Crie uma segunda Promise que só rejeita depois de <code>ms</code>.', '<code>Promise.race([a, b])</code> fica com a que terminar primeiro.'],
      tests: [
        { name: 'rápida resolve', run: `comLimite(new Promise(r => setTimeout(() => r('ok'), 20)), 200)`, expected: 'ok' },
        { name: 'lenta rejeita', run: `comLimite(new Promise(r => setTimeout(() => r('ok'), 300)), 50).catch(e => e.message)`, expected: 'Tempo esgotado' },
      ],
    },
    {
      id: 'd13-retry',
      title: 'Tentar novamente',
      topic: 'async',
      difficulty: 3,
      prompt: '<p>Crie <code>async function tentarAte(fn, tentativas)</code> que chama a função assíncrona <code>fn()</code> até ela dar certo, no máximo <code>tentativas</code> vezes. Retorne o resultado do primeiro sucesso; se todas falharem, lance o último erro.</p>',
      starter: ``,
      solution: `async function tentarAte(fn, tentativas) {\n  let ultimoErro;\n  for (let i = 0; i < tentativas; i++) {\n    try {\n      return await fn();\n    } catch (e) {\n      ultimoErro = e;\n    }\n  }\n  throw ultimoErro;\n}`,
      hints: ['Um laço for com try/catch dentro.', 'Use <code>return await fn()</code> dentro do try para capturar a rejeição.'],
      tests: [
        { name: 'sucesso na 3ª tentativa', run: `(async () => { let n = 0; const r = await tentarAte(async () => { n++; if (n < 3) throw new Error('falhou'); return 'ok ' + n; }, 5); return r; })()`, expected: 'ok 3' },
        { name: 'esgota tentativas', run: `(async () => { let n = 0; try { await tentarAte(async () => { n++; throw new Error('erro ' + n); }, 2); } catch (e) { return [e.message, n]; } })()`, expected: ['erro 2', 2] },
      ],
    },
  ],
  quiz: [
    { q: 'O que este código imprime? <code>console.log(1); setTimeout(() => console.log(2), 0); console.log(3);</code>', options: ['1 2 3', '1 3 2', '2 1 3', '3 2 1'], answer: 1, explain: 'O callback do setTimeout só roda depois do código síncrono.' },
    { q: 'O que uma função <code>async</code> sempre retorna?', options: ['undefined', 'Uma Promise', 'Um callback', 'O valor diretamente'], answer: 1, explain: 'Mesmo com <code>return 5</code>, o retorno é uma Promise que resolve com 5.' },
    { q: 'Como tratar erro em <code>await fetch(...)</code>?', options: ['Com if', 'Com try/catch', 'Não é possível', 'Com switch'], answer: 1, explain: 'Rejeições viram exceções dentro de funções async.' },
    { q: 'Para fazer 3 requisições ao mesmo tempo e esperar todas:', options: ['3 awaits seguidos', 'Promise.all', 'setTimeout', 'for...of'], answer: 1, explain: 'awaits seguidos executam em sequência (mais lento).' },
    { q: 'Qual propriedade da resposta do fetch indica sucesso (status 200–299)?', options: ['response.success', 'response.ok', 'response.done', 'response.valid'], answer: 1, explain: 'fetch só rejeita em erro de rede; 404/500 chegam como resposta com ok = false.' },
  ],
  extra: 'No navegador, abra o console e rode <code>await (await fetch(\'https://api.github.com/users/github\')).json()</code>. Você acabou de consumir uma API real!',
};
