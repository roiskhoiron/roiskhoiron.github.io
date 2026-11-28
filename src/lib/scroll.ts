// Smooth scrolling. Lenis eases wheel and trackpad input on pointer devices;
// touch keeps native momentum, and reduced-motion users get plain scrolling.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.11,
    // overlays and inner scroll areas keep their own native scrolling
    prevent: (node) => !!node.closest('.player, .cp-backdrop, .share-backdrop, [data-lenis-prevent]')
  });
  return () => { lenis?.destroy(); lenis = null; };
}

const HEADER_GAP = 96;

/** Jump to the top of the page (used on route changes). */
export function toTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
}

/** Glide to an element, leaving room for the floating header. */
export function glideTo(el: Element | null, offset = -HEADER_GAP) {
  if (!el) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (lenis) { lenis.scrollTo(el as HTMLElement, { offset, duration: 0.9, force: true }); return; }
  const y = el.getBoundingClientRect().top + scrollY + offset;
  window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'instant' as ScrollBehavior : 'smooth' });
}

/** Pause page scrolling while a full-screen overlay is open. */
export function lockScroll(locked: boolean) {
  if (!lenis) return;
  locked ? lenis.stop() : lenis.start();
}
