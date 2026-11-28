// Hash router. Every navigation goes through the URL so Back/Forward, deep links
// and the command palette share one code path.
import { writable } from 'svelte/store';
import { videosData } from './data';
import { findDeck, findPost, findNote } from './content';
import { toTop } from './scroll';

export type View = 'home' | 'about' | 'decks' | 'videos' | 'posts' | 'blog' | 'deck' | 'post' | 'article' | 'video';
export type Route = { view: View; slug: string; page: number };

export const pages = ['home', 'about', 'decks', 'videos', 'posts', 'blog'] as const;
export const parentOf: Record<string, string> = { deck: 'decks', post: 'posts', article: 'blog', video: 'videos' };

export function parse(hash: string): Route {
  const [head, slug = ''] = (hash.replace(/^#/, '') || 'home').split('/');
  const paged = /^page-(\d+)$/.exec(slug);
  if (slug && !paged) {
    if (head === 'decks' && findDeck(slug)) return { view: 'deck', slug, page: 1 };
    if (head === 'posts' && findPost(slug)) return { view: 'post', slug, page: 1 };
    if (head === 'blog' && findNote(slug)) return { view: 'article', slug, page: 1 };
    if (head === 'videos' && videosData.some((v) => v.id === slug)) return { view: 'video', slug, page: 1 };
  }
  const view = (pages as readonly string[]).includes(head) ? (head as View) : 'home';
  return { view, slug: '', page: paged ? Math.max(1, +paged[1]) : 1 };
}

export const route = writable<Route>(parse(typeof location === 'undefined' ? '' : location.hash));

export function go(hash: string) {
  if (location.hash.replace(/^#/, '') === hash) toTop();
  else location.hash = hash;
}

/** The list page (with its page number) the reader last saw, so "back" returns there. */
const lastList: Record<string, string> = {};
export const listHash = (section: string) => lastList[section] ?? section;

export function startRouter() {
  let current = parse(location.hash);
  const remember = (r: Route) => { if (r.view === 'decks' || r.view === 'posts' || r.view === 'blog') lastList[r.view] = location.hash.replace(/^#/, '') || r.view; };
  remember(current);
  const on = () => {
    const next = parse(location.hash);
    // flipping pages keeps the reader in place; the pager glides to the list itself
    const samePage = next.view === current.view && next.slug === current.slug;
    current = next;
    remember(next);
    route.set(next);
    if (!samePage) toTop();
  };
  window.addEventListener('hashchange', on);
  return () => window.removeEventListener('hashchange', on);
}
