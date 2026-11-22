/**
 * SockRail — a little clothesline of socks that hangs beside a section.
 * Purely decorative, generated from a rotating palette and motif list so
 * every rail and every sock looks different. Returns an HTML string for
 * easy embedding.
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { sockSvg } from '../../lib/sockArt.mjs';

// Light blues dominate, with a few warm accents sprinkled in.
const RAIL_PALETTES = [
  { body: '#4d7ba3', cuff: '#eaf4fc', mc: 'rgba(255,255,255,.85)' },
  { body: '#8fc1de', cuff: '#39678c', mc: 'rgba(57,103,140,.5)' },
  { body: '#39678c', cuff: '#cfe4f2', mc: 'rgba(255,255,255,.8)' },
  { body: '#bde0f2', cuff: '#4d7ba3', mc: 'rgba(77,123,163,.55)' },
  { body: '#6f9fc0', cuff: '#eaf4fc', mc: 'rgba(255,255,255,.85)' },
  { body: '#e0a86b', cuff: '#eaf4fc', mc: 'rgba(255,255,255,.85)' },
  { body: '#dc8b6d', cuff: '#eaf4fc', mc: 'rgba(255,255,255,.8)' },
  { body: '#7fae7a', cuff: '#eaf4fc', mc: 'rgba(255,255,255,.85)' },
];

const MOTIFS = ['dots', 'stripes', 'heart', 'checks', 'plain'];
const LENGTHS = ['crew', 'short', 'crew', 'short'];

/**
 * @param {'left'|'right'} side  which side of the section to hang on
 * @param {number} [count]       how many socks on the line
 * @param {number} [seed]        shifts palettes/motifs so rails differ
 * @returns {string} HTML markup (call only inside another component)
 */
export function SockRail(side, count = 3, seed = 0) {
  loadCss('./css/components/SockRail.css');

  const socks = Array.from({ length: count }, (_, i) => {
    const p = RAIL_PALETTES[(i + seed * 3 + (side === 'left' ? 0 : 4)) % RAIL_PALETTES.length];
    const motif = MOTIFS[(i + seed) % MOTIFS.length];
    const length = LENGTHS[(i + seed) % LENGTHS.length];
    const y = 30 + ((i * 13 + seed * 7) % 54); // varied heights on the cord
    const x = side === 'left' ? 8 + ((i * 17) % 28) : 10 + ((i * 11) % 28);
    const w = 44 + ((i * 13 + seed * 11) % 22); // varied sock sizes
    const delay = ((i * 1.4 + (side === 'left' ? 0 : 0.8) + seed * 0.5) % 6).toFixed(1);
    return (
      '<span class="socks__sock" style="--y:' + y + 'px;--x:' + x + 'px;--w:' + w + 'px;--d:' + delay + 's">' +
      sockSvg({ body: p.body, cuff: p.cuff, motif, motifColor: p.mc, length }) +
      '</span>'
    );
  }).join('');

  return (
    '<div class="socks socks--' + side + '" aria-hidden="true">' +
    '<i class="socks__cord"></i>' +
    socks +
    '</div>'
  );
}
