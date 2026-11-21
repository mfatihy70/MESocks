/**
 * Scroll reveal: fades in elements carrying the `.reveal` class once they
 * enter the viewport. Falls back to showing everything immediately when
 * IntersectionObserver is not available.
 */
export function observeReveals(root = document, options = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -48px 0px' } = options;
  const targets = Array.from(root.querySelectorAll('.reveal'));
  if (!targets.length) return null;

  const show = (el) => el.classList.add('is-visible');

  if (!('IntersectionObserver' in window)) {
    targets.forEach(show);
    return null;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold, rootMargin }
  );

  targets.forEach((el) => io.observe(el));
  return io;
}
