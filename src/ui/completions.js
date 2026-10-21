// Autocompletar do editor, em português e focado no que a trilha ensina.
// - Ao digitar uma palavra: sugere variáveis do seu código, palavras-chave, objetos globais e modelos prontos.
// - Depois de um ponto (ex.: "lista."): sugere os métodos mais usados daquele objeto.
// - Ctrl+Espaço (ou o botão 💡 da barra de símbolos) mostra sugestões mesmo sem ter digitado nada.
import { snippetCompletion as modelo, completeFromList, ifNotIn } from '@codemirror/autocomplete';
import { localCompletionSource } from '@codemirror/lang-javascript';

const m = (label, detail, info, type = 'method') => ({ label, detail, info, type });
const p = (label, detail, info) => ({ label, detail, info, type: 'property' });

// Membros de objetos globais conhecidos
const MEMBROS = {
  console: [
    m('log', '(valores)', 'Mostra valores no console.'),
    m('error', '(valores)', 'Mostra uma mensagem de erro no console.'),
    m('warn', '(valores)', 'Mostra um aviso no console.'),
    m('table', '(dados)', 'Mostra um array ou objeto em forma de tabela.'),
  ],
  Math: [
    m('round', '(n)', 'Arredonda para o inteiro mais próximo.'),
    m('floor', '(n)', 'Arredonda para baixo.'),
    m('ceil', '(n)', 'Arredonda para cima.'),
    m('random', '()', 'Número aleatório entre 0 (incluso) e 1 (não incluso).'),
    m('max', '(a, b, ...)', 'Maior valor.'),
    m('min', '(a, b, ...)', 'Menor valor.'),
    m('abs', '(n)', 'Valor absoluto (sem sinal).'),
    m('sqrt', '(n)', 'Raiz quadrada.'),
    m('pow', '(base, expoente)', 'Potência (o mesmo que base ** expoente).'),
    p('PI', 'número', '3.14159…'),
  ],
  JSON: [
    m('stringify', '(valor)', 'Converte um valor em texto JSON.'),
    m('parse', '(texto)', 'Converte um texto JSON de volta em valor.'),
  ],
  Object: [
    m('keys', '(obj)', 'Array com as chaves do objeto.'),
    m('values', '(obj)', 'Array com os valores do objeto.'),
    m('entries', '(obj)', 'Array de pares [chave, valor].'),
    m('assign', '(destino, ...origens)', 'Copia propriedades para o destino.'),
    m('freeze', '(obj)', 'Impede alterações no objeto.'),
  ],
  Array: [
    m('isArray', '(valor)', 'true se o valor for um array.'),
    m('from', '(algo)', 'Cria um array a partir de texto, Set, Map ou { length: n }.'),
  ],
  Number: [
    m('isNaN', '(valor)', 'true se o valor for NaN.'),
    m('isInteger', '(valor)', 'true se for um número inteiro.'),
    m('parseFloat', '(texto)', 'Converte texto em número com casas decimais.'),
    m('parseInt', '(texto)', 'Converte texto em número inteiro.'),
  ],
  Promise: [
    m('all', '([promessas])', 'Espera todas; falha se uma falhar.'),
    m('allSettled', '([promessas])', 'Espera todas e informa o resultado de cada uma.'),
    m('race', '([promessas])', 'Fica com a primeira que terminar.'),
    m('resolve', '(valor)', 'Promise já resolvida com o valor.'),
    m('reject', '(erro)', 'Promise já rejeitada com o erro.'),
  ],
  document: [
    m('querySelector', "('seletor')", 'Primeiro elemento que combina com o seletor CSS.'),
    m('querySelectorAll', "('seletor')", 'Todos os elementos que combinam com o seletor.'),
    m('getElementById', "('id')", 'Elemento pelo id (sem #).'),
    m('createElement', "('tag')", 'Cria um novo elemento, ex.: li, div, p.'),
    p('body', 'elemento', 'O <body> da página.'),
  ],
};

