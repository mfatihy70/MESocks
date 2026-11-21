#!/usr/bin/env node
/**
 * Bundles the component project into ONE self-contained preview page
 * (needed for sandboxed previews, which cannot load sibling files).
 *
 * ES-module imports/exports are stripped and the module bodies are
 * concatenated in the same order they import each other. Component CSS
 * files are inlined; components detect this via window.__ME_INLINE_CSS__
 * and skip loading their own <link> stylesheets.
 *
 * Usage:  node tools/build-preview.mjs [output.html]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const out = process.argv[2]
  ? join(process.cwd(), process.argv[2])
  : join(root, 'dist', 'preview.html');

// Concatenation order = import order (each module may only depend on
// modules listed before it).
const JS_FILES = [
  'lib/cssLoader.mjs',
  'lib/reveal.mjs',
  'lib/sockArt.mjs',
  'js/components/Riesenrad.mjs',
  'js/components/SockRail.mjs',
  'js/components/Navbar.mjs',
  'js/components/Hero.mjs',
  'js/components/Section.mjs',
  'js/components/Gallery.mjs',
  'js/components/Contact.mjs',
  'js/components/Footer.mjs',
  'js/app.mjs',
];

const CSS_FILES = [
  'css/base.css',
  'css/components/Riesenrad.css',
  'css/components/SockRail.css',
  'css/components/Navbar.css',
  'css/components/Hero.css',
  'css/components/Section.css',
  'css/components/Gallery.css',
  'css/components/Contact.css',
  'css/components/Footer.css',
];

const banner = (name) => `\n/* =================  ${name}  ================= */\n`;

const jsBundle = JS_FILES.map((file) => {
  const source = readFileSync(join(root, file), 'utf8');
  const stripped = source
    .replace(/^import[^\n]*$/gm, '') // ES-module imports resolve within the bundle
    .replace(/^export\s+/gm, ''); // definitions become plain script declarations
  return banner(file) + stripped;
}).join('\n');

const cssBundle = CSS_FILES.map((file) =>
  banner(file) + readFileSync(join(root, file), 'utf8')
).join('\n');

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ME · Socks &amp; Souvenir · Wollzeile, Wien</title>
<meta name="description" content="ME is a cosy sock &amp; souvenir shop in the Wollzeile, the little street behind Stephansdom in Vienna. Wool socks with designs for every person and every pet.">
<script>window.__ME_INLINE_CSS__ = true; /* styles are inlined below */</script>
<style>
${cssBundle}
</style>
</head>
<body>
<main id="app"></main>
<!-- Bundled by tools/build-preview.mjs — source lives in the project files -->
<script type="module">
${jsBundle}
</script>
</body>
</html>
`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, page, 'utf8');
console.log('Bundled preview written to: ' + out + ' (' + page.length + ' bytes)');
