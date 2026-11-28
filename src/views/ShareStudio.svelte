<script lang="ts">
  // Branded posting: a ready-made image and caption per platform, shown inside a
  // mock of that platform so the reader sees the post before publishing it.
  import { onDestroy } from 'svelte';
  import { platforms, caption, postUrl, xLength, copy, shareUrl, type ShareItem, type Platform } from '../lib/share';
  import { render as drawPoster, toBlob } from '../lib/poster';
  import { PALETTES, paletteFor } from '../lib/palettes';
  import { confetti } from '../lib/fx';
  import avatar from '../assets/portrait-400.webp';

  export let item: ShareItem;

  let platform: Platform = 'linkedin';
  let pal = Math.max(0, PALETTES.indexOf(paletteFor(item.section + '/' + item.slug)));
  const texts: Partial<Record<Platform, string>> = {};
  $: conf = platforms.find((p) => p.id === platform)!;
  $: story = conf.format === 'story';
  $: if (texts[platform] === undefined) texts[platform] = caption(item, platform);
  $: text = texts[platform] ?? '';
  $: count = platform === 'x' ? xLength(text) : [...text].length;
  $: over = conf.limit ? count > conf.limit : false;
  const link = shareUrl(item);
  const host = new URL(link).host;

  // the image is redrawn whenever the format or colours change
  let img = '', blob: Blob | null = null, busy = true, token = 0;
  $: draw(conf.format, pal);
  async function draw(format: 'story' | 'post' | 'card', pi: number) {
    const my = ++token; busy = true;
    const cv = await drawPoster({ section: item.section, title: item.title, text: item.text, tag: item.tags?.[0] }, PALETTES[pi], format);
    const b = await toBlob(cv);
    if (my !== token) return;
    if (img) URL.revokeObjectURL(img);
    blob = b; img = URL.createObjectURL(b); busy = false;
  }
  onDestroy(() => { if (img) URL.revokeObjectURL(img); });

  const fileName = () => `khoirlabs-${item.slug}-${conf.format}.png`;
  const asFile = () => new File([blob!], fileName(), { type: 'image/png' });
  const canShareFile = typeof navigator !== 'undefined' && !!navigator.canShare && (() => {
    try { return navigator.canShare({ files: [new File(['x'], 'x.png', { type: 'image/png' })] }); } catch { return false; }
  })();

  let note = '';
  let noteTimer: ReturnType<typeof setTimeout>;
  const say = (m: string) => { note = m; clearTimeout(noteTimer); noteTimer = setTimeout(() => (note = ''), 2600); };
  const burst = (e: MouseEvent) => confetti(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 18);

  async function copyCaption(e: MouseEvent) { if (await copy(text)) { say('Caption tersalin'); burst(e); } }
  async function copyLink(e: MouseEvent) { if (await copy(link)) { say('Link tersalin, tempel di stiker Link'); burst(e); } }
  function download(e: MouseEvent) {
    if (!blob) return;
    const a = Object.assign(document.createElement('a'), { href: img, download: fileName() });
    document.body.append(a); a.click(); a.remove();
    say('Gambar diunduh'); burst(e);
  }
  async function shareImage() {
    if (!blob) return;
    try { await navigator.share({ files: [asFile()], title: item.title }); } catch {}
  }
  async function publish(e: MouseEvent) {
    // LinkedIn's share link only takes a URL, so the caption travels on the clipboard
    if (platform === 'linkedin' && (await copy(text))) { say('Caption tersalin, tempel di kotak posting LinkedIn'); burst(e); }
    window.open(postUrl(item, platform, text), '_blank', 'noopener');
  }
  const palName = () => PALETTES[pal].name;
</script>

