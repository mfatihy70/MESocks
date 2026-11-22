/**
 * Hero — the landing view. The big shop logo, a cosy headline, two
 * friendly calls to action and a small parade of different socks
 * swaying underneath.
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { sockSvg } from '../../lib/sockArt.mjs';
import { SockRail } from './SockRail.mjs';

const LOGO_SRC = './assets/me_tabela.jpeg';

const HERO_SOCKS = [
  { body: '#4d7ba3', cuff: '#eaf4fc', motif: 'dots', length: 'crew' },
  { body: '#e0a86b', cuff: '#eaf4fc', motif: 'stripes', length: 'crew' },
  { body: '#8fc1de', cuff: '#39678c', motif: 'heart', length: 'short' },
  { body: '#39678c', cuff: '#cfe4f2', motif: 'checks', length: 'crew' },
  { body: '#dc8b6d', cuff: '#eaf4fc', motif: 'dots', length: 'short' },
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
    '<img class="hero__logo reveal" src="' + LOGO_SRC + '" alt="ME sign: a ferris wheel with four hanging stockings" width="240" height="241" />' +
    '<p class="kicker reveal">Wollzeile · Stephansdom · 1st District</p>' +
    '<h1 class="reveal">Cosy socks from the little street behind Stephansdom.</h1>' +
    '<p class="lede reveal">ME is a tiny sock &amp; souvenir shop. Our socks are soft 85% cotton,   ' +
    'with wool options for real winter and wear designs for every person, every pet and every Vienna heart.</p>' +
    '<div class="hero__cta reveal">' +
    '<a class="btn" href="#contact">Come say hello</a>' +
    '<a class="btn btn--ghost" href="#socks">Peek the socks</a>' +
    '</div>' +
    '<div class="hero__peek reveal" aria-hidden="true">' +
    HERO_SOCKS.map((p) => '<span class="sock">' + sockSvg(p) + '</span>').join('') +
    '</div>' +
    '</div>';

  return hero;
}
