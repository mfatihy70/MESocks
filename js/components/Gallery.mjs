/**
 * Gallery — a friendly placeholder wall for the Instagram feed of
 * instagram.com/mestore.at. Tiles are generated from data, so swapping in
 * real embeds later only means editing the TILES array.
 */
import { loadCss } from '../../lib/cssLoader.mjs';
import { sockSvg } from '../../lib/sockArt.mjs';

const INSTAGRAM_URL = 'https://www.instagram.com/mestore.at/';

const TILES = [
  { caption: 'Vienna motifs', likes: 214, tone: 't1', sock: { body: '#d05b46', cuff: '#fdf6ea' } },
  { caption: 'Paw patrol 🐾', likes: 331, tone: 't2', sock: { body: '#7fae7a', cuff: '#fdf6ea' } },
  { caption: 'Merino cloud', likes: 187, tone: 't3', sock: { body: '#6b9ac4', cuff: '#fdf6ea' } },
  { caption: 'Tiny feet', likes: 256, tone: 't4', sock: { body: '#e2b45a', cuff: '#d05b46' } },
  { caption: 'Riesenrad red', likes: 402, tone: 't5', sock: { body: '#b34432', cuff: '#fdf6ea' } },
  { caption: 'Souvenir wall', likes: 176, tone: 't6', sock: { body: '#a2765b', cuff: '#fdf6ea' } },
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
    '<p class="lede">Placeholder tiles for now — the full parade of wool lives ' +
    'with us on Instagram. Come browse, leave a heart, take a sock home.</p>' +
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
  return (
    '<figure class="tile reveal">' +
    '<div class="tile__inner ' + tile.tone + '">' +
    sockSvg(tile.sock) +
    '</div>' +
    '<figcaption>❤ ' + tile.likes + ' · ' + tile.caption + '</figcaption>' +
    '</figure>'
  );
}
