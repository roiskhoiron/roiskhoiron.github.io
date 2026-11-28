<script lang="ts">
  // Page navigation for the library lists. The page lives in the URL (#decks/page-3)
  // so Back, sharing and "return to the list" all land on the same page.
  import { afterUpdate, onMount } from 'svelte';
  import { glideTo } from '../lib/scroll';

  export let base: string;            // 'decks' | 'posts' | 'blog'
  export let page = 1;
  export let pages = 1;
  export let total = 0;
  export let size = 12;
  export let anchor: HTMLElement | null = null; // top of the list to glide back to
  export let demo = false; // documentation: flip pages locally, leave the URL alone

  const href = (n: number) => '#' + base + (n > 1 ? '/page-' + n : '');

  // 1 … 4 5 [6] 7 8 … 12 — always the ends, plus two either side of the current page
  $: items = (() => {
    const out: (number | '…')[] = [];
    for (let n = 1; n <= pages; n++) {
      if (n === 1 || n === pages || Math.abs(n - page) <= 2) out.push(n);
      else if (out[out.length - 1] !== '…') out.push('…');
    }
    return out;
  })();
  $: from = total ? (page - 1) * size + 1 : 0;
  $: to = Math.min(page * size, total);

  function open(n: number, e?: Event) {
    e?.preventDefault();
    if (n < 1 || n > pages || n === page) return;
    if (demo) { page = n; return; }
    location.hash = href(n);
    glideTo(anchor);
  }

  // the blob slides under the active number
  let track: HTMLElement;
  let blob = { x: 0, w: 0, ready: false };
  const place = () => {
    const on = track?.querySelector<HTMLElement>('[aria-current="page"]');
    if (on) blob = { x: on.offsetLeft, w: on.offsetWidth, ready: true };
  };
  onMount(() => { place(); addEventListener('resize', place); return () => removeEventListener('resize', place); });
  afterUpdate(place);
</script>

{#if pages > 1}
  <nav class="pager-nav" aria-label="Halaman">
    <div class="pager-row">
      <a class="pg-step" href={href(page - 1)} on:click={(e) => open(page - 1, e)} aria-disabled={page === 1} tabindex={page === 1 ? -1 : 0} data-cursor="prev">
        <span aria-hidden="true">←</span><span class="pg-word">Sebelumnya</span>
      </a>
      <div class="pg-track" bind:this={track}>
        <span class="pg-blob" class:ready={blob.ready} style="transform: translateX({blob.x}px); width: {blob.w}px" aria-hidden="true"></span>
        {#each items as it}
          {#if it === '…'}
            <span class="pg-gap" aria-hidden="true">…</span>
          {:else}
            <a class="pg-num" href={href(it)} on:click={(e) => open(it, e)} aria-current={it === page ? 'page' : undefined} aria-label="Halaman {it}">{it}</a>
          {/if}
        {/each}
      </div>
      <a class="pg-step" href={href(page + 1)} on:click={(e) => open(page + 1, e)} aria-disabled={page === pages} tabindex={page === pages ? -1 : 0} data-cursor="next">
        <span class="pg-word">Berikutnya</span><span aria-hidden="true">→</span>
      </a>
    </div>
    <div class="pg-meta">
      <span class="pg-bar" aria-hidden="true"><i style="transform: scaleX({page / pages})"></i></span>
      <span class="label">Halaman {page} dari {pages} · {from}–{to} dari {total}</span>
    </div>
  </nav>
{/if}

<style>
  .pager-nav { display: grid; gap: 14px; justify-items: center; margin-top: clamp(36px, 6vw, 56px); }
  .pager-row { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
  .pg-step { display: inline-flex; align-items: center; gap: 8px; min-height: 48px; padding: 0 18px; border: var(--border-base) solid var(--fg); border-radius: var(--radius-pill); background: var(--card); font-weight: 700; box-shadow: var(--lift-2) var(--fg); translate: var(--mx, 0) var(--my, 0); transition: translate var(--dur-3) var(--spring), background var(--dur-1) var(--ease), color var(--dur-1) var(--ease), box-shadow var(--dur-1) var(--ease), opacity var(--dur-1) var(--ease); }
  .pg-step:hover { background: var(--a1); color: var(--ink); }
  .pg-step:active { box-shadow: 0 0 0 var(--fg); transform: translate(4px, 4px); }
  .pg-step span[aria-hidden] { display: inline-block; transition: transform var(--dur-2) var(--spring); }
  .pg-step:hover span[aria-hidden] { transform: translateX(var(--nudge, 4px)); }
  .pg-step:first-child { --nudge: -4px; }
  .pg-step[aria-disabled='true'] { opacity: .3; pointer-events: none; box-shadow: none; }
  .pg-track { position: relative; display: flex; align-items: center; gap: 4px; padding: 5px; border: var(--border-base) solid var(--fg); border-radius: var(--radius-pill); background: var(--card); }
  .pg-blob { position: absolute; left: 0; top: 5px; bottom: 5px; border-radius: var(--radius-pill); background: var(--a1); border: var(--border-base) solid var(--ink); opacity: 0; transition: transform var(--dur-4) var(--spring), opacity var(--dur-1) var(--ease); } /* width snaps (numbers are near-equal); only transform animates */
  .pg-blob.ready { opacity: 1; }
  .pg-num { position: relative; z-index: 1; display: grid; place-items: center; min-width: 40px; height: 40px; padding: 0 6px; border-radius: var(--radius-pill); font-weight: 800; font-variant-numeric: tabular-nums; transition: transform var(--dur-2) var(--spring), color var(--dur-1) var(--ease); }
  .pg-num:hover:not([aria-current]) { transform: translateY(-3px) rotate(-6deg); }
  .pg-num[aria-current='page'] { color: var(--ink); }
  .pg-gap { min-width: 22px; text-align: center; color: var(--soft); font-weight: 800; }
  .pg-meta { display: grid; gap: 8px; justify-items: center; }
  .pg-bar { width: min(260px, 70vw); height: 6px; border-radius: var(--radius-pill); background: var(--line); overflow: hidden; }
  .pg-bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3)); transform-origin: 0 50%; transition: transform var(--dur-5) var(--spring); }
  @media (max-width: 560px) {
    .pg-word { display: none; }
    .pg-step { width: 48px; padding: 0; justify-content: center; }
    .pg-num { min-width: 34px; height: 36px; }
  }
</style>
