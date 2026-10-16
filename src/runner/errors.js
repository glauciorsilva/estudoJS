// Traduz erros do JavaScript para explicações em português e classifica
// o tipo de erro (usado no painel "Onde estão minhas dificuldades").

const RULES = [
  {
    re: /^(\S+) is not defined$/,
    kind: 'variavel-inexistente',
    explain: (m) => `A variável ou função <code>${m[1]}</code> não existe neste ponto do código. Confira: (1) se o nome está escrito igual, incluindo maiúsculas/minúsculas; (2) se você declarou com <code>let</code>, <code>const</code> ou <code>function</code>; (3) se ela não foi declarada dentro de outro bloco <code>{ }</code>.`,
  },
  {
    re: /Cannot access '(\S+)' before initialization|can't access lexical declaration [`'](\S+)['`] before initialization/,
    kind: 'variavel-antes-de-declarar',
    explain: (m) => `Você usou <code>${m[1] || m[2]}</code> antes da linha em que ela é declarada com <code>let</code>/<code>const</code>. Mova a declaração para cima.`,
  },
  {
    re: /Assignment to constant variable|invalid assignment to const/,
    kind: 'const-reatribuida',
    explain: () => 'Você tentou trocar o valor de uma variável declarada com <code>const</code>. Use <code>let</code> se o valor precisa mudar.',
  },
  {
    re: /Identifier '(\S+)' has already been declared|redeclaration of (?:let|const) (\S+)/,
    kind: 'declaracao-duplicada',
    explain: (m) => `<code>${m[1] || m[2]}</code> foi declarada duas vezes. Declare só uma vez e depois apenas atribua (<code>x = ...</code>, sem <code>let</code>).`,
  },
  {
    re: /(\S+) is not a function/,
    kind: 'nao-e-funcao',
    explain: (m) => `<code>${m[1]}</code> não é uma função, mas foi chamada com <code>( )</code>. Confira o nome do método (ex.: <code>toUpperCase</code>, não <code>toUppercase</code>) e se o valor é do tipo que você imagina.`,
  },
  {
    re: /Cannot read propert(?:y|ies) of (undefined|null)(?: \(reading '(.+)'\))?|(\S+) is (undefined|null)$|can't access property "(.+)", (\S+) is (undefined|null)/,
    kind: 'propriedade-de-undefined',
    explain: (m) => {
      const valor = m[1] || m[4] || m[7] || 'undefined';
      const prop = m[2] || m[5];
      return `Você tentou acessar ${prop ? `<code>.${prop}</code>` : 'uma propriedade'} de algo que é <code>${valor}</code>. Algum valor não existe: um índice fora do array, uma propriedade com nome errado ou uma função que não retornou nada. Use <code>console.log</code> para inspecionar o valor antes dessa linha.`;
    },
  },
  {
    re: /Cannot set propert(?:y|ies) of (undefined|null)/,
    kind: 'propriedade-de-undefined',
    explain: (m) => `Você tentou atribuir uma propriedade em <code>${m[1]}</code>. O objeto que você esperava não existe.`,
  },
  {
    re: /Maximum call stack size exceeded|too much recursion/,
    kind: 'recursao-infinita',
    explain: () => 'Uma função chamou a si mesma sem parar (recursão infinita). Garanta que existe um caso base que encerra as chamadas.',
  },
  {
    re: /Invalid array length/,
    kind: 'valor-invalido',
    explain: () => 'Tamanho de array inválido (negativo ou não inteiro).',
  },
  {
    re: /Unexpected end of input|missing \} |expected expression, got end of script/,
    kind: 'sintaxe',
    explain: () => 'O código terminou antes do esperado: provavelmente falta fechar uma chave <code>}</code>, um parêntese <code>)</code> ou um colchete <code>]</code>.',
  },
  {
    re: /missing \) after argument list/,
    kind: 'sintaxe',
    explain: () => 'Falta fechar um parêntese <code>)</code> em uma chamada de função, ou falta uma vírgula entre os argumentos.',
  },
  {
    re: /Invalid or unexpected token|unterminated string literal|illegal character/,
    kind: 'sintaxe',
    explain: () => 'Há um caractere inválido: geralmente uma aspa que abriu e não fechou, ou aspas “curvas” copiadas de um texto. Use aspas retas: <code>\' "</code> ou <code>`</code>.',
  },
  {
    re: /Unexpected token '?(.+?)'?$|unexpected token: '?(.+?)'?$/,
    kind: 'sintaxe',
    explain: (m) => `O JavaScript encontrou <code>${m[1] || m[2]}</code> num lugar inesperado. Verifique vírgulas, parênteses e chaves por perto.`,
  },
  {
    re: /Unexpected identifier|unexpected identifier/,
    kind: 'sintaxe',
    explain: () => 'Uma palavra apareceu num lugar inesperado. Verifique se faltou um operador, uma vírgula, um ponto ou aspas.',
  },
  {
    re: /Unexpected string/,
    kind: 'sintaxe',
    explain: () => 'Um texto apareceu num lugar inesperado — geralmente falta um <code>+</code> ou uma vírgula entre valores.',
  },
  {
    re: /Illegal return statement|return not in function/,
    kind: 'sintaxe',
    explain: () => '<code>return</code> só pode ser usado dentro de funções.',
  },
  {
    re: /await is only valid|await is a reserved/,
    kind: 'async',
    explain: () => '<code>await</code> só pode ser usado dentro de funções <code>async</code>.',
  },
  {
    re: /Class constructor (\S+) cannot be invoked without 'new'/,
    kind: 'classes',
    explain: (m) => `Para criar um objeto da classe <code>${m[1]}</code> use <code>new ${m[1]}(...)</code>.`,
  },
  {
    re: /Must call super constructor|must call super constructor/,
    kind: 'classes',
    explain: () => 'Em uma classe filha (<code>extends</code>), chame <code>super(...)</code> no construtor antes de usar <code>this</code>.',
  },
  {
    re: /is not iterable/,
    kind: 'valor-invalido',
    explain: () => 'Você tentou percorrer (com <code>for...of</code> ou spread <code>...</code>) algo que não é uma lista. Para objetos, use <code>Object.keys</code>, <code>Object.values</code> ou <code>Object.entries</code>.',
  },
  {
    re: /JSON|Unexpected token .* in JSON|is not valid JSON/,
    kind: 'valor-invalido',
    explain: () => 'O texto passado para <code>JSON.parse</code> não é um JSON válido (chaves e textos precisam de aspas duplas).',
  },
];

