// Botão "Veja um vídeo": aula em português no YouTube sobre o tópico do exercício.
import { VIDEOS } from '../content/videos.js';
import { TOPICS, topicLabel } from '../content/topics.js';
import { esc } from './dom.js';

/** Link do vídeo do tópico; sem vídeo cadastrado, uma busca no YouTube em português. */
export function videoUrl(topic) {
  const v = VIDEOS[topic];
  if (v) return `https://www.youtube.com/watch?v=${encodeURIComponent(v.id)}`;
  const busca = `javascript ${TOPICS[topic]?.label || topic} aula em português`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(busca)}`;
}

export function videoTitle(topic) {
  const v = VIDEOS[topic];
  return v ? `${v.titulo} — ${v.canal}` : `Vídeos sobre ${topicLabel(topic)} no YouTube`;
}

export function videoButton(topic, { id = '', classes = 'btn btn-ghost btn-sm', hidden = false } = {}) {
  return `<a class="${classes}" ${id ? `id="${id}"` : ''} href="${esc(videoUrl(topic))}" target="_blank" rel="noopener noreferrer" title="${esc(videoTitle(topic))}" ${hidden ? 'hidden' : ''}>🎬 Veja um vídeo</a>`;
}

/** Sinais de dificuldade num exercício ainda não resolvido. */
export function emDificuldade(p = {}) {
  if (p.passed) return false;
  return (p.failsBeforePass || 0) >= 3 || (p.hintsUsed || 0) >= 2 || Boolean(p.solutionViewed);
}
