/**
 * ME · Socks & Souvenir — single-page scroll site.
 *
 * index.html holds all the content as plain HTML. This file only draws
 * the decorative artwork (socks, ferris wheel, gallery tiles) into the
 * elements marked with data-* attributes, and drives the animations:
 * reveal-on-scroll, navbar scroll-spy and snowfall.
 *
 * This is the only script on the page, so it runs at top level without
 * a wrapper; nothing of it needs to be reachable from other scripts.
 */

"use strict";

// Sock artwork: one inline SVG generator shared by the sock rails, the
// hero parade and the gallery tiles.
// Options: body+cuff colours, motif (dots|stripes|heart|checks|plain)
// and length (crew|short ankle sock).
const FOOT =
  "c0 2 .8 3.6 2.4 4.7 l5.7 3.9 c4.6 3.2 5.4 9.9 1.6 14.1 " +
  "c-3.1 3.4 -8.4 4.2 -12.4 1.9 l-8.7 -4.9 " +
  "c-2.2 -1.3 -3.5 -3.7 -3.5 -6.3 Z";

let sockArtId = 0;

function sockSvg({
  body = "#4d7ba3",
  cuff = "#eaf4fc",
  motif = "dots",
  motifColor = "rgba(255,255,255,.85)",
  length = "crew",
} = {}) {
  // each call needs its own clipPath id, otherwise motifs bleed between socks
  const id = `sockart-${++sockArtId}`;
  const leg = length === "short" ? 11 : 20;
  const shape = `M13 8 h14 v${leg} ${FOOT}`;
  const height = leg + 36;

  return `<svg class="sock-art" viewBox="0 0 40 ${height}" role="img" aria-hidden="true" focusable="false">
    <defs><clipPath id="${id}"><path d="${shape}"/></clipPath></defs>
    <path d="${shape}" fill="${body}" stroke="rgba(60,75,92,.3)" stroke-width="1"/>
    <g clip-path="url(#${id})">${buildMarks(motif, leg, motifColor)}</g>
    <rect x="11.4" y="2" width="17" height="7" rx="3.5" fill="${cuff}" stroke="rgba(60,75,92,.3)" stroke-width="1"/>
  </svg>`;
}

function buildMarks(motif, leg, color) {
  if (motif === "plain") return "";

  if (motif === "dots") {
    return `
      <circle cx="18" cy="${(12 + leg * 0.25).toFixed(1)}" r="2" fill="${color}"/>
      <circle cx="24" cy="${(12 + leg * 0.55).toFixed(1)}" r="2" fill="${color}"/>
      <circle cx="18" cy="${(12 + leg * 0.85).toFixed(1)}" r="2" fill="${color}"/>`;
  }

  if (motif === "stripes") {
    const rows = Math.max(2, Math.round(leg / 7));
    let out = "";
    for (let i = 0; i < rows; i++) {
      const y = (11 + (i * leg) / rows).toFixed(1);
      out += `<rect x="11" y="${y}" width="18" height="${(leg / (rows * 3.2)).toFixed(1)}" fill="${color}"/>`;
    }
    return out;
  }

  if (motif === "heart") {
    const heart =
      "M0 1 C -1.6 -1 -3.4 0.2 -2.2 1.8 L 0 4 L 2.2 1.8 C 3.4 0.2 1.6 -1 0 1 Z";
    return `
      <path d="${heart}" fill="${color}" transform="translate(17.5,${(11 + leg * 0.2).toFixed(1)}) scale(1.05)"/>
      <path d="${heart}" fill="${color}" transform="translate(24,${(11 + leg * 0.75).toFixed(1)}) scale(0.85)"/>
      <path d="${heart}" fill="${color}" transform="translate(19.5,${(31 + leg * 0.15).toFixed(1)}) scale(0.9)"/>`;
  }

  if (motif === "checks") {
    const slope = (leg / 5).toFixed(1);
    let out = "";
    for (const y of [11 + leg * 0.25, 11 + leg * 0.72]) {
      out += `
        <path d="M11 ${y.toFixed(1)} l16 ${slope}" stroke="${color}" stroke-width="1.7" fill="none"/>
        <path d="M27 ${y.toFixed(1)} l-16 ${slope}" stroke="${color}" stroke-width="1.7" fill="none"/>`;
    }
    return out;
  }

  return "";
}

