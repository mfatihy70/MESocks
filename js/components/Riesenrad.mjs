/**
 * Riesenrad — the Vienna Ferris wheel that lives in the page background.
 *
 * A faint fixed wheel that keeps slowly turning and gently parallax-rides
 * while you scroll. One rAF loop, transform-only, and it only runs while
 * the scroll position is still settling — cheap on purpose.
 */
import { loadCss } from '../../lib/cssLoader.mjs';

const RISENRAD_PALETTE = [
  '#d05b46', // red
  '#e2b45a', // gold
  '#7fae7a', // green
  '#6b9ac4', // blue
  '#d98c4a', // orange
  '#a2765b', // camel
];

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
  const cx = 80;
  const cy = 78;
  const R = 62;
  const N = 8;

  let spokes = '';
  let cabins = '';

  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const x = (cx + Math.cos(a) * R).toFixed(1);
    const y = (cy + Math.sin(a) * R).toFixed(1);

    spokes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" class="rw-spoke"/>';

    cabins +=
      '<g>' +
      '<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (Number(y) + 6) + '" class="rw-drop"/>' +
      '<rect x="' + (Number(x) - 6.5) + '" y="' + (Number(y) + 6) +
      '" width="13" height="15" rx="4.5" fill="' + RISENRAD_PALETTE[i % RISENRAD_PALETTE.length] + '" class="rw-cabin"/>' +
      '</g>';
  }

  return (
    '<svg viewBox="0 0 160 172" role="img" focusable="false">' +
    '<g class="riesenrad__frame">' +
    '<path d="M80 78 L44 158" class="rw-leg"/>' +
    '<path d="M80 78 L116 158" class="rw-leg"/>' +
    '<rect x="34" y="154" width="92" height="7" rx="3.5" class="rw-base"/>' +
    '</g>' +
    '<g class="riesenrad__wheel">' +
    spokes +
    '<circle cx="80" cy="78" r="' + R + '" class="rw-rim"/>' +
    cabins +
    '<circle cx="80" cy="78" r="7" class="rw-hub"/>' +
    '</g>' +
    '</svg>'
  );
}

/**
 * Gentle scroll parallax: the wheel drifts up a few pixels as you scroll
 * down, eased with a small lerp so it feels woolly rather than twitchy.
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
