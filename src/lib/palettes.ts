// The six colour palettes, read from the design tokens (src/design/tokens.json).
// index.html carries a generated copy because it must paint before any module loads.
export type Palette = { name: string; bg: string; fg: string; card: string; a1: string; a2: string; a3: string };
import tokens from '../design/tokens.json';

export const INK: string = tokens.color.ink.$value;
export const PALETTES: Palette[] = Object.values(tokens.color.palette)
  .filter((p): p is typeof tokens.color.palette['pasar-malam'] => typeof p === 'object' && 'bg' in p)
  .map((p) => ({ name: p.name.$value, bg: p.bg.$value, fg: p.fg.$value, card: p.card.$value, a1: p.a1.$value, a2: p.a2.$value, a3: p.a3.$value }));
/** A stable palette per item, so a shared link always previews in the same colours. */
export const paletteFor = (key: string) => {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTES[h % PALETTES.length];
};
export const sectionLabel: Record<string, string> = { decks: 'Deck', posts: 'Carousel', blog: 'Artikel', videos: 'Video' };
