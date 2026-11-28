// Sharing. Every item has a small static page at /s/<section>/<slug>/ (generated at
// build time by scripts/share-pages.ts) so link previews show that item's own title
// and description; the page then forwards readers to the item in the app.
import { writable } from 'svelte/store';

export type ShareSection = 'decks' | 'posts' | 'blog' | 'videos';
export type ShareItem = { section: ShareSection; slug: string; title: string; text: string; tags?: string[] };

export const sharing = writable<ShareItem | null>(null);

export const shareUrl = (it: Pick<ShareItem, 'section' | 'slug'>) =>
  new URL(`s/${it.section}/${encodeURIComponent(it.slug)}/`, location.origin + location.pathname).href;

export const sectionLabel: Record<ShareSection, string> = { decks: 'Deck', posts: 'Carousel', blog: 'Artikel', videos: 'Video' };

/** Opens the share sheet (quick link sharing plus the branded posting studio). */
export function share(it: ShareItem) {
  sharing.set(it);
}

/** The OS share sheet, when the device has one. */
export const canNativeShare = () => typeof navigator !== 'undefined' && !!navigator.share;
export async function nativeShare(it: ShareItem) {
  try { await navigator.share({ title: it.title, text: it.text, url: shareUrl(it) }); } catch {}
}

export function targets(it: ShareItem) {
  const url = shareUrl(it), u = encodeURIComponent(url), t = encodeURIComponent(it.title);
  const msg = encodeURIComponent(`${it.title}\n${url}`);
  return [
    { id: 'wa', label: 'WhatsApp', href: `https://wa.me/?text=${msg}` },
    { id: 'li', label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { id: 'x', label: 'X', href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { id: 'tg', label: 'Telegram', href: `https://t.me/share/url?url=${u}&text=${t}` },
    { id: 'fb', label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { id: 'mail', label: 'Email', href: `mailto:?subject=${t}&body=${encodeURIComponent(`${it.text}\n\n${url}`)}` }
  ];
}

export async function copy(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  // older browsers and non-secure contexts
  const ta = Object.assign(document.createElement('textarea'), { value: text });
  ta.style.cssText = 'position:fixed;opacity:0'; document.body.append(ta); ta.select();
  const ok = document.execCommand('copy'); ta.remove(); return ok;
}

// ── branded posting ──
export type Platform = 'linkedin' | 'igstory' | 'fbstory' | 'threads' | 'x';
export const platforms: { id: Platform; label: string; format: 'story' | 'post' | 'card'; limit?: number }[] = [
  { id: 'linkedin', label: 'LinkedIn', format: 'card', limit: 3000 },
  { id: 'igstory', label: 'IG Story', format: 'story' },
  { id: 'fbstory', label: 'FB Story', format: 'story' },
  { id: 'threads', label: 'Threads', format: 'card', limit: 500 },
  { id: 'x', label: 'X', format: 'card', limit: 280 }
];

const hashtag = (t: string) => '#' + t.split(/[-\s]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join('');
export const hashtags = (it: ShareItem, n: number) => [...new Set([...(it.tags ?? []).slice(0, n).map(hashtag), '#CodingSkuy'])].join(' ');

/** A starting caption per platform; the reader edits it before posting. */
export function caption(it: ShareItem, p: Platform) {
  const url = shareUrl(it);
  if (p === 'linkedin') return `${it.title}\n\n${it.text}\n\nSelengkapnya di khoirlabs:\n${url}\n\n${hashtags(it, 3)} #khoirlabs`;
  if (p === 'threads') return `${it.title}\n\n${it.text}\n\n${url}`;
  if (p === 'x') {
    const tail = `\n\n${url}\n${hashtags(it, 1)}`;
    const room = 280 - xLength(tail);
    const head = it.title.length + 2 + it.text.length <= room ? `${it.title}\n\n${it.text}` : it.title;
    return head + tail;
  }
  return url; // stories: the link goes into a link sticker
}
/** X counts every link as 23 characters, whatever its real length. */
export const xLength = (s: string) => s.replace(/https?:\/\/\S+/g, 'x'.repeat(23)).length;

export function postUrl(it: ShareItem, p: Platform, text: string) {
  const t = encodeURIComponent(text);
  if (p === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl(it))}`;
  if (p === 'threads') return `https://www.threads.net/intent/post?text=${t}`;
  if (p === 'x') return `https://twitter.com/intent/tweet?text=${t}`;
  return '';
}
