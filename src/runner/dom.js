// Cria uma página simulada (linkedom) para exercícios de DOM.
import { parseHTML } from 'linkedom';

export function createDom(html = '') {
  return parseHTML(`<!doctype html><html><head></head><body>${html}</body></html>`);
}
