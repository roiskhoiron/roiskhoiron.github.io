// Hash router. Every navigation goes through the URL so Back/Forward, deep links
// and the command palette share one code path.
import { writable } from 'svelte/store';
import { deckSlides, postsSlides, blogData, videosData } from './data';

export type View = 'home' | 'about' | 'decks' | 'videos' | 'posts' | 'blog' | 'deck' | 'post' | 'article' | 'video';
export type Route = { view: View; slug: string };

export const pages = ['home', 'about', 'decks', 'videos', 'posts', 'blog'] as const;
export const parentOf: Record<string, string> = { deck: 'decks', post: 'posts', article: 'blog', video: 'videos' };

export function parse(hash: string): Route {
  const [head, slug = ''] = (hash.replace(/^#/, '') || 'home').split('/');
  if (slug) {
    if (head === 'decks' && deckSlides[slug]) return { view: 'deck', slug };
    if (head === 'posts' && postsSlides[slug]) return { view: 'post', slug };
    if (head === 'blog' && blogData.some((b) => b.slug === slug)) return { view: 'article', slug };
    if (head === 'videos' && videosData.some((v) => v.id === slug)) return { view: 'video', slug };
  }
  return { view: (pages as readonly string[]).includes(head) ? (head as View) : 'home', slug: '' };
}

export const route = writable<Route>(parse(typeof location === 'undefined' ? '' : location.hash));

export function go(hash: string) {
  if (location.hash.replace(/^#/, '') === hash) window.scrollTo({ top: 0, behavior: 'smooth' });
  else location.hash = hash;
}

export function startRouter() {
  const on = () => {
    route.set(parse(location.hash));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };
  window.addEventListener('hashchange', on);
  return () => window.removeEventListener('hashchange', on);
}
