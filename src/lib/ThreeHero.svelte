<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  export let theme: 'dark'|'light' = 'dark';
  export let scrollProgress = 0;
  let canvas: HTMLCanvasElement;
  let wrap: HTMLDivElement;
  let raf = 0;
  let renderer: THREE.WebGLRenderer | null = null;

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  onMount(() => {
    if (prefersReduced || !canvas || !wrap) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 20);
    camera.position.set(0, 0.4, 6);

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

    // particle field — minimal, elegant
    const count = 160;
    const pos = new Float32Array(count * 3);
    const colArr = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    const baseY = new Float32Array(count);

    const cOrange = new THREE.Color(0xFF6B35);
    const cPeach = new THREE.Color(0xFF9E7A);
    const cZinc = new THREE.Color(0x9f9fa3);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 13;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 5 - 0.5;
      pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
      baseY[i] = y;
      sizes[i] = 0.045 + Math.random() * 0.055;
      speeds[i] = 0.12 + Math.random() * 0.22;
      phases[i] = Math.random() * Math.PI * 2;
      // color mix per particle
      const isOrange = Math.random() < 0.62;
      const c = isOrange ? (Math.random()<0.5 ? cOrange : cPeach) : cZinc;
      // light theme will be overridden via vertex color update, keep dark as base
      colArr[i*3] = c.r; colArr[i*3+1] = c.g; colArr[i*3+2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.42 : 0.34,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    function resize(){
      if (!wrap || !renderer) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 4 || h < 4) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener('resize', resize);

    let mx = 0, my = 0, tx = 0, ty = 0;
    function onMove(e: MouseEvent){
      const r = wrap.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      my = -(((e.clientY - r.top) / r.height) * 2 - 1);
    }
    function onTouch(e: TouchEvent){
      if (!e.touches[0]) return;
      const r = wrap.getBoundingClientRect();
      mx = ((e.touches[0].clientX - r.left) / r.width) * 2 - 1;
      my = -(((e.touches[0].clientY - r.top) / r.height) * 2 - 1);
    }
    wrap.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true } as any);
    wrap.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true } as any);

    // theme watcher — update colors/opacity without rebuilding
    let lastTheme = theme;
    const ti = setInterval(()=> {
      if (theme !== lastTheme) {
        lastTheme = theme;
        const dark = theme === 'dark';
        mat.opacity = dark ? 0.42 : 0.34;
        // recolor for light visibility: shift orange slightly darker/muted
        for (let i = 0; i < count; i++) {
          const isOrange = Math.random() < 0.62; // keep distribution but update
          // use existing color slots: adjust brightness for light
          if (!dark && isOrange) {
            colArr[i*3] = 0.92; colArr[i*3+1] = 0.42; colArr[i*3+2] = 0.18;
          }
        }
        (geo.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
      }
    }, 300);

    let start = performance.now();
    const pAttr = geo.getAttribute('position') as THREE.BufferAttribute;

    function tick(){
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      const t = (performance.now() - start) / 1000;
      const scrollOff = scrollProgress * 0.018; // scroll drives vertical drift
      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;
      const mWorldX = tx * 6.5;
      const mWorldY = ty * 4.2;

      for (let i = 0; i < count; i++) {
        const i3 = i*3;
        // base drift + scroll parallax
        let x = pos[i3] ;
        let y = baseY[i] + scrollOff * (0.6 + (i % 3)*0.2);
        let z = pos[i3+2];

        // gentle floating
        y += Math.sin(t * speeds[i] + phases[i]) * 0.14;
        x += Math.cos(t * speeds[i] * 0.7 + phases[i]) * 0.09;

        // cursor gravity — particles near cursor are pushed softly
        const dx = x - mWorldX;
        const dy = y - mWorldY;
        const d2 = dx*dx + dy*dy;
        const r2 = 2.2;
        if (d2 < r2 * r2 && d2 > 0.001) {
          const d = Math.sqrt(d2);
          const f = (1 - d / r2) * 0.42;
          x += (dx / d) * f;
          y += (dy / d) * f;
        }

        // wrap vertically to keep infinite field without border
        if (y > 5.2) y -= 10.4;
        if (y < -5.2) y += 10.4;
        if (x > 6.8) x -= 13.6;
        if (x < -6.8) x += 13.6;

        pAttr.setXYZ(i, x, y, z);
      }
      pAttr.needsUpdate = true;
      // subtle global rotation with scroll for expansive feel
      points.rotation.z = scrollProgress * 0.00012;
      renderer!.render(scene, camera);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(ti);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      wrap?.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', onMove as any);
      wrap?.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchmove', onTouch as any);
      geo.dispose(); mat.dispose(); renderer?.dispose();
    };
  });
</script>

<div bind:this={wrap} class="three-hero-wrap absolute inset-0 pointer-events-none" aria-hidden="true">
  <canvas bind:this={canvas} class="three-hero-canvas w-full h-full block"></canvas>
</div>

<style>
  .three-hero-wrap { overflow: hidden; }
  .three-hero-canvas { display: block; width: 100%; height: 100%; opacity: 0.68; }
  @media (prefers-reduced-motion: reduce) {
    .three-hero-canvas { display: none !important; }
  }
  html.light .three-hero-canvas { opacity: 0.52; }
</style>