// Sock rails: a clothesline of socks on each side of a section. Each
// section carries data-socks="count|seed-left|seed-right"; the seeds
// rotate the palette and motif lists so no two rails look the same.
const RAIL_PALETTES = [
  { body: "#4d7ba3", cuff: "#eaf4fc", mc: "rgba(255,255,255,.85)" },
  { body: "#8fc1de", cuff: "#39678c", mc: "rgba(57,103,140,.5)" },
  { body: "#39678c", cuff: "#cfe4f2", mc: "rgba(255,255,255,.8)" },
  { body: "#bde0f2", cuff: "#4d7ba3", mc: "rgba(77,123,163,.55)" },
  { body: "#6f9fc0", cuff: "#eaf4fc", mc: "rgba(255,255,255,.85)" },
  { body: "#e0a86b", cuff: "#eaf4fc", mc: "rgba(255,255,255,.85)" },
  { body: "#dc8b6d", cuff: "#eaf4fc", mc: "rgba(255,255,255,.8)" },
  { body: "#7fae7a", cuff: "#eaf4fc", mc: "rgba(255,255,255,.85)" },
];

const MOTIFS = ["dots", "stripes", "heart", "checks", "plain"];
const LENGTHS = ["crew", "short", "crew", "short"];

function sockRail(side, count, seed) {
  const socks = Array.from({ length: count }, (_, i) => {
    const p =
      RAIL_PALETTES[
        (i + seed * 3 + (side === "left" ? 0 : 4)) % RAIL_PALETTES.length
      ];
    const motif = MOTIFS[(i + seed) % MOTIFS.length];
    const length = LENGTHS[(i + seed) % LENGTHS.length];
    const y = 30 + ((i * 13 + seed * 7) % 54); // varied heights on the cord
    const x = side === "left" ? 8 + ((i * 17) % 28) : 10 + ((i * 11) % 28);
    const w = 44 + ((i * 13 + seed * 11) % 22); // varied sock sizes
    const delay = (
      (i * 1.4 + (side === "left" ? 0 : 0.8) + seed * 0.5) %
      6
    ).toFixed(1);
    return `
      <span class="socks__sock" style="--y:${y}px;--x:${x}px;--w:${w}px;--d:${delay}s">
        ${sockSvg({ body: p.body, cuff: p.cuff, motif, motifColor: p.mc, length })}
      </span>`;
  }).join("");

  return `
    <div class="socks socks--${side}" aria-hidden="true">
      <i class="socks__cord"></i>
      ${socks}
    </div>`;
}

function paintSockRails() {
  document.querySelectorAll("[data-socks]").forEach((el) => {
    const [count, seedLeft, seedRight] = el
      .getAttribute("data-socks")
      .split("|");
    el.insertAdjacentHTML(
      "afterbegin",
      sockRail("left", Number(count), Number(seedLeft)) +
        sockRail("right", Number(count), Number(seedRight)),
    );
  });
}

// Hero: a small parade of different socks swaying under the headline.
const HERO_SOCKS = [
  { body: "#4d7ba3", cuff: "#eaf4fc", motif: "dots", length: "crew" },
  { body: "#e0a86b", cuff: "#eaf4fc", motif: "stripes", length: "crew" },
  { body: "#8fc1de", cuff: "#39678c", motif: "heart", length: "short" },
  { body: "#39678c", cuff: "#cfe4f2", motif: "checks", length: "crew" },
  { body: "#dc8b6d", cuff: "#eaf4fc", motif: "dots", length: "short" },
];

function paintHeroPeek() {
  const peek = document.querySelector("[data-hero-socks]");
  if (!peek) return;
  peek.innerHTML = HERO_SOCKS.map(
    (p) => `<span class="sock">${sockSvg(p)}</span>`,
  ).join("");
}

// Small sock decorations elsewhere on the page, e.g. the divider between
// reviews. The element carries data-sock="motif".
function paintSockDecorations() {
  document.querySelectorAll("[data-sock]").forEach((el) => {
    el.innerHTML = sockSvg({ motif: el.getAttribute("data-sock") });
  });
}