// Depois de "qualquerCoisa.": métodos de array, texto, número, elementos e Promises
const GENERICOS = [
  p('length', 'número', 'Quantidade de itens (array) ou de caracteres (texto).'),
  // arrays
  m('push', '(item)', 'Array: adiciona no fim.'),
  m('pop', '()', 'Array: remove e devolve o último.'),
  m('shift', '()', 'Array: remove e devolve o primeiro.'),
  m('unshift', '(item)', 'Array: adiciona no início.'),
  m('map', '(item => novo)', 'Array: cria um array novo transformando cada item.'),
  m('filter', '(item => condição)', 'Array: cria um array só com os itens que passam na condição.'),
  m('reduce', '((acc, item) => ..., inicial)', 'Array: reduz a lista a um único valor (ex.: soma).'),
  m('forEach', '(item => ...)', 'Array: executa uma função para cada item.'),
  m('find', '(item => condição)', 'Array: primeiro item que passa na condição (ou undefined).'),
  m('findIndex', '(item => condição)', 'Array: posição do primeiro item que passa (ou -1).'),
  m('some', '(item => condição)', 'Array: true se pelo menos um item passar.'),
  m('every', '(item => condição)', 'Array: true se todos passarem.'),
  m('sort', '((a, b) => a - b)', 'Array: ordena (altera o original!). Use (a, b) => a - b para números.'),
  m('reverse', '()', 'Array: inverte a ordem (altera o original).'),
  m('join', "(', ')", 'Array: junta os itens num texto.'),
  m('indexOf', '(valor)', 'Posição do valor (ou -1).'),
  m('includes', '(valor)', 'true se contém o valor (arrays e textos).'),
  m('slice', '(início, fim)', 'Copia um trecho (arrays e textos), sem alterar o original.'),
  m('splice', '(início, quantos)', 'Array: remove/insere itens (altera o original).'),
  m('concat', '(outro)', 'Junta arrays ou textos.'),
  m('flat', '()', 'Array: “achata” um nível de arrays aninhados.'),
  // textos
  m('toUpperCase', '()', 'Texto: tudo maiúsculo.'),
  m('toLowerCase', '()', 'Texto: tudo minúsculo.'),
  m('trim', '()', 'Texto: remove espaços das pontas.'),
  m('split', "(' ')", 'Texto: divide num array usando o separador.'),
  m('replace', "('de', 'para')", 'Texto: troca a primeira ocorrência.'),
  m('replaceAll', "('de', 'para')", 'Texto: troca todas as ocorrências.'),
  m('startsWith', "('início')", 'Texto: true se começa com…'),
  m('endsWith', "('fim')", 'Texto: true se termina com…'),
  m('padStart', "(tamanho, '0')", 'Texto: completa à esquerda até o tamanho.'),
  m('repeat', '(n)', 'Texto: repete n vezes.'),
  m('charAt', '(posição)', 'Texto: caractere na posição.'),
  // números
  m('toFixed', '(casas)', 'Número: texto com casas decimais fixas.'),
  m('toString', '()', 'Converte para texto.'),
  // Map e Set
  m('get', '(chave)', 'Map: valor da chave.'),
  m('set', '(chave, valor)', 'Map: guarda um valor.'),
  m('has', '(valor)', 'Map/Set: true se existe.'),
  m('add', '(valor)', 'Set: adiciona um valor.'),
  m('delete', '(chave)', 'Map/Set: remove.'),
  p('size', 'número', 'Map/Set: quantidade de itens.'),
  // DOM
  p('textContent', 'texto', 'Elemento: texto de dentro.'),
  p('value', 'texto', 'Campo de formulário: o que foi digitado.'),
  p('classList', 'lista de classes', 'Elemento: use .add, .remove e .toggle.'),
  m('toggle', "('classe')", 'classList: liga/desliga uma classe.'),
  m('addEventListener', "('click', e => ...)", 'Elemento: executa uma função quando o evento acontece.'),
  m('append', '(filho)', 'Elemento: adiciona um filho no fim.'),
  m('remove', '()', 'Elemento: remove da página.'),
  p('dataset', 'objeto', 'Elemento: atributos data-*.'),
  // Promises e respostas de fetch
  m('then', '(valor => ...)', 'Promise: executa quando der certo.'),
  m('catch', '(erro => ...)', 'Promise: executa quando der erro.'),
  m('finally', '(() => ...)', 'Promise: executa no fim, dando certo ou não.'),
  m('json', '()', 'Resposta do fetch: converte o corpo em objeto (retorna Promise).'),
  p('ok', 'boolean', 'Resposta do fetch: true se o status for 200–299.'),
];

