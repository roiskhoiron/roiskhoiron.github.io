// Sharing. Every item has a small static page at /s/<section>/<slug>/ (generated at
// build time by scripts/share-pages.ts) so link previews show that item's own title
// and description; the page then forwards readers to the item in the app.
import { writable } from 'svelte/store';

export type ShareSection = 'decks' | 'posts' | 'blog' | 'videos';
export type ShareItem = { section: ShareSection; slug: string; title: string; text: string };

export const sharing = writable<ShareItem | null>(null);

export const shareUrl = (it: Pick<ShareItem, 'section' | 'slug'>) =>
  new URL(`s/${it.section}/${encodeURIComponent(it.slug)}/`, location.origin + location.pathname).href;

export const sectionLabel: Record<ShareSection, string> = { decks: 'Deck', posts: 'Carousel', blog: 'Artikel', videos: 'Video' };

/** Phones get the OS share sheet; everything else gets ours. */
export async function share(it: ShareItem) {
  const coarse = matchMedia('(pointer: coarse)').matches;
  if (coarse && navigator.share) {
    try { await navigator.share({ title: it.title, text: it.text, url: shareUrl(it) }); return; }
    catch (e) { if ((e as DOMException).name === 'AbortError') return; }
  }
  sharing.set(it);
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