// Gallery: tiles for the Instagram feed of instagram.com/mestore.at.
// Instagram blocks server-side pulling of its images, so the tiles are
// sock artwork by default. Give a tile an `img` URL in TILES and the
// photo shows instead.
const TILES = [
  {
    caption: "Vienna motifs",
    likes: 214,
    tone: "t1",
    sock: { body: "#4d7ba3", cuff: "#eaf4fc", motif: "checks" },
  },
  {
    caption: "Paw patrol 🐾",
    likes: 331,
    tone: "t2",
    sock: { body: "#7fae7a", cuff: "#eaf4fc", motif: "dots" },
  },
  {
    caption: "Cloud cotton",
    likes: 187,
    tone: "t3",
    sock: { body: "#8fc1de", cuff: "#39678c", motif: "heart" },
  },
  {
    caption: "Tiny feet",
    likes: 256,
    tone: "t4",
    sock: {
      body: "#e0a86b",
      cuff: "#eaf4fc",
      motif: "stripes",
      length: "short",
    },
  },
  {
    caption: "Riesenrad red",
    likes: 402,
    tone: "t5",
    sock: { body: "#39678c", cuff: "#cfe4f2", motif: "dots" },
  },
  {
    caption: "Souvenir wall",
    likes: 176,
    tone: "t6",
    sock: { body: "#dc8b6d", cuff: "#eaf4fc", motif: "stripes" },
  },
];

function buildTile(tile) {
  const art = tile.img
    ? `<img class="tile__img" src="${tile.img}" alt="Photo from our Instagram: ${tile.caption}" loading="lazy" />`
    : sockSvg(tile.sock);

  return `
    <figure class="tile reveal">
      <div class="tile__inner ${tile.tone}">
        <span class="tile__badge" aria-hidden="true">📷</span>
        ${art}
      </div>
      <figcaption>❤ ${tile.likes} · ${tile.caption}</figcaption>
    </figure>`;
}

function paintGallery() {
  const grid = document.querySelector("[data-gallery]");
  if (!grid) return;
  grid.innerHTML = TILES.map(buildTile).join("");
}

// Riesenrad: the Vienna Ferris wheel in the page background. Keeps
// slowly turning and gently parallax-rides while you scroll, all
// transform-only. The cabins sweep a circle of radius R + drop +
// height around the hub, so the viewBox is centred on the hub with
// enough margin in every direction.
const RISENRAD_PALETTE = [
  "#8fc1de",
  "#39678c",
  "#cfe4f2",
  "#4d7ba3",
  "#6f9fc0",
  "#e0a86b",
];
const RW_CX = 90;
const RW_CY = 96;
const RW_R = 60;
const RW_N = 8;

function riesenradSvg() {
  let spokes = "";
  let cabins = "";

  for (let i = 0; i < RW_N; i++) {
    const a = (i / RW_N) * Math.PI * 2;
    const x = (RW_CX + Math.cos(a) * RW_R).toFixed(1);
    const y = (RW_CY + Math.sin(a) * RW_R).toFixed(1);
    const fill = RISENRAD_PALETTE[i % RISENRAD_PALETTE.length];

    spokes += `<line x1="${RW_CX}" y1="${RW_CY}" x2="${x}" y2="${y}" class="rw-spoke"/>`;

    // counter-rotating hangers keep each cabin vertical as the wheel turns
    cabins += `
      <g transform="translate(${x} ${y})">
        <g class="rw-cabin-hanger">
          <line x1="0" y1="0" x2="0" y2="6" class="rw-drop"/>
          <rect x="-7" y="6" width="14" height="16" rx="5" fill="${fill}" class="rw-cabin"/>
        </g>
      </g>`;
  }

  return `
    <svg viewBox="0 0 180 208" role="img" focusable="false">
      <g class="riesenrad__frame">
        <path d="M${RW_CX} ${RW_CY} L54 186" class="rw-leg"/>
        <path d="M${RW_CX} ${RW_CY} L126 186" class="rw-leg"/>
        <rect x="42" y="182" width="96" height="7" rx="3.5" class="rw-base"/>
      </g>
      <g class="riesenrad__wheel">
        ${spokes}
        <circle cx="${RW_CX}" cy="${RW_CY}" r="${RW_R}" class="rw-rim"/>
        ${cabins}
        <circle cx="${RW_CX}" cy="${RW_CY}" r="7" class="rw-hub"/>
      </g>
    </svg>`;
}

