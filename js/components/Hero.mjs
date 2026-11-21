/**
 * Hero — the landing view. Big cosy headline, two friendly calls to
 * action and a small parade of socks swaying underneath.
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { sockSvg } from '../../lib/sockArt.mjs';
import { SockRail } from './SockRail.mjs';

const HERO_PALETTES = [
  { body: '#d05b46', cuff: '#fdf6ea', dots: 'rgba(255,255,255,.85)' },
  { body: '#e2b45a', cuff: '#d05b46', dots: 'rgba(66,59,50,.5)' },
  { body: '#7fae7a', cuff: '#fdf6ea', dots: 'rgba(255,255,255,.85)' },
  { body: '#6b9ac4', cuff: '#fdf6ea', dots: 'rgba(255,255,255,.85)' },
];

export function Hero() {
  loadCss('./css/components/Hero.css');

  const hero = document.createElement('header');
  hero.className = 'hero';
  hero.id = 'home';
  hero.innerHTML =
    SockRail('left', 2, 1) +
    SockRail('right', 2, 3) +
    '<div class="wrap hero__wrap">' +
    '<p class="kicker reveal">Wollzeile · behind Stephansdom · 1010 Wien</p>' +
    '<h1 class="reveal">Cosy wool socks from the little street behind Stephansdom.</h1>' +
    '<p class="lede reveal">ME is a tiny sock &amp; souvenir shop. Every pair is honestly woolly, ' +
    'knitted warm, and printed with designs for every person, every pet and every Vienna heart.</p>' +
    '<div class="hero__cta reveal">' +
    '<a class="btn" href="#contact">Come say hello</a>' +
    '<a class="btn btn--ghost" href="#wool">Peek the socks</a>' +
    '</div>' +
    '<div class="hero__peek reveal" aria-hidden="true">' +
    HERO_PALETTES.map((p) => '<span class="sock">' + sockSvg(p) + '</span>').join('') +
    '</div>' +
    '</div>';

  return hero;
}
