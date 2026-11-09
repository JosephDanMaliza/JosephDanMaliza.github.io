
//stars
(function () {
  const canvas = document.getElementById('hyperspace');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, cx, cy;
  
  const STAR_COUNT = 550;
  const SPEED = 2.2;
  const MAX_DEPTH = 1000;
  const stars = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cx = w / 2;
    cy = h / 2;
  }
  window.addEventListener('resize', resize);
  resize();

  function resetStar(s, randomZ = false) {
    s.x = (Math.random() - 0.5) * w * 2.5;
    s.y = (Math.random() - 0.5) * h * 2.5;
    s.z = randomZ ? Math.random() * MAX_DEPTH : MAX_DEPTH;
    s.prevZ = s.z;
  }

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = {};
    resetStar(star, true);
    stars.push(star);
  }

  function render() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.prevZ = s.z;
      s.z -= SPEED;

      if (s.z <= 1) {
        resetStar(s, false);
        continue;
      }

      const k = 220 / s.z;
      const px = s.x * k + cx;
      const py = s.y * k + cy;

      const prevK = 220 / s.prevZ;
      const ppx = s.x * prevK + cx;
      const ppy = s.y * prevK + cy;

      if (px < 0 || px > w || py < 0 || py > h) {
        resetStar(s, false);
        continue;
      }

      const alpha = Math.min(0.85, (1 - s.z / MAX_DEPTH) * 1.4);
      const strokeWidth = Math.max(0.6, (1 - s.z / MAX_DEPTH) * 2.2);

      ctx.beginPath();
      ctx.moveTo(ppx, ppy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = `rgba(200, 225, 255, ${alpha})`;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();