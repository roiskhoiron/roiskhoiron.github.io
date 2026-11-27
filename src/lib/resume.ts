// "Continue where you left off": the last deck / carousel / article and slide.
import { writable } from 'svelte/store';
import type { FeedKind } from './feed';

export type Resume = { kind: FeedKind; slug: string; title: string; idx: number; total: number };
const KEY = 'kl-resume';

function load(): Resume | null {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}
export const resume = writable<Resume | null>(typeof localStorage === 'undefined' ? null : load());

export function saveResume(r: Resume) {
  resume.set(r);
  try { localStorage.setItem(KEY, JSON.stringify(r)); } catch {}
}
export function clearResume() {
  resume.set(null);
  try { localStorage.removeItem(KEY); } catch {}
}
/** slide to reopen at: the saved one, unless the reader had already reached the end */
export function resumeIndex(kind: FeedKind, slug: string): number {
  const r = load();
  return r && r.kind === kind && r.slug === slug && r.idx < r.total - 1 ? r.idx : 0;
}
