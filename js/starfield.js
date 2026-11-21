/**
 * CINEMATIC DEEP SPACE STARFIELD (Optimized)
 */
export function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let dustStars = [];
  let fieldStars = [];
  let sparkleStars = [];
  let shootingStars = [];
  let animationId = null;

  const mouse = { targetX: 0, targetY: 0, x: 0, y: 0 };

  function gaussianSpread() {
    return (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
  }

  function createCelestialObjects() {
    const isMobile = width < 768;

    /* 1. Galactic Micro-Dust (Pita Diagonal Milky Way) */
    const dustCount = isMobile ? 70 : 140;
    dustStars = Array.from({ length: dustCount }, () => {
      const t = Math.random();
      const spread = gaussianSpread() * (isMobile ? height * 0.58 : height * 0.52);
      const x = t * width + spread * 0.45;
      const y = (1 - t) * height + spread;

      return {
        x: ((x % width) + width) % width,
        y: ((y % height) + height) % height,
        radius: Math.random() * 0.65 + 0.25,
        baseAlpha: Math.random() * 0.34 + 0.1,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        driftY: -(0.015 + Math.random() * 0.03),
        color: Math.random() > 0.45 ? "147, 197, 253" : "224, 242, 254"
      };
    });

    /* 2. Twinkling Field Stars */
    const fieldCount = isMobile ? 50 : 95;
    const palette = ["255, 255, 255", "186, 230, 253", "147, 197, 253", "199, 210, 254"];
    fieldStars = Array.from({ length: fieldCount }, () => {
      const depth = Math.random();
      const isBright = depth > 0.84;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth,
        radius: isBright ? Math.random() * 1.3 + 0.85 : Math.random() * 0.95 + 0.35,
        baseAlpha: isBright ? Math.random() * 0.3 + 0.65 : Math.random() * 0.45 + 0.22,
        twinkleSpeed: Math.random() * 0.022 + 0.007,
        twinklePhase: Math.random() * Math.PI * 2,
        driftY: -(0.035 + depth * 0.11),
        isBright,
        color: palette[Math.floor(Math.random() * palette.length)]
      };
    });

    /* 3. 4-Point Sparkle Stars */
    const sparkleCount = isMobile ? 4 : 8;
    sparkleStars = Array.from({ length: sparkleCount }, () => {
      const t = Math.random() * 0.9 + 0.05;
      const spread = gaussianSpread() * height * 0.65;
      const x = ((t * width + spread * 0.4) % width + width) % width;
      const y = (((1 - t) * height + spread) % height + height) % height;

      return {
        x,
        y,
        depth: 0.75 + Math.random() * 0.25,
        size: Math.random() * 5.2 + 5.2,
        baseAlpha: Math.random() * 0.25 + 0.65,
        pulseSpeed: Math.random() * 0.024 + 0.012,
        pulsePhase: Math.random() * Math.PI * 2,
        driftY: -(0.04 + Math.random() * 0.04),
        color: Math.random() > 0.4 ? "224, 242, 254" : "255, 255, 255"
      };
    });
  }

  function spawnShootingStar() {
    if (shootingStars.length >= 1) return;
    shootingStars.push({
      x: Math.random() * width * 0.8 + width * 0.18,
      y: Math.random() * height * 0.35,
      vx: -(Math.random() * 6 + 7.5),
      vy: Math.random() * 2.8 + 2.8,
      length: Math.random() * 110 + 95,
      life: 0,
      maxLife: 38
    });
  }

  /* Lightweight 4-Point Star tanpa alokasi RadialGradient per frame */
  function drawFourPointStar(x, y, size, alpha, color) {
    ctx.beginPath();
    ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(96, 165, 250, ${alpha * 0.12})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, size * 0.65, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color}, ${alpha * 0.28})`;
    ctx.fill();

    const spike = size * 1.25;
    const thin = Math.max(0.75, size * 0.11);

    ctx.beginPath();
    ctx.moveTo(x, y - spike);
    ctx.quadraticCurveTo(x + thin, y - thin, x + spike, y);
    ctx.quadraticCurveTo(x + thin, y + thin, x, y + spike);
    ctx.quadraticCurveTo(x - thin, y + thin, x - spike, y);
    ctx.quadraticCurveTo(x - thin, y - thin, x, y - spike);
    ctx.closePath();
    ctx.fillStyle = `rgba(${color}, ${alpha})`;
    ctx.fill();
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    createCelestialObjects();
    if (prefersReducedMotion) drawFrame(false);
  }

  function drawFrame(animate = true) {
    ctx.clearRect(0, 0, width, height);

    if (animate) {
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      if (Math.random() < 0.003) spawnShootingStar();
    }

    /* Render Micro-Dust */
    for (const d of dustStars) {
      if (animate) {
        d.y += d.driftY;
        if (d.y < -4) d.y = height + 4;
        d.twinklePhase += d.twinkleSpeed;
      }
      const px = d.x + mouse.x * 5;
      const py = d.y + mouse.y * 5;
      const alpha = animate
        ? Math.max(0.06, d.baseAlpha + Math.sin(d.twinklePhase) * 0.14)
        : d.baseAlpha;

      ctx.beginPath();
      ctx.arc(px, py, d.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${d.color}, ${alpha})`;
      ctx.fill();
    }

    /* Render Field Stars */
    for (const s of fieldStars) {
      if (animate) {
        s.y += s.driftY;
        if (s.y < -6) {
          s.y = height + 6;
          s.x = Math.random() * width;
        }
        s.twinklePhase += s.twinkleSpeed;
      }
      const px = s.x + mouse.x * (s.depth * 18);
      const py = s.y + mouse.y * (s.depth * 18);
      const alpha = animate
        ? Math.max(0.15, Math.min(0.98, s.baseAlpha + Math.sin(s.twinklePhase) * 0.28))
        : s.baseAlpha;

      if (s.isBright) {
        ctx.beginPath();
        ctx.arc(px, py, s.radius * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha * 0.13})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(px, py, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
      ctx.fill();
    }

    /* Render 4-Point Sparkle Stars */
    for (const sp of sparkleStars) {
      if (animate) {
        sp.y += sp.driftY;
        if (sp.y < -20) {
          sp.y = height + 20;
          sp.x = Math.random() * width;
        }
        sp.pulsePhase += sp.pulseSpeed;
      }
      const pulse = animate ? 0.78 + Math.sin(sp.pulsePhase) * 0.28 : 1;
      const px = sp.x + mouse.x * (sp.depth * 22);
      const py = sp.y + mouse.y * (sp.depth * 22);
      const alpha = Math.min(1, sp.baseAlpha * pulse);

      drawFourPointStar(px, py, sp.size * pulse, alpha, sp.color);
    }

    /* Render Shooting Stars */
    if (animate && shootingStars.length) {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const st = shootingStars[i];
        st.x += st.vx;
        st.y += st.vy;
        st.life += 1;

        const progress = st.life / st.maxLife;
        const opacity = Math.sin(progress * Math.PI) * 0.9;
        const tailX = st.x - st.vx * (st.length / 10);
        const tailY = st.y - st.vy * (st.length / 10);

        const grad = ctx.createLinearGradient(st.x, st.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        grad.addColorStop(0.25, `rgba(125, 211, 252, ${opacity * 0.8})`);
        grad.addColorStop(1, "rgba(37, 99, 235, 0)");

        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(st.x, st.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        if (st.life >= st.maxLife) shootingStars.splice(i, 1);
      }
    }

    if (animate) {
      animationId = requestAnimationFrame(() => drawFrame(true));
    }
  }

  window.addEventListener(
    "mousemove",
    (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * -1;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * -1;
    },
    { passive: true }
  );

  resize();
  if (!prefersReducedMotion) drawFrame(true);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 180);
  });

  document.addEventListener("visibilitychange", () => {
    if (prefersReducedMotion) return;
    if (document.hidden && animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    } else if (!document.hidden && !animationId) {
      drawFrame(true);
    }
  });
}