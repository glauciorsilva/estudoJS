// Mede o tempo de estudo ativo: só conta enquanto a aba está visível
// e houve interação (tecla, toque, rolagem) nos últimos 2 minutos.
import { addActivity } from './store.js';

const TICK_S = 15;
const IDLE_LIMIT_MS = 2 * 60 * 1000;
let lastInput = Date.now();
let interval = null;
let onTick = null;

for (const ev of ['keydown', 'pointerdown', 'scroll', 'input']) {
  addEventListener(ev, () => { lastInput = Date.now(); }, { passive: true, capture: true });
}

/** Começa a contar. `extra(seconds)` permite somar o tempo em outro lugar (ex.: no exercício). */
export function startStudyTimer(extra = null) {
  stopStudyTimer();
  lastInput = Date.now();
  onTick = extra;
  interval = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    if (Date.now() - lastInput > IDLE_LIMIT_MS) return;
    addActivity({ seconds: TICK_S });
    if (onTick) onTick(TICK_S);
  }, TICK_S * 1000);
}

export function stopStudyTimer() {
  clearInterval(interval);
  interval = null;
  onTick = null;
}
