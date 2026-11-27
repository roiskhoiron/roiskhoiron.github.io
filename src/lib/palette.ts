// Colour is dealt at random per visit (see the inline script in index.html).
import { writable } from 'svelte/store';

type Palette = { name: string; bg: string; fg: string; card: string; a1: string; a2: string; a3: string };
type KL = { palettes: Palette[]; index: number; apply: (n: number) => void };
const kl = (): KL => (window as unknown as { __KL: KL }).__KL;

export const paletteName = writable(typeof window === 'undefined' ? '' : kl().palettes[kl().index].name);

/** Deal the next palette; the new colours flood out in a circle from the click point. */
export function remix(x = innerWidth / 2, y = innerHeight / 2) {
  const k = kl();
  const next = (k.index + 1) % k.palettes.length;
  const swap = () => { k.apply(next); paletteName.set(k.palettes[next].name); };
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
  if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return swap();
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  doc.startViewTransition(swap).ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' }
    );
  }).catch(() => {});
}
