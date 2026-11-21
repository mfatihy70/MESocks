/**
 * Shared sock artwork, used by the hanging sock rails, the hero and the
 * gallery tiles. Returns a standalone inline SVG string, so it can be
 * embedded anywhere without extra assets.
 */
const SOCK_PATH =
  'M13 8 h14 v20 c0 2 .8 3.6 2.4 4.7 ' +
  'l5.7 3.9 c4.6 3.2 5.4 9.9 1.6 14.1 ' +
  'c-3.1 3.4 -8.4 4.2 -12.4 1.9 l-8.7 -4.9 ' +
  'c-2.2 -1.3 -3.5 -3.7 -3.5 -6.3 Z';

/**
 * @param {{body?: string, cuff?: string, dots?: string}} [palette]
 * @returns {string} inline SVG markup
 */
export function sockSvg({ body = '#d05b46', cuff = '#fdf6ea', dots = 'rgba(255,255,255,.85)' } = {}) {
  return (
    '<svg class="sock-art" viewBox="0 0 40 56" role="img" aria-hidden="true" focusable="false">' +
    '<path d="' + SOCK_PATH + '" fill="' + body + '" stroke="rgba(66,59,50,.28)" stroke-width="1"/>' +
    '<rect x="11.4" y="2" width="17" height="7" rx="3.5" fill="' + cuff + '" stroke="rgba(66,59,50,.28)" stroke-width="1"/>' +
    '<circle cx="19" cy="16" r="2" fill="' + dots + '"/>' +
    '<circle cx="24" cy="21" r="2" fill="' + dots + '"/>' +
    '<circle cx="18" cy="27" r="2" fill="' + dots + '"/>' +
    '</svg>'
  );
}
