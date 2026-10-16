export default {
  day: 2,
  title: 'Decisões: condicionais e lógica',
  summary: 'Fazer o programa escolher caminhos com if/else, switch, ternário e operadores lógicos.',
  hours: 3,
  goals: [
    'Comparar valores com ===, !==, >, <, >=, <=',
    'Combinar condições com && (E), || (OU) e ! (NÃO)',
    'Entender truthy e falsy',
    'Escolher entre if/else, switch e operador ternário',
  ],
  lesson: [
    {
      title: 'Antes de começar: funções como “molde”',
      blocks: [
        { p: 'A partir de hoje os exercícios vêm dentro de uma <strong>função</strong>. Por enquanto, pense nela como uma caixa: recebe valores (parâmetros) e devolve uma resposta com <code>return</code>. No dia 4 veremos funções a fundo.' },
        { code: `function dobro(numero) {
  return numero * 2;
}
console.log(dobro(4));  // 8
console.log(dobro(10)); // 20`, run: true },
        { tip: 'Os testes chamam a sua função com vários valores diferentes. Por isso use o parâmetro, nunca um valor fixo.' },
      ],
    },
    {
      title: 'Comparações',
      blocks: [
        { code: `console.log(5 === 5);    // true  (igual em valor E tipo)
console.log(5 === '5');  // false (number x string)
console.log(5 == '5');   // true  (== converte tipos: evite!)
console.log(3 !== 4);    // true  (diferente)
console.log(10 >= 10);   // true`, run: true },
        { warn: 'Use sempre <code>===</code> e <code>!==</code>. O <code>==</code> faz conversões automáticas que geram bugs difíceis de achar.' },
      ],
    },
    {
      title: 'if, else if, else',
      blocks: [
        { code: `const temperatura = 28;
if (temperatura > 30) {
  console.log('Muito quente');
} else if (temperatura > 20) {
  console.log('Agradável');
} else {
  console.log('Frio');
}`, run: true },
        { p: 'As condições são testadas de cima para baixo; a primeira verdadeira vence e as demais são ignoradas. Por isso a <strong>ordem</strong> importa.' },
      ],
    },
    {
      title: 'Operadores lógicos',
      blocks: [
        { list: [
          '<code>a && b</code> — verdadeiro se <strong>os dois</strong> forem verdadeiros',
          '<code>a || b</code> — verdadeiro se <strong>pelo menos um</strong> for verdadeiro',
          '<code>!a</code> — inverte: <code>!true</code> é <code>false</code>',
        ] },
        { code: `const idade = 20;
const temIngresso = true;
console.log(idade >= 18 && temIngresso); // true
console.log(idade < 12 || idade > 65);   // false
console.log(!temIngresso);               // false`, run: true },
      ],
    },
    {
      title: 'Truthy e falsy',
      blocks: [
        { p: 'Em um <code>if</code>, qualquer valor vira verdadeiro ou falso. Os valores <strong>falsy</strong> são só estes: <code>false</code>, <code>0</code>, <code>\'\'</code> (texto vazio), <code>null</code>, <code>undefined</code> e <code>NaN</code>. Todo o resto é <strong>truthy</strong> (inclusive <code>\'0\'</code>, <code>[]</code> e <code>{}</code>).' },
        { code: `const nome = '';
if (nome) {
  console.log('Olá, ' + nome);
} else {
  console.log('Nome não informado');
}`, run: true },
      ],
    },
    {
      title: 'Ternário e switch',
      blocks: [
        { p: 'O ternário é um if/else curto que <strong>produz um valor</strong>: <code>condicao ? valorSeVerdadeiro : valorSeFalso</code>.' },
        { code: `const pontos = 75;
const resultado = pontos >= 60 ? 'aprovado' : 'reprovado';
console.log(resultado);

const fruta = 'uva';
switch (fruta) {
  case 'maçã':
    console.log('vermelha');
    break;
  case 'uva':
    console.log('roxa');
    break;
  default:
    console.log('não sei');
}`, run: true },
        { warn: 'No <code>switch</code>, sem <code>break</code> (ou <code>return</code>) a execução “cai” para o próximo <code>case</code>.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'd02-maior-idade',
      title: 'Maior de idade',
      topic: 'condicionais',
      difficulty: 1,
      prompt: '<p>Complete <code>ehMaiorDeIdade(idade)</code> para retornar <code>true</code> se a idade for 18 ou mais, e <code>false</code> caso contrário.</p>',
      starter: `function ehMaiorDeIdade(idade) {\n  // seu código aqui\n}\n`,
      solution: `function ehMaiorDeIdade(idade) {\n  return idade >= 18;\n}`,
      hints: ['Uma comparação já produz <code>true</code> ou <code>false</code>: você pode retornar ela diretamente.'],
      tests: [
        { name: 'ehMaiorDeIdade(20) → true', run: `ehMaiorDeIdade(20)`, expected: true },
        { name: 'ehMaiorDeIdade(18) → true', run: `ehMaiorDeIdade(18)`, expected: true },
        { name: 'ehMaiorDeIdade(17) → false', run: `ehMaiorDeIdade(17)`, expected: false },
      ],
    },
    {
      id: 'd02-par-impar',
      title: 'Par ou ímpar',
      topic: 'condicionais',
      difficulty: 1,
      prompt: '<p>Complete <code>parOuImpar(n)</code> para retornar <code>\'par\'</code> ou <code>\'ímpar\'</code>.</p>',
      starter: `function parOuImpar(n) {\n  \n}\n`,
      solution: `function parOuImpar(n) {\n  if (n % 2 === 0) {\n    return 'par';\n  }\n  return 'ímpar';\n}`,
      hints: ['Um número é par quando o resto da divisão por 2 é zero: <code>n % 2 === 0</code>.', 'Lembre do acento em <code>\'ímpar\'</code>.'],
      tests: [
        { name: 'parOuImpar(4) → "par"', run: `parOuImpar(4)`, expected: 'par' },
        { name: 'parOuImpar(7) → "ímpar"', run: `parOuImpar(7)`, expected: 'ímpar' },
        { name: 'parOuImpar(0) → "par"', run: `parOuImpar(0)`, expected: 'par' },
        { name: 'parOuImpar(-3) → "ímpar"', run: `parOuImpar(-3)`, expected: 'ímpar' },
      ],
    },
    {
      id: 'd02-nota',
      title: 'Conceito da nota',
      topic: 'condicionais',
      difficulty: 1,
      prompt: '<p>Complete <code>conceito(nota)</code>:</p><ul><li>9 ou mais → <code>\'A\'</code></li><li>7 ou mais → <code>\'B\'</code></li><li>5 ou mais → <code>\'C\'</code></li><li>abaixo de 5 → <code>\'D\'</code></li></ul>',
      starter: `function conceito(nota) {\n  \n}\n`,
      solution: `function conceito(nota) {\n  if (nota >= 9) return 'A';\n  if (nota >= 7) return 'B';\n  if (nota >= 5) return 'C';\n  return 'D';\n}`,
      hints: ['Comece pela faixa mais alta. Assim cada <code>else if</code> só precisa testar o limite de baixo.'],
      tests: [
        { name: 'conceito(9.5) → "A"', run: `conceito(9.5)`, expected: 'A' },
        { name: 'conceito(9) → "A"', run: `conceito(9)`, expected: 'A' },
        { name: 'conceito(7) → "B"', run: `conceito(7)`, expected: 'B' },
        { name: 'conceito(6.9) → "C"', run: `conceito(6.9)`, expected: 'C' },
        { name: 'conceito(2) → "D"', run: `conceito(2)`, expected: 'D' },
      ],
    },
    {
      id: 'd02-entrada',
      title: 'Pode entrar no show?',
      topic: 'condicionais',
      difficulty: 2,
      prompt: '<p>Complete <code>podeEntrar(idade, temIngresso, ehVip)</code>. Regras:</p><ul><li>VIPs sempre entram.</li><li>Os demais entram se tiverem 18 anos ou mais <strong>e</strong> ingresso.</li></ul>',
      starter: `function podeEntrar(idade, temIngresso, ehVip) {\n  \n}\n`,
      solution: `function podeEntrar(idade, temIngresso, ehVip) {\n  return ehVip || (idade >= 18 && temIngresso);\n}`,
      hints: ['Dá para resolver numa linha combinando <code>||</code> e <code>&&</code>.', 'Use parênteses para agrupar a regra dos não-VIPs.'],
      tests: [
        { name: 'VIP de 16 sem ingresso entra', run: `podeEntrar(16, false, true)`, expected: true },
        { name: '20 anos com ingresso entra', run: `podeEntrar(20, true, false)`, expected: true },
        { name: '20 anos sem ingresso não entra', run: `podeEntrar(20, false, false)`, expected: false },
        { name: '17 anos com ingresso não entra', run: `podeEntrar(17, true, false)`, expected: false },
      ],
    },
    {
      id: 'd02-switch',
      title: 'Dia da semana com switch',
      topic: 'condicionais',
      difficulty: 1,
      prompt: '<p>Usando <code>switch</code>, complete <code>diaDaSemana(n)</code>: 1 → <code>\'domingo\'</code>, 2 → <code>\'segunda\'</code>, 3 → <code>\'terça\'</code>, 4 → <code>\'quarta\'</code>, 5 → <code>\'quinta\'</code>, 6 → <code>\'sexta\'</code>, 7 → <code>\'sábado\'</code>. Qualquer outro valor → <code>\'inválido\'</code>.</p>',
      starter: `function diaDaSemana(n) {\n  switch (n) {\n    case 1:\n      return 'domingo';\n    // continue...\n  }\n}\n`,
      solution: `function diaDaSemana(n) {\n  switch (n) {\n    case 1: return 'domingo';\n    case 2: return 'segunda';\n    case 3: return 'terça';\n    case 4: return 'quarta';\n    case 5: return 'quinta';\n    case 6: return 'sexta';\n    case 7: return 'sábado';\n    default: return 'inválido';\n  }\n}`,
      hints: ['Como cada <code>case</code> usa <code>return</code>, não precisa de <code>break</code>.', 'Use <code>default:</code> para o “qualquer outro valor”.'],
      tests: [
        { name: 'diaDaSemana(1) → "domingo"', run: `diaDaSemana(1)`, expected: 'domingo' },
        { name: 'diaDaSemana(3) → "terça"', run: `diaDaSemana(3)`, expected: 'terça' },
        { name: 'diaDaSemana(7) → "sábado"', run: `diaDaSemana(7)`, expected: 'sábado' },
        { name: 'diaDaSemana(9) → "inválido"', run: `diaDaSemana(9)`, expected: 'inválido' },
      ],
      checks: [{ type: 'must', pattern: 'switch\\s*\\(', message: 'Usou switch' }],
    },
    {
      id: 'd02-ternario',
      title: 'Status do pedido (ternário)',
      topic: 'condicionais',
      difficulty: 1,
      prompt: '<p>Complete <code>statusPedido(pago)</code> usando o <strong>operador ternário</strong>: se <code>pago</code> for verdadeiro retorne <code>\'Enviar\'</code>, senão <code>\'Aguardando pagamento\'</code>.</p>',
      starter: `function statusPedido(pago) {\n  \n}\n`,
      solution: `function statusPedido(pago) {\n  return pago ? 'Enviar' : 'Aguardando pagamento';\n}`,
      hints: ['Formato: <code>condicao ? valorA : valorB</code>.'],
      tests: [
        { name: 'statusPedido(true) → "Enviar"', run: `statusPedido(true)`, expected: 'Enviar' },
        { name: 'statusPedido(false) → "Aguardando pagamento"', run: `statusPedido(false)`, expected: 'Aguardando pagamento' },
      ],
      checks: [
        { type: 'must', pattern: '\\?[^:]+:', message: 'Usou o operador ternário' },
        { type: 'mustNot', pattern: '\\bif\\s*\\(', message: 'Não usou if' },
      ],
    },
    {
      id: 'd02-falsy',
      title: 'Detector de falsy',
      topic: 'condicionais',
      difficulty: 2,
      prompt: '<p>Complete <code>ehFalsy(valor)</code> para retornar <code>true</code> se o valor for falsy e <code>false</code> se for truthy. Dica: existe uma solução de uma linha.</p>',
      starter: `function ehFalsy(valor) {\n  \n}\n`,
      solution: `function ehFalsy(valor) {\n  return !valor;\n}`,
      hints: ['O operador <code>!</code> converte para boolean e inverte.', 'Pense: <code>!0</code> é <code>true</code>; <code>!\'oi\'</code> é <code>false</code>.'],
      tests: [
        { name: 'ehFalsy(0) → true', run: `ehFalsy(0)`, expected: true },
        { name: 'ehFalsy("") → true', run: `ehFalsy('')`, expected: true },
        { name: 'ehFalsy(null) → true', run: `ehFalsy(null)`, expected: true },
        { name: 'ehFalsy(NaN) → true', run: `ehFalsy(NaN)`, expected: true },
        { name: 'ehFalsy("0") → false', run: `ehFalsy('0')`, expected: false },
        { name: 'ehFalsy([]) → false', run: `ehFalsy([])`, expected: false },
      ],
    },
    {
      id: 'd02-maior-tres',
      title: 'Maior de três (sem Math.max)',
      topic: 'condicionais',
      difficulty: 2,
      prompt: '<p>Complete <code>maiorDeTres(a, b, c)</code> para retornar o maior dos três números, <strong>sem usar</strong> <code>Math.max</code>.</p>',
      starter: `function maiorDeTres(a, b, c) {\n  \n}\n`,
      solution: `function maiorDeTres(a, b, c) {\n  let maior = a;\n  if (b > maior) maior = b;\n  if (c > maior) maior = c;\n  return maior;\n}`,
      hints: ['Comece supondo que <code>a</code> é o maior, guarde numa variável e compare com os outros.'],
      tests: [
        { name: 'maiorDeTres(1, 2, 3) → 3', run: `maiorDeTres(1, 2, 3)`, expected: 3 },
        { name: 'maiorDeTres(9, 2, 3) → 9', run: `maiorDeTres(9, 2, 3)`, expected: 9 },
        { name: 'maiorDeTres(1, 8, 3) → 8', run: `maiorDeTres(1, 8, 3)`, expected: 8 },
        { name: 'maiorDeTres(-5, -2, -9) → -2', run: `maiorDeTres(-5, -2, -9)`, expected: -2 },
        { name: 'maiorDeTres(4, 4, 4) → 4', run: `maiorDeTres(4, 4, 4)`, expected: 4 },
      ],
      checks: [{ type: 'mustNot', pattern: 'Math\\.max', message: 'Não usou Math.max' }],
    },
    {
      id: 'd02-frete',
      title: 'Calculadora de frete',
      topic: 'condicionais',
      difficulty: 2,
      prompt: '<p>Complete <code>calcularFrete(peso, regiao)</code>:</p><ul><li>Taxa base: <code>\'sul\'</code> = 10, <code>\'norte\'</code> = 20, qualquer outra região = 15.</li><li>Para cada kg <strong>acima de 5</strong>, some 2.</li></ul><p>Ex.: <code>calcularFrete(8, \'sul\')</code> → 10 + 3×2 = 16.</p>',
      starter: `function calcularFrete(peso, regiao) {\n  \n}\n`,
      solution: `function calcularFrete(peso, regiao) {\n  let base = 15;\n  if (regiao === 'sul') base = 10;\n  else if (regiao === 'norte') base = 20;\n  const extra = peso > 5 ? (peso - 5) * 2 : 0;\n  return base + extra;\n}`,
      hints: ['Resolva em duas partes: primeiro a taxa base, depois o adicional por peso.', 'O adicional só existe se <code>peso > 5</code>.'],
      tests: [
        { name: 'calcularFrete(8, "sul") → 16', run: `calcularFrete(8, 'sul')`, expected: 16 },
        { name: 'calcularFrete(3, "norte") → 20', run: `calcularFrete(3, 'norte')`, expected: 20 },
        { name: 'calcularFrete(5, "sudeste") → 15', run: `calcularFrete(5, 'sudeste')`, expected: 15 },
        { name: 'calcularFrete(10, "norte") → 30', run: `calcularFrete(10, 'norte')`, expected: 30 },
      ],
    },
  ],
  quiz: [
    { q: 'Qual o resultado de <code>5 === \'5\'</code>?', options: ['true', 'false', 'Erro', 'undefined'], answer: 1, explain: '<code>===</code> compara valor e tipo: number ≠ string.' },
    { q: 'Qual destes valores é <strong>truthy</strong>?', options: ['<code>0</code>', '<code>\'\'</code>', '<code>\'0\'</code>', '<code>null</code>'], answer: 2, explain: '<code>\'0\'</code> é um texto não vazio, portanto truthy.' },
    { q: '<code>true || false && false</code> resulta em:', options: ['true', 'false'], answer: 0, explain: '<code>&&</code> é avaliado antes de <code>||</code>: <code>true || (false && false)</code> → <code>true</code>.' },
    { q: 'O que acontece num <code>switch</code> sem <code>break</code>?', options: ['Erro de sintaxe', 'A execução continua nos próximos cases', 'Nada', 'Volta para o início'], answer: 1, explain: 'É o “fall-through”: executa os cases seguintes até encontrar um break/return.' },
    { q: 'Qual expressão retorna <code>\'sim\'</code> quando <code>x</code> é maior que 10?', options: ['<code>x > 10 : \'sim\' ? \'não\'</code>', '<code>x > 10 ? \'sim\' : \'não\'</code>', '<code>if x > 10 \'sim\'</code>', '<code>x > 10 && \'não\' || \'sim\'</code>'], answer: 1, explain: 'Ternário: <code>condição ? seVerdadeiro : seFalso</code>.' },
  ],
  extra: 'Escreva no papel (sim, papel!) a tabela-verdade de <code>&&</code> e <code>||</code> com true/false. Depois confira no playground.',
};