const GLOBAIS = [
  { label: 'console', type: 'variable', detail: 'objeto', info: 'Use console.log(...) para mostrar valores.' },
  { label: 'Math', type: 'variable', detail: 'objeto', info: 'Funções matemáticas: Math.round, Math.random…' },
  { label: 'JSON', type: 'variable', detail: 'objeto', info: 'JSON.stringify e JSON.parse.' },
  { label: 'Object', type: 'class', detail: 'objeto', info: 'Object.keys, Object.values, Object.entries.' },
  { label: 'Array', type: 'class', detail: 'classe', info: 'Array.isArray, Array.from.' },
  { label: 'Number', type: 'function', detail: '(valor)', info: 'Converte para número. Também: Number.isNaN, Number.isInteger.' },
  { label: 'String', type: 'function', detail: '(valor)', info: 'Converte para texto.' },
  { label: 'Boolean', type: 'function', detail: '(valor)', info: 'Converte para true/false.' },
  { label: 'Map', type: 'class', detail: 'classe', info: 'new Map(): pares chave → valor.' },
  { label: 'Set', type: 'class', detail: 'classe', info: 'new Set(): valores únicos.' },
  { label: 'Promise', type: 'class', detail: 'classe', info: 'Valor que vai existir no futuro.' },
  { label: 'Error', type: 'class', detail: '(mensagem)', info: "throw new Error('mensagem')" },
  { label: 'document', type: 'variable', detail: 'página', info: 'A página (DOM): document.querySelector…' },
  { label: 'fetch', type: 'function', detail: '(url)', info: 'Busca dados na internet (retorna Promise).' },
  { label: 'setTimeout', type: 'function', detail: '(função, ms)', info: 'Executa a função depois de ms milissegundos.' },
  { label: 'parseInt', type: 'function', detail: '(texto)', info: 'Converte texto em inteiro.' },
  { label: 'parseFloat', type: 'function', detail: '(texto)', info: 'Converte texto em número decimal.' },
  { label: 'typeof', type: 'keyword', detail: 'operador', info: "Tipo do valor: typeof 'oi' → 'string'." },
  { label: 'true', type: 'keyword' },
  { label: 'false', type: 'keyword' },
  { label: 'null', type: 'keyword' },
  { label: 'undefined', type: 'keyword' },
  { label: 'new', type: 'keyword' },
  { label: 'await', type: 'keyword', info: 'Espera uma Promise (dentro de função async).' },
  { label: 'break', type: 'keyword' },
  ...['else', 'of', 'in', 'this', 'extends', 'super', 'static', 'case', 'default', 'catch', 'finally', 'instanceof'].map((label) => ({ label, type: 'keyword' })),
  { label: 'continue', type: 'keyword' },
];

