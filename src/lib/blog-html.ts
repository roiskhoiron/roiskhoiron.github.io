// Tiny helpers for article bodies: plain semantic HTML, styled by `.prose` in styles.css.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const p = (...html: string[]) => html.map((h) => `<p>${h}</p>`).join('');
export const ul = (...items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
export const pre = (code: string) => `<pre>${esc(code)}</pre>`;
export const c = (code: string) => `<code>${esc(code)}</code>`;
export const b = (text: string) => `<strong>${text}</strong>`;
export type Full = { lead: string; sections: { id: string; title: string; body: string }[] };
