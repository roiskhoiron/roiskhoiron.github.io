// Draws branded share images in the browser: a 9:16 story and a 4:5 feed post.
// (The 1200×630 link-preview card is rendered at build time by scripts/share-pages.ts
// in the same style; the "card" format here only mirrors it for on-screen previews.)
import { INK, type Palette } from './palettes';
import { sectionLabel } from './palettes';
import avatarUrl from '../assets/portrait-400.webp';

export type Format = 'story' | 'post' | 'card';
export const SIZES: Record<Format, [number, number]> = { story: [1080, 1920], post: [1080, 1350], card: [1200, 630] };
export type PosterItem = { section: string; title: string; text: string; tag?: string };

const DISPLAY = '"Anybody Variable", "Anybody", system-ui, sans-serif';
const TEXT = '"Onest Variable", "Onest", system-ui, sans-serif';

let avatar: Promise<HTMLImageElement> | null = null;
const loadAvatar = () => (avatar ??= new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = avatarUrl; }));

function lines(ctx: CanvasRenderingContext2D, text: string, width: number, max: number) {
  const words = text.split(/\s+/), out: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (ctx.measureText(next).width <= width || !cur) cur = next;
    else { out.push(cur); cur = w; }
  }
  if (cur) out.push(cur);
  if (out.length > max) {
    const kept = out.slice(0, max);
    let last = kept[max - 1];
    while (ctx.measureText(last + '…').width > width && last.length > 1) last = last.slice(0, -1);
    kept[max - 1] = last.trimEnd() + '…';
    return kept;
  }
  return out;
}
function pill(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, size: number, fill: string, ink: string, rot = 0) {
  ctx.save();
  ctx.font = `700 ${size}px ${TEXT}`;
  const w = ctx.measureText(label).width + size * 1.6, h = size * 1.9;
  ctx.translate(x, y); ctx.rotate((rot * Math.PI) / 180);
  ctx.beginPath(); ctx.roundRect(0, 0, w, h, h / 2); ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = Math.max(3, size / 8); ctx.strokeStyle = ink; ctx.stroke();
  ctx.fillStyle = ink; ctx.textBaseline = 'middle'; ctx.fillText(label, size * 0.8, h / 2 + 1);
  ctx.restore();
  return w;
}
function blob(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
async function author(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, p: Palette, sub: string) {
  const img = await loadAvatar().catch(() => null);
  ctx.save();
  ctx.beginPath(); ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2); ctx.closePath();
  ctx.lineWidth = size / 18; ctx.strokeStyle = p.fg; ctx.stroke(); ctx.clip();
  if (img) ctx.drawImage(img, x, y, size, size);
  ctx.restore();
  ctx.fillStyle = p.fg; ctx.textBaseline = 'alphabetic';
  ctx.font = `700 ${size * 0.4}px ${TEXT}`; ctx.fillText('Khoiron Rois', x + size * 1.25, y + size * 0.45);
  ctx.globalAlpha = 0.78; ctx.font = `400 ${size * 0.3}px ${TEXT}`; ctx.fillText(sub, x + size * 1.25, y + size * 0.85); ctx.globalAlpha = 1;
}

