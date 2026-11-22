export function Snow() {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;' +
    'z-index:40';

  const context = canvas.getContext('2d');
  if (!context) return canvas;
  const reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion && reducedMotion.matches) return canvas;

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

    const targetCount = Math.min(180, Math.max(45, Math.round(width * height / 12000)));
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
      context.fillStyle = 'rgba(255, 255, 255, ' + flake.opacity + ')';
      context.fill();
    }

    animationFrame = window.requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  if (!document.hidden) {
    animationFrame = window.requestAnimationFrame(draw);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    } else if (!animationFrame) {
      previousTime = 0;
      animationFrame = window.requestAnimationFrame(draw);
    }
  });

  return canvas;
}
