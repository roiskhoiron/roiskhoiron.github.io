// Generates a tiny static page per item at build/s/<section>/<slug>/index.html.
// Link previews (WhatsApp, LinkedIn, X…) ignore everything after "#", so without
// these pages every shared link would preview as the home page. Each page carries
// the item's own title and description, then forwards the reader into the app.
// Run after `vite build` (see package.json).
import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { decksData, postsData, blogData, videosData, deckSlides, postsSlides } from '../src/lib/data';

const SITE = 'https://roiskhoiron.github.io/';
const OUT = join(import.meta.dir, '..', 'build', 's');

type Item = { section: 'decks' | 'posts' | 'blog' | 'videos'; slug: string; title: string; text: string; image?: string };
const items: Item[] = [
  ...decksData.filter((d) => deckSlides[d.slug]).map((d) => ({ section: 'decks' as const, slug: d.slug, title: d.title, text: d.desc })),
  ...postsData.filter((p) => postsSlides[p.slug]).map((p) => ({ section: 'posts' as const, slug: p.slug, title: p.title, text: p.desc })),
  ...blogData.map((b) => ({ section: 'blog' as const, slug: b.slug, title: b.title, text: b.excerpt })),
  ...videosData.map((v) => ({ section: 'videos' as const, slug: v.id, title: v.title, text: v.desc, image: v.thumb }))
];

const packsDir = join(import.meta.dir, '..', 'src', 'lib', 'packs');
for (const id of existsSync(packsDir) ? readdirSync(packsDir) : []) {
  const file = join(packsDir, id, 'meta.ts');
  if (!existsSync(file)) continue;
  const m = await import(file);
  items.push(
    ...m.decks.map((d: any) => ({ section: 'decks' as const, slug: d.slug, title: d.title, text: d.desc })),
    ...m.posts.map((p: any) => ({ section: 'posts' as const, slug: p.slug, title: p.title, text: p.desc })),
    ...m.notes.map((n: any) => ({ section: 'blog' as const, slug: n.slug, title: n.title, text: n.excerpt }))
  );
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const kind = { decks: 'Deck', posts: 'Carousel', blog: 'Artikel', videos: 'Video' };

for (const it of items) {
  const dir = join(OUT, it.section, it.slug);
  mkdirSync(dir, { recursive: true });
  const self = `${SITE}s/${it.section}/${encodeURIComponent(it.slug)}/`;
  const app = `../../../#${it.section}/${it.slug}`;
  const title = `${it.title} — khoirlabs`;
  writeFileSync(join(dir, 'index.html'), `<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(it.text)}">
<link rel="canonical" href="${self}">
<meta property="og:type" content="article"><meta property="og:site_name" content="khoirlabs">
<meta property="og:title" content="${esc(it.title)}"><meta property="og:description" content="${esc(`${kind[it.section]} · ${it.text}`)}">
<meta property="og:url" content="${self}"><meta property="og:image" content="${esc(it.image ?? SITE + 'og.png')}">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0;url=${esc(app)}">
<script>location.replace(${JSON.stringify(app)})</script>
</head><body><p><a href="${esc(app)}">${esc(it.title)}</a></p></body></html>
`);
}
console.log(`share pages: ${items.length} written to build/s/`);
