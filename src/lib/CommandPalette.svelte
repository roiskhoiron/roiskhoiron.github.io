<script lang="ts">
  // ⌘K / "/" palette: one search box across every page, deck, carousel, article and video.
  import { createEventDispatcher, tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { decksData, postsData, blogData, videosData, deckSlides, postsSlides } from './data';

  export let open = false;
  export let theme: 'dark' | 'light' = 'dark';

  type Item = { group: string; title: string; hint: string; hay: string; hash?: string; action?: 'theme' | 'email' };
  const dispatch = createEventDispatcher<{ go: string; theme: void }>();

  const all: Item[] = [
    ...[['Home', 'home', 'Start page'], ['About', 'about', 'Experience, skills, contact'], ['Decks', 'decks', 'Presentation library'],
        ['Videos', 'videos', 'CodingSkuy on YouTube'], ['Posts', 'posts', 'Instagram carousels'], ['Blog', 'blog', 'Notes from the workshop']]
      .map(([title, hash, hint]) => ({ group: 'Pages', title, hint, hash, hay: '' })),
    ...blogData.map((b) => ({ group: 'Blog', title: b.title, hint: `${b.mins} min`, hash: 'blog/' + b.slug, hay: b.excerpt + ' ' + b.tags.join(' ') })),
    ...decksData.filter((d) => deckSlides[d.slug]).map((d) => ({ group: 'Decks', title: d.title, hint: `${d.slides} slides`, hash: 'decks/' + d.slug, hay: d.desc + ' ' + d.tags.join(' ') })),
    ...postsData.filter((p) => postsSlides[p.slug]).map((p) => ({ group: 'Carousels', title: p.title, hint: '#' + p.tag, hash: 'posts/' + p.slug, hay: p.desc + ' ' + p.tag })),
    ...videosData.map((v) => ({ group: 'Videos', title: v.title, hint: v.duration, hash: 'videos/' + v.id, hay: v.desc + ' ' + v.tag })),
    { group: 'Actions', title: 'Toggle light / dark theme', hint: 'theme', hay: 'dark light mode appearance', action: 'theme' as const },
    { group: 'Actions', title: 'Email Khoiron', hint: 'mailto', hay: 'contact hire get in touch', action: 'email' as const }
  ].map((i) => ({ ...i, hay: (i.title + ' ' + i.group + ' ' + i.hay).toLowerCase() }));

  let q = '';
  let active = 0;
  let input: HTMLInputElement;
  let list: HTMLDivElement;
  let lastFocus: HTMLElement | null = null;

  // every word must match; results stay grouped, and inside a group title hits come first
  const order = ['Pages', 'Blog', 'Decks', 'Carousels', 'Videos', 'Actions'];
  $: words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const inTitle = (i: Item, ws: string[]) => (ws.every((w) => i.title.toLowerCase().includes(w)) ? 0 : 1);
  $: results = (words.length
      ? all.filter((i) => words.every((w) => i.hay.includes(w)))
          .sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || inTitle(a, words) - inTitle(b, words))
      : all.filter((i) => i.group === 'Pages' || i.group === 'Actions')
    ).slice(0, 14);
  $: if (results) active = 0;

  $: if (open) onOpen(); else onClose();
  async function onOpen() {
    lastFocus = document.activeElement as HTMLElement;
    q = '';
    await tick();
    input?.focus();
  }
  function onClose() { lastFocus?.focus?.(); lastFocus = null; }

  function run(i: Item | undefined) {
    if (!i) return;
    open = false;
    if (i.action === 'theme') dispatch('theme');
    else if (i.action === 'email') location.href = 'mailto:rois.khoiron@gmail.com';
    else if (i.hash) dispatch('go', i.hash);
  }
  async function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') { e.preventDefault(); open = false; }
    else if (e.key === 'Enter') { e.preventDefault(); run(results[active]); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % Math.max(results.length, 1);
      await tick();
      list?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Tab') e.preventDefault(); // keep focus inside the dialog
  }
</script>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class="cp-backdrop" transition:fade={{ duration: 140 }} on:click|self={() => (open = false)}>
    <div class="cp-panel {theme}" role="dialog" aria-modal="true" aria-label="Search the site" in:fly={{ y: -10, duration: 220 }}>
      <div class="cp-input-row">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input bind:this={input} bind:value={q} on:keydown={onKey} placeholder="Search decks, posts, videos…" aria-label="Search" role="combobox" aria-expanded="true" aria-controls="cp-list" aria-activedescendant={results.length ? 'cp-opt-' + active : undefined} autocomplete="off" spellcheck="false" />
        <kbd>esc</kbd>
      </div>
      <div class="cp-list" id="cp-list" role="listbox" bind:this={list}>
        {#each results as r, i (r.group + r.title + (r.hash ?? ''))}
          {#if i === 0 || results[i - 1].group !== r.group}<div class="cp-group">{r.group}</div>{/if}
          <button type="button" id={'cp-opt-' + i} role="option" aria-selected={i === active} class="cp-item" tabindex="-1" on:click={() => run(r)} on:mousemove={() => (active = i)}>
            <span class="cp-title">{r.title}</span><span class="cp-hint">{r.hint}</span>
          </button>
        {:else}
          <div class="cp-empty">Nothing matches “{q}”. Try “claude”, “kotlin” or “monorepo”.</div>
        {/each}
      </div>
      <div class="cp-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span class="cp-count">{all.length} entries indexed</span></div>
    </div>
  </div>
{/if}

<style>
  .cp-backdrop { position: fixed; inset: 0; z-index: 90; background: rgba(0,0,0,.55); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; justify-content: center; align-items: flex-start; padding: 12vh 16px 16px; }
  .cp-panel { --bg:#0f0f11; --fg:#fafafa; --mut:#8b8b94; --line:#27272a; --hi:#1c1c20;
    width: 100%; max-width: 580px; max-height: min(70vh, 560px); display: flex; flex-direction: column; background: var(--bg); color: var(--fg); border: 1px solid var(--line); border-radius: 18px; overflow: hidden; box-shadow: 0 30px 80px -20px rgba(0,0,0,.6); }
  .cp-panel.light { --bg:#ffffff; --fg:#18181b; --mut:#6b6b74; --line:#e4e4e7; --hi:#f4f4f5; box-shadow: 0 30px 80px -24px rgba(0,0,0,.28); }
  .cp-input-row { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid var(--line); color: var(--mut); }
  .cp-input-row input { flex: 1; min-width: 0; background: transparent; border: 0; outline: none; box-shadow: none !important; color: var(--fg); font-size: 16px; }
  .cp-input-row input::placeholder { color: var(--mut); }
  .cp-list { overflow-y: auto; padding: 6px; overscroll-behavior: contain; }
  .cp-group { padding: 10px 10px 4px; font-family: "Geist Mono", monospace; font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); }
  .cp-item { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px; border-radius: 10px; text-align: left; font-size: 14px; color: var(--fg); transition: none; }
  .cp-item:active { transform: none; }
  .cp-item[aria-selected="true"] { background: var(--hi); box-shadow: inset 2px 0 0 #FF6B35; }
  .cp-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .cp-hint { flex-shrink: 0; font-family: "Geist Mono", monospace; font-size: 11px; color: var(--mut); }
  .cp-empty { padding: 28px 16px; text-align: center; font-size: 13px; color: var(--mut); }
  .cp-foot { display: flex; gap: 16px; align-items: center; padding: 10px 16px; border-top: 1px solid var(--line); font-size: 11px; color: var(--mut); }
  .cp-count { margin-left: auto; font-family: "Geist Mono", monospace; }
  kbd { font-family: "Geist Mono", monospace; font-size: 10px; padding: 2px 6px; margin-right: 3px; border: 1px solid var(--line); border-radius: 6px; color: var(--mut); }
  @media (max-width: 640px) { .cp-backdrop { padding-top: 8vh; } .cp-foot span:not(.cp-count) { display: none; } .cp-count { margin-left: 0; } }
</style>
