// One place that knows where every piece of content lives.
// Small, hand-written content is bundled (data.ts). Content packs in ./packs/<id>/
// ship their metadata with the page and load slides, cards and article bodies
// on demand, so adding a hundred pieces does not slow down the first visit.
import { decksData, postsData, blogData, deckSlides, postsSlides, blogFull } from './data';
import type { Deck, Post, BlogPost, DeckSlide, PostSlide } from './data';
import type { Full } from './blog-html';

type Meta = { decks: Deck[]; posts: Post[]; notes: BlogPost[] };
type Body = { deckSlides: Record<string, DeckSlide[]>; postSlides: Record<string, PostSlide[]>; noteBodies: Record<string, Full> };

const metas = import.meta.glob<Meta>('./packs/*/meta.ts', { eager: true });
const bodies = import.meta.glob<Body>('./packs/*/content.ts');

const home = new Map<string, string>(); // "deck:slug" → path of the pack's content module
for (const [path, m] of Object.entries(metas)) {
  const body = path.replace('/meta.ts', '/content.ts');
  for (const d of m.decks) home.set('deck:' + d.slug, body);
  for (const p of m.posts) home.set('post:' + p.slug, body);
  for (const n of m.notes) home.set('note:' + n.slug, body);
}
// deal packs round-robin, so a page mixes history, theory, practice and management
const deal = <T,>(lists: T[][]) => { const out: T[] = []; for (let i = 0; lists.some((l) => i < l.length); i++) for (const l of lists) if (i < l.length) out.push(l[i]); return out; };
const packs = Object.values(metas);
const packDecks = deal(packs.map((m) => m.decks));
const packPosts = deal(packs.map((m) => m.posts));
const packNotes = deal(packs.map((m) => m.notes));

// Same date → keep the authored order, so a newly published batch reads in sequence.
const newest = <T extends { date: string }>(list: T[]) =>
  list.map((x, i) => [x, i] as const).sort((a, b) => (a[0].date < b[0].date ? 1 : a[0].date > b[0].date ? -1 : a[1] - b[1])).map(([x]) => x);

export const allDecks: Deck[] = newest([...packDecks, ...decksData.filter((d) => deckSlides[d.slug])]);
export const allPosts: Post[] = newest([...packPosts, ...postsData.filter((p) => postsSlides[p.slug])]);
export const allNotes: BlogPost[] = newest([...packNotes, ...blogData]);

const deckBySlug = new Map(allDecks.map((d) => [d.slug, d]));
const postBySlug = new Map(allPosts.map((p) => [p.slug, p]));
const noteBySlug = new Map(allNotes.map((n) => [n.slug, n]));
export const findDeck = (slug: string) => deckBySlug.get(slug);
export const findPost = (slug: string) => postBySlug.get(slug);
export const findNote = (slug: string) => noteBySlug.get(slug);
export const slideCount = (d: Deck) => deckSlides[d.slug]?.length ?? d.slides;

const pack = (kind: string, slug: string) => {
  const load = bodies[home.get(kind + ':' + slug) ?? ''];
  return load ? load() : Promise.resolve(null);
};

export async function loadDeck(slug: string): Promise<DeckSlide[]> {
  return deckSlides[slug] ?? (await pack('deck', slug))?.deckSlides[slug] ?? [];
}
export async function loadPost(slug: string): Promise<PostSlide[]> {
  return postsSlides[slug] ?? (await pack('post', slug))?.postSlides[slug] ?? [];
}
export async function loadNote(slug: string): Promise<Full | undefined> {
  return blogFull[slug] ?? (await pack('note', slug))?.noteBodies[slug];
}

/** Warm the module cache when the pointer heads towards a link. */
export function prefetch(hash: string) {
  const [head, slug] = hash.replace(/^#/, '').split('/');
  const kind = head === 'decks' ? 'deck' : head === 'posts' ? 'post' : head === 'blog' ? 'note' : '';
  if (kind && slug) pack(kind, slug).catch(() => {});
}
