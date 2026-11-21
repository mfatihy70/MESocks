/**
 * Tiny CSS loader for reusable components.
 *
 * Each component registers its own stylesheet on first use, so dropping a
 * component into a page automatically pulls its styles along.
 *
 * When the page is bundled into a single file for preview
 * (window.__ME_INLINE_CSS__ === true), all styles are already inlined
 * and every call becomes a no-op.
 */
const loaded = new Set();

export function loadCss(href) {
  if (window.__ME_INLINE_CSS__) return;
  if (loaded.has(href)) return;
  loaded.add(href);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.append(link);
}