<div class="studio">
  <div class="st-platforms" role="tablist" aria-label="Platform">
    {#each platforms as p}
      <button role="tab" class="st-chip" aria-selected={platform === p.id} on:click={() => (platform = p.id)}>{p.label}</button>
    {/each}
  </div>

  <div class="st-body">
    <!-- the preview widget -->
    <div class="st-preview" aria-label="Pratinjau {conf.label}">
      {#if story}
        <div class="mk-phone" class:loading={busy}>
          {#if img}<img class="mk-story" src={img} alt="Gambar story" />{/if}
          <div class="mk-bars"><i class="on"></i><i></i><i></i></div>
          <div class="mk-who"><img src={avatar} alt="" /><b>{platform === 'igstory' ? 'codingskuy_' : 'Khoiron Rois'}</b><span>1 dtk</span></div>
          <div class="mk-sticker" title="Tambahkan stiker Link dengan alamat ini">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
            {host.toUpperCase()}
          </div>
          <div class="mk-reply"><span>Kirim pesan</span></div>
        </div>
      {:else}
        <article class="mk-post mk-{platform}">
          <header class="mk-head">
            <img src={avatar} alt="" />
            <div>
              <b>{platform === 'threads' ? 'codingskuy_' : 'Khoiron Rois'}</b>
              <span>{platform === 'linkedin' ? 'Software Engineer · Baru saja' : platform === 'x' ? 'sekarang' : '1 mnt'}</span>
            </div>
          </header>
          <p class="mk-text" class:clamp={platform === 'linkedin'}>{text}</p>
          <div class="mk-card" class:loading={busy}>
            {#if img}<img src={img} alt="Pratinjau tautan" />{/if}
            {#if platform === 'x'}<span class="mk-domain">{host}</span>
            {:else}<div class="mk-meta"><b>{item.title}</b><span>{host}</span></div>{/if}
          </div>
          <div class="mk-actions" aria-hidden="true">
            {#if platform === 'linkedin'}<span>Suka</span><span>Komentar</span><span>Posting ulang</span><span>Kirim</span>
            {:else}<span>Balas</span><span>Repost</span><span>Suka</span><span>Bagikan</span>{/if}
          </div>
        </article>
      {/if}
      <button class="st-remix" on:click={() => (pal = (pal + 1) % PALETTES.length)} title="Ganti warna gambar">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.7L4 15.5M4 20v-4.5h4.5" /></svg>
        Warna: {palName()}
      </button>
    </div>

    <!-- caption and actions -->
    <div class="st-side">
      {#if story}
        <ol class="st-steps">
          <li>{canShareFile ? 'Ketuk tombol di bawah, pilih ' + (platform === 'igstory' ? 'Instagram' : 'Facebook') + ', lalu Story.' : 'Unduh gambarnya, lalu kirim ke HP-mu.'}</li>
          <li>Di editor story, tambahkan stiker <b>Link</b>.</li>
          <li>Tempel alamat ini: <code>{host}/s/…</code></li>
        </ol>
        <div class="st-actions">
          {#if canShareFile}
            <button class="st-go" on:click={shareImage} disabled={busy}>Bagikan ke {platform === 'igstory' ? 'Instagram' : 'Facebook'}</button>
          {:else}
            <button class="st-go" on:click={download} disabled={busy}>Unduh gambar story</button>
          {/if}
          <button class="st-alt" on:click={copyLink}>Salin link stiker</button>
          {#if canShareFile}<button class="st-alt" on:click={download} disabled={busy}>Unduh</button>{/if}
        </div>
      {:else}
        <label class="st-caption">
          <span class="label">Caption {conf.label}</span>
          <textarea rows="9" bind:value={texts[platform]} spellcheck="false"></textarea>
          {#if conf.limit}<span class="st-count" class:over>{count}/{conf.limit}{platform === 'x' ? ' (link dihitung 23)' : ''}</span>{/if}
        </label>
        <div class="st-actions">
          <button class="st-go" on:click={publish} disabled={over}>Posting di {conf.label}</button>
          <button class="st-alt" on:click={copyCaption}>Salin caption</button>
          <button class="st-alt" on:click={download} disabled={busy}>Unduh gambar</button>
        </div>
        {#if platform === 'linkedin'}<p class="st-hint">LinkedIn hanya menerima tautan dari situs lain, jadi caption-nya disalin otomatis. Tempel di kotak posting. Gambar di atas muncul sebagai kartu tautan.</p>{/if}
      {/if}
      <p class="st-note" aria-live="polite">{note}</p>
    </div>
  </div>
</div>

<style>
  .studio { display: grid; gap: 16px; }
  .st-platforms { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; padding: 2px; }
  .st-chip { white-space: nowrap; padding: 9px 16px; border-radius: 999px; border: 2px solid var(--line); font-weight: 700; font-size: .85rem; transition: transform .3s var(--spring), background .2s, color .2s, border-color .2s; }
  .st-chip:hover { transform: translateY(-2px) rotate(-2deg); border-color: var(--fg); }
  .st-chip[aria-selected='true'] { background: var(--fg); color: var(--bg); border-color: var(--fg); animation: pop .4s var(--spring); }
  .st-body { display: grid; gap: 20px; align-items: start; }
  @media (min-width: 760px) { .st-body { grid-template-columns: 360px 1fr; } }
  .st-preview { display: grid; gap: 10px; justify-items: center; align-content: start; }
  .st-remix { display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 999px; border: 2px solid var(--fg); font-size: .8rem; font-weight: 700; background: conic-gradient(var(--a1), var(--a2), var(--a3), var(--a1)); color: var(--ink); transition: transform .3s var(--spring); }
  .st-remix:hover { transform: rotate(-3deg) scale(1.04); }
  .st-remix:active svg { transform: rotate(360deg); transition: transform .5s var(--spring); }
  .loading { position: relative; }
  .loading::after { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%) 0 0 / 200% 100%; animation: shine 1s linear infinite; border-radius: inherit; }
  @keyframes shine { to { background-position: -200% 0; } }

  /* phone with a story */
  .mk-phone { position: relative; width: min(100%, 250px); aspect-ratio: 9 / 16; border-radius: 26px; overflow: hidden; background: #111; border: 6px solid #111; box-shadow: 8px 8px 0 var(--a2); animation: rise .5s var(--spring) both; }
  .mk-story { width: 100%; height: 100%; object-fit: cover; display: block; }
  .mk-bars { position: absolute; top: 8px; left: 8px; right: 8px; display: flex; gap: 3px; }
  .mk-bars i { flex: 1; height: 2.5px; border-radius: 2px; background: rgba(255,255,255,.4); }
  .mk-bars i.on { background: #fff; }
  .mk-who { position: absolute; top: 18px; left: 10px; display: flex; align-items: center; gap: 6px; color: #fff; font-size: .62rem; text-shadow: 0 1px 2px rgba(0,0,0,.5); }
  .mk-who img { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #fff; }
  .mk-who span { opacity: .75; }
  .mk-sticker { position: absolute; left: 50%; top: 84%; translate: -50% 0; rotate: -4deg; display: flex; align-items: center; gap: 5px; padding: 6px 10px; border-radius: 9px; background: #fff; color: #3b82f6; font-size: .6rem; font-weight: 800; letter-spacing: .02em; box-shadow: 0 2px 8px rgba(0,0,0,.25); white-space: nowrap; animation: stick 2.6s var(--spring) infinite; }
  @keyframes stick { 0%, 80%, 100% { scale: 1; } 88% { scale: 1.12; } }
  .mk-reply { position: absolute; left: 10px; right: 10px; bottom: 10px; padding: 7px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,.6); color: #fff; font-size: .6rem; }

  /* feed post */
  .mk-post { width: 100%; max-width: 360px; display: grid; align-content: start; gap: 10px; padding: 14px; border-radius: 16px; background: #fff; color: #191919; border: 1px solid #ddd; box-shadow: 8px 8px 0 var(--a1); font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; animation: rise .5s var(--spring) both; text-align: left; }
  .mk-post.mk-x { background: #000; color: #e7e9ea; border-color: #2f3336; }
  .mk-head { display: flex; align-items: center; gap: 9px; }
  .mk-head img { width: 38px; height: 38px; border-radius: 50%; }
  .mk-head div { display: grid; line-height: 1.2; }
  .mk-head b { font-size: .86rem; }
  .mk-head span { font-size: .72rem; opacity: .6; }
  .mk-text { font-size: .82rem; line-height: 1.42; white-space: pre-wrap; overflow-wrap: anywhere; max-height: 210px; overflow: hidden; }
  .mk-text.clamp { display: -webkit-box; -webkit-line-clamp: 4; line-clamp: 4; -webkit-box-orient: vertical; }
  .mk-card { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(128,128,128,.35); min-height: 120px; background: rgba(128,128,128,.12); }
  .mk-card img { display: block; width: 100%; aspect-ratio: 1200 / 630; object-fit: cover; }
  .mk-meta { display: grid; gap: 2px; padding: 8px 10px; font-size: .74rem; background: rgba(128,128,128,.1); }
  .mk-meta span { opacity: .6; }
  .mk-domain { position: absolute; left: 8px; bottom: 8px; padding: 1px 6px; border-radius: 4px; background: rgba(0,0,0,.75); color: #fff; font-size: .66rem; }
  .mk-actions { display: flex; justify-content: space-between; font-size: .74rem; opacity: .65; padding-top: 4px; border-top: 1px solid rgba(128,128,128,.25); }
  .mk-x .mk-actions, .mk-threads .mk-actions { border-top: 0; justify-content: flex-start; gap: 26px; }

  .st-side { display: grid; gap: 12px; align-content: start; }
  .st-caption { display: grid; gap: 6px; }
  .st-caption textarea { width: 100%; resize: vertical; min-height: 170px; padding: 12px 14px; border-radius: 16px; border: 2px solid var(--line); background: var(--bg); color: var(--fg); font: .9rem/1.5 var(--sans); }
  .st-caption textarea:focus { outline: none; border-color: var(--fg); box-shadow: 4px 4px 0 var(--a1); }
  .st-count { justify-self: end; font-size: .74rem; font-weight: 700; color: var(--soft); }
  .st-count.over { color: var(--ink); background: var(--a2); padding: 1px 8px; border-radius: 999px; }
  .st-actions { display: flex; flex-wrap: wrap; gap: 8px; }
  .st-go { flex: 1 1 100%; min-height: 50px; border-radius: 999px; border: 2px solid var(--fg); background: var(--fg); color: var(--bg); font-weight: 800; box-shadow: 4px 4px 0 var(--a2); transition: transform .3s var(--spring), box-shadow .2s; }
  .st-go:hover:not(:disabled) { transform: translateY(-2px); }
  .st-go:active:not(:disabled) { transform: translate(4px, 4px); box-shadow: none; }
  .st-alt { flex: 1 1 auto; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 2px solid var(--fg); font-weight: 700; font-size: .85rem; transition: background .2s, color .2s, transform .3s var(--spring); }
  .st-alt:hover:not(:disabled) { background: var(--a3); color: var(--ink); transform: translateY(-2px); }
  .st-go:disabled, .st-alt:disabled { opacity: .45; cursor: default; }
  .st-steps { display: grid; gap: 8px; padding-left: 20px; list-style: decimal; font-size: .9rem; }
  .st-steps code { font-family: var(--mono); font-size: .78rem; padding: 1px 6px; border-radius: 6px; border: 1px solid var(--line); }
  .st-hint { font-size: .78rem; color: var(--soft); }
  .st-note { min-height: 1.2em; font-size: .82rem; font-weight: 700; }
  @keyframes rise { from { opacity: 0; transform: translateY(16px) scale(.97); } }
</style>
