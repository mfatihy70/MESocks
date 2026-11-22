# ME · Socks & Souvenir — Wollzeile, Wien

A cosy single-page scroll website for a small sock & souvenir shop in the
Wollzeile, the little street behind Stephansdom. 
Just a warm advertisement page.

Everything on the page is a **reusable ES-module component**, and every
component owns **exactly one CSS file**.

## Project structure

```
index.html                     entry page (favicon, base.css + js/app.mjs)
assets/
  me_tabela.jpeg               the shop logo (navbar, hero, tab icon)
css/
  base.css                     global styles & design tokens
  components/
    Navbar.css Hero.css Section.css SockRail.css Gallery.css
    Contact.css Reviews.css Footer.css Riesenrad.css
lib/
  cssLoader.mjs                components register their own CSS here
  reveal.mjs                   IntersectionObserver scroll reveals
  sockArt.mjs                  reusable inline sock SVG (motifs & lengths)
js/
  app.mjs                      mounts all sections, nav config & copy
  components/
    Navbar.mjs Hero.mjs Section.mjs SockRail.mjs Gallery.mjs
    Contact.mjs Reviews.mjs Footer.mjs Riesenrad.mjs
```

## Run it locally

ES modules require `http://`, browsers block `file://`, so serve the
folder once:

```bash
# any of these, from this folder:
python3 -m http.server 8000
npx serve .

# then open http://localhost:8000
```

VS Code users can also use the "Live Server" extension.

## Features

- Single-page scroll: navbar links are plain anchors, smooth scrolling is
  handled by CSS (`scroll-behavior: smooth`), with a scroll-spy pill
  highlight via `IntersectionObserver`.
- The shop logo appears large in the hero, small in the navbar, and as
  the browser tab icon.
- Sock rails on both sides of every section: many different styles
  (dots, stripes, hearts, checks; crew and ankle lengths) with a light
  swaying animation (transform-only).
- A faint Riesenrad (Ferris wheel) in the background that keeps turning
  and quietly parallax-drifts while you scroll — one throttled rAF loop.
- `prefers-reduced-motion` disables all animation.
- Theme: light blue fades, warm sand tones only as accents.

## Placeholders to replace with real data

All marked with a small "placeholder" chip on the page:

- **Contact** (`js/components/Contact.mjs`): phone, e-mail and opening
  hours. The map embed + button use the shop's Google Maps listing
  (pin at 48.2093966, 16.3747986).
- **Gallery** (`js/components/Gallery.mjs`): Instagram blocks server-side
  image pulls, so tiles are sock artwork by default. Add an `img: '...'`
  URL/path to any tile in the `TILES` array and the photo shows instead.
- **Reviews** (`js/components/Reviews.mjs`): Google does not expose
  review texts to automated fetching; copy the real reviews from the
  shop's Google Maps listing into the `REVIEWS` array and remove the
  `placeholder: true` flags.
