<script lang="ts">
  // The design system, documented with the real tokens and the real components.
  // Everything on this page is read from src/design/tokens.json or rendered by
  // the same classes and components the site uses, so it cannot drift.
  import tokens from '../design/tokens.json';
  import { PALETTES, INK, type Palette } from '../lib/palettes';
  import { split, fling, countUp, confetti } from '../lib/fx';
  import { remix } from '../lib/palette';
  import { glideTo } from '../lib/scroll';
  import Pager from './Pager.svelte';
  import ShareButton from './ShareButton.svelte';

  const VERSION = '1.0';
  const REPO = 'https://github.com/roiskhoiron/roiskhoiron.github.io/blob/master/';

  // ── colour maths for the contrast table (WCAG 2.x) ──
  const rgb = (hex: string) => { const h = hex.replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
  const lum = (hex: string) => { const [r, g, b] = rgb(hex).map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ratio = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const mix = (a: string, b: string, t: number) => '#' + rgb(a).map((v, i) => Math.round(v * t + rgb(b)[i] * (1 - t)).toString(16).padStart(2, '0')).join('');
  const grade = (r: number) => (r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA besar' : 'Gagal');
  const pairs = (p: Palette) => [
    ['fg / bg', p.fg, p.bg], ['soft / bg', mix(p.fg, p.bg, 0.74), p.bg], ['fg / card', p.fg, p.card],
    ['ink / a1', INK, p.a1], ['ink / a2', INK, p.a2], ['ink / a3', INK, p.a3]
  ] as const;
  const use = (i: number) => (window as any).__KL.apply(i);

  // ── token tables ──
  type Row = { name: string; value: string; desc: string };
  const isTok = (x: any) => x && typeof x === 'object' && '$value' in x;
  const show = (v: unknown) => (Array.isArray(v) ? (v.every((x) => typeof x === 'number') ? `cubic-bezier(${v.join(', ')})` : v.join(', ')) : String(v));
  const varName = (group: string, key: string) =>
    group === 'ease' ? (key === 'out' ? '--ease' : '--spring') : group === 'font' ? `--${key}` : group === 'layout' ? `--${key}` :
    group === 'color' || group === 'derived' ? `--${key}` : `--${{ text: 'text', radius: 'radius', border: 'border', lift: 'lift', space: 'space', duration: 'dur' }[group]}-${key}`;
  const groupRows = (g: string): Row[] => Object.entries<any>((tokens as any)[g]).filter(([, t]) => isTok(t)).map(([k, t]) => ({ name: varName(g, k), value: show(t.$value), desc: t.$description ?? '' }));
  const tables: [string, string, Row[]][] = [
    ['color', 'Warna tetap', groupRows('color')], ['derived', 'Warna turunan', groupRows('derived')], ['font', 'Font', groupRows('font')],
    ['text', 'Ukuran teks', groupRows('text')], ['radius', 'Radius', groupRows('radius')], ['border', 'Garis', groupRows('border')],
    ['lift', 'Lift (bayangan)', groupRows('lift')], ['space', 'Spasi', groupRows('space')], ['layout', 'Layout', groupRows('layout')],
    ['ease', 'Easing', groupRows('ease')], ['duration', 'Durasi', groupRows('duration')]
  ];
  const tokenCount = tables.reduce((n, [, , r]) => n + r.length, 0) + PALETTES.length * 6;
  let copied = '';
  async function copyVar(name: string) {
    try { await navigator.clipboard.writeText(`var(${name})`); copied = name; setTimeout(() => (copied = ''), 1400); } catch {}
  }
  const download = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' }));
    Object.assign(document.createElement('a'), { href: url, download: 'khoirlabs-tokens.json' }).click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // ── type ──
  const typeScale = [
    ['display', 'Complete products', 'Hero halaman depan saja.'], ['h1', 'Judul halaman', 'Satu per halaman.'], ['h2', 'Kepala section', 'Didampingi nomor bulat.'],
    ['h3', 'Judul kartu dan item', 'Di dalam kartu, tile, entri.'], ['lead', 'Paragraf pembuka di bawah judul halaman, maksimal 54 karakter per baris.', ''],
    ['body', 'Teks isi biasa. Kalimat pendek, satu ide per kalimat.', ''], ['small', 'Teks pendukung dan catatan.', ''], ['label', 'Label metadata', 'Huruf kapital, spasi 0,1em.']
  ];
  let stretch = 105;

  // ── motion demos ──
  let ball: 'rest' | 'go' = 'rest';
  const curves = [['spring', [0.34, 1.56, 0.64, 1]], ['out', [0.2, 0.8, 0.2, 1]]] as const;
  const path = (c: readonly number[]) => `M0 100 C ${c[0] * 100} ${100 - c[1] * 100}, ${c[2] * 100} ${100 - c[3] * 100}, 100 0`;
  const replay = (e: MouseEvent) => {
    const el = (e.currentTarget as HTMLElement).querySelector('.demo-target') as HTMLElement | null;
    if (!el) return;
    el.style.animation = 'none'; void el.offsetWidth; el.style.animation = el.dataset.anim ?? '';
  };

  const sections = [
    ['prinsip', 'Prinsip'], ['warna', 'Warna'], ['tipografi', 'Tipografi'], ['bentuk', 'Bentuk & lift'], ['spasi', 'Spasi & layout'],
    ['gerak', 'Gerak'], ['komponen', 'Komponen'], ['aksesibilitas', 'Aksesibilitas'], ['token', 'Referensi token'], ['workflow', 'Agent workflow']
  ];
  const jump = (id: string) => glideTo(document.getElementById(id));

  const demoItem = { section: 'decks' as const, slug: 'sejarah-apollo-11', title: 'Apollo 11: Alarm 1202 dan Software yang Tidak Panik', text: 'Contoh item untuk tombol share di halaman design system.', tags: ['sejarah'] };
</script>

<header class="page-head ds-hero">
  <p class="label">Design system · v{VERSION} · sumber: src/design/tokens.json</p>
  <h1 class="h1" use:split>Design <span class="hl">system.</span></h1>
  <p class="lead">Bahasa visual khoirlabs: warna yang diacak, bentuk seperti stiker, huruf yang bisa melar, dan gerak di setiap interaksi. Semua di halaman ini dibaca langsung dari token dan dirender oleh komponen asli situs.</p>
  <div class="ds-stats">
    <div><b use:countUp>{PALETTES.length}</b><span class="label">palet</span></div>
    <div><b use:countUp>{tokenCount}</b><span class="label">token</span></div>
    <div><b use:countUp>3</b><span class="label">keluarga font</span></div>
    <div><b use:countUp>12</b><span class="label">komponen</span></div>
  </div>
  <div class="row">
    <button class="btn btn-ink" on:click={download}>Unduh tokens.json <span aria-hidden="true">↓</span></button>
    <a class="btn btn-line" href="{REPO}docs/design/TOKENS.md" target="_blank" rel="noopener">TOKENS.md di GitHub</a>
  </div>
</header>

<div class="ds">
  <nav class="ds-toc" aria-label="Isi halaman">
    <p class="label">Isi</p>
    {#each sections as [id, name], i}
      <a href="#designsystem" on:click|preventDefault={() => jump(id)}><span class="mono">{String(i + 1).padStart(2, '0')}</span>{name}</a>
    {/each}
  </nav>

  <div class="ds-main">
    <!-- 01 ───────────────────────────── -->
    <section id="prinsip" class="ds-sec">
      <div class="section-head"><span class="no">01</span><h2 class="h2">Prinsip.</h2></div>
      <ol class="principles">
        <li><div><h3 class="h3">Ramai, tapi terbaca</h3><p class="muted small">Warna boleh keras dan bentuk boleh miring, asal teks selalu lolos kontras AA. Keramaian ada di bentuk dan gerak, bukan di teks.</p></div></li>
        <li><div><h3 class="h3">Aksen selalu membawa tinta</h3><p class="muted small">Isian aksen (a1, a2, a3) selalu memakai teks <code>--ink</code>. Jangan pernah menaruh <code>--fg</code> di atas aksen: di palet gelap hasilnya tidak terbaca.</p></div></li>
        <li><div><h3 class="h3">Satu sumber kebenaran</h3><p class="muted small">Semua nilai berasal dari <code>tokens.json</code>. Warna hex, font, atau easing yang ditulis langsung di komponen akan ditolak oleh <code>design:check</code>.</p></div></li>
        <li><div><h3 class="h3">Gerak sebagai umpan balik</h3><p class="muted small">Setiap elemen yang bisa disentuh bereaksi dengan pegas (<code>--spring</code>). Gerak hanya memakai transform dan opacity, jadi tetap ringan.</p></div></li>
        <li><div><h3 class="h3">Semua orang ikut</h3><p class="muted small">Reduce motion mematikan semua animasi, keyboard bisa menjangkau semua kontrol, dan target sentuh minimal 40 px.</p></div></li>
        <li><div><h3 class="h3">Konten lebih dulu</h3><p class="muted small">Dekorasi tidak boleh menutupi isi. Stiker, blob, dan marquee hidup di area kosong, bukan di atas teks.</p></div></li>
      </ol>
    </section>

    <!-- 02 ───────────────────────────── -->
    <section id="warna" class="ds-sec">
      <div class="section-head"><span class="no">02</span><h2 class="h2">Warna.</h2></div>
      <p class="lead">Ada enam palet. Setiap kunjungan mendapat satu secara acak, dan tombol remix (atau tombol <kbd>C</kbd>) menggantinya. Komponen tidak pernah tahu palet mana yang aktif: ia hanya memakai peran warna.</p>
      <div class="ds-roles">
        {#each [['--bg', 'Latar halaman'], ['--fg', 'Teks utama, garis tebal'], ['--card', 'Permukaan yang terangkat'], ['--a1', 'Aksen utama, tombol primer'], ['--a2', 'Aksen kedua, lift dekoratif'], ['--a3', 'Aksen ketiga, hover'], ['--ink', 'Teks di atas aksen'], ['--soft', 'Teks sekunder'], ['--line', 'Garis tipis']] as [v, use]}
          <div class="ds-role"><span class="ds-chip" style="background: var({v})"></span><code>{v}</code><span class="small muted">{use}</span></div>
        {/each}
      </div>
      <div class="ds-palettes">
        {#each PALETTES as p, i}
          <article class="ds-pal" style="--pbg:{p.bg};--pfg:{p.fg};--pcard:{p.card};--p1:{p.a1};--p2:{p.a2};--p3:{p.a3}">
            <header><b>{p.name}</b><button class="tab" on:click={() => use(i)}>Pakai</button></header>
            <div class="ds-sw">
              {#each [['bg', p.bg], ['fg', p.fg], ['card', p.card], ['a1', p.a1], ['a2', p.a2], ['a3', p.a3]] as [k, hex]}
                <span style="background:{hex}" title="{k} {hex}"><i>{k}</i><i>{hex}</i></span>
              {/each}
            </div>
            <table class="ds-contrast">
              {#each pairs(p) as [name, a, b]}
                {@const r = ratio(a, b)}
                <tr><td>{name}</td><td class="mono">{r.toFixed(1)}:1</td><td><span class="ds-grade" class:fail={r < 4.5}>{grade(r)}</span></td></tr>
              {/each}
            </table>
          </article>
        {/each}
      </div>
      <div class="ds-rules">
        <p><b>Boleh:</b> teks <code>--ink</code> di atas aksen, aksen sebagai warna lift (<code>box-shadow: var(--lift-4) var(--a2)</code>), aksen untuk hover.</p>
        <p><b>Jangan:</b> menulis hex di komponen, memakai <code>--fg</code> di atas aksen, atau memberi teks panjang warna aksen di atas <code>--bg</code>.</p>
      </div>
    </section>

    <!-- 03 ───────────────────────────── -->
    <section id="tipografi" class="ds-sec">
      <div class="section-head"><span class="no">03</span><h2 class="h2">Tipografi.</h2></div>
      <div class="ds-fonts">
        <div class="ds-font"><p class="label">Display · --display</p><p class="ds-anybody" style="font-stretch:{stretch}%">Anybody</p><label class="small muted">Lebar {stretch}%<input type="range" min="50" max="150" bind:value={stretch} /></label><p class="small muted">Untuk judul. Sumbu lebar variabel adalah bagian dari karakter: hover pada huruf judul membuatnya melar.</p></div>
        <div class="ds-font"><p class="label">Teks · --sans</p><p class="ds-onest">Onest</p><p class="small muted">Untuk isi dan antarmuka. Ramah dibaca dalam bahasa Indonesia, angka tabular untuk statistik.</p></div>
        <div class="ds-font"><p class="label">Kode · --mono</p><p class="ds-jet">JetBrains Mono</p><p class="small muted">Hanya untuk kode. Tidak dimuat di halaman yang tidak menampilkan kode.</p></div>
      </div>
      <div class="ds-scale">
        {#each typeScale as [k, sample, note]}
          <div class="ds-type">
            <div class="ds-type-meta"><code>.{k === 'body' ? 'body' : k}</code><span class="mono muted">--text-{k}</span>{#if note}<span class="small muted">{note}</span>{/if}</div>
            <p class={k === 'body' ? '' : k} style={k === 'display' ? 'font-size: clamp(2rem, 6vw, 4.6rem)' : ''}>{sample}</p>
          </div>
        {/each}
      </div>
      <p class="muted small">Penekanan memakai stabilo <span class="hl">.hl</span> dan tautan memakai <a class="link" href="#designsystem">.link</a>. Huruf kapital hanya untuk display, h1, judul slide, dan label.</p>
    </section>

    <!-- 04 ───────────────────────────── -->
    <section id="bentuk" class="ds-sec">
      <div class="section-head"><span class="no">04</span><h2 class="h2">Bentuk & lift.</h2></div>
      <p class="lead">Semua elemen seperti stiker: garis <code>--border-base</code> (2 px) dan bayangan keras tanpa blur. Bayangan disebut <i>lift</i> dan warnanya diambil dari <code>--fg</code> atau aksen.</p>
      <p class="label">Radius</p>
      <div class="ds-boxes">
        {#each groupRows('radius') as r}
          <div class="ds-box"><span style="border-radius: var({r.name})"></span><code>{r.name.replace('--radius-', '')}</code><span class="mono muted">{r.value}</span></div>
        {/each}
      </div>
      <p class="label">Lift</p>
      <div class="ds-boxes">
        {#each groupRows('lift') as r, i}
          <div class="ds-box"><span class="ds-lift" style="box-shadow: var({r.name}) var(--a{(i % 3) + 1})"></span><code>{r.name}</code><span class="mono muted">{r.value}</span></div>
        {/each}
      </div>
    </section>

    <!-- 05 ───────────────────────────── -->
    <section id="spasi" class="ds-sec">
      <div class="section-head"><span class="no">05</span><h2 class="h2">Spasi & layout.</h2></div>
      <div class="ds-space">
        {#each groupRows('space') as r}
          <div><code>{r.name}</code><i style="width: var({r.name})"></i><span class="mono muted">{r.value}</span></div>
        {/each}
      </div>
      <p class="muted small">Lebar konten maksimal <code>--wrap</code> ({tokens.layout.wrap.$value}), padding samping <code>--gutter</code> ({tokens.layout.gutter.$value}). Di bawah 900 px, navigasi pindah ke tab bar melayang di bawah layar.</p>
    </section>

    <!-- 06 ───────────────────────────── -->
    <section id="gerak" class="ds-sec">
      <div class="section-head"><span class="no">06</span><h2 class="h2">Gerak.</h2></div>
      <div class="ds-curves">
        {#each curves as [name, c]}
          <div class="ds-curve">
            <svg viewBox="-10 -30 120 140" aria-hidden="true"><path d="M0 100 L100 0" class="ds-guide" /><path d={path(c)} class="ds-bez" /></svg>
            <code>--{name === 'out' ? 'ease' : name}</code><span class="mono muted">cubic-bezier({c.join(', ')})</span>
          </div>
        {/each}
        <div class="ds-race">
          <button class="btn btn-line" on:click={() => (ball = ball === 'rest' ? 'go' : 'rest')}>Jalankan</button>
          <div class="ds-track"><i class="spring" class:go={ball === 'go'}>spring</i></div>
          <div class="ds-track"><i class="out" class:go={ball === 'go'}>ease</i></div>
        </div>
      </div>
      <div class="ds-durs">
        {#each groupRows('duration') as r}
          <div><code>{r.name}</code><span class="mono">{r.value}</span><span class="small muted">{r.desc}</span></div>
        {/each}
      </div>
      <p class="label">Pola gerak (klik untuk memutar ulang)</p>
      <div class="ds-motions">
        {#each [['pop', 'Pilihan aktif'], ['rise', 'Isi slide masuk'], ['hop', 'Ikon tab bar'], ['wave', 'Sapaan'], ['flip-in', 'Item halaman baru'], ['slide-in', 'Slide berikutnya']] as [n, d]}
          <button class="ds-motion" on:click={replay}><span class="demo-target" data-anim="{n === 'wave' ? 'wave 2.4s ease-in-out' : n + ' var(--dur-5) var(--spring)'} both" style="animation: {n === 'wave' ? 'wave 2.4s ease-in-out' : n + ' var(--dur-5) var(--spring)'} both">●</span><code>{n}</code><span class="small muted">{d}</span></button>
        {/each}
        <button class="ds-motion" on:click={(e) => confetti(e.clientX, e.clientY)}><span>✦</span><code>confetti</code><span class="small muted">Selesai deck atau salin link</span></button>
        <button class="ds-motion" on:click={(e) => remix(e.clientX, e.clientY)}><span>◐</span><code>remix</code><span class="small muted">Banjir warna dari titik klik</span></button>
      </div>
      <div class="ds-rules">
        <p><b>Aturan:</b> animasikan hanya <code>transform</code>, <code>opacity</code>, <code>translate</code>, <code>scale</code>, <code>rotate</code>. Pakai <code>--spring</code> untuk benda yang bergerak, <code>--ease</code> untuk pudar dan banjir warna.</p>
        <p><b>Reduce motion:</b> semua animasi dan transisi dimatikan secara global, kursor kustom dan smooth scroll tidak dipasang.</p>
      </div>
    </section>

    <!-- 07 ───────────────────────────── -->
    <section id="komponen" class="ds-sec">
      <div class="section-head"><span class="no">07</span><h2 class="h2">Komponen.</h2></div>
      <p class="lead">Semua contoh di bawah adalah komponen asli, bukan gambar. Arahkan kursor dan klik untuk melihat micro-interaction-nya.</p>

      <div class="ds-comp">
        <header><h3 class="h3">Button</h3><code>.btn .btn-ink | .btn-line</code></header>
        <div class="ds-demo row"><button class="btn btn-ink">Primer <span aria-hidden="true">→</span></button><button class="btn btn-line">Sekunder</button></div>
        <p class="small muted">Satu tombol primer per area. Tertarik ke kursor (magnet), lift membesar saat hover, tertekan saat diklik. Tinggi minimal 50 px.</p>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Tab / filter</h3><code>.tab[aria-pressed]</code></header>
        <div class="ds-demo"><div class="tabs">{#each ['all', 'teori', 'tutorial', 'sejarah'] as t, i}<button class="tab" aria-pressed={i === 0}>{t}</button>{/each}</div></div>
        <p class="small muted">Untuk filter dan pilihan. Status aktif lewat <code>aria-pressed</code>, bukan kelas.</p>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Field</h3><code>label.field &gt; input</code></header>
        <div class="ds-demo"><label class="field"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-width="2" d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" /></svg><input type="search" placeholder="Fokus untuk melihat efeknya…" aria-label="Contoh field" /></label></div>
        <p class="small muted">Saat fokus: lift aksen dan ikon berputar. Placeholder memberi contoh kata kunci, bukan instruksi.</p>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Tag, stabilo, tautan</h3><code>.tag · .hl · .link</code></header>
        <div class="ds-demo row"><span class="tag">kotlin</span><span class="tag">typescript</span><span class="hl">disorot</span><a class="link" href="#designsystem">tautan</a></div>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Kepala section</h3><code>.section-head &gt; .no + .h2</code></header>
        <div class="ds-demo"><div class="section-head" style="margin:0"><span class="no">01</span><h2 class="h2">Judul section.</h2></div></div>
        <p class="small muted">Nomor bulat berputar 360° saat hover. Section bernomor urut di setiap halaman.</p>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Kartu deck</h3><code>article.card &gt; .tabmark</code></header>
        <div class="ds-demo ds-grid2">
          <article class="card" data-cursor="open"><span class="tabmark">theory · ID</span><span class="label count">9 slides</span><h3 class="h3"><a class="stretch" href="#designsystem"><span>Judul deck</span></a></h3><p>Deskripsi singkat yang menjadi hook.</p></article>
          <article class="tile" data-cursor="swipe"><p class="label">#tutorial</p><h3><a href="#designsystem"><span>Tile carousel 4:5</span></a></h3><p>Tile memakai isian aksen dan miring sedikit.</p></article>
        </div>
        <p class="small muted">Kartu miring 3D mengikuti kursor dengan kilau. Seluruh kartu bisa diklik lewat tautan yang direntangkan; tombol di dalamnya harus punya <code>z-index</code> di atas tautan itu.</p>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Entri daftar</h3><code>article.entry</code></header>
        <div class="ds-demo entries"><article class="entry" data-cursor="read"><div class="entry-meta"><span>Nov 28, 2026</span><span class="kind">Blog</span></div><div><h3 class="entry-title"><a href="#designsystem"><span>Hover untuk melihat isian dan bentuk blob</span></a></h3><p>Dipakai untuk feed dan blog.</p></div><div class="entry-end"><span class="go">Read</span></div></article></div>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Pintu (A/B/C)</h3><code>article.path</code></header>
        <div class="ds-demo paths">{#each ['A', 'B', 'C'] as l, i}<article class="path" data-cursor="go"><span class="big" aria-hidden="true">{l}</span><p class="label">Jalur {i + 1}</p><h3 class="h3"><a href="#designsystem"><span>Ajak pembaca memilih</span></a></h3><span class="go">Lanjut</span></article>{/each}</div>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Statistik</h3><code>.stats</code></header>
        <div class="ds-demo stats"><div><div class="n" use:countUp>100</div><div class="label">decks</div></div><div><div class="n" use:countUp>100</div><div class="label">carousels</div></div><div><div class="n" use:countUp>100</div><div class="label">notes</div></div></div>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Stiker</h3><code>.sticker use:fling</code></header>
        <div class="ds-demo ds-stickers">{#each ['Flutter', 'Kotlin', 'Swift'] as s, i}<span class="sticker" style="left:{10 + i * 28}%;top:{20 + (i % 2) * 30}%" use:fling data-cursor="throw">{s}</span>{/each}</div>
        <p class="small muted">Bisa diseret dan dilempar, memantul di tepi wadahnya. Hanya untuk dekorasi: jangan menaruh informasi penting di stiker.</p>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Pagination</h3><code>&lt;Pager&gt;</code></header>
        <div class="ds-demo"><Pager base="designsystem" page={2} pages={9} total={100} size={12} /></div>
        <p class="small muted">Nomor halaman ada di URL. Indikator meluncur ke nomor aktif, dan klik meluncur halus ke atas daftar.</p>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Tombol share</h3><code>&lt;ShareButton variant="icon|pill|mini"&gt;</code></header>
        <div class="ds-demo row"><ShareButton item={demoItem} /><ShareButton item={demoItem} variant="pill" /><ShareButton item={demoItem} variant="mini" /></div>
        <p class="small muted">Membuka sheet berbagi dengan tab Kirim link dan Studio posting.</p>
      </div>

      <div class="ds-comp">
        <header><h3 class="h3">Komponen lain</h3><code>player · frame · sheet · palette</code></header>
        <p class="small muted">Player deck (<code>.slide</code>), frame carousel (<code>.frame</code>), sheet share, dan command palette (<kbd>/</kbd>) memakai token yang sama. Lihat langsung di <a class="link" href="#decks">Decks</a>, <a class="link" href="#posts">Posts</a>, atau tekan <kbd>/</kbd>.</p>
      </div>
    </section>

    <!-- 08 ───────────────────────────── -->
    <section id="aksesibilitas" class="ds-sec">
      <div class="section-head"><span class="no">08</span><h2 class="h2">Aksesibilitas.</h2></div>
      <ul class="ds-check">
        <li>Teks lolos kontras AA di semua palet (lihat tabel di bagian Warna).</li>
        <li>Fokus keyboard terlihat: outline 3 px berwarna <code>--a1</code>.</li>
        <li>Dialog (search, share) mengunci fokus, ditutup dengan Esc, dan mengembalikan fokus.</li>
        <li>Status pakai atribut, bukan warna saja: <code>aria-pressed</code>, <code>aria-current</code>, <code>aria-selected</code>.</li>
        <li>Target sentuh minimal 40 px; tombol utama 48 px atau lebih.</li>
        <li><code>prefers-reduced-motion</code> mematikan semua animasi, kursor kustom, dan smooth scroll.</li>
        <li>Swipe selalu punya alternatif tombol dan keyboard (panah, spasi).</li>
      </ul>
    </section>

    <!-- 09 ───────────────────────────── -->
    <section id="token" class="ds-sec">
      <div class="section-head"><span class="no">09</span><h2 class="h2">Referensi token.</h2></div>
      <p class="lead">Klik nama variabel untuk menyalin <code>var(--…)</code>. Sumbernya <code>src/design/tokens.json</code> (format W3C Design Tokens); jalankan <code>bun run tokens</code> setelah mengubahnya.</p>
      {#each tables as [id, title, rows]}
        <details class="ds-table" open={id === 'color' || id === 'radius' || id === 'duration'}>
          <summary><b>{title}</b><span class="mono muted">{rows.length}</span></summary>
          <table>
            <thead><tr><th>Variabel</th><th>Nilai</th><th>Pemakaian</th></tr></thead>
            <tbody>
              {#each rows as r}
                <tr>
                  <td><button class="ds-var" on:click={() => copyVar(r.name)}>{copied === r.name ? 'tersalin ✓' : r.name}</button></td>
                  <td class="mono">{#if id === 'color'}<span class="ds-dot" style="background:{r.value}"></span>{/if}{r.value}</td>
                  <td class="small muted">{r.desc}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </details>
      {/each}
    </section>

    <!-- 10 ───────────────────────────── -->
    <section id="workflow" class="ds-sec">
      <div class="section-head"><span class="no">10</span><h2 class="h2">Agent workflow UI/UX.</h2></div>
      <p class="lead">Desain tetap konsisten karena setiap perubahan, oleh manusia maupun AI agent, melewati jalur yang sama dan diperiksa mesin.</p>
      <ol class="ds-flow">
        <li><b>Baca dulu</b><span>Agent membaca <code>docs/design/DESIGN_SYSTEM.md</code> dan <code>TOKENS.md</code> sebelum menyentuh UI.</span></li>
        <li><b>Rencana dalam token</b><span>Setiap nilai baru dipetakan ke token yang ada. Kalau benar-benar perlu token baru, tambahkan di <code>tokens.json</code>, bukan di komponen.</span></li>
        <li><b>Bangun</b><span>Agent <code>uiux-designer</code> mengerjakan perubahan memakai kelas dan komponen yang ada.</span></li>
        <li><b>Periksa mesin</b><span><code>bun run design:check</code> menolak warna, font, dan easing mentah serta nilai di luar skala. Build di GitHub ikut menjalankannya.</span></li>
        <li><b>Periksa mata</b><span>Screenshot di 3 palet (gelap, terang, kobalt) dan 2 ukuran layar, lalu bandingkan dengan sebelumnya.</span></li>
        <li><b>Review independen</b><span>Agent <code>uiux-reviewer</code> hanya membaca dan menilai terhadap checklist halaman ini. Ia tidak menulis kode.</span></li>
        <li><b>Dokumentasi ikut</b><span>Komponen atau token baru wajib muncul di halaman ini pada commit yang sama.</span></li>
      </ol>
      <div class="ds-files">
        {#each [['AGENTS.md', 'Aturan proyek untuk semua alat AI'], ['.claude/skills/uiux-workflow/SKILL.md', 'Alur kerja lengkap /uiux-workflow'], ['.claude/agents/uiux-designer.md', 'Agent yang membangun UI'], ['.claude/agents/uiux-reviewer.md', 'Agent yang me-review, hanya membaca'], ['docs/design/DESIGN_SYSTEM.md', 'Versi teks halaman ini'], ['scripts/design-check.ts', 'Pemeriksa otomatis']] as [f, d]}
          <a class="ds-file" href="{REPO}{f}" target="_blank" rel="noopener"><code>{f}</code><span class="small muted">{d}</span></a>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  .ds-hero { margin-bottom: 40px; }
  .ds-stats { display: flex; flex-wrap: wrap; gap: 10px; }
  .ds-stats div { display: grid; padding: 12px 18px; border: var(--border-base) solid var(--fg); border-radius: var(--radius-xl); background: var(--card); min-width: 110px; }
  .ds-stats b { font-family: var(--display); font-size: 2rem; line-height: 1; font-weight: 900; }
  .ds { display: grid; gap: 40px; }
  @media (min-width: 1000px) { .ds { grid-template-columns: 200px minmax(0, 1fr); } }
  .ds-toc { display: none; }
  @media (min-width: 1000px) {
    .ds-toc { display: grid; gap: 2px; align-content: start; align-self: start; position: sticky; top: 100px; padding: 14px; border: var(--border-base) solid var(--fg); border-radius: var(--radius-card); background: var(--card); }
  }
  .ds-toc a { display: flex; gap: 10px; padding: 6px 8px; border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; transition: background var(--dur-1), color var(--dur-1), translate var(--dur-2) var(--spring); }
  .ds-toc a:hover { background: var(--a1); color: var(--ink); translate: 4px 0; }
  .ds-toc .mono { opacity: 0.6; }
  .ds-main { display: grid; gap: clamp(56px, 8vw, 96px); min-width: 0; }
  .ds-sec { display: grid; gap: 20px; min-width: 0; scroll-margin-top: 100px; }
  .ds-sec code, .ds-comp code, .ds-rules code { font-family: var(--mono); font-size: 0.82em; padding: 1px 6px; border-radius: var(--radius-sm); border: var(--border-hair) solid var(--line); }
  .ds-rules { display: grid; gap: 8px; padding: 16px 18px; border: var(--border-base) dashed var(--fg); border-radius: var(--radius-card); }

  .ds-roles { display: grid; gap: 8px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr)); }
  .ds-role { display: grid; grid-template-columns: 34px auto 1fr; align-items: center; gap: 10px; }
  .ds-chip { width: 34px; height: 34px; border-radius: 50%; border: var(--border-base) solid var(--fg); }
  .ds-palettes { display: grid; gap: 18px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); }
  .ds-pal { display: grid; gap: 12px; padding: 14px; border-radius: var(--radius-card); background: var(--pbg); color: var(--pfg); border: var(--border-base) solid var(--fg); transition: rotate var(--dur-4) var(--spring); }
  .ds-pal:hover { rotate: -1deg; }
  .ds-pal header { display: flex; justify-content: space-between; align-items: center; font-family: var(--display); font-size: 1.15rem; }
  .ds-pal .tab { color: var(--pfg); border-color: color-mix(in srgb, var(--pfg) 40%, transparent); }
  .ds-sw { display: grid; grid-template-columns: repeat(6, 1fr); border-radius: var(--radius-lg); overflow: hidden; border: var(--border-base) solid var(--pfg); }
  .ds-sw span { display: grid; align-content: end; height: 78px; padding: 4px; font-size: 0.55rem; font-family: var(--mono); color: var(--ink); }
  .ds-sw span:nth-child(-n + 3) { color: var(--pfg); }
  .ds-sw span:nth-child(2) { color: var(--pbg); }
  .ds-sw i { font-style: normal; overflow: hidden; text-overflow: ellipsis; }
  .ds-contrast { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
  .ds-contrast td { padding: 4px 2px; border-top: 1px solid color-mix(in srgb, var(--pfg) 20%, transparent); }
  .ds-contrast td:last-child { text-align: right; }
  .ds-grade { display: inline-block; padding: 1px 8px; border-radius: var(--radius-pill); background: var(--p3); color: var(--ink); font-weight: 800; font-size: 0.72rem; }
  .ds-grade.fail { background: var(--p2); }

  .ds-fonts { display: grid; gap: 14px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); }
  .ds-font { display: grid; gap: 8px; align-content: start; padding: 18px; border: var(--border-base) solid var(--line); border-radius: var(--radius-card); }
  .ds-font input { width: 100%; accent-color: var(--a1); }
  .ds-anybody { font-family: var(--display); font-weight: 800; font-size: 3rem; line-height: 1; transition: font-stretch var(--dur-2) var(--ease); }
  .ds-onest { font-family: var(--sans); font-weight: 700; font-size: 3rem; line-height: 1; }
  .ds-jet { font-family: var(--mono); font-weight: 700; font-size: 1.9rem; line-height: 1.3; }
  .ds-scale { display: grid; border-top: var(--border-base) solid var(--fg); }
  .ds-type { display: grid; gap: 6px 24px; padding: 18px 0; border-bottom: 1px solid var(--line); min-width: 0; }
  @media (min-width: 760px) { .ds-type { grid-template-columns: 200px minmax(0, 1fr); align-items: baseline; } }
  .ds-type-meta { display: grid; gap: 4px; justify-items: start; }
  .ds-type p { min-width: 0; overflow-wrap: anywhere; }

  .ds-boxes { display: grid; gap: 14px; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); }
  .ds-box { display: grid; gap: 6px; justify-items: start; }
  .ds-box > span:first-child { width: 84px; height: 64px; background: var(--a1); border: var(--border-base) solid var(--ink); }
  .ds-box .ds-lift { border-radius: var(--radius-lg); background: var(--card) !important; border-color: var(--fg) !important; }
  .ds-space { display: grid; gap: 6px; }
  .ds-space div { display: grid; grid-template-columns: 110px 1fr 60px; align-items: center; gap: 12px; }
  .ds-space i { display: block; height: 14px; border-radius: var(--radius-pill); background: linear-gradient(90deg, var(--a1), var(--a2)); border: var(--border-hair) solid var(--ink); }

  .ds-curves { display: grid; gap: 18px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); align-items: start; }
  .ds-curve { display: grid; gap: 6px; padding: 14px; border: var(--border-base) solid var(--line); border-radius: var(--radius-card); }
  .ds-curve svg { width: 100%; height: 150px; overflow: visible; }
  .ds-guide { stroke: var(--line); stroke-width: 1.5; fill: none; stroke-dasharray: 4 4; }
  .ds-bez { stroke: var(--a1); stroke-width: 5; fill: none; stroke-linecap: round; }
  .ds-race { display: grid; gap: 10px; align-content: start; grid-column: 1 / -1; }
  .ds-track { position: relative; height: 40px; border-radius: var(--radius-pill); border: var(--border-base) solid var(--line); }
  .ds-track i { position: absolute; top: 3px; left: 3px; display: grid; place-items: center; height: 30px; padding: 0 12px; border-radius: var(--radius-pill); background: var(--a1); color: var(--ink); font-style: normal; font-weight: 800; font-size: 0.75rem; transition: left var(--dur-7) var(--spring); }
  .ds-track i.out { background: var(--a3); transition: left var(--dur-7) var(--ease); }
  .ds-track i.go { left: calc(100% - 90px); }
  .ds-durs { display: grid; gap: 6px; }
  .ds-durs div { display: grid; grid-template-columns: 100px 70px 1fr; gap: 12px; align-items: baseline; padding: 6px 0; border-bottom: 1px solid var(--line); }
  .ds-motions { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
  .ds-motion { display: grid; justify-items: center; gap: 6px; padding: 16px 10px; border: var(--border-base) solid var(--line); border-radius: var(--radius-xl); transition: border-color var(--dur-1), translate var(--dur-2) var(--spring); }
  .ds-motion:hover { border-color: var(--fg); translate: 0 -3px; }
  .ds-motion > span:first-child { font-size: 1.8rem; color: var(--a1); -webkit-text-stroke: 1px var(--fg); display: inline-block; }

  .ds-comp { display: grid; gap: 12px; padding: 20px; border: var(--border-base) solid var(--fg); border-radius: var(--radius-card); background: var(--card); min-width: 0; }
  .ds-comp header { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px; }
  .ds-demo { padding: 18px; border-radius: var(--radius-xl); background: var(--bg); border: var(--border-hair) dashed var(--line); min-width: 0; }
  .ds-grid2 { display: grid; gap: 22px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr)); }
  .ds-stickers { position: relative; height: 180px; overflow: hidden; }

  .ds-check { display: grid; gap: 8px; }
  .ds-check li { position: relative; padding-left: 30px; }
  .ds-check li::before { content: '✓'; position: absolute; left: 0; top: 0; display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: var(--a3); color: var(--ink); font-weight: 900; font-size: 0.75rem; }

  .ds-table { border: var(--border-base) solid var(--fg); border-radius: var(--radius-xl); overflow: hidden; background: var(--card); }
  .ds-table summary { display: flex; justify-content: space-between; padding: 12px 16px; cursor: pointer; font-family: var(--display); }
  .ds-table table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  .ds-table th { text-align: left; padding: 8px 16px; font-size: var(--text-label); letter-spacing: 0.08em; text-transform: uppercase; color: var(--soft); border-top: 1px solid var(--line); }
  .ds-table td { padding: 8px 16px; border-top: 1px solid var(--line); vertical-align: top; overflow-wrap: anywhere; }
  .ds-var { font-family: var(--mono); font-size: 0.8rem; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-pill); border: var(--border-hair) solid var(--line); white-space: nowrap; transition: background var(--dur-1), color var(--dur-1); }
  .ds-var:hover { background: var(--a1); color: var(--ink); }
  .ds-dot { display: inline-block; width: 14px; height: 14px; margin-right: 8px; border-radius: 50%; vertical-align: -2px; border: 1px solid var(--line); }
  @media (max-width: 620px) { .ds-table th:nth-child(3), .ds-table td:nth-child(3) { display: none; } }

  .ds-flow { display: grid; gap: 10px; counter-reset: f; }
  .ds-flow li { counter-increment: f; display: grid; grid-template-columns: 44px 1fr; gap: 2px 12px; padding: 14px; border: var(--border-base) solid var(--line); border-radius: var(--radius-card); transition: border-color var(--dur-1), translate var(--dur-2) var(--spring); }
  .ds-flow li:hover { border-color: var(--fg); translate: 6px 0; }
  .ds-flow li::before { content: counter(f); grid-row: span 2; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: var(--a1); color: var(--ink); font-family: var(--display); font-weight: 900; }
  .ds-flow li span { color: var(--soft); font-size: 0.92rem; }
  .ds-files { display: grid; gap: 8px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); }
  .ds-file { display: grid; gap: 4px; padding: 12px 14px; border: var(--border-base) solid var(--line); border-radius: var(--radius-xl); transition: border-color var(--dur-1), background var(--dur-1), color var(--dur-1); }
  .ds-file:hover { border-color: var(--fg); background: var(--a3); color: var(--ink); }
  .ds-file:hover span { color: var(--ink); }
</style>
