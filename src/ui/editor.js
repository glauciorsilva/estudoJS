// Editor de código (CodeMirror 6) + barra de símbolos para facilitar no celular.
import { EditorView, basicSetup } from 'codemirror';
import { keymap } from '@codemirror/view';
import { EditorState, Prec } from '@codemirror/state';
import { indentWithTab, undo, redo, indentMore } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const isDark = () => document.documentElement.dataset.themeResolved === 'dark';

/**
 * Cria o editor dentro de `parent`.
 * @returns {{ getValue, setValue, insert, focus, destroy, view }}
 */
export function createEditor(parent, { doc = '', onRun, onChange, readOnly = false, label = 'Editor de código' } = {}) {
  const extensions = [
    basicSetup,
    javascript(),
    keymap.of([indentWithTab]),
    Prec.highest(keymap.of([
      { key: 'Mod-Enter', run: () => { onRun?.(); return true; } },
      { key: 'Shift-Enter', run: () => { onRun?.(); return true; } },
    ])),
    EditorView.lineWrapping,
    EditorView.contentAttributes.of({ 'aria-label': label, autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false' }),
    EditorView.updateListener.of((u) => { if (u.docChanged) onChange?.(u.state.doc.toString()); }),
    EditorState.tabSize.of(2),
  ];
  if (readOnly) extensions.push(EditorState.readOnly.of(true), EditorView.editable.of(false));
  if (isDark()) extensions.push(oneDark);

  const view = new EditorView({ doc, extensions, parent });

  return {
    view,
    getValue: () => view.state.doc.toString(),
    setValue(text) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
    },
    /** Insere texto no cursor. `cursorBack` = quantos caracteres voltar o cursor (ex.: para dentro dos parênteses). */
    insert(text, cursorBack = 0) {
      const { from, to } = view.state.selection.main;
      const selected = view.state.sliceDoc(from, to);
      // Com texto selecionado, símbolos de par "envolvem" a seleção: (seleção)
      if (selected && cursorBack > 0 && text.length === 2) {
        view.dispatch({ changes: { from, to, insert: text[0] + selected + text[1] }, selection: { anchor: from + selected.length + 2 } });
      } else {
        const pos = from + text.length - cursorBack;
        view.dispatch({ changes: { from, to, insert: text }, selection: { anchor: pos }, scrollIntoView: true });
      }
      view.focus();
    },
    undo: () => { undo(view); view.focus(); },
    redo: () => { redo(view); view.focus(); },
    indent: () => { indentMore(view); view.focus(); },
    focus: () => view.focus(),
    destroy: () => view.destroy(),
  };
}

// [rótulo, texto inserido, quantos caracteres o cursor volta]
const SYMBOLS = [
  ['⇥', null, 0, 'indent'],
  ['( )', '()', 1],
  ['{ }', '{}', 1],
  ['[ ]', '[]', 1],
  ["' '", "''", 1],
  ['" "', '""', 1],
  ['` `', '``', 1],
  ['${ }', '${}', 1],
  ['=>', ' => ', 0],
  [';', ';', 0],
  ['=', ' = ', 0],
  ['===', ' === ', 0],
  ['.', '.', 0],
  [',', ', ', 0],
  [':', ': ', 0],
  ['+', ' + ', 0],
  ['-', ' - ', 0],
  ['*', ' * ', 0],
  ['/', ' / ', 0],
  ['%', ' % ', 0],
  ['<', ' < ', 0],
  ['>', ' > ', 0],
  ['!', '!', 0],
  ['&&', ' && ', 0],
  ['||', ' || ', 0],
  ['?', ' ? ', 0],
  ['log', 'console.log()', 1],
  ['↶', null, 0, 'undo'],
  ['↷', null, 0, 'redo'],
];

/** Barra de símbolos (útil no teclado do Android, onde { } [ ] ` ficam escondidos). */
export function symbolBar(editor) {
  const bar = document.createElement('div');
  bar.className = 'simbolos';
  bar.setAttribute('role', 'toolbar');
  bar.setAttribute('aria-label', 'Inserir símbolos');
  SYMBOLS.forEach(([label, text, back, action], i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.dataset.i = i;
    b.setAttribute('aria-label', action === 'undo' ? 'Desfazer' : action === 'redo' ? 'Refazer' : action === 'indent' ? 'Tabulação' : `Inserir ${text.trim()}`);
    bar.append(b);
  });
  // pointerdown + preventDefault: não tira o foco do editor (o teclado do celular continua aberto)
  bar.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    e.preventDefault();
    const [, text, back, action] = SYMBOLS[b.dataset.i];
    if (action) editor[action]();
    else editor.insert(text, back);
  });
  // teclado (acessibilidade): Enter/Espaço no botão
  bar.addEventListener('click', (e) => {
    if (e.detail !== 0) return; // clique de mouse/toque já tratado acima
    const b = e.target.closest('button');
    if (!b) return;
    const [, text, back, action] = SYMBOLS[b.dataset.i];
    if (action) editor[action]();
    else editor.insert(text, back);
  });
  return bar;
}
