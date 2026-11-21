/**
 * SockRail — a little clothesline of wool socks that hangs beside a
 * section. Purely decorative, generated from a rotating palette so every
 * rail looks different. Returns an HTML string for easy embedding.
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { sockSvg } from '../../lib/sockArt.mjs';

const SOCK_PALETTES = [
  { body: '#d05b46', cuff: '#fdf6ea', dots: 'rgba(255,255,255,.85)' },
  { body: '#7fae7a', cuff: '#fdf6ea', dots: 'rgba(255,255,255,.85)' },
  { body: '#d98c4a', cuff: '#423b32', dots: 'rgba(255,255,255,.8)' },
  { body: '#6b9ac4', cuff: '#fdf6ea', dots: 'rgba(255,255,255,.85)' },
  { body: '#e2b45a', cuff: '#d05b46', dots: 'rgba(66,59,50,.5)' },
  { body: '#a2765b', cuff: '#fdf6ea', dots: 'rgba(255,255,255,.8)' },
];

/**
 * @param {'left'|'right'} side  which side of the section to hang on
 * @param {number} [count]       how many socks on the line
 * @param {number} [seed]        shifts the palette so rails differ
 * @returns {string} HTML markup (call only inside another component)
 */
export function SockRail(side, count = 3, seed = 0) {
  loadCss('./css/components/SockRail.css');

  const socks = Array.from({ length: count }, (_, i) => {
    const shift = side === 'left' ? 0 : 2;
    const palette = SOCK_PALETTES[(i + shift + seed) % SOCK_PALETTES.length];
    const y = 34 + ((i * 13 + seed * 7) % 56); // varied heights on the cord
    const x = side === 'left' ? 10 + ((i * 17) % 26) : 12 + ((i * 11) % 26);
    const delay = ((i * 1.3 + (side === 'left' ? 0 : 0.9) + seed * 0.4) % 6).toFixed(1);
    return (
      '<span class="socks__sock" style="--y:' + y + 'px;--x:' + x + 'px;--d:' + delay + 's">' +
      sockSvg(palette) +
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
