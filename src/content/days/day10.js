export default {
  day: 10,
  title: 'Classes e Programação Orientada a Objetos',
  summary: 'Criar “moldes” de objetos com class, encapsular dados, usar herança e polimorfismo.',
  hours: 3.5,
  goals: [
    'Criar classes com constructor e métodos',
    'Usar getters, setters e métodos estáticos',
    'Proteger dados com campos privados (#)',
    'Reaproveitar código com herança (extends/super)',
    'Aplicar polimorfismo',
  ],
  lesson: [
    {
      title: 'Classe = molde, objeto = instância',
      blocks: [
        { code: `class Produto {
  constructor(nome, preco) {
    this.nome = nome;     // propriedades da instância
    this.preco = preco;
  }

  aplicarDesconto(percentual) {
    this.preco = this.preco * (1 - percentual / 100);
    return this.preco;
  }

  descrever() {
    return \`\${this.nome}: R$ \${this.preco.toFixed(2)}\`;
  }
}

const caneca = new Produto('Caneca', 40);
caneca.aplicarDesconto(10);
console.log(caneca.descrever());
console.log(caneca instanceof Produto); // true`, run: true },
        { p: 'O <code>constructor</code> roda quando usamos <code>new</code>. <code>this</code> é a instância sendo criada.' },
      ],
    },
    {
      title: 'Getters, setters e static',
      blocks: [
        { code: `class Temperatura {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {              // acessado como propriedade
    return this.celsius * 9 / 5 + 32;
  }
  set fahrenheit(f) {
    this.celsius = (f - 32) * 5 / 9;
  }
  static deKelvin(k) {            // chamado na classe, não na instância
    return new Temperatura(k - 273.15);
  }
}
const t = new Temperatura(100);
console.log(t.fahrenheit);   // 212 (sem parênteses!)
t.fahrenheit = 32;
console.log(t.celsius);      // 0
console.log(Temperatura.deKelvin(273.15).celsius); // 0`, run: true },
      ],
    },
    {
      title: 'Campos privados (#)',
      blocks: [
        { code: `class Cofre {
  #segredo;                  // só acessível dentro da classe
  constructor(segredo) {
    this.#segredo = segredo;
  }
  revelar(senha) {
    return senha === 1234 ? this.#segredo : 'Acesso negado';
  }
}
const c = new Cofre('tesouro');
console.log(c.revelar(1), c.revelar(1234));
console.log(c.segredo); // undefined`, run: true },
      ],
    },
    {
      title: 'Herança',
      blocks: [
        { code: `class Animal {
  constructor(nome) {
    this.nome = nome;
  }
  falar() {
    return \`\${this.nome} faz um som\`;
  }
}

class Gato extends Animal {
  constructor(nome, cor) {
    super(nome);           // chama o constructor de Animal
    this.cor = cor;
  }
  falar() {                // sobrescreve
    return \`\${this.nome} faz miau\`;
  }
}

const bichos = [new Animal('Genérico'), new Gato('Mimi', 'preto')];
for (const b of bichos) console.log(b.falar()); // polimorfismo`, run: true },
        { tip: '<strong>Polimorfismo</strong>: o mesmo método (<code>falar</code>) se comporta de forma diferente conforme a classe. Quem chama não precisa saber qual é o tipo.' },
        { warn: 'Prefira composição (objetos que usam outros objetos) a hierarquias profundas de herança. 1 ou 2 níveis costuma bastar.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'd10-retangulo',
      title: 'Classe Retângulo',
      topic: 'classes',
      difficulty: 1,
      prompt: '<p>Crie a classe <code>Retangulo</code> com <code>constructor(largura, altura)</code> e os métodos <code>area()</code> e <code>perimetro()</code>. Adicione também o método <code>ehQuadrado()</code>.</p>',
      starter: `class Retangulo {\n  constructor(largura, altura) {\n    \n  }\n}\n`,
      solution: `class Retangulo {\n  constructor(largura, altura) {\n    this.largura = largura;\n    this.altura = altura;\n  }\n  area() {\n    return this.largura * this.altura;\n  }\n  perimetro() {\n    return 2 * (this.largura + this.altura);\n  }\n  ehQuadrado() {\n    return this.largura === this.altura;\n  }\n}`,
      hints: ['Guarde os valores em <code>this.largura</code> e <code>this.altura</code>.'],
      tests: [
        { name: 'area', run: `new Retangulo(3, 4).area()`, expected: 12 },
        { name: 'perimetro', run: `new Retangulo(3, 4).perimetro()`, expected: 14 },
        { name: 'ehQuadrado false', run: `new Retangulo(3, 4).ehQuadrado()`, expected: false },
        { name: 'ehQuadrado true', run: `new Retangulo(5, 5).ehQuadrado()`, expected: true },
      ],
    },
    {
      id: 'd10-conta',
      title: 'Conta bancária com #saldo',
      topic: 'classes',
      difficulty: 2,
      prompt: '<p>Crie a classe <code>ContaBancaria</code>:</p><ul><li><code>constructor(titular, saldoInicial = 0)</code></li><li>campo privado <code>#saldo</code></li><li><code>get saldo</code> para leitura</li><li><code>depositar(valor)</code>: ignora valores ≤ 0; retorna o saldo</li><li><code>sacar(valor)</code>: retorna <code>false</code> se não houver saldo; senão desconta e retorna <code>true</code></li></ul>',
      starter: `class ContaBancaria {\n  \n}\n`,
      solution: `class ContaBancaria {\n  #saldo;\n  constructor(titular, saldoInicial = 0) {\n    this.titular = titular;\n    this.#saldo = saldoInicial;\n  }\n  get saldo() {\n    return this.#saldo;\n  }\n  depositar(valor) {\n    if (valor > 0) this.#saldo += valor;\n    return this.#saldo;\n  }\n  sacar(valor) {\n    if (valor > this.#saldo) return false;\n    this.#saldo -= valor;\n    return true;\n  }\n}`,
      hints: ['Declare <code>#saldo;</code> no topo da classe.', 'Getter: <code>get saldo() { return this.#saldo; }</code>'],
      tests: [
        { name: 'deposita', run: `(() => { const c = new ContaBancaria('Ana', 100); c.depositar(50); return c.saldo; })()`, expected: 150 },
        { name: 'ignora depósito negativo', run: `new ContaBancaria('Ana', 10).depositar(-5)`, expected: 10 },
        { name: 'saque', run: `(() => { const c = new ContaBancaria('Ana', 100); return [c.sacar(30), c.sacar(500), c.saldo]; })()`, expected: [true, false, 70] },
        { name: 'saldo não pode ser alterado por fora', run: `(() => { const c = new ContaBancaria('Ana', 100); try { c.saldo = 1e9; } catch (e) {} return c.saldo; })()`, expected: 100 },
      ],
      checks: [{ type: 'must', pattern: '#saldo', message: 'Usou campo privado #saldo' }],
    },
    {
      id: 'd10-heranca',
      title: 'Herança: Funcionário e Gerente',
      topic: 'classes',
      difficulty: 2,
      prompt: '<p>Crie <code>Funcionario</code> com <code>constructor(nome, salario)</code> e o método <code>bonus()</code> que retorna 10% do salário. Depois crie <code>Gerente extends Funcionario</code> cujo <code>bonus()</code> é 20% do salário + 500. Ambos devem ter <code>resumo()</code> retornando <code>\'Ana: bônus de 300\'</code>, definido <strong>só</strong> em Funcionario.</p>',
      starter: `class Funcionario {\n  \n}\n\nclass Gerente extends Funcionario {\n  \n}\n`,
      solution: "class Funcionario {\n  constructor(nome, salario) {\n    this.nome = nome;\n    this.salario = salario;\n  }\n  bonus() {\n    return this.salario * 0.1;\n  }\n  resumo() {\n    return `${this.nome}: bônus de ${this.bonus()}`;\n  }\n}\n\nclass Gerente extends Funcionario {\n  bonus() {\n    return this.salario * 0.2 + 500;\n  }\n}",
      hints: ['Gerente não precisa de constructor próprio se não tiver propriedades novas.', '<code>resumo()</code> chama <code>this.bonus()</code>: para um Gerente, será o bonus do Gerente (polimorfismo).'],
      tests: [
        { name: 'bonus do funcionário', run: `new Funcionario('Ana', 3000).bonus()`, expected: 300 },
        { name: 'bonus do gerente', run: `new Gerente('Bia', 5000).bonus()`, expected: 1500 },
        { name: 'resumo do gerente usa o bonus dele', run: `new Gerente('Bia', 5000).resumo()`, expected: 'Bia: bônus de 1500' },
        { name: 'Gerente é um Funcionario', run: `new Gerente('Bia', 1) instanceof Funcionario`, expected: true },
      ],
    },
    {
      id: 'd10-static',
      title: 'Conversor com métodos estáticos',
      topic: 'classes',
      difficulty: 1,
      prompt: '<p>Crie a classe <code>Conversor</code> com os métodos <strong>estáticos</strong> <code>kmParaMilhas(km)</code> (km × 0.621371, arredondado para 2 casas) e <code>milhasParaKm(mi)</code> (mi ÷ 0.621371, arredondado para 2 casas).</p>',
      starter: `class Conversor {\n  \n}\n`,
      solution: `class Conversor {\n  static kmParaMilhas(km) {\n    return Math.round(km * 0.621371 * 100) / 100;\n  }\n  static milhasParaKm(mi) {\n    return Math.round((mi / 0.621371) * 100) / 100;\n  }\n}`,
      hints: ['<code>static nome() { }</code> e chame com <code>Conversor.nome()</code>.'],
      tests: [
        { name: '10 km', run: `Conversor.kmParaMilhas(10)`, expected: 6.21 },
        { name: '26.2 mi', run: `Conversor.milhasParaKm(26.2)`, expected: 42.16 },
      ],
      checks: [{ type: 'must', pattern: 'static', message: 'Usou static' }],
    },
    {
      id: 'd10-carrinho',
      title: 'Carrinho de compras',
      topic: 'classes',
      difficulty: 2,
      prompt: '<p>Crie a classe <code>Carrinho</code> com:</p><ul><li><code>itens</code>: array começando vazio</li><li><code>adicionar(nome, preco, qtd = 1)</code>: se o produto já existir, soma a quantidade</li><li><code>remover(nome)</code></li><li><code>get total</code>: soma preço × qtd</li><li><code>get quantidade</code>: soma das quantidades</li></ul>',
      starter: `class Carrinho {\n  constructor() {\n    this.itens = [];\n  }\n}\n`,
      solution: `class Carrinho {\n  constructor() {\n    this.itens = [];\n  }\n  adicionar(nome, preco, qtd = 1) {\n    const existente = this.itens.find(i => i.nome === nome);\n    if (existente) existente.qtd += qtd;\n    else this.itens.push({ nome, preco, qtd });\n  }\n  remover(nome) {\n    this.itens = this.itens.filter(i => i.nome !== nome);\n  }\n  get total() {\n    return this.itens.reduce((s, i) => s + i.preco * i.qtd, 0);\n  }\n  get quantidade() {\n    return this.itens.reduce((s, i) => s + i.qtd, 0);\n  }\n}`,
      hints: ['Use <code>find</code> para ver se o item já existe.', 'Para remover, reatribua <code>this.itens</code> com um <code>filter</code>.', 'Getters com <code>reduce</code>.'],
      tests: [
        { name: 'total e quantidade', run: `(() => { const c = new Carrinho(); c.adicionar('Café', 20, 2); c.adicionar('Pão', 1); return [c.total, c.quantidade]; })()`, expected: [41, 3] },
        { name: 'soma quantidade de item repetido', run: `(() => { const c = new Carrinho(); c.adicionar('Café', 20); c.adicionar('Café', 20, 2); return [c.itens.length, c.quantidade]; })()`, expected: [1, 3] },
        { name: 'remover', run: `(() => { const c = new Carrinho(); c.adicionar('A', 5); c.adicionar('B', 7); c.remover('A'); return c.total; })()`, expected: 7 },
      ],
    },
    {
      id: 'd10-pilha',
      title: 'Estrutura de dados: Pilha',
      topic: 'classes',
      difficulty: 2,
      prompt: '<p>Uma pilha funciona como uma pilha de pratos: o último que entra é o primeiro que sai. Crie a classe <code>Pilha</code> com <code>empilhar(item)</code>, <code>desempilhar()</code> (retorna o item ou <code>undefined</code>), <code>topo()</code> (olha sem remover), <code>get tamanho</code> e <code>estaVazia()</code>. Os itens devem ficar num campo privado.</p>',
      starter: `class Pilha {\n  #itens = [];\n}\n`,
      solution: `class Pilha {\n  #itens = [];\n  empilhar(item) {\n    this.#itens.push(item);\n  }\n  desempilhar() {\n    return this.#itens.pop();\n  }\n  topo() {\n    return this.#itens[this.#itens.length - 1];\n  }\n  get tamanho() {\n    return this.#itens.length;\n  }\n  estaVazia() {\n    return this.#itens.length === 0;\n  }\n}`,
      hints: ['<code>push</code> e <code>pop</code> já fazem exatamente o comportamento de pilha.'],
      tests: [
        { name: 'LIFO', run: `(() => { const p = new Pilha(); p.empilhar(1); p.empilhar(2); return [p.desempilhar(), p.desempilhar(), p.desempilhar()]; })()`, expected: [2, 1, undefined] },
        { name: 'topo não remove', run: `(() => { const p = new Pilha(); p.empilhar('a'); return [p.topo(), p.tamanho]; })()`, expected: ['a', 1] },
        { name: 'estaVazia', run: `(() => { const p = new Pilha(); const antes = p.estaVazia(); p.empilhar(1); return [antes, p.estaVazia()]; })()`, expected: [true, false] },
      ],
    },
    {
      id: 'd10-formas',
      title: 'Polimorfismo com formas',
      topic: 'classes',
      difficulty: 3,
      prompt: '<p>Crie as classes <code>Circulo(raio)</code> e <code>Quadrado(lado)</code>, ambas estendendo <code>Forma</code> (já pronta), cada uma com seu método <code>area()</code>. Depois crie a função <code>somaDasAreas(formas)</code> que soma as áreas, arredondando o total para 2 casas decimais.</p>',
      starter: `class Forma {\n  area() {\n    throw new Error('Implemente area() na classe filha');\n  }\n}\n\n// crie Circulo e Quadrado\n\nfunction somaDasAreas(formas) {\n  \n}\n`,
      solution: `class Forma {\n  area() {\n    throw new Error('Implemente area() na classe filha');\n  }\n}\n\nclass Circulo extends Forma {\n  constructor(raio) {\n    super();\n    this.raio = raio;\n  }\n  area() {\n    return Math.PI * this.raio ** 2;\n  }\n}\n\nclass Quadrado extends Forma {\n  constructor(lado) {\n    super();\n    this.lado = lado;\n  }\n  area() {\n    return this.lado ** 2;\n  }\n}\n\nfunction somaDasAreas(formas) {\n  const total = formas.reduce((s, f) => s + f.area(), 0);\n  return Math.round(total * 100) / 100;\n}`,
      hints: ['Em classes filhas com constructor, chame <code>super()</code> antes de usar <code>this</code>.', 'Área do círculo: <code>Math.PI * raio ** 2</code>.'],
      tests: [
        { name: 'área do quadrado', run: `new Quadrado(3).area()`, expected: 9 },
        { name: 'área do círculo', run: `Math.round(new Circulo(1).area() * 100) / 100`, expected: 3.14 },
        { name: 'herdam de Forma', run: `new Circulo(1) instanceof Forma && new Quadrado(1) instanceof Forma`, expected: true },
        { name: 'soma das áreas', run: `somaDasAreas([new Quadrado(2), new Circulo(1), new Quadrado(1)])`, expected: 8.14 },
      ],
    },
    {
      id: 'd10-get-set',
      title: 'Getter e setter de nome completo',
      topic: 'classes',
      difficulty: 2,
      prompt: '<p>Crie a classe <code>Pessoa</code> com <code>constructor(nome, sobrenome)</code>, um <code>get nomeCompleto</code> que retorna <code>\'Ada Lovelace\'</code> e um <code>set nomeCompleto(valor)</code> que separa o texto no primeiro espaço e atualiza <code>nome</code> e <code>sobrenome</code> (o sobrenome pode ter várias palavras).</p>',
      starter: ``,
      solution: "class Pessoa {\n  constructor(nome, sobrenome) {\n    this.nome = nome;\n    this.sobrenome = sobrenome;\n  }\n  get nomeCompleto() {\n    return `${this.nome} ${this.sobrenome}`;\n  }\n  set nomeCompleto(valor) {\n    const [nome, ...resto] = valor.split(' ');\n    this.nome = nome;\n    this.sobrenome = resto.join(' ');\n  }\n}",
      hints: ['<code>const [primeiro, ...resto] = texto.split(\' \');</code>'],
      tests: [
        { name: 'get', run: `new Pessoa('Ada', 'Lovelace').nomeCompleto`, expected: 'Ada Lovelace' },
        { name: 'set', run: `(() => { const p = new Pessoa('a', 'b'); p.nomeCompleto = 'Grace Brewster Hopper'; return [p.nome, p.sobrenome]; })()`, expected: ['Grace', 'Brewster Hopper'] },
      ],
    },
  ],
  quiz: [
    { q: 'Qual palavra cria uma instância de uma classe?', options: ['class', 'new', 'this', 'extends'], answer: 1, explain: '<code>new Classe()</code> executa o constructor e retorna o objeto.' },
    { q: 'Em uma classe filha com constructor, o que deve ser chamado antes de usar <code>this</code>?', options: ['this()', 'super()', 'parent()', 'new()'], answer: 1, explain: 'super() executa o constructor da classe pai.' },
    { q: 'Como acessar um getter <code>get total()</code>?', options: ['<code>obj.total()</code>', '<code>obj.total</code>', '<code>obj.getTotal()</code>', '<code>obj[total]()</code>'], answer: 1, explain: 'Getters são lidos como propriedades, sem parênteses.' },
    { q: 'Um método <code>static</code> é chamado:', options: ['Na instância', 'Na própria classe', 'Apenas no constructor', 'Nunca'], answer: 1, explain: 'Ex.: <code>Math.max</code> e <code>Array.isArray</code> são estáticos.' },
    { q: 'O que <code>#</code> antes do nome de um campo significa?', options: ['Comentário', 'Campo privado', 'Campo estático', 'Número'], answer: 1, explain: 'Campos com # só podem ser acessados dentro da classe.' },
  ],
  extra: 'Modele com classes um sistema pequeno do seu interesse (ex.: biblioteca com Livro e Emprestimo). Desenhe as classes antes de codar.',
};
