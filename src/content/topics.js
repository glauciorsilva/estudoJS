// Tópicos usados para medir domínio e apontar dificuldades.
export const TOPICS = {
  fundamentos: { label: 'Variáveis, tipos e console', day: 1 },
  operadores: { label: 'Operadores e expressões', day: 1 },
  condicionais: { label: 'Condicionais e lógica booleana', day: 2 },
  lacos: { label: 'Laços de repetição', day: 3 },
  funcoes: { label: 'Funções', day: 4 },
  strings: { label: 'Strings (textos)', day: 5 },
  numeros: { label: 'Números e Math', day: 5 },
  arrays: { label: 'Arrays (listas)', day: 6 },
  objetos: { label: 'Objetos e JSON', day: 7 },
  'metodos-array': { label: 'map, filter, reduce e cia.', day: 8 },
  closures: { label: 'Escopo, closures e callbacks', day: 9 },
  classes: { label: 'Classes e POO', day: 10 },
  erros: { label: 'Erros e depuração', day: 11 },
  colecoes: { label: 'Map e Set', day: 11 },
  dom: { label: 'DOM e eventos', day: 12 },
  async: { label: 'Assíncrono (Promises, async/await)', day: 13 },
  algoritmos: { label: 'Algoritmos e resolução de problemas', day: 14 },
  projeto: { label: 'Projeto integrador', day: 15 },
};

export const topicLabel = (id) => TOPICS[id]?.label || id;