export async function render(it: PosterItem, p: Palette, format: Format): Promise<HTMLCanvasElement> {
  await Promise.all([document.fonts.load(`800 80px ${DISPLAY}`), document.fonts.load(`700 40px ${TEXT}`), document.fonts.load(`400 40px ${TEXT}`)]).catch(() => {});
  const [W, H] = SIZES[format];
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
  const label = `${sectionLabel[it.section] ?? ''}${it.tag ? ' · #' + it.tag : ''}`;
  const titleFont = (s: number) => { ctx.font = `800 ${s}px ${DISPLAY}`; (ctx as any).fontStretch = 'normal'; };

  if (format === 'story') {
    blob(ctx, W - 40, 260, 380, p.a2, 0.4); blob(ctx, 80, H - 200, 420, p.a3, 0.3);
    // brand line — kept below Instagram's top bar
    ctx.fillStyle = p.fg; ctx.font = `700 34px ${TEXT}`; ctx.globalAlpha = 0.8; ctx.fillText('KHOIRLABS · CODINGSKUY', 90, 290); ctx.globalAlpha = 1;
    // the tilted card
    const cx = 90, cy = 400, cw = W - 180, chh = 860;
    ctx.save(); ctx.translate(W / 2, cy + chh / 2); ctx.rotate((-2.5 * Math.PI) / 180); ctx.translate(-W / 2, -(cy + chh / 2));
    ctx.fillStyle = p.fg; ctx.beginPath(); ctx.roundRect(cx + 18, cy + 18, cw, chh, 56); ctx.fill();
    ctx.fillStyle = p.a1; ctx.beginPath(); ctx.roundRect(cx, cy, cw, chh, 56); ctx.fill();
    ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke();
    pill(ctx, cx + 60, cy + 64, label, 34, INK, INK);
    ctx.fillStyle = p.a1; ctx.font = `700 34px ${TEXT}`; ctx.textBaseline = 'middle'; ctx.fillText(label, cx + 60 + 27, cy + 64 + 33); ctx.textBaseline = 'alphabetic';
    const t = it.title.toUpperCase();
    const size = t.length <= 30 ? 104 : t.length <= 50 ? 88 : 74;
    titleFont(size); ctx.fillStyle = INK;
    const tl = lines(ctx, t, cw - 120, 5);
    tl.forEach((l, i) => ctx.fillText(l, cx + 60, cy + 230 + size * 0.95 + i * size * 1.02));
    ctx.font = `400 40px ${TEXT}`; ctx.globalAlpha = 0.85;
    const dl = lines(ctx, it.text, cw - 120, 5);
    const dy = cy + 230 + size * 0.95 + tl.length * size * 1.02 + 40;
    dl.forEach((l, i) => ctx.fillText(l, cx + 60, dy + i * 54));
    ctx.globalAlpha = 1; ctx.restore();
    // the band below the author row stays empty: that is where the link sticker goes
    await author(ctx, 100, 1360, 120, p, 'Software Engineer · roiskhoiron.github.io');
    pill(ctx, W - 400, 215, 'ngoding kuy!', 36, p.fg, p.fg, 5);
    ctx.fillStyle = p.bg; ctx.font = `700 36px ${TEXT}`; ctx.save(); ctx.translate(W - 400, 215); ctx.rotate((5 * Math.PI) / 180); ctx.textBaseline = 'middle'; ctx.fillText('ngoding kuy!', 29, 35); ctx.restore();
    return cv;
  }

  // post (4:5) and card (1.91:1) share one layout, scaled to the frame
  const pad = format === 'post' ? 84 : 64;
  blob(ctx, W + 60, -40, format === 'post' ? 420 : 300, p.a2, 0.4);
  blob(ctx, W * 0.72, H + 90, format === 'post' ? 360 : 230, p.a3, 0.3);
  const ps = format === 'post' ? 34 : 24;
  const pw = pill(ctx, pad, pad, label, ps, p.a1, INK, -3);
  ctx.fillStyle = p.fg; ctx.globalAlpha = 0.75; ctx.font = `700 ${ps * 0.9}px ${TEXT}`; ctx.textBaseline = 'middle';
  ctx.fillText('KHOIRLABS', pad + pw + 24, pad + ps); ctx.globalAlpha = 1; ctx.textBaseline = 'alphabetic';
  const t = it.title.toUpperCase();
  const base = format === 'post' ? (t.length <= 30 ? 112 : t.length <= 50 ? 94 : 78) : (t.length <= 28 ? 86 : t.length <= 46 ? 72 : 58);
  titleFont(base); ctx.fillStyle = p.fg;
  const tl = lines(ctx, t, W - pad * 2, format === 'post' ? 6 : 3);
  const top = format === 'post' ? 300 : H / 2 - (tl.length * base) / 2 - 10;
  tl.forEach((l, i) => ctx.fillText(l, pad, top + base * 0.9 + i * base * 1.0));
  const ds = format === 'post' ? 40 : 27;
  ctx.font = `400 ${ds}px ${TEXT}`; ctx.globalAlpha = 0.85;
  const dl = lines(ctx, it.text, W - pad * 2, format === 'post' ? 4 : 2);
  dl.forEach((l, i) => ctx.fillText(l, pad, top + base * 0.9 + tl.length * base + ds * 1.2 + i * ds * 1.35));
  ctx.globalAlpha = 1;
  const av = format === 'post' ? 104 : 64;
  await author(ctx, pad, H - pad - av, av, p, 'roiskhoiron.github.io');
  return cv;
}

export const toBlob = (cv: HTMLCanvasElement) => new Promise<Blob>((res) => cv.toBlob((b) => res(b!), 'image/png'));
