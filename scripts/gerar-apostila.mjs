// Gera docs/APOSTILA.md a partir do conteúdo do app (src/content).
// Uso: npm run apostila
// A apostila nunca fica desatualizada: basta rodar de novo após editar um exercício.
import fs from 'node:fs';
import path from 'node:path';
import { DAYS } from '../src/content/index.js';
import { topicLabel } from '../src/content/topics.js';
import { formatValue } from '../src/runner/runtime.js';

const OUT = path.resolve('docs');
const DIF = ['', 'Fácil', 'Médio', 'Desafio'];

// '#' no fim de um título seria lido como marcador de fechamento.
const titulo = (t) => t.replace(/#$/, '\\#');

// HTML simples do conteúdo → Markdown
function md(html = '') {
  const guardados = [];
  const guardar = (txt) => `\u0000${guardados.push(txt) - 1}\u0000`;
  const span = (c) => (c.includes('`') ? '`` ' + c + ' ``' : '`' + c + '`');
  return html
    .replace(/<pre>([\s\S]*?)<\/pre>/g, (_, c) => guardar(`\n\n\`\`\`\n${decode(c.replace(/<[^>]+>/g, ''))}\n\`\`\`\n\n`))
    .replace(/<(code|kbd)>([\s\S]*?)<\/\1>/g, (_, t, c) => guardar(span(decode(c))))
    .replace(/<li>/g, '\n- ')
    .replace(/<\/li>|<ul>|<ol>/g, '')
    .replace(/<\/(ul|ol)>/g, '\n\n')
    .replace(/<\/p>\s*<p>/g, '\n\n')
    .replace(/<\/?p>/g, '\n')
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/g, '**$2**')
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/g, '*$2*')
    .replace(/<sup>([\s\S]*?)<\/sup>/g, '^$1')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&(lt|gt|amp|quot|#39);/g, (m) => decode(m))
    .replace(/\u0000(\d+)\u0000/g, (_, i) => guardados[i])
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
function decode(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
}
const fmt = (v) => formatValue(v, 0, new WeakSet(), false).replace(/\n/g, '\\n');
const code = (c) => `\`\`\`js\n${c.trim()}\n\`\`\``;
const plain = (h) => md(h).replace(/\n+/g, ' ');

// O nome do teste só ajuda quando acrescenta algo além da chamada e do valor.
const nomeUtil = (t) => !t.name.startsWith(t.run.slice(0, 8)) && !t.name.includes('→') && !/^["']/.test(t.name);

// Quebra o código do teste em linhas nos ';' de nível superior (não dentro de for(...)).
function quebrar(codigo) {
  const linhas = [];
  let atual = '';
  let parenteses = 0;
  for (let i = 0; i < codigo.length; i++) {
    const c = codigo[i];
    if (c === '(') parenteses++;
    if (c === ')') parenteses--;
    atual += c;
    if (c === ';' && parenteses <= 1 && codigo[i + 1] === ' ') {
      linhas.push(atual.trim());
      atual = '';
    }
  }
  if (atual.trim()) linhas.push(atual.trim());
  return linhas;
}

// Lista usada em vários testes do dia 8: aparece uma vez no início dos exercícios.
const PRODUTOS = "[{ nome: 'Teclado', preco: 150, categoria: 'perifericos' }, { nome: 'Mouse', preco: 80, categoria: 'perifericos' }, { nome: 'Monitor', preco: 900, categoria: 'telas' }, { nome: 'Cabo HDMI', preco: 30, categoria: 'acessorios' }]";
const NOTA_PRODUTOS = `> 📦 Vários exercícios de hoje usam esta **lista de produtos de exemplo** (chamada de \`produtos\` nos resultados):

\`\`\`js
const produtos = [
  { nome: 'Teclado', preco: 150, categoria: 'perifericos' },
  { nome: 'Mouse', preco: 80, categoria: 'perifericos' },
  { nome: 'Monitor', preco: 900, categoria: 'telas' },
  { nome: 'Cabo HDMI', preco: 30, categoria: 'acessorios' },
];
\`\`\`

`;

function resultadoEsperado(ex) {
  const linhas = [];
  for (const original of ex.tests) {
    const t = original.run ? { ...original, run: original.run.split(PRODUTOS).join('produtos') } : original;
    if (t.run) {
      const curto = t.run.length <= 70;
      linhas.push(curto
        ? `- \`${t.run}\` → deve resultar em **\`${fmt(t.expected)}\`**${nomeUtil(t) ? ` _(${t.name})_` : ''}`
        : `- **${t.name}** → resultado esperado: \`${fmt(t.expected)}\`\n\n  Teste executado pelo app:\n\n  \`\`\`js\n  ${quebrar(t.run).join('\n  ')}\n  \`\`\``);
    } else if (t.logs) {
      linhas.push(`- **${t.name}** — o console deve mostrar exatamente:\n\n\`\`\`\n${t.logs.join('\n') || '(nada)'}\n\`\`\``);
    } else if (t.logsInclude) {
      linhas.push(`- **${t.name}** — o console deve conter as linhas: ${t.logsInclude.map((l) => `\`${l}\``).join(', ')}`);
    }
  }
  for (const c of ex.checks || []) linhas.push(`- 📏 Regra de código: ${c.message}`);
  return linhas.join('\n');
}

function aula(day) {
  const out = [];
  for (const [i, s] of day.lesson.entries()) {
    out.push(`### ${day.day}.${i + 1} ${s.title}\n`);
    for (const b of s.blocks) {
      if (b.p) out.push(md(b.p) + '\n');
      else if (b.tip) out.push(`> 💡 **Dica:** ${plain(b.tip)}\n`);
      else if (b.warn) out.push(`> ⚠️ **Atenção:** ${plain(b.warn)}\n`);
      else if (b.list) out.push(b.list.map((l) => `- ${plain(l)}`).join('\n') + '\n');
      else if (b.code) out.push(code(b.code) + '\n');
    }
  }
  return out.join('\n');
}

function exercicios(day) {
  const usaProdutos = day.exercises.some((ex) => ex.tests.some((t) => t.run?.includes(PRODUTOS)));
  return (usaProdutos ? NOTA_PRODUTOS : '') + day.exercises.map((ex, i) => {
    const partes = [
      `### Exercício ${day.day}.${i + 1} — ${titulo(ex.title)}`,
      `*${topicLabel(ex.topic)} · ${DIF[ex.difficulty]}*`,
      '',
      md(ex.prompt),
    ];
    if (ex.html) partes.push('', '**HTML da página (simulada):**', '', '```html\n' + ex.html + '\n```');
    if (ex.starter.trim()) partes.push('', '**Código inicial:**', '', code(ex.starter));
    partes.push('', '**✅ Resultado esperado** — o exercício está certo quando:', '', resultadoEsperado(ex));
    partes.push('', '**💡 Dicas** (use só se travar):', '', ex.hints.map((h, j) => `${j + 1}. ${plain(h)}`).join('\n'));
    return partes.join('\n');
  }).join('\n\n---\n\n');
}

function quiz(day) {
  return day.quiz.map((q, i) => `${i + 1}. ${plain(q.q)}\n${q.options.map((o, j) => `   ${'abcde'[j]}) ${plain(o)}`).join('\n')}`).join('\n\n');
}

function gabarito(day) {
  const sol = day.exercises.map((ex, i) => `#### ${day.day}.${i + 1} — ${titulo(ex.title)}\n\n${code(ex.solution)}`).join('\n\n');
  const q = day.quiz.map((item, i) => `${i + 1}. **${'abcde'[item.answer]})** ${plain(item.options[item.answer])} — ${plain(item.explain)}`).join('\n');
  return `### Dia ${day.day} — ${day.title}\n\n${sol}\n\n**Quiz do dia ${day.day}:**\n\n${q}`;
}

const totalEx = DAYS.reduce((s, d) => s + d.exercises.length, 0);
const capa = `# Apostila EstudoJS — JavaScript em 15 dias

**Aplicativo:** <https://estudojs.vercel.app> · ${DAYS.length} dias · ${totalEx} exercícios · ${DAYS.reduce((s, d) => s + d.quiz.length, 0)} questões de quiz

## Como usar esta apostila

Esta apostila acompanha o app. Para cada dia ela traz:

1. **Objetivos** — o que você vai conseguir fazer ao final do dia.
2. **Aula** — a explicação do conteúdo, com exemplos (no app, cada exemplo tem o botão ▶ Testar).
3. **Exercícios** — o enunciado e o **resultado esperado**: as verificações exatas que o app faz para considerar o exercício correto. Leia como "se eu chamar a função assim, ela deve devolver isto".
4. **Quiz** — perguntas de fixação.
5. **Desafio extra** — prática fora do app.

O **gabarito** (soluções e respostas dos quizzes) fica no final. Use-o só depois de tentar: tentar lembrar e errar faz parte de aprender. Existem várias soluções corretas para cada exercício; a do gabarito é apenas uma delas.

**Como ler o resultado esperado:** \`soma(2, 3)\` → \`5\` significa que, ao executar \`soma(2, 3)\`, o valor retornado deve ser \`5\`. Textos aparecem entre aspas simples (\`'par'\`), listas entre colchetes (\`[ 1, 2 ]\`) e objetos entre chaves (\`{ a: 1 }\`). Quando o resultado é do **console**, as linhas devem aparecer exatamente como mostradas.

## Sumário

${DAYS.map((d) => `- Dia ${d.day} — ${d.title}`).join('\n')}
- Gabarito
`;

const dias = DAYS.map((d) => `# Dia ${d.day} — ${d.title}

*${d.summary}* · Tempo estimado: ~${d.hours}h

## Objetivos

${d.goals.map((g) => `- ${g}`).join('\n')}

## Aula

${aula(d)}

## Exercícios

${exercicios(d)}

## Quiz

${quiz(d)}

## Desafio extra

${plain(d.extra || '')}
`).join('\n\n');

const fim = `# Gabarito

> Consulte apenas depois de tentar. Uma solução diferente da sua pode estar igualmente certa: o que vale é passar nas verificações do "resultado esperado".

${DAYS.map(gabarito).join('\n\n')}
`;

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'APOSTILA.md'), [capa, dias, fim].join('\n\n'));
console.log(`docs/APOSTILA.md gerada: ${DAYS.length} dias, ${totalEx} exercícios.`);
