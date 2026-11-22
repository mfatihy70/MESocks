/**
 * Riesenrad — the Vienna Ferris wheel that lives in the page background.
 *
 * A faint fixed wheel that keeps slowly turning and gently parallax-rides
 * while you scroll. One rAF loop, transform-only, and it only runs while
 * the scroll position is still settling — cheap on purpose.
 *
 * Geometry note: the cabins sweep a circle of radius R + drop + height
 * around the hub, so the viewBox is centred on the hub with enough margin
 * in every direction (nothing gets clipped, the wheel stays centred).
 */
import { loadCss } from '../../lib/cssLoader.mjs';

const RISENRAD_PALETTE = [
  '#8fc1de', // light blue
  '#39678c', // deep blue
  '#cfe4f2', // mist
  '#4d7ba3', // steel blue
  '#6f9fc0', // dusty blue
  '#e0a86b', // one warm cabin, like the golden hour on the Prater
];

const CX = 90;
const CY = 96;
const R = 60;
const N = 8;

export function Riesenrad() {
  loadCss('./css/components/Riesenrad.css');

  const el = document.createElement('div');
  el.className = 'riesenrad';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML =
    '<span class="cloud cloud--1"></span>' +
    '<span class="cloud cloud--2"></span>' +
    '<div class="riesenrad__lift">' +
    buildSvg() +
    '</div>';

  attachParallax(el.querySelector('.riesenrad__lift'));
  return el;
}

function buildSvg() {
  let spokes = '';
  let cabins = '';

  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const x = (CX + Math.cos(a) * R).toFixed(1);
    const y = (CY + Math.sin(a) * R).toFixed(1);

    spokes += '<line x1="' + CX + '" y1="' + CY + '" x2="' + x + '" y2="' + y + '" class="rw-spoke"/>';

    // Counter-rotating hangers keep each cabin vertical as the wheel turns.
    cabins +=
      '<g transform="translate(' + x + ' ' + y + ')">' +
      '<g class="rw-cabin-hanger">' +
      '<line x1="0" y1="0" x2="0" y2="6" class="rw-drop"/>' +
      '<rect x="-7" y="6" width="14" height="16" rx="5" fill="' +
      RISENRAD_PALETTE[i % RISENRAD_PALETTE.length] + '" class="rw-cabin"/>' +
      '</g>' +
      '</g>';
  }

  return (
    '<svg viewBox="0 0 180 208" role="img" focusable="false">' +
    '<g class="riesenrad__frame">' +
    '<path d="M' + CX + ' ' + CY + ' L54 186" class="rw-leg"/>' +
    '<path d="M' + CX + ' ' + CY + ' L126 186" class="rw-leg"/>' +
    '<rect x="42" y="182" width="96" height="7" rx="3.5" class="rw-base"/>' +
    '</g>' +
    '<g class="riesenrad__wheel">' +
    spokes +
    '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" class="rw-rim"/>' +
    cabins +
    '<circle cx="' + CX + '" cy="' + CY + '" r="7" class="rw-hub"/>' +
    '</g>' +
    '</svg>'
  );
}

/**
 * Gentle scroll parallax: the wheel drifts up a few pixels as you scroll
 * down, eased with a small lerp so it feels soft rather than twitchy.
 */
function attachParallax(lift) {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.requestAnimationFrame) return;

  let target = 0;
  let current = 0;
  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      target = window.scrollY;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(step);
      }
    },
    { passive: true }
  );

  function step() {
    current += (target - current) * 0.08;
    const drift = (-current * 0.07).toFixed(2);
    lift.style.transform = 'translateY(' + drift + 'px)';
    if (Math.abs(target - current) > 0.5) {
      window.requestAnimationFrame(step);
    } else {
      ticking = false;
    }
  }
}
