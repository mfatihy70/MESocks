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
import { Footer } from './components/Footer.mjs';
import { Riesenrad } from './components/Riesenrad.mjs';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'wollzeile', label: 'Wollzeile Story' },
  { id: 'wool', label: 'Wool & Designs' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

const ABOUT_BODY = `
<p class="lede">ME is a small family shop in the Wollzeile, the quiet cobbled lane
that curves behind Stephansdom. Wool socks, sweet souvenirs, zero rush —
drop in for a pair or just for a chat.</p>
<div class="cards">
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🧶</span>
    <h3>Small shop, big parade</h3>
    <p>Over a hundred designs rotate through our shelves — from classic
    ribbed wool to cheeky motifs you will not find in the big stores.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🎡</span>
    <h3>Vienna to take home</h3>
    <p>Souvenir socks with Stephansdom, Riesenrad and coffeehouse prints —
    light enough for the suitcase, warm enough for the memory.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🤝</span>
    <h3>Genuine wool, genuine hello</h3>
    <p>No queues, no rush, no upselling. Just a cosy little room, honest
    advice, and whoever is behind the counter will happily chat about wool.</p>
  </div>
</div>`;

const WOLLZEILE_BODY = `
<p class="lede">One narrow street, two Vienna legends. The Wollzeile winds behind
Stephansdom like a woollen thread — and for over a century it has been the
address where the city stores its cosiness.</p>
<div class="story">
  <div class="story__card reveal">
    <span class="story__year">1905</span>
    <h3>Wollzeile 5 — where the schnitzel was born</h3>
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

const WOOL_BODY = `
<p class="lede">Everything we hang on our cords is honestly woolly. Merino and alpine
wool breathe with you: warm on the frostiest Graben morning, never itchy,
never scratchy — socks that feel like a Sunday afternoon.</p>
<div class="cards">
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🐑</span>
    <h3>Wool, not cotton candy</h3>
    <p>Soft merino and sturdy Alpine wool, knitted thick for winter and
    light for in-between seasons. Warm feet are a lifestyle.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🧦</span>
    <h3>Designs for every person</h3>
    <p>Stripes, polka dots, cathedrals, Ferris wheels, coffeehouses —
    from grandparents to teenagers, everyone leaves with a grin.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🐾</span>
    <h3>And for every pet</h3>
    <p>Paw prints, dachshunds and city cats on your cuffs — souvenirs for
    the humans, tiny pairs for the four-legged Viennese.</p>
  </div>
  <div class="card reveal">
    <span class="card__emoji" aria-hidden="true">🎄</span>
    <h3>Advent-ready</h3>
    <p>Christmas stockings are our heritage: hand-printed advent socks
    that make the tree look good and December feel warmer.</p>
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
      title: 'A tiny shop with an oversized heart',
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
      id: 'wool',
      kicker: 'Why wool',
      title: 'Wool on every shelf, a design for every soul',
      body: WOOL_BODY,
      tone: 'paper',
      seed: 1,
    }),
    Gallery(),
    Contact(),
    Footer()
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
