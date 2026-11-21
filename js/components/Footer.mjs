/**
 * Footer — one last friendly wave.
 */
import { loadCss } from '../../lib/cssLoader.mjs';

export function Footer() {
  loadCss('./css/components/Footer.css');

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML =
    '<div class="wrap">' +
    '<p class="footer__brand">ME · Socks &amp; Souvenir</p>' +
    '<p class="footer__note">Wollzeile · 1010 Wien — a small shop with warm feet.</p>' +
    '<p class="footer__fine">Made with <span aria-hidden="true">❤️</span> and wool · ' +
    '<a href="https://www.instagram.com/mestore.at/" target="_blank" rel="noopener">@mestore.at</a></p>' +
    '</div>';

  return footer;
}
