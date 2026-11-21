#!/usr/bin/env node
/**
 * Smoke test: imports the REAL ES modules of this project and mounts the
 * whole app against a minimal DOM stub (no browser needed). Verifies that
 * every section exists, every component registers its own CSS file,
 * and mounting completes without runtime errors.
 *
 * Usage: node tools/smoke-test.mjs
 */
// Minimal DOM stub -----------------------------------------------------------
const collectedCssLinks = [];

class ClassList {
  constructor() { this.set = new Set(); }
  add(...t) { t.forEach((c) => this.set.add(c)); }
  remove(...t) { t.forEach((c) => this.set.delete(c)); }
  toggle(c, force) {
    if (force === undefined) { this.set.has(c) ? this.set.delete(c) : this.set.add(c); }
    else { force ? this.set.add(c) : this.set.delete(c); }
  }
  contains(c) { return this.set.has(c); }
}

class Element {
  constructor(tag) {
    this.tagName = tag.toUpperCase();
    this.className = '';
    this.id = '';
    this.innerHTML = '';
    this.dataset = {};
    this.style = {};
    this.children = [];
    this.classList = new ClassList();
  }
  append(...kids) { this.children.push(...kids); }
  setAttribute(name, value) {
    if (name === 'id') this.id = value;
    if (name === 'class') this.className = value;
    this[name] = value;
  }
  querySelector() { return null; }
  querySelectorAll() { return []; }
  addEventListener() {}
}

const app = new Element('main');
app.id = 'app';

globalThis.window = {
  scrollY: 0,
  addEventListener() {},
  requestAnimationFrame: undefined, // animation/parallax stay inert in the stub
  __ME_INLINE_CSS__: false,         // simulate the real multi-file page
};
globalThis.document = {
  readyState: 'complete',
  createElement: (tag) => new Element(tag),
  getElementById: (id) => (id === 'app' ? app : new Element('section')),
  addEventListener() {},
  head: { append: (link) => collectedCssLinks.push(link.href) },
};

const assert = (cond, msg) => {
  if (!cond) { console.error('FAIL: ' + msg); process.exitCode = 1; }
  else { console.log('  ok: ' + msg); }
};

const run = async () => {
  // importing app.mjs mounts the entire single-page site
  await import(new URL('../js/app.mjs', import.meta.url).href);

  console.log('Mounted top-level pieces:');
  app.children.forEach((c) => console.log('   - ' + (c.className || c.tagName) + (c.id ? '#' + c.id : '')));
  assert(app.children.length === 9, '9 top-level pieces mounted');

  const ids = app.children.map((c) => c.id);
  for (const id of ['home', 'about', 'wollzeile', 'wool', 'gallery', 'contact']) {
    assert(ids.includes(id), `section id "${id}" present`);
  }

  // navbar + scroll-spy wiring must not throw without IntersectionObserver
  const navbar = app.children.find((c) => c.className === 'navbar');
  assert(!!navbar, 'navbar mounted');
  assert(!!navbar.wire, 'navbar exposes .wire()');
  navbar.wire();
  assert(navbar.innerHTML.includes('#about'), 'navbar links to #about');
  assert(navbar.innerHTML.includes('#gallery'), 'navbar links to #gallery');

  // background Riesenrad with 8 cabins (plus the stand base rect)
  const rad = app.children.find((c) => c.className === 'riesenrad');
  assert(!!rad, 'riesenrad mounted');
  assert((rad.innerHTML.match(/<rect/g) || []).length === 9, 'riesenrad has 8 cabins + base');

  // hero
  const hero = app.children.find((c) => c.id === 'home');
  assert(hero.innerHTML.includes('socks--left'), 'hero has left sock rail');
  assert(hero.innerHTML.includes('socks--right'), 'hero has right sock rail');
  assert(hero.innerHTML.includes('#contact'), 'hero CTA scrolls to contact');

  // sections carry rails + content
  for (const id of ['about', 'wollzeile', 'wool', 'contact']) {
    const s = app.children.find((c) => c.id === id);
    assert(s.innerHTML.includes('socks--left') && s.innerHTML.includes('socks--right'), `"${id}" has side sock rails`);
  }
  const wollzeile = app.children.find((c) => c.id === 'wollzeile');
  assert(wollzeile.innerHTML.includes('1905'), 'wollzeile story mentions 1905');
  assert(wollzeile.innerHTML.includes('Figlm'), 'wollzeile story mentions Figlmüller');

  // gallery + contact essentials
  const gallery = app.children.find((c) => c.id === 'gallery');
  assert(gallery.innerHTML.includes('instagram.com/mestore.at'), 'gallery links to instagram');
  assert((gallery.innerHTML.match(/class="tile reveal"/g) || []).length === 6, 'gallery has 6 tiles');
  const contact = app.children.find((c) => c.id === 'contact');
  assert(contact.innerHTML.includes('google.com/maps'), 'contact links to Google Maps');
  assert(contact.innerHTML.includes('placeholder'), 'contact details marked as placeholders');

  // every component registered exactly one stylesheet of its own
  const expected = [
    './css/components/Riesenrad.css', './css/components/SockRail.css',
    './css/components/Navbar.css', './css/components/Hero.css',
    './css/components/Section.css', './css/components/Gallery.css',
    './css/components/Contact.css', './css/components/Footer.css',
  ];
  for (const css of expected) assert(collectedCssLinks.includes(css), 'loaded own css: ' + css);
  assert(new Set(collectedCssLinks).size === collectedCssLinks.length, 'no duplicate css loads');

  console.log('\nCSS links appended to <head>:');
  collectedCssLinks.forEach((l) => console.log('   ' + l));
  console.log('\nSmoke test finished.');
};

run();
