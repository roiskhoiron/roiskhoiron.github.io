<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type { DeckSlide } from '../lib/data';
  import { findDeck, loadDeck } from '../lib/content';
  import { lockScroll } from '../lib/scroll';
  import { go, listHash } from '../lib/router';
  import { saveResume, resumeIndex } from '../lib/resume';
  import { confetti, swipe } from '../lib/fx';
  export let slug: string;

  let i = 0, loaded = '', back = false, cheered = false;
  let stage: HTMLElement;
  $: deck = findDeck(slug);
  // slides of content packs arrive on demand; show a placeholder meanwhile
  let slides: DeckSlide[] = [];
  let ready = false;
  $: if (slug !== loaded) {
    loaded = slug; ready = false; cheered = false;
    const want = slug;
    loadDeck(want).then((list) => { if (want !== loaded) return; slides = list; i = Math.min(resumeIndex('deck', want), Math.max(list.length - 1, 0)); ready = true; });
  }
  onMount(() => lockScroll(true));
  onDestroy(() => lockScroll(false));
  $: s = slides[i];
  $: if (deck && ready && slides.length) saveResume({ kind: 'deck', slug, title: deck.title, idx: i, total: slides.length });

  const next = () => { if (i < slides.length - 1) { back = false; i++; } };
  const prev = () => { if (i > 0) { back = true; i--; } };
  // reaching the last slide earns a small celebration, once
  $: if (slides.length > 1 && i === slides.length - 1 && !cheered) { cheered = true; confetti(); }
  const exit = () => go(listHash('decks'));
  const full = () => (document.fullscreenElement ? document.exitFullscreen() : stage?.requestFullscreen?.());
  function key(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Escape' && !document.fullscreenElement) exit();
    else if (e.key === 'f') full();
  }
</script>

<svelte:window on:keydown={key} />
<div class="player" role="dialog" aria-modal="true" aria-label={deck?.title}>
  <div class="player-bar">
    <div class="row" style="min-width:0;flex-wrap:nowrap">
      <button class="icon-btn" on:click={exit}>← <span class="wide">Decks</span></button>
      <span class="title">{deck?.title}</span>
    </div>
    <div class="row" style="flex-wrap:nowrap">
      <span class="mono muted">{ready ? `${i + 1} / ${slides.length}` : '…'}</span>
      <button class="icon-btn" on:click={full} aria-label="Toggle fullscreen"><kbd>F</kbd><span class="wide">Fullscreen</span></button>
    </div>
  </div>

  <div class="player-stage" class:back bind:this={stage} style="background:var(--bg)" use:swipe={{ left: next, right: prev, touchOnly: true }}>
    {#if !ready}<div class="slide-wait" role="status" aria-label="Memuat"><i></i><i></i><i></i></div>{:else if s}
      {#key i}
        {#if s.layout === 'cover'}
          <div class="slide cover n{i % 3}"><div class="slide-body">
            <p class="label">{s.subtitle}</p>
            <h2>{s.title}</h2>
            {#if s.message}<p>{s.message}</p>{/if}
            {#if s.points}<ul class="plain">{#each s.points as p}<li>{p}</li>{/each}</ul>{/if}
          </div></div>
        {:else if s.layout === 'code'}
          <div class="slide cols n{i % 3}">
            <div class="slide-body">
              <p class="label">{s.subtitle}</p><h2>{s.title}</h2>
              {#if s.message}<p>{s.message}</p>{/if}
              {#if s.points}<ul class="plain">{#each s.points as p}<li>{p}</li>{/each}</ul>{/if}
            </div>
            <div class="slide-body dark"><pre>{(s.code ?? '').replace(/\\n/g, '\n')}</pre></div>
          </div>
        {:else if s.layout === 'split'}
          <div class="slide cols n{i % 3}">
            <div class="slide-body"><p class="label">{s.subtitle}</p><h2>{s.leftTitle}</h2>{#if s.leftPoints}<ul class="plain">{#each s.leftPoints as p}<li>{p}</li>{/each}</ul>{/if}</div>
            <div class="slide-body dark"><p class="label">{s.title}</p><h2>{s.rightTitle}</h2>{#if s.rightPoints}<ul class="plain">{#each s.rightPoints as p}<li>{p}</li>{/each}</ul>{/if}</div>
          </div>
        {:else}
          <div class="slide n{i % 3}"><div class="slide-body">
            <p class="label">{s.subtitle}</p>
            <h2>{s.title}</h2>
            {#if s.message}<p>{s.message}</p>{/if}
            {#if s.cards}
              <div class="cards">{#each s.cards as c}<div><b>{c.title}</b><span>{c.desc}</span></div>{/each}</div>
            {:else if s.points}
              <ul class="ruled">{#each s.points as p}<li><span>{p}</span></li>{/each}</ul>
            {/if}
          </div></div>
        {/if}
      {/key}
    {/if}
  </div>

  <div class="player-foot">
    <button class="step" on:click={prev} disabled={i === 0} aria-label="Previous slide">←</button>
    <div class="dots">{#each slides as _, n}<button aria-label="Slide {n + 1}" aria-current={n === i} on:click={() => { back = n < i; i = n; }}></button>{/each}</div>
    <button class="step" on:click={next} disabled={i === slides.length - 1} aria-label="Next slide">→</button>
  </div>
</div>
