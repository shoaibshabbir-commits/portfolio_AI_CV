(function () {
  var canvas = document.getElementById("particles");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var particles = [];
  var animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    var count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.4 + 0.2,
      });
    }
  }

  function isDark() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var dark = isDark();

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = dark
        ? "rgba(167, 139, 250, " + p.o + ")"
        : "rgba(124, 58, 237, " + p.o * 0.6 + ")";
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var p2 = particles[j];
        var dx = p.x - p2.x;
        var dy = p.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = dark
            ? "rgba(167, 139, 250, " + 0.12 * (1 - dist / 120) + ")"
            : "rgba(124, 58, 237, " + 0.08 * (1 - dist / 120) + ")";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);

  var observer = new MutationObserver(function () {
    /* redraw picks up theme on next frame */
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
