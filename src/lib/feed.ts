import { allDecks, allPosts, allNotes, slideCount } from './content';

export type FeedKind = 'blog' | 'post' | 'deck';
export type FeedItem = { kind: FeedKind; slug: string; title: string; desc: string; date: string; meta: string };

export const kindLabel: Record<FeedKind, string> = { blog: 'Blog', post: 'Carousel', deck: 'Deck' };
export const kindRoute: Record<FeedKind, string> = { blog: 'blog', post: 'posts', deck: 'decks' };

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "2026-06-21" → "Jun 21, 2026" (parsed by hand: no timezone drift, no Intl cost) */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return y && m && d ? `${MONTHS[m - 1]} ${d}, ${y}` : iso;
}

/** One chronological feed across every content type — the home page reads from this,
 *  so publishing a new deck/post/article updates "Recent" with no markup edits.
 *  Decks and carousels whose slides are not written yet are left out (no dead ends). */
export function buildFeed(): FeedItem[] {
  const items: FeedItem[] = [
    ...allNotes.map((b) => ({ kind: 'blog' as const, slug: b.slug, title: b.title, desc: b.excerpt, date: b.date, meta: `${b.mins} min read` })),
    ...allPosts.map((p) => ({ kind: 'post' as const, slug: p.slug, title: p.title, desc: p.desc, date: p.date, meta: `#${p.tag}` })),
    ...allDecks.map((d) => ({ kind: 'deck' as const, slug: d.slug, title: d.title, desc: d.desc, date: d.date, meta: `${slideCount(d)} slides` }))
  ];
  // newest first; items published on the same day alternate between kinds
  const rank = new Map<FeedItem, number>();
  const seen: Record<string, number> = {};
  for (const it of items) { const k = it.kind + it.date; rank.set(it, (seen[k] = (seen[k] ?? -1) + 1)); }
  return items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : rank.get(a)! - rank.get(b)!));
}
