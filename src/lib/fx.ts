// Motion layer. Everything here is transform/opacity only, driven by one
// pointer listener and one IntersectionObserver, and switched off entirely
// for prefers-reduced-motion.
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ── kinetic type: split a heading into letters ───────────────────── */
export function split(node: HTMLElement) {
  if (reduce()) return;
  node.setAttribute('aria-label', node.textContent?.replace(/\s+/g, ' ').trim() ?? '');
  let n = 0;
  const walk = (el: Node) => {
    for (const child of Array.from(el.childNodes)) {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const part of (child.textContent ?? '').split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { frag.append(' '); continue; }
          const word = document.createElement('span');
          word.className = 'word'; word.setAttribute('aria-hidden', 'true');
          for (const ch of part) {
            const s = document.createElement('span');
            s.className = 'ch'; s.textContent = ch; s.style.setProperty('--i', String(n++));
            word.append(s);
          }
          frag.append(word);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && (child as Element).tagName !== 'BR') walk(child);
    }
  };
  walk(node);
  node.classList.add('split');
}

/* ── stickers you can throw ───────────────────────────────────────── */
export function fling(node: HTMLElement) {
  let x = 0, y = 0, vx = 0, vy = 0, rot = (Math.random() - 0.5) * 24, raf = 0, drag = false, px = 0, py = 0, t0 = 0;
  const draw = () => (node.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot}deg)`);
  draw();
  const bounds = () => {
    const p = node.offsetParent as HTMLElement;
    return { minX: -node.offsetLeft, maxX: p.clientWidth - node.offsetLeft - node.offsetWidth, minY: -node.offsetTop, maxY: p.clientHeight - node.offsetTop - node.offsetHeight };
  };
  const step = () => {
    const b = bounds();
    x += vx; y += vy; vx *= 0.94; vy *= 0.94; rot += vx * 0.6;
    if (x < b.minX) { x = b.minX; vx = -vx * 0.7; } else if (x > b.maxX) { x = b.maxX; vx = -vx * 0.7; }
    if (y < b.minY) { y = b.minY; vy = -vy * 0.7; } else if (y > b.maxY) { y = b.maxY; vy = -vy * 0.7; }
    draw();
    raf = Math.abs(vx) + Math.abs(vy) > 0.15 ? requestAnimationFrame(step) : 0;
  };
  const down = (e: PointerEvent) => { drag = true; px = e.clientX; py = e.clientY; t0 = performance.now(); vx = vy = 0; cancelAnimationFrame(raf); node.setPointerCapture(e.pointerId); node.classList.add('held'); };
  const move = (e: PointerEvent) => {
    if (!drag) return;
    const dt = Math.max(performance.now() - t0, 8); t0 = performance.now();
    const dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
    x += dx; y += dy; vx = (dx / dt) * 16; vy = (dy / dt) * 16; rot += dx * 0.15; draw();
  };
  const up = () => { if (!drag) return; drag = false; node.classList.remove('held'); if (!reduce()) raf = requestAnimationFrame(step); };
  node.addEventListener('pointerdown', down); node.addEventListener('pointermove', move);
  node.addEventListener('pointerup', up); node.addEventListener('pointercancel', up);
  return { destroy() { cancelAnimationFrame(raf); } };
}

/* ── numbers count up when they scroll into view ──────────────────── */
export function countUp(node: HTMLElement) {
  const m = (node.textContent ?? '').match(/^(\d+)(.*)$/);
  if (!m || reduce()) return;
  const target = +m[1], tail = m[2];
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const t0 = performance.now();
    const tick = () => {
      const k = Math.min((performance.now() - t0) / 900, 1);
      node.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + tail;
      if (k < 1) requestAnimationFrame(tick);
    };
    tick();
  });
  io.observe(node);
  return { destroy: () => io.disconnect() };
}

/* ── confetti in the palette colours ──────────────────────────────── */
export function confetti(x = innerWidth / 2, y = innerHeight / 2, n = 36) {
  if (reduce()) return;
  const cols = ['var(--a1)', 'var(--a2)', 'var(--a3)', 'var(--fg)'];
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.className = 'confetto';
    s.style.cssText = `left:${x}px;top:${y}px;background:${cols[i % 4]};border-radius:${i % 3 ? '2px' : '50%'}`;
    document.body.append(s);
    const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 260;
    s.animate(
      [{ transform: 'translate(-50%,-50%) rotate(0)', opacity: 1 },
       { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 180}px) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 }],
      { duration: 900 + Math.random() * 700, easing: 'cubic-bezier(.1,.7,.3,1)' }
    ).onfinish = () => s.remove();
  }
}

/* ── global layer: cursor, magnets, tilt, reveal, marquee speed ───── */
const REVEAL = '.section-head, .path, .entry, .card, .tile, .video, .xp, .principles li, .stats > div, .facts > div, .feature, .quote, .page-head > *, .toolbar, .pager a, .prose > section, .foot-grid > *';
const TILT = '.card, .tile, .path, .spec, .feature, .thumb';
const MAGNET = '.btn, .icon-btn, .step, .remix';
const HOT = 'a, button, .sticker, input, [data-cursor]';

let io: IntersectionObserver | null = null;
/** call after every route change: (re)arms scroll-reveal for the new view */
export function arm() {
  if (reduce()) return;
  io ??= new IntersectionObserver((es) => {
    let k = 0;
    for (const e of es) if (e.isIntersecting) {
      const el = e.target as HTMLElement;
      el.style.setProperty('--d', `${Math.min(k++, 8) * 55}ms`);
      el.classList.add('in'); io!.unobserve(el);
    }
  }, { rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll<HTMLElement>(REVEAL).forEach((el, i) => {
    if (el.classList.contains('rv')) return;
    el.classList.add('rv', ['rv-up', 'rv-left', 'rv-pop', 'rv-tilt'][i % 4]);
    io!.observe(el);
  });
}

export function startFx() {
  if (reduce()) return () => {};
  const off: (() => void)[] = [];
  const on = <K extends keyof WindowEventMap>(t: K, f: (e: WindowEventMap[K]) => void) => { addEventListener(t, f, { passive: true }); off.push(() => removeEventListener(t, f)); };

  // marquees speed up (and lean) with scroll velocity
  let lastY = scrollY, vel = 0, mraf = 0;
  const marquee = () => {
    vel *= 0.9;
    document.querySelectorAll<HTMLElement>('.marquee-track').forEach((el) => {
      const a = el.getAnimations()[0]; if (a) a.playbackRate = 1 + Math.min(Math.abs(vel) / 6, 7);
      el.style.setProperty('--skew', `${Math.max(-10, Math.min(10, vel / 3))}deg`);
    });
    mraf = Math.abs(vel) > 0.1 ? requestAnimationFrame(marquee) : 0;
  };
  on('scroll', () => { vel = scrollY - lastY; lastY = scrollY; if (!mraf) mraf = requestAnimationFrame(marquee); });

  if (fine()) {
    const cur = document.createElement('div'); cur.className = 'cursor'; cur.innerHTML = '<i></i>';
    document.body.append(cur); document.documentElement.classList.add('has-cursor');
    off.push(() => { cur.remove(); document.documentElement.classList.remove('has-cursor'); });
    let mx = -100, my = -100, cx = -100, cy = -100, raf = 0, tilted: HTMLElement | null = null, pulled: HTMLElement | null = null;
    const loop = () => {
      cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
      cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      raf = Math.abs(mx - cx) + Math.abs(my - cy) > 0.2 ? requestAnimationFrame(loop) : 0;
    };
    on('pointermove', (e) => {
      mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(loop);
      const t = e.target as HTMLElement | null;
      const hot = t?.closest?.<HTMLElement>(HOT);
      cur.classList.toggle('hot', !!hot);
      (cur.firstChild as HTMLElement).textContent = hot?.dataset.cursor ?? hot?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '';
      // 3D tilt with a moving glare
      const tl = t?.closest?.<HTMLElement>(TILT) ?? null;
      if (tilted && tilted !== tl) { tilted.style.removeProperty('--rx'); tilted.style.removeProperty('--ry'); tilted = null; }
      if (tl) {
        const r = tl.getBoundingClientRect(), kx = (e.clientX - r.left) / r.width, ky = (e.clientY - r.top) / r.height;
        tl.style.setProperty('--ry', `${(kx - 0.5) * 9}deg`); tl.style.setProperty('--rx', `${(0.5 - ky) * 9}deg`);
        tl.style.setProperty('--gx', `${kx * 100}%`); tl.style.setProperty('--gy', `${ky * 100}%`);
        tilted = tl;
      }
      // magnetic buttons
      const mg = t?.closest?.<HTMLElement>(MAGNET) ?? null;
      if (pulled && pulled !== mg) { pulled.style.removeProperty('--mx'); pulled.style.removeProperty('--my'); pulled = null; }
      if (mg) {
        const r = mg.getBoundingClientRect();
        mg.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.28}px`);
        mg.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.36}px`);
        pulled = mg;
      }
    });
    on('pointerdown', () => cur.classList.add('down'));
    on('pointerup', () => cur.classList.remove('down'));
  }
  return () => off.forEach((f) => f());
}
