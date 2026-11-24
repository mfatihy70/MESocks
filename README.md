# ME · Socks & Souvenir — Wollzeile, Wien

A cosy single-page scroll website for a small sock & souvenir shop in the
Wollzeile, the little street behind Stephansdom. 
Just a warm advertisement page.

The page is deliberately simple: **all content lives as plain HTML** in
`index.html`. One stylesheet, one script, no build step, no framework.

## Project structure

```
index.html        the whole page: navbar, hero, sections, gallery,
                  contact, reviews and footer as readable HTML
main.css          all styles (design tokens + one commented block per
                  page section)
main.js           decorative artwork generators (socks, ferris wheel,
                  gallery tiles) and the small animations
assets/
  me_logo.jpeg & me_tabela.jpeg    shop logo and photos
```

`index.html` marks the decorative mount points with `data-*` attributes
(`data-socks`, `data-hero-socks`, `data-gallery`, `data-riesenrad`,
`data-sock`); `main.js` fills them on load. Without JavaScript the page
still shows all of its content, just without the artwork and animations.

## Run it locally

Nothing to install — just open `index.html` in a browser, serve the
folder with any static server, or host it as-is on GitHub Pages:

```bash
python3 -m http.server 8000   # or: npx serve .
# then open http://localhost:8000
```

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

- **Contact**: in `index.html`, the phone, e-mail and opening hours in the
  `#contact` section. The map embed + button use the shop's Google Maps
  listing (pin at 48.2093966,16.3747986).
- **Gallery**: in `main.js`, the `TILES` array. Instagram blocks
  server-side image pulls, so tiles are sock artwork by default. Add an
  `img: '...'` URL to any tile and the photo shows instead.
- **Reviews**: in `index.html`, the `.review` cards in the `#reviews`
  section. Google does not expose review texts to automated fetching;
  copy the real reviews from the shop's Google Maps listing in and remove
  the `placeholder` chips.
