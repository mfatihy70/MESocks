# ME · Socks & Souvenir — Wollzeile, Wien

A cosy single-page scroll website for a small sock & souvenir shop in the
Wollzeile, the little street behind Stephansdom. Not an e-commerce shop —
just a friendly advertisement page.

Everything on the page is a **reusable ES-module component**, and every
component owns **exactly one CSS file**.

## Project structure

```
index.html                     entry page (loads css/base.css + js/app.mjs)
css/
  base.css                     global styles & design tokens
  components/
    Navbar.css                 floating pill navbar
    Hero.css                   landing view
    Section.css                reusable section shell (+ story cards)
    SockRail.css               animated sock clothesline
    Gallery.css                Instagram placeholder wall
    Contact.css                placeholder contact card + maps link
    Footer.css                 footer
    Riesenrad.css              background Ferris wheel & clouds
lib/
  cssLoader.mjs                components register their own CSS here
  reveal.mjs                   IntersectionObserver scroll reveals
  sockArt.mjs                  reusable inline sock SVG
js/
  app.mjs                      mounts all sections, nav config & copy
  components/
    Navbar.mjs  Hero.mjs  Section.mjs  SockRail.mjs
    Gallery.mjs  Contact.mjs  Footer.mjs  Riesenrad.mjs
tools/
  build-preview.mjs            bundles everything into one preview file
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
  handled by CSS (`scroll-behavior: smooth`).
- Scroll-spy: the navbar pill highlights the section you are looking at
  via `IntersectionObserver`.
- Sock rails on both sides of every section, gently swaying (one
  keyframe, transform-only).
- A faint Riesenrad (Ferris wheel) in the background that keeps turning
  and quietly parallax-drifts while you scroll — one throttled rAF loop.
- `prefers-reduced-motion` disables all animation.
- Contact details are clearly marked **placeholders**; the Google Maps
  link points at Wollzeile 5, 1010 Wien.

## Bundle a single-file preview

```bash
node tools/build-preview.mjs dist/preview.html
```

Strips module imports/exports, inlines all component CSS and writes a
self-contained page (handy for sandboxed previews and sharing).
