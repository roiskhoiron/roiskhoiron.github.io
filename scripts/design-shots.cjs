// bun run design:shots — visual QA screenshots for any UI change.
// Builds nothing: run `bun run build` first. Starts `vite preview`, captures the key
// pages on three palettes (dark, light, saturated) at desktop and phone width, checks
// for horizontal overflow, and writes everything to .design-shots/<timestamp>/.
// Needs Playwright: `npm i -D playwright && npx playwright install chromium`.
const { spawn } = require('node:child_process');
const { mkdirSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

let chromium;
try { ({ chromium } = require('playwright')); }
catch { console.error('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium'); process.exit(2); }

const PORT = 4179;
const BASE = `http://localhost:${PORT}/`;
const PAGES = (process.argv.slice(2).filter((a) => !a.startsWith('-'))[0] || 'home,about,decks,posts,blog,designsystem,decks/sejarah-apollo-11,posts/sql-empat-kata-kunci').split(',');
const PALETTES = [[0, 'pasar-malam'], [1, 'es-krim'], [3, 'kobalt']];
const VIEWPORTS = [['desktop', { viewport: { width: 1280, height: 900 } }], ['phone', { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }]];
const out = join(process.cwd(), '.design-shots', new Date().toISOString().replace(/[:.]/g, '-'));
mkdirSync(out, { recursive: true });

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
const stop = () => { try { server.kill(); } catch {} };
process.on('exit', stop);

(async () => {
  await new Promise((r) => setTimeout(r, 2500));
  const browser = await chromium.launch();
  const report = [];
  for (const [vp, opts] of VIEWPORTS) {
    for (const [pi, pname] of PALETTES) {
      const ctx = await browser.newContext({ ...opts, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      for (const route of PAGES) {
        await page.goto(BASE + '#' + route);
        await page.waitForTimeout(900);
        await page.evaluate((n) => window.__KL.apply(n), pi);
        await page.waitForTimeout(250);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        const file = `${vp}-${pname}-${route.replace(/\//g, '_')}.png`;
        await page.screenshot({ path: join(out, file), fullPage: !route.includes('/') });
        report.push({ vp, palette: pname, route, file, overflow });
        if (overflow) console.log(`  ✗ horizontal overflow: ${route} (${vp}, ${pname})`);
      }
      await ctx.close();
    }
  }
  await browser.close();
  writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2));
  const bad = report.filter((r) => r.overflow).length;
  console.log(`\n${report.length} screenshots in ${out}${bad ? ` — ${bad} with horizontal overflow` : ''}`);
  stop();
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); stop(); process.exit(1); });