// Modelos prontos: Tab pula para o próximo campo a preencher.
const MODELOS = [
  modelo('console.log(${valor});', { label: 'log', detail: 'console.log(…)', info: 'Mostra um valor no console.', type: 'text' }),
  modelo('console.log(${valor});', { label: 'console.log', detail: 'modelo', info: 'Mostra um valor no console.', type: 'text' }),
  modelo('const ${nome} = ${valor};', { label: 'const', detail: 'modelo: constante', info: 'Declara um valor que não será reatribuído.', type: 'text' }),
  modelo('let ${nome} = ${valor};', { label: 'let', detail: 'modelo: variável', info: 'Declara uma variável que pode mudar.', type: 'text' }),
  modelo('if (${condição}) {\n\t${}\n}', { label: 'if', detail: 'modelo: se…', type: 'text' }),
  modelo('if (${condição}) {\n\t${}\n} else {\n\t\n}', { label: 'ifelse', detail: 'modelo: se… senão…', type: 'text' }),
  modelo('for (let i = 0; i < ${limite}; i++) {\n\t${}\n}', { label: 'for', detail: 'modelo: laço contado', type: 'text' }),
  modelo('for (const ${item} of ${lista}) {\n\t${}\n}', { label: 'forof', detail: 'modelo: for…of (percorrer lista)', type: 'text' }),
  modelo('for (const ${chave} in ${objeto}) {\n\t${}\n}', { label: 'forin', detail: 'modelo: for…in (chaves do objeto)', type: 'text' }),
  modelo('while (${condição}) {\n\t${}\n}', { label: 'while', detail: 'modelo: enquanto…', type: 'text' }),
  modelo('switch (${valor}) {\n\tcase ${1}:\n\t\t${}\n\t\tbreak;\n\tdefault:\n\t\t\n}', { label: 'switch', detail: 'modelo: escolha por casos', type: 'text' }),
  modelo('function ${nome}(${parametros}) {\n\t${}\n}', { label: 'function', detail: 'modelo: função', type: 'text' }),
  modelo('const ${nome} = (${parametros}) => ${resultado};', { label: 'arrow', detail: 'modelo: arrow function', type: 'text' }),
  modelo('return ${valor};', { label: 'return', detail: 'modelo: retornar valor', type: 'text' }),
  modelo('class ${Nome} {\n\tconstructor(${parametros}) {\n\t\t${}\n\t}\n}', { label: 'class', detail: 'modelo: classe', type: 'text' }),
  modelo('try {\n\t${}\n} catch (erro) {\n\tconsole.log(erro.message);\n}', { label: 'try', detail: 'modelo: try/catch', type: 'text' }),
  modelo("throw new Error('${mensagem}');", { label: 'throw', detail: 'modelo: lançar erro', type: 'text' }),
  modelo('async function ${nome}() {\n\tconst resposta = await fetch(${url});\n\tconst dados = await resposta.json();\n\t${}\n}', { label: 'async', detail: 'modelo: função async com fetch', type: 'text' }),
  modelo("document.querySelector('${seletor}')", { label: 'querySelector', detail: 'modelo: pegar elemento', type: 'text' }),
  modelo("${elemento}.addEventListener('${click}', (evento) => {\n\t${}\n});", { label: 'evento', detail: 'modelo: addEventListener', type: 'text' }),
  modelo('setTimeout(() => {\n\t${}\n}, ${1000});', { label: 'setTimeout', detail: 'modelo: executar depois', type: 'text' }),
];

const PALAVRA_ANTES_DO_PONTO = /([\w$]+)\s*\.\s*([\w$]*)$/;

/** Sugestões depois de um ponto: membros do objeto global conhecido, ou métodos comuns. */
function membros(context) {
  const linha = context.state.doc.lineAt(context.pos);
  const antes = linha.text.slice(0, context.pos - linha.from);
  const mt = PALAVRA_ANTES_DO_PONTO.exec(antes);
  if (!mt) return null;
  const opcoes = MEMBROS[mt[1]] || GENERICOS;
  return { from: context.pos - mt[2].length, options: opcoes, validFor: /^[\w$]*$/ };
}

const palavras = completeFromList([...MODELOS, ...GLOBAIS]);
const NAO_EM = ['LineComment', 'BlockComment', 'String', 'TemplateString'];

/** Fonte de sugestões a registrar em javascriptLanguage.data. */
export const sugestoesJS = ifNotIn(NAO_EM, (context) => {
  const membro = membros(context);
  if (membro) return membro;
  const palavra = context.matchBefore(/[\w$]+/);
  if (!palavra) {
    // Nada digitado (Ctrl+Espaço ou 💡): oferece só os modelos de código, na ordem da trilha.
    if (!context.explicit) return null;
    return { from: context.pos, options: MODELOS.filter((o) => o.label !== 'console.log').map((o, i) => ({ ...o, boost: 99 - i })) };
  }
  return palavras(context);
});

/** Variáveis e funções do próprio código do aluno (fonte padrão do CodeMirror). */
export const variaveisLocais = localCompletionSource;

const PREF = 'estudojs:sugestoes';
/** Preferência do aluno: sugestões automáticas ao digitar (padrão: ligadas). */
export function sugestoesLigadas() {
  try { return localStorage.getItem(PREF) !== 'off'; } catch { return true; }
}
export function definirSugestoes(ligadas) {
  try { localStorage.setItem(PREF, ligadas ? 'on' : 'off'); } catch { /* ignora */ }
}
