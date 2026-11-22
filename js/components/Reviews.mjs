/**
 * Reviews — words from visitors on Google Maps, listed at the bottom of
 * the page. Entries live in the REVIEWS array: copy the real reviews from
 * the shop's Google Maps listing into it and they render here.
 * (Google does not expose review texts to automated fetching, so the
 * entries below are marked placeholders.)
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { sockSvg } from '../../lib/sockArt.mjs';

const MAP_LISTING_URL = 'https://maps.app.goo.gl/mGZ7d9idEZSRgZcF7';

// ⭐ placeholder entries — swap with the real Google Maps reviews
const REVIEWS = [
  {
    name: 'Anna K.',
    stars: 5,
    date: 'a month ago',
    text: 'The cutest little shop in the Wollzeile! Socks for everyone — I got '
      + 'Riesenrad ones for me and paw-print ones for my sister\'s dog. The team was lovely.',
    placeholder: true,
  },
  {
    name: 'Thomas R.',
    stars: 5,
    date: '2 months ago',
    text: 'Perfect stop before the Figlmüller queue. Warm merino socks and a friendly '
      + 'chat — Vienna in a nutshell.',
    placeholder: true,
  },
  {
    name: 'Elena M.',
    stars: 4,
    date: '3 months ago',
    text: 'Tiny store, big selection of designs. Washed my cotton ones five times '
      + 'now and they still look new.',
    placeholder: true,
  },
];

export function Reviews() {
  loadCss('./css/components/Reviews.css');

  const section = document.createElement('section');
  section.className = 'reviews';
  section.id = 'reviews';
  section.innerHTML =
    '<div class="wrap">' +
    '<div class="section__head reveal">' +
    '<p class="kicker">Kind words</p>' +
    '<h2>What visitors say on Google Maps</h2>' +
    '</div>' +
    '<div class="reviews__grid">' +
    REVIEWS.map((r) => buildCard(r)).join('') +
    '</div>' +
    buildSockDivider() +
    '<div class="reviews__cta reveal">' +
    '<a class="btn btn--ghost" href="' + MAP_LISTING_URL + '" target="_blank" rel="noopener">Read all reviews on Google Maps</a>' +
    '</div>' +
    '</div>';

  return section;
}

function buildCard(r) {
  const stars = '★★★★★☆'.slice(5 - r.stars, 10 - r.stars);
  return (
    '<article class="review reveal">' +
    '<div class="review__stars" role="img" aria-label="' + r.stars + ' out of 5 stars">' +
    stars + '</div>' +
    '<blockquote class="review__text">' + r.text + '</blockquote>' +
    '<footer class="review__meta">' +
    '<span class="review__name">' + r.name + '</span>' +
    '<span class="review__date">' + r.date + '</span>' +
    (r.placeholder ? '<em class="chip">placeholder</em>' : '') +
    '<span class="review__via">via Google Maps</span>' +
    '</footer>' +
    '</article>'
  );
}

function buildSockDivider() {
  return (
    '<div class="reviews__divider reveal" aria-hidden="true">' +
    '<span class="reviews__divider-sock">' + sockSvg({ body: '#4d7ba3', cuff: '#eaf4fc', motif: 'heart' }) + '</span>' +
    '</div>'
  );
}