// Gentle scroll parallax: the wheel drifts up a few pixels as you scroll
// down, eased with a small lerp so it feels soft rather than twitchy.
function attachParallax(lift) {
  const reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.requestAnimationFrame) return;

  let target = 0;
  let current = 0;
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      target = window.scrollY;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(step);
      }
    },
    { passive: true },
  );

  function step() {
    current += (target - current) * 0.08;
    lift.style.transform = `translateY(${(-current * 0.07).toFixed(2)}px)`;
    if (Math.abs(target - current) > 0.5) {
      window.requestAnimationFrame(step);
    } else {
      ticking = false;
    }
  }
}

function paintRiesenrad() {
  const el = document.querySelector("[data-riesenrad]");
  if (!el) return;
  el.innerHTML = riesenradSvg();
  attachParallax(el);
}

// Scroll reveal: fades in elements carrying the `.reveal` class once
// they enter the viewport. Falls back to showing everything
// immediately when IntersectionObserver is not available.
function observeReveals(root) {
  const targets = Array.from((root || document).querySelectorAll(".reveal"));
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
  );

  targets.forEach((el) => io.observe(el));
}

// Navbar: scroll-spy pill highlight plus a backdrop once the page
// scrolls. Links are plain anchors; the browser handles the smooth
// scrolling via CSS scroll-behavior.
function wireNavbar() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll("[data-spy]"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((a) =>
            a.classList.toggle("is-active", a.dataset.spy === entry.target.id),
          );
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    links.forEach((a) => {
      const section = document.getElementById(a.dataset.spy);
      if (section) io.observe(section);
    });
  }

  const scrolled = () =>
    nav.classList.toggle("navbar--scrolled", window.scrollY > 8);
  window.addEventListener("scroll", scrolled, { passive: true });
  scrolled();
}

// Snow: a quiet winter layer over the whole page.
function startSnow() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:40";

  const context = canvas.getContext("2d");
  if (!context) return;
  const reducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion && reducedMotion.matches) return;

  let width = 0;
  let height = 0;
  let flakes = [];
  let animationFrame = 0;
  let previousTime = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    // fewer flakes on small screens, more on big ones
    const targetCount = Math.min(
      180,
      Math.max(45, Math.round((width * height) / 12000)),
    );
    flakes = Array.from({ length: targetCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random() * 2.6,
      speed: 18 + Math.random() * 34,
      drift: 8 + Math.random() * 18,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.35 + Math.random() * 0.55,
    }));
  }

  function draw(time) {
    const elapsed = previousTime
      ? Math.min((time - previousTime) / 1000, 0.032)
      : 0;
    previousTime = time;

    context.clearRect(0, 0, width, height);

    for (const flake of flakes) {
      flake.y += flake.speed * elapsed;
      flake.x += Math.sin(time * 0.001 + flake.phase) * flake.drift * elapsed;

      if (flake.y > height + flake.radius) {
        flake.y = -flake.radius;
        flake.x = Math.random() * width;
      }
      if (flake.x > width + flake.radius) flake.x = -flake.radius;
      if (flake.x < -flake.radius) flake.x = width + flake.radius;

      context.beginPath();
      context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(255, 255, 255, " + flake.opacity + ")";
      context.fill();
    }

    animationFrame = window.requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();

  if (!document.hidden) {
    animationFrame = window.requestAnimationFrame(draw);
  }

  // pause the snowfall while the tab is in the background
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    } else if (!animationFrame) {
      previousTime = 0;
      animationFrame = window.requestAnimationFrame(draw);
    }
  });

  document.body.appendChild(canvas);
}

// The script is loaded with defer, so the DOM is already parsed.
paintRiesenrad();
paintSockRails();
paintHeroPeek();
paintSockDecorations();
paintGallery();
wireNavbar();
observeReveals();
startSnow();
