/**
 * ME · Socks & Souvenir — single-page scroll site.
 *
 * Every chapter on the page is a reusable ES-module component and each
 * component registers its own stylesheet on first use. Nav links are
 * plain anchors: the browser smooth-scrolls to the sections.
 */
import { observeReveals } from '../lib/reveal.mjs';
import { Navbar } from './components/Navbar.mjs';
import { Hero } from './components/Hero.mjs';
import { Section } from './components/Section.mjs';
import { Gallery } from './components/Gallery.mjs';
import { Contact } from './components/Contact.mjs';
import { Reviews } from './components/Reviews.mjs';
import { Footer } from './components/Footer.mjs';
import { Riesenrad } from './components/Riesenrad.mjs';
import { Snow } from './components/Snow.mjs';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'wollzeile', label: 'Wollzeile' },
  { id: 'socks', label: 'The Socks' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
  { id: 'reviews', label: 'Reviews' },
];

const ABOUT_BODY = `
<p class="lede">ME is a small family shop in the Wollzeile, the quiet cobbled lane
that curves behind Stephansdom. Socks, sweet souvenirs, zero rush -
drop in for a pair or just for a chat.</p>
<div class="cards cards--four">
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🧶</span>
    <h3>Small shop, big parade</h3>
    <p>Over a hundred designs rotate through our shelves from classic
    ribbed cotton to cheeky motifs you will not find in the big stores.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🎡</span>
    <h3>Vienna to take home</h3>
    <p>Souvenir socks with Stephansdom, Riesenrad and coffeehouse prints,
    light enough for the suitcase, warm enough for the memory.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🤝</span>
    <h3>Cosy advice, genuine hello</h3>
    <p>No queues, no rush, no upselling. Just a cosy little room, honest
    advice, and whoever is behind the counter will happily chat socks.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🎁</span>
    <h3>Little gifts, lovely memories</h3>
    <p>From a tiny thank-you to a fun souvenir, every pair makes an easy
    gift and a cheerful reminder of a beautiful day in Vienna.</p>
  </div>
</div>`;

const WOLLZEILE_BODY = `
<p class="lede">One narrow street, two Vienna legends. The Wollzeile winds behind
Stephansdom like a woollen thread, and for over a century it has been the
address where the city stores its cosiness.</p>
<div class="story">
  <div class="story__card reveal">
    <span class="story__year">1905</span>
    <h3>Wollzeile - Where the schnitzel was born</h3>
    <p>Johann Figlmüller opens a small wine tavern here. The schnitzel that
    made the street famous is born — a plate-overflowing legend that still
    draws a queue down the lane every single day.</p>
  </div>
  <div class="story__card reveal">
    <span class="story__year">Today</span>
    <h3>Two doors of cosiness</h3>
    <p>Follow the curve of the lane past the cathedral's shadow and the
    scent of schnitzel: a little smaller, a little woollier — ME keeps
    Vienna's feet warm, one pair at a time.</p>
  </div>
</div>
<p class="pull reveal">"Between St. Stephen's towers and Figlmüller's pans,
we keep Vienna's feet warm."</p>`;

const SOCKS_BODY = `
<p class="lede">Most of our socks are 85% cotton — soft, breathable, and happy in
everyday shoes. For real winter days we keep wool options on the shelf.
Both wear designs for every person and every pet.</p>
<div class="cards cards--four">
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🧦</span>
    <h3>85% cotton</h3>
    <p>Everyday softness that breathes, keeps its shape wash after wash,
    and never itches. The comfy 15% is stretch, so the socks stay up.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🐑</span>
    <h3>Wool options</h3>
    <p>When the wind comes down the Wollzeile: merino and alpine wool
    blends that warm like a hug and still let your feet breathe.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🎨</span>
    <h3>For every person</h3>
    <p>Stripes, dots, checks, hearts — Stephansdom, Riesenrad and
    coffeehouse motifs. From grandparents to teenagers, everyone grins.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🐾</span>
    <h3>And every pet</h3>
    <p>Paw prints, dachshunds and city cats on your cuffs — souvenirs for
    the humans, tiny pairs for the four-legged Viennese.</p>
  </div>
</div>`;

function mount() {
  const app = document.getElementById('app');
  if (!app) return;

  const navbar = Navbar(NAV_LINKS);

  app.append(
    // background scenery: the turning Riesenrad + drifting clouds
    Riesenrad(),
    navbar,
    Hero(),
    Section({
      id: 'about',
      kicker: 'About us',
      title: 'A tiny shop with an oversized heart ♥️',
      body: ABOUT_BODY,
      tone: 'paper',
      seed: 2,
    }),
    Section({
      id: 'wollzeile',
      kicker: 'The street we call home',
      title: 'The Wollzeile story',
      body: WOLLZEILE_BODY,
      tone: 'cream',
      seed: 4,
    }),
    Section({
      id: 'socks',
      kicker: 'The socks',
      title: '85% cotton, wool when you want it, a design for everyone.',
      body: SOCKS_BODY,
      tone: 'paper',
      seed: 1,
    }),
    Gallery(),
    Contact(),
    Reviews(),
    Footer(),
    Snow()
  );

  // now the sections exist: activate the scroll-spy
  navbar.wire();
  // fade chapters in as they enter the viewport
  observeReveals(app);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
