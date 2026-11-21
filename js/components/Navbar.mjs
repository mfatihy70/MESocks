/**
 * Navbar — floating pill navigation. Links are plain anchors, so the
 * browser does the smooth scrolling (html { scroll-behavior: smooth }).
 * `wire()` adds the scroll-spy highlight and must be called after the
 * target sections exist in the DOM.
 *
 * @param {Array<{id: string, label: string}>} links
 */
import { loadCss } from '../../lib/cssLoader.mjs';

export function Navbar(links = []) {
  loadCss('./css/components/Navbar.css');

  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.innerHTML =
    '<div class="navbar__inner">' +
    '<a class="navbar__brand" href="#home" aria-label="ME Socks and Souvenir, back to top">' +
    '<span class="navbar__logo" aria-hidden="true">ME</span>' +
    '<span class="navbar__tag">Socks &amp; Souvenir</span>' +
    '</a>' +
    '<ul class="navbar__links">' +
    links.map((l) => '<li><a href="#' + l.id + '" data-spy="' + l.id + '">' + l.label + '</a></li>').join('') +
    '</ul>' +
    '</div>';

  // Call after mounting: navbar sections do not exist yet at build time.
  nav.wire = () => wireScrollSpy(nav, links);
  return nav;
}

function wireScrollSpy(nav, links) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          nav.querySelectorAll('[data-spy]').forEach((a) => {
            a.classList.toggle('is-active', a.dataset.spy === entry.target.id);
          });
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    links.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) io.observe(section);
    });
  }

  const scrolled = () => nav.classList.toggle('navbar--scrolled', window.scrollY > 8);
  window.addEventListener('scroll', scrolled, { passive: true });
  scrolled();
}
