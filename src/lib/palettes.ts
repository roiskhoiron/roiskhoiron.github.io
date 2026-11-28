// The six colour palettes. index.html carries an inline copy (it must paint before
// any module loads) — change both together.
export type Palette = { name: string; bg: string; fg: string; card: string; a1: string; a2: string; a3: string };
export const INK = '#14101f';
export const PALETTES: Palette[] = [
  { name: 'Pasar Malam', bg: '#17102b', fg: '#f6f0ff', card: '#241a40', a1: '#c6ff3d', a2: '#ff6fae', a3: '#5ee6ff' },
  { name: 'Es Krim', bg: '#fff4e0', fg: '#1d1433', card: '#ffffff', a1: '#ff6b4a', a2: '#b79bff', a3: '#3ddbc0' },
  { name: 'Tropis', bg: '#06342f', fg: '#f3ffe9', card: '#0b4a43', a1: '#ffd23f', a2: '#ff8a65', a3: '#9ef01a' },
  { name: 'Kobalt', bg: '#1230d9', fg: '#ffffff', card: '#1f40f0', a1: '#ffe14a', a2: '#ff9ad6', a3: '#7dffb0' },
  { name: 'Permen', bg: '#ffd9ec', fg: '#2a0f3d', card: '#fff3f9', a1: '#9d7bff', a2: '#ff6b88', a3: '#2fd3a6' },
  { name: 'Senja', bg: '#2b0f1f', fg: '#ffeede', card: '#3d1a2e', a1: '#ff9f1c', a2: '#ff5c8a', a3: '#b8f2e6' }
];
/** A stable palette per item, so a shared link always previews in the same colours. */
export const paletteFor = (key: string) => {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTES[h % PALETTES.length];
};
export const sectionLabel: Record<string, string> = { decks: 'Deck', posts: 'Carousel', blog: 'Artikel', videos: 'Video' };
