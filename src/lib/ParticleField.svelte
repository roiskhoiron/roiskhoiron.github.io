<script lang="ts">
  // Ambient particle field on a plain 2D canvas.
  // Replaces the previous three.js version: same look (drifting orange/zinc dots,
  // scroll parallax, cursor push) for ~1 kB instead of a ~120 kB gzip WebGL engine.
  import { onMount } from 'svelte';

  export let theme: 'dark' | 'light' = 'dark';

  let canvas: HTMLCanvasElement;

  type P = { x: number; y: number; z: number; r: number; speed: number; phase: number; hue: 0 | 1 | 2 };

  const PALETTE = {
    dark: ['255,107,53', '255,158,122', '161,161,170'],
    light: ['234,88,32', '240,128,84', '113,113,122']
  };

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coarse = window.matchMedia('(hover: none)').matches;
    const count = coarse ? 60 : 150;
    const parts: P[] = Array.from({ length: count }, () => {
      const pick = Math.random();
      return {
        x: Math.random(), y: Math.random(),
        z: 0.35 + Math.random() * 0.65,
        r: 0.7 + Math.random() * 1.5,
        speed: 0.12 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
        hue: pick < 0.31 ? 0 : pick < 0.62 ? 1 : 2
      };
    });

    let w = 0, h = 0, dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // pointer is eased so the field reacts like a fluid, not a switch
    let mx = -9999, my = -9999, tx = -9999, ty = -9999;
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; if (tx < -9000) { tx = mx; ty = my; } };
    const onLeave = () => { mx = my = tx = ty = -9999; };
    if (!coarse) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
    }

    const R = 150;        // cursor influence radius (px)
    const LINK = 96;      // constellation link distance (px)
    const sx = new Float32Array(count), sy = new Float32Array(count);
    const near: number[] = [];
    let raf = 0;
    const start = performance.now();

    function frame() {
      raf = requestAnimationFrame(frame);
      const t = (performance.now() - start) / 1000;
      const scroll = window.scrollY;
      const cols = PALETTE[theme];
      const base = theme === 'dark' ? 0.5 : 0.42;
      tx += (mx - tx) * 0.12; ty += (my - ty) * 0.12;

      ctx!.clearRect(0, 0, w, h);
      near.length = 0;
      for (let i = 0; i < count; i++) {
        const p = parts[i];
        let x = p.x * w + Math.cos(t * p.speed * 0.7 + p.phase) * 10 * p.z;
        // nearer particles (higher z) travel further on scroll → depth without a 3D engine
        let y = (((p.y * h - scroll * 0.12 * p.z + Math.sin(t * p.speed + p.phase) * 14 * p.z) % h) + h) % h;
        const dx = x - tx, dy = y - ty;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = (1 - d / R) * 26 * p.z;
          x += (dx / d) * f; y += (dy / d) * f;
          near.push(i);
        }
        sx[i] = x; sy[i] = y;
        ctx!.fillStyle = `rgba(${cols[p.hue]},${(base * p.z).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(x, y, p.r * p.z, 0, 6.2832);
        ctx!.fill();
      }
      // constellation: only particles close to the cursor link up
      ctx!.lineWidth = 1;
      for (let a = 0; a < near.length; a++) {
        for (let b = a + 1; b < near.length; b++) {
          const i = near[a], j = near[b];
          const dx = sx[i] - sx[j], dy = sy[i] - sy[j];
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(${cols[0]},${((1 - d / LINK) * 0.28).toFixed(3)})`;
            ctx!.beginPath(); ctx!.moveTo(sx[i], sy[i]); ctx!.lineTo(sx[j], sy[j]); ctx!.stroke();
          }
        }
      }
    }

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  });
</script>

<canvas bind:this={canvas} class="particle-field" aria-hidden="true"></canvas>

<style>
  .particle-field { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  @media (prefers-reduced-motion: reduce) { .particle-field { display: none; } }
</style>
