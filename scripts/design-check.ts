// bun run design:check — keeps the UI on the design system.
//
// Errors (exit 1):
//   - generated token files are out of date (run `bun run tokens`)
//   - raw colours (#hex, rgb(), hsl()) in styles outside the token files
//   - font-family or cubic-bezier written by hand instead of var(--display|--sans|--mono|--spring|--ease)
//   - a slide/carousel/article that the validator cannot read is not checked here (see validate-pack)
// Warnings (reported, not fatal): off-scale radius, shadow offsets and durations —
// the design debt list, so it shrinks instead of growing.
//
// Deliberate exceptions go between `design-exception:start <reason>` and
// `design-exception:end` comments (e.g. mock-ups of other platforms' UI).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = join(import.meta.dir, '..');
const walk = (dir: string): string[] => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? (f === 'packs' ? [] : walk(p)) : [p];
});
const files = walk(join(ROOT, 'src')).filter((f) => /\.(css|svelte)$/.test(f) && !f.endsWith('tokens.css'));

const errors: string[] = [], warnings: string[] = [];
const RADII = new Set(['0', 'inherit', '50%', 'var(--radius-xs)', 'var(--radius-sm)', 'var(--radius-md)', 'var(--radius-lg)', 'var(--radius-xl)', 'var(--radius-card)', 'var(--radius-stage)', 'var(--radius-pill)', 'var(--r)']);

for (const file of files) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, 'utf8');
  // only look at CSS: the whole .css file, or <style> blocks and style="" attributes in .svelte
  const lines = src.split('\n');
  let inStyle = file.endsWith('.css'), exception = false;
  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    if (/<style/.test(line)) inStyle = true;
    if (/<\/style>/.test(line)) inStyle = false;
    if (/design-exception:start/.test(line)) exception = true;
    if (/design-exception:end/.test(line)) { exception = false; return; }
    const css = inStyle ? line : (line.match(/style="([^"]*)"/g) ?? []).join(' ');
    if (!css || exception) return;
    const code = css.replace(/\/\*.*?\*\//g, '');
    for (const m of code.matchAll(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/g)) errors.push(`${at}  raw colour "${m[0]}" — use a palette or token variable`);
    if (/font-family:(?!\s*(var\(|inherit))/.test(code)) errors.push(`${at}  font-family written by hand — use var(--display), var(--sans) or var(--mono)`);
    if (/cubic-bezier\(/.test(code)) errors.push(`${at}  cubic-bezier written by hand — use var(--spring) or var(--ease)`);
    for (const m of code.matchAll(/border-radius:\s*([^;}!]+)/g)) {
      const v = m[1].trim();
      if (v.includes('{')) continue; // Svelte expression: decided at runtime, not checkable here
      if (!v.split(/\s+/).every((x) => RADII.has(x) || /^var\(--radius-[\w-]+\)$/.test(x))) warnings.push(`${at}  radius "${v}" is off the scale (radius-xs…pill)`);
    }
    for (const m of code.matchAll(/box-shadow:\s*(\d+px \d+px 0)/g)) warnings.push(`${at}  shadow "${m[1]}" is not a lift token`);
    for (const m of code.matchAll(/(?<![\w.-])(\d*\.?\d+m?s) var\(--(spring|ease)\)/g)) warnings.push(`${at}  duration "${m[1]}" is not a dur token`);
  });
}

const tokens = spawnSync('bun', [join(ROOT, 'scripts/tokens.ts'), '--check'], { encoding: 'utf8' });
if (tokens.status !== 0) errors.push((tokens.stderr || tokens.stdout).trim());

const strict = process.argv.includes('--strict');
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s) — design debt, fix when you touch these lines:`);
  for (const w of warnings) console.log('  ' + w);
}
if (errors.length) {
  console.log(`\n${errors.length} error(s):`);
  for (const e of errors) console.log('  ' + e);
}
const failed = errors.length > 0 || (strict && warnings.length > 0);
console.log(failed ? '\ndesign:check FAILED' : `\ndesign:check passed (${files.length} files, ${warnings.length} warnings)`);
process.exit(failed ? 1 : 0);
