/**
 * Gallery — a wall for the Instagram feed of instagram.com/mestore.at.
 * Tiles are generated from data: give a tile an `img` URL or path and it
 * shows the photo (drop the real post photos in one line each); without
 * an img, a cosy sock artwork tile is drawn instead.
 *
 * Note: Instagram blocks server-side pulling of its images, so the
 * default tiles are placeholders until photo URLs are added.
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { sockSvg } from '../../lib/sockArt.mjs';

const INSTAGRAM_URL = 'https://www.instagram.com/mestore.at/';

const TILES = [
  { caption: 'Vienna motifs', likes: 214, tone: 't1', sock: { body: '#4d7ba3', cuff: '#eaf4fc', motif: 'checks' } },
  { caption: 'Paw patrol 🐾', likes: 331, tone: 't2', sock: { body: '#7fae7a', cuff: '#eaf4fc', motif: 'dots' } },
  { caption: 'Cloud cotton', likes: 187, tone: 't3', sock: { body: '#8fc1de', cuff: '#39678c', motif: 'heart' } },
  { caption: 'Tiny feet', likes: 256, tone: 't4', sock: { body: '#e0a86b', cuff: '#eaf4fc', motif: 'stripes', length: 'short' } },
  { caption: 'Riesenrad red', likes: 402, tone: 't5', sock: { body: '#39678c', cuff: '#cfe4f2', motif: 'dots' } },
  { caption: 'Souvenir wall', likes: 176, tone: 't6', sock: { body: '#dc8b6d', cuff: '#eaf4fc', motif: 'stripes' } },
];

export function Gallery() {
  loadCss('./css/components/Gallery.css');

  const gallery = document.createElement('section');
  gallery.className = 'gallery';
  gallery.id = 'gallery';
  gallery.innerHTML =
    '<div class="wrap">' +
    '<div class="section__head reveal">' +
    '<p class="kicker">Fresh off the timeline</p>' +
    '<h2>A little wall of our Instagram favourites</h2>' +
    '<p class="lede">Right now these are placeholder tiles — Instagram keeps its ' +
    'photos behind a login. The full parade of wool lives with us on Instagram; ' +
    'add the photo links in <code>Gallery.mjs</code> and they appear here.</p>' +
    '</div>' +
    '<div class="gallery__grid">' +
    TILES.map((tile) => buildTile(tile)).join('') +
    '</div>' +
    '<div class="gallery__cta reveal">' +
    '<a class="btn" href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener">Follow @mestore.at</a>' +
    '</div>' +
    '<p class="gallery__note reveal">Photos &amp; reels: instagram.com/mestore.at</p>' +
    '</div>';

  return gallery;
}

function buildTile(tile) {
  const art = tile.img
    ? '<img class="tile__img" src="' + tile.img + '" alt="Photo from our Instagram: ' + tile.caption + '" loading="lazy" />'
    : sockSvg(tile.sock);

  return (
    '<figure class="tile reveal">' +
    '<div class="tile__inner ' + tile.tone + '">' +
    '<span class="tile__badge" aria-hidden="true">📷</span>' +
    art +
    '</div>' +
    '<figcaption>❤ ' + tile.likes + ' · ' + tile.caption + '</figcaption>' +
    '</figure>'
  );
}
