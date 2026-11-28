// Generates, for every item, a small static page and a link-preview image:
//   build/s/<section>/<slug>/index.html   — title, description and og:image for crawlers
//   build/s/<section>/<slug>/og.png       — 1200×630 branded card
// Link previews (WhatsApp, LinkedIn, X, Threads, Facebook…) ignore everything after
// "#", so without these pages every shared link would preview as the home page.
// Each page then forwards the reader into the app. Run after `vite build`.
import { readdirSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { decksData, postsData, blogData, videosData, deckSlides, postsSlides } from '../src/lib/data';
import { paletteFor, sectionLabel, INK, type Palette } from '../src/lib/palettes';

const SITE = 'https://roiskhoiron.github.io/';
const ROOT = join(import.meta.dir, '..');
const OUT = join(ROOT, 'build', 's');

type Item = { section: 'decks' | 'posts' | 'blog' | 'videos'; slug: string; title: string; text: string; tag: string };
const items: Item[] = [
  ...decksData.filter((d) => deckSlides[d.slug]).map((d) => ({ section: 'decks' as const, slug: d.slug, title: d.title, text: d.desc, tag: d.tags[0] ?? '' })),
  ...postsData.filter((p) => postsSlides[p.slug]).map((p) => ({ section: 'posts' as const, slug: p.slug, title: p.title, text: p.desc, tag: p.tag })),
  ...blogData.map((b) => ({ section: 'blog' as const, slug: b.slug, title: b.title, text: b.excerpt, tag: b.tags[0] ?? '' })),
  ...videosData.map((v) => ({ section: 'videos' as const, slug: v.id, title: v.title, text: v.desc, tag: v.tag }))
];
const packsDir = join(ROOT, 'src', 'lib', 'packs');
for (const id of existsSync(packsDir) ? readdirSync(packsDir) : []) {
  const file = join(packsDir, id, 'meta.ts');
  if (!existsSync(file)) continue;
  const m = await import(file);
  items.push(
    ...m.decks.map((d: any) => ({ section: 'decks' as const, slug: d.slug, title: d.title, text: d.desc, tag: d.tags[0] ?? '' })),
    ...m.posts.map((p: any) => ({ section: 'posts' as const, slug: p.slug, title: p.title, text: p.desc, tag: p.tag })),
    ...m.notes.map((n: any) => ({ section: 'blog' as const, slug: n.slug, title: n.title, text: n.excerpt, tag: n.tags[0] ?? '' }))
  );
}

// ── the preview card ──
const font = (pkg: string, file: string) => readFileSync(join(ROOT, 'node_modules', '@fontsource', pkg, 'files', file));
const fonts = [
  { name: 'Anybody', data: font('anybody', 'anybody-latin-800-normal.woff'), weight: 800 as const, style: 'normal' as const },
  { name: 'Onest', data: font('onest', 'onest-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Onest', data: font('onest', 'onest-latin-700-normal.woff'), weight: 700 as const, style: 'normal' as const }
];
const dataUri = (file: string) => 'data:image/jpeg;base64,' + readFileSync(join(import.meta.dir, file)).toString('base64');
const AVATAR = dataUri('avatar.jpg');

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node =>
  ({ type, props: { style: { display: 'flex', ...style }, children: children.length === 1 ? children[0] : children } });
const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

function card(it: Item, p: Palette): Node {
  const t = it.title;
  const size = t.length <= 28 ? 86 : t.length <= 46 ? 72 : t.length <= 64 ? 60 : 52;
  return h('div', { width: 1200, height: 630, position: 'relative', background: p.bg, color: p.fg, fontFamily: 'Onest', overflow: 'hidden' },
    // colour blobs
    h('div', { position: 'absolute', right: -170, top: -230, width: 460, height: 460, borderRadius: 999, background: p.a2, opacity: 0.4 }),
    h('div', { position: 'absolute', right: 120, bottom: -260, width: 380, height: 380, borderRadius: 999, background: p.a3, opacity: 0.3 }),
    h('div', { position: 'absolute', left: 64, top: 52, width: 1072, height: 526, flexDirection: 'column', justifyContent: 'space-between' },
      h('div', { alignItems: 'center', gap: 14 },
        h('div', { background: p.a1, color: INK, border: `3px solid ${INK}`, borderRadius: 999, padding: '8px 20px', fontSize: 24, fontWeight: 700, transform: 'rotate(-3deg)' },
          `${sectionLabel[it.section]}${it.tag ? ' · #' + it.tag : ''}`),
        h('div', { fontSize: 22, fontWeight: 700, opacity: 0.75, letterSpacing: 2 }, 'KHOIRLABS')),
      h('div', { flexDirection: 'column', gap: 18, maxWidth: 1000 },
        h('div', { fontFamily: 'Anybody', fontWeight: 800, fontSize: size, lineHeight: 1.0, textTransform: 'uppercase', letterSpacing: -1 }, clip(t, 90)),
        h('div', { fontSize: 28, lineHeight: 1.35, opacity: 0.85 }, clip(it.text, 130))),
      h('div', { alignItems: 'center', justifyContent: 'space-between' },
        h('div', { alignItems: 'center', gap: 16 },
          { type: 'img', props: { src: AVATAR, width: 64, height: 64, style: { borderRadius: 999, border: `3px solid ${p.fg}` } } },
          h('div', { flexDirection: 'column' },
            h('div', { fontSize: 26, fontWeight: 700 }, 'Khoiron Rois'),
            h('div', { fontSize: 20, opacity: 0.75 }, 'roiskhoiron.github.io'))),
        h('div', { background: p.fg, color: p.bg, borderRadius: 999, padding: '12px 26px', fontSize: 24, fontWeight: 700, transform: 'rotate(2deg)' }, 'ngoding kuy!'))));
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const t0 = performance.now();
for (const it of items) {
  const dir = join(OUT, it.section, it.slug);
  mkdirSync(dir, { recursive: true });
  const svg = await satori(card(it, paletteFor(it.section + '/' + it.slug)) as any, { width: 1200, height: 630, fonts });
  writeFileSync(join(dir, 'og.png'), new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng());

  const self = `${SITE}s/${it.section}/${encodeURIComponent(it.slug)}/`;
  const app = `../../../#${it.section}/${it.slug}`;
  writeFileSync(join(dir, 'index.html'), `<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(`${it.title} — khoirlabs`)}</title>
<meta name="description" content="${esc(it.text)}">
<link rel="canonical" href="${self}">
<meta property="og:type" content="article"><meta property="og:site_name" content="khoirlabs">
<meta property="og:title" content="${esc(it.title)}"><meta property="og:description" content="${esc(`${sectionLabel[it.section]} · ${it.text}`)}">
<meta property="og:url" content="${self}"><meta property="og:image" content="${self}og.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${self}og.png">
<meta http-equiv="refresh" content="0;url=${esc(app)}">
<script>location.replace(${JSON.stringify(app)})</script>
</head><body><p><a href="${esc(app)}">${esc(it.title)}</a></p></body></html>
`);
}
console.log(`share pages + preview images: ${items.length} in ${((performance.now() - t0) / 1000).toFixed(1)}s`);
