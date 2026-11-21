/**
 * Section — the reusable shell for every scroll chapter. Centred content
 * column, animated sock rails on both sides, reveal-on-scroll and an
 * alternating background tone.
 *
 * @param {{id: string, kicker?: string, title: string,
 *          body: string, tone?: 'paper'|'cream', seed?: number}} opts
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { SockRail } from './SockRail.mjs';

export function Section({ id, kicker = '', title, body, tone = 'paper', seed = 0 }) {
  loadCss('./css/components/Section.css');

  const section = document.createElement('section');
  section.className = 'section section--' + tone;
  section.id = id;
  section.innerHTML =
    SockRail('left', 3, seed) +
    SockRail('right', 3, seed + 1) +
    '<div class="wrap">' +
    '<div class="section__head reveal">' +
    (kicker ? '<p class="kicker">' + kicker + '</p>' : '') +
    '<h2>' + title + '</h2>' +
    '</div>' +
    '<div class="section__body reveal">' +
    body +
    '</div>' +
    '</div>';

  return section;
}
