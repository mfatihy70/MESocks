/**
 * Shared sock artwork, used by the hanging sock rails, the hero and the
 * gallery tiles. Returns a standalone inline SVG string, so it can be
 * embedded anywhere without extra assets.
 *
 * Styles vary per call: motif (dots | stripes | heart | checks | plain)
 * and length (crew | short ankle sock).
 */
let uid = 0;

const FOOT =
  'c0 2 .8 3.6 2.4 4.7 l5.7 3.9 c4.6 3.2 5.4 9.9 1.6 14.1 ' +
  'c-3.1 3.4 -8.4 4.2 -12.4 1.9 l-8.7 -4.9 ' +
  'c-2.2 -1.3 -3.5 -3.7 -3.5 -6.3 Z';

/**
 * @param {{body?: string, cuff?: string, motif?: 'dots'|'stripes'|'heart'|'checks'|'plain',
 *          motifColor?: string, length?: 'crew'|'short'}} [palette]
 * @returns {string} inline SVG markup
 */
export function sockSvg({
  body = '#4d7ba3',
  cuff = '#eaf4fc',
  motif = 'dots',
  motifColor = 'rgba(255,255,255,.85)',
  length = 'crew',
} = {}) {
  const id = 'sockart-' + (++uid);
  const leg = length === 'short' ? 11 : 20;
  const d = 'M13 8 h14 v' + leg + ' ' + FOOT;
  const h = leg + 36;

  return (
    '<svg class="sock-art" viewBox="0 0 40 ' + h + '" role="img" aria-hidden="true" focusable="false">' +
    '<defs><clipPath id="' + id + '"><path d="' + d + '"/></clipPath></defs>' +
    '<path d="' + d + '" fill="' + body + '" stroke="rgba(60,75,92,.3)" stroke-width="1"/>' +
    '<g clip-path="url(#' + id + ')">' + buildMarks(motif, leg, motifColor) + '</g>' +
    '<rect x="11.4" y="2" width="17" height="7" rx="3.5" fill="' + cuff + '" stroke="rgba(60,75,92,.3)" stroke-width="1"/>' +
    '</svg>'
  );
}

function buildMarks(motif, leg, color) {
  if (motif === 'plain') return '';

  if (motif === 'dots') {
    return (
      '<circle cx="18" cy="' + (12 + leg * 0.25).toFixed(1) + '" r="2" fill="' + color + '"/>' +
      '<circle cx="24" cy="' + (12 + leg * 0.55).toFixed(1) + '" r="2" fill="' + color + '"/>' +
      '<circle cx="18" cy="' + (12 + leg * 0.85).toFixed(1) + '" r="2" fill="' + color + '"/>'
    );
  }

  if (motif === 'stripes') {
    const rows = Math.max(2, Math.round(leg / 7));
    let out = '';
    for (let i = 0; i < rows; i++) {
      const y = (11 + (i * leg) / rows).toFixed(1);
      out += '<rect x="11" y="' + y + '" width="18" height="' + (leg / (rows * 3.2)).toFixed(1) + '" fill="' + color + '"/>';
    }
    return out;
  }

  if (motif === 'heart') {
    const heart =
      'M0 1 C -1.6 -1 -3.4 0.2 -2.2 1.8 L 0 4 L 2.2 1.8 C 3.4 0.2 1.6 -1 0 1 Z';
    return (
      '<path d="' + heart + '" fill="' + color + '" transform="translate(17.5,' + (11 + leg * 0.2).toFixed(1) + ') scale(1.05)"/>' +
      '<path d="' + heart + '" fill="' + color + '" transform="translate(24,' + (11 + leg * 0.75).toFixed(1) + ') scale(0.85)"/>' +
      '<path d="' + heart + '" fill="' + color + '" transform="translate(19.5,' + (31 + leg * 0.15).toFixed(1) + ') scale(0.9)"/>'
    );
  }

  if (motif === 'checks') {
    const y1 = 11 + leg * 0.25;
    const y2 = 11 + leg * 0.72;
    const slope = (leg / 5).toFixed(1);
    let out = '';
    for (const y of [y1, y2]) {
      out +=
        '<path d="M11 ' + y.toFixed(1) + ' l16 ' + slope + '" stroke="' + color + '" stroke-width="1.7" fill="none"/>' +
        '<path d="M27 ' + y.toFixed(1) + ' l-16 ' + slope + '" stroke="' + color + '" stroke-width="1.7" fill="none"/>';
    }
    return out;
  }

  return '';
}
