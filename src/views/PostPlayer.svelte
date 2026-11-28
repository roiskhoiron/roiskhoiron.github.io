<script lang="ts">
  import ShareButton from './ShareButton.svelte';
  import { onDestroy, onMount } from 'svelte';
  import type { PostSlide } from '../lib/data';
  import { findPost, loadPost } from '../lib/content';
  import { lockScroll } from '../lib/scroll';
  import { sharing } from '../lib/share';
  import { go, listHash } from '../lib/router';
  import { saveResume, resumeIndex } from '../lib/resume';
  import { confetti, swipe } from '../lib/fx';
  export let slug: string;

  let i = 0, loaded = '', back = false, cheered = false;
  $: post = findPost(slug);
  // slides of content packs arrive on demand; show a placeholder meanwhile
  let slides: PostSlide[] = [];
  let ready = false;
  $: if (slug !== loaded) {
    loaded = slug; ready = false; cheered = false;
    const want = slug;
    loadPost(want).then((list) => { if (want !== loaded) return; slides = list; i = Math.min(resumeIndex('post', want), Math.max(list.length - 1, 0)); ready = true; });
  }
  onMount(() => lockScroll(true));
  onDestroy(() => lockScroll(false));
  $: s = slides[i];
  $: if (post && ready && slides.length) saveResume({ kind: 'post', slug, title: post.title, idx: i, total: slides.length });

  const next = () => { if (i < slides.length - 1) { back = false; i++; } };
  const prev = () => { if (i > 0) { back = true; i--; } };
  $: if (slides.length > 1 && i === slides.length - 1 && !cheered) { cheered = true; confetti(); }
  const exit = () => go(listHash('posts'));
  function key(e: KeyboardEvent) {
    if (e.defaultPrevented || $sharing) return; // the share sheet has the keyboard
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'Escape') exit();
  }
</script>

<svelte:window on:keydown={key} />
<div class="player" role="dialog" aria-modal="true" aria-label={post?.title}>
  <div class="player-bar">
    <div class="row" style="min-width:0;flex-wrap:nowrap">
      <button class="icon-btn" on:click={exit}>← <span class="wide">Posts</span></button>
      <span class="title">{post?.title}</span>
    </div>
    <div class="row" style="flex-wrap:nowrap">
      <span class="mono muted">{ready ? `${i + 1} / ${slides.length}` : '…'}</span>
      {#if post}<ShareButton item={{ section: 'posts', slug, title: post.title, text: post.desc, tags: [post.tag] }} />{/if}
    </div>
  </div>

  <div class="player-stage" class:back>
    <div class="swipe-stage">
      {#if !ready}<div class="slide-wait" role="status" aria-label="Memuat"><i></i><i></i><i></i></div>{:else if s}
        {#key i}
          <div class="frame c{i % 4}" data-cursor="swipe" use:swipe={{ left: next, right: prev }}>
            <div class="top label"><span>khoirlabs</span><span>{s.label}</span></div>
            <div class="body" class:first={i === 0}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
              {#if s.code}<pre>{s.code.replace(/\\n/g, '\n')}</pre>{/if}
              {#if s.bullets}<ul>{#each s.bullets as b}<li>{b}</li>{/each}</ul>{/if}
            </div>
            <div class="bottom label"><span>@codingskuy_</span><span>{i < slides.length - 1 ? 'swipe →' : 'end'}</span></div>
          </div>
        {/key}
      {/if}
      <div class="aside">
        <p class="label">In this carousel</p>
        <p class="muted">{post?.desc}</p>
        <div class="outline">
          {#each slides as sl, n}
            <button aria-current={n === i} on:click={() => { back = n < i; i = n; }}><span class="mono muted">{String(n + 1).padStart(2, '0')}</span><span>{sl.title}</span></button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="player-foot">
    <button class="step" on:click={prev} disabled={i === 0} aria-label="Previous card">←</button>
    <div class="dots">{#each slides as _, n}<button aria-label="Card {n + 1}" aria-current={n === i} on:click={() => { back = n < i; i = n; }}></button>{/each}</div>
    <button class="step" on:click={next} disabled={i === slides.length - 1} aria-label="Next card">→</button>
  </div>
</div>
