<script lang="ts">
  import { tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import { sharing, shareUrl, targets, copy, sectionLabel, canNativeShare, nativeShare } from '../lib/share';
  import ShareStudio from './ShareStudio.svelte';

  let tab: 'link' | 'studio' = 'link';
  import { confetti } from '../lib/fx';
  import { lockScroll } from '../lib/scroll';

  let copied = false;
  let panel: HTMLElement;
  let lastFocus: HTMLElement | null = null;
  $: it = $sharing;
  $: url = it ? shareUrl(it) : '';
  $: open(it);
  async function open(x: typeof it) {
    copied = false; tab = 'link';
    if (x) { lastFocus = document.activeElement as HTMLElement; lockScroll(true); await tick(); panel?.querySelector<HTMLElement>('.sh-copy')?.focus(); }
    else { lockScroll(false); lastFocus?.focus?.(); lastFocus = null; }
  }
  const close = () => sharing.set(null);
  async function doCopy(e: MouseEvent) {
    if (await copy(url)) { copied = true; confetti(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 24); setTimeout(() => (copied = false), 2200); }
  }
  function key(e: KeyboardEvent) {
    if (!it) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') { // keep focus inside the sheet
      const f = [...panel.querySelectorAll<HTMLElement>('a, button')];
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  }
  const icons: Record<string, string> = {
    wa: 'M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 9.5c.4 2 2.1 3.9 4.5 4.5l1.2-1.2 2 .8-.4 1.6c-3.8.5-8-3.7-7.5-7.5l1.6-.4.8 2z',
    li: 'M5 9v10M5 5.5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 9v10',
    x: 'M5 5l14 14M19 5L5 19',
    tg: 'M3 11l18-7-3 16-6-5-3 4v-6l9-7',
    fb: 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z',
    mail: 'M3 6h18v12H3zM3 7l9 6 9-6'
  };
</script>

<svelte:window on:keydown={key} />
{#if it}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class="share-backdrop" transition:fade={{ duration: 160 }} on:click|self={close}>
    <div class="sheet" class:wide={tab === 'studio'} bind:this={panel} role="dialog" aria-modal="true" aria-labelledby="sh-title" in:fly={{ y: 60, duration: 420, easing: backOut }} out:fly={{ y: 40, duration: 180 }}>
      <div class="sh-head">
        <div class="sh-tabs" role="tablist" aria-label="Cara berbagi">
          <button role="tab" aria-selected={tab === 'link'} on:click={() => (tab = 'link')}>Kirim link</button>
          <button role="tab" aria-selected={tab === 'studio'} on:click={() => (tab = 'studio')}>Studio posting</button>
        </div>
        <button class="sh-x" on:click={close} aria-label="Tutup">✕</button>
      </div>
      {#if tab === 'studio'}
        <ShareStudio item={it} />
      {:else}
      <div class="sh-preview">
        <span class="sh-kind">{sectionLabel[it.section]}</span>
        <h2 id="sh-title">{it.title}</h2>
        <p>{it.text}</p>
        <span class="sh-url">{url.replace(/^https?:\/\//, '')}</span>
      </div>
      <button class="sh-copy" class:done={copied} on:click={doCopy}>
        {#if copied}<span>Link tersalin ✓</span>{:else}<span>Salin link</span>{/if}
      </button>
      <div class="sh-grid">
        {#each targets(it) as t, i}
          <a class="sh-t sh-{t.id}" href={t.href} target={t.id === 'mail' ? undefined : '_blank'} rel="noopener" style="--i:{i}" on:click={() => setTimeout(close, 150)}>
            <span class="sh-ico"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={icons[t.id]} /></svg></span>
            <span>{t.label}</span>
          </a>
        {/each}
      </div>
      <div class="sh-more">
        <button class="sh-studio-cta" on:click={() => (tab = 'studio')}>Buat postingan LinkedIn, Story, Threads, X →</button>
        {#if canNativeShare()}<button class="sh-native" on:click={() => it && nativeShare(it)}>Aplikasi lain…</button>{/if}
      </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .share-backdrop { position: fixed; inset: 0; z-index: 95; display: grid; place-items: center; padding: 16px; background: var(--scrim); }
  .sheet.wide { width: min(100%, 940px); }
  .sh-tabs { display: flex; gap: 4px; padding: 4px; border: var(--border-base) solid var(--fg); border-radius: var(--radius-pill); }
  .sh-tabs button { padding: 7px 14px; border-radius: var(--radius-pill); font-weight: 700; font-size: .85rem; transition: background .2s, color .2s; }
  .sh-tabs button[aria-selected='true'] { background: var(--fg); color: var(--bg); }
  .sh-more { display: flex; flex-wrap: wrap; gap: 8px; }
  .sh-studio-cta { flex: 1 1 100%; min-height: 48px; border-radius: var(--radius-pill); border: var(--border-base) solid var(--fg); font-weight: 800; background: conic-gradient(from 90deg, var(--a1), var(--a2), var(--a3), var(--a1)); color: var(--ink); transition: transform var(--dur-2) var(--spring); }
  .sh-studio-cta:hover { transform: translateY(-2px) rotate(-1deg); }
  .sh-native { flex: 1 1 auto; min-height: 44px; border-radius: var(--radius-pill); border: var(--border-base) solid var(--line); font-weight: 700; }
  .sheet { width: min(100%, 460px); max-height: calc(100vh - 32px); overflow: auto; display: grid; gap: 16px; padding: 22px; background: var(--card); color: var(--fg); border: var(--border-base) solid var(--fg); border-radius: var(--radius-card); box-shadow: var(--lift-5) var(--a1); }
  .sh-head { display: flex; justify-content: space-between; align-items: center; }
  .sh-x { width: 36px; height: 36px; border-radius: 50%; border: var(--border-base) solid var(--fg); transition: transform var(--dur-2) var(--spring), background .2s; }
  .sh-x:hover { transform: rotate(90deg); background: var(--a2); color: var(--ink); }
  .sh-preview { position: relative; display: grid; gap: 6px; padding: 18px; border-radius: var(--radius-xl); background: var(--a1); color: var(--ink); border: var(--border-base) solid var(--ink); rotate: -1.2deg; animation: sh-tilt var(--dur-5) var(--spring) .1s both; }
  @keyframes sh-tilt { from { rotate: 4deg; scale: .92; } }
  .sh-kind { justify-self: start; font-size: .7rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; background: var(--ink); color: var(--a1); padding: 2px 10px; border-radius: var(--radius-pill); }
  .sh-preview h2 { font-family: var(--display); font-size: 1.25rem; line-height: 1.1; font-weight: 800; }
  .sh-preview p { font-size: .88rem; line-height: 1.4; opacity: .85; display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .sh-url { font-family: var(--mono); font-size: .7rem; opacity: .7; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .sh-copy { min-height: 52px; border-radius: var(--radius-pill); border: var(--border-base) solid var(--fg); background: var(--fg); color: var(--bg); font-weight: 800; font-size: 1rem; box-shadow: var(--lift-3) var(--a2); transition: transform var(--dur-2) var(--spring), background .25s, color .25s, box-shadow .2s; }
  .sh-copy:hover { transform: translateY(-2px); }
  .sh-copy:active { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--a2); }
  .sh-copy.done { background: var(--a3); color: var(--ink); animation: pop var(--dur-3) var(--spring); }
  .sh-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .sh-t { display: grid; justify-items: center; gap: 6px; padding: 12px 6px; border-radius: var(--radius-xl); border: var(--border-base) solid var(--line); font-size: .8rem; font-weight: 700; animation: sh-in var(--dur-4) var(--spring) both; animation-delay: calc(var(--i) * 45ms + 120ms); transition: transform var(--dur-2) var(--spring), background .2s, color .2s, border-color .2s; }
  @keyframes sh-in { from { opacity: 0; transform: translateY(14px) scale(.9); } }
  .sh-t:hover { transform: translateY(-4px) rotate(-3deg); border-color: var(--fg); background: var(--a3); color: var(--ink); }
  .sh-ico { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: var(--fg); color: var(--bg); transition: transform var(--dur-3) var(--spring); }
  .sh-t:hover .sh-ico { transform: scale(1.12) rotate(8deg); }
  @media (max-width: 560px) {
    .share-backdrop { place-items: end center; padding: 0; }
    .sheet { width: 100%; border-radius: var(--radius-card) var(--radius-card) 0 0; padding-bottom: calc(22px + env(safe-area-inset-bottom)); box-shadow: none; }
  }
</style>