export const ERROR_KIND_LABELS = {
  'variavel-inexistente': 'Variável/função inexistente (nome errado ou não declarada)',
  'variavel-antes-de-declarar': 'Uso de variável antes de declarar',
  'const-reatribuida': 'Reatribuir const',
  'declaracao-duplicada': 'Declarar a mesma variável duas vezes',
  'nao-e-funcao': 'Chamar algo que não é função',
  'propriedade-de-undefined': 'Acessar propriedade de undefined/null',
  'recursao-infinita': 'Recursão infinita',
  'loop-infinito': 'Loop infinito / código lento',
  sintaxe: 'Erro de sintaxe (parênteses, chaves, aspas)',
  async: 'Uso incorreto de async/await',
  classes: 'Erros com classes',
  'valor-invalido': 'Valor de tipo inesperado',
  'erro-lancado': 'Erro lançado pelo próprio código (throw)',
  'resultado-errado': 'Resultado diferente do esperado (lógica)',
  outro: 'Outros erros',
};

export function explainError(err) {
  if (!err) return null;
  const message = err.message || '';
  for (const rule of RULES) {
    const m = rule.re.exec(message);
    if (m) return { kind: rule.kind, html: rule.explain(m) };
  }
  if (err.name === 'SyntaxError') {
    return { kind: 'sintaxe', html: 'Erro de sintaxe: o código não segue as regras de escrita do JavaScript. Confira parênteses, chaves, vírgulas e aspas perto da linha indicada.' };
  }
  if (err.name === 'Error' || err.name === 'Erro') {
    return { kind: 'erro-lancado', html: 'Este erro foi lançado com <code>throw</code> pelo próprio código.' };
  }
  return { kind: 'outro', html: '' };
}
