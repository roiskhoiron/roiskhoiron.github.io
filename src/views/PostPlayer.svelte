<script lang="ts">
  import { postsData, postsSlides } from '../lib/data';
  import { go } from '../lib/router';
  import { saveResume, resumeIndex } from '../lib/resume';
  import { confetti } from '../lib/fx';
  export let slug: string;

  let i = 0, loaded = '', back = false, cheered = false;
  $: post = postsData.find((p) => p.slug === slug);
  $: slides = postsSlides[slug] ?? [];
  $: if (slug !== loaded) { loaded = slug; i = resumeIndex('post', slug); }
  $: s = slides[i];
  $: if (post) saveResume({ kind: 'post', slug, title: post.title, idx: i, total: slides.length });

  const next = () => { if (i < slides.length - 1) { back = false; i++; } };
  const prev = () => { if (i > 0) { back = true; i--; } };
  $: if (slides.length > 1 && i === slides.length - 1 && !cheered) { cheered = true; confetti(); }
  const exit = () => go('posts');
  function key(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'Escape') exit();
  }
  // swipe: a horizontal drag of 40px or more turns the card
  let x0: number | null = null;
  const down = (e: PointerEvent) => (x0 = e.clientX);
  const up = (e: PointerEvent) => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (dx < -40) next(); else if (dx > 40) prev();
  };
</script>

<svelte:window on:keydown={key} />
<div class="player" role="dialog" aria-modal="true" aria-label={post?.title}>
  <div class="player-bar">
    <div class="row" style="min-width:0;flex-wrap:nowrap">
      <button class="icon-btn" on:click={exit}>← <span class="wide">Posts</span></button>
      <span class="title">{post?.title}</span>
    </div>
    <span class="mono muted">{i + 1} / {slides.length}</span>
  </div>

  <div class="player-stage" class:back>
    <div class="swipe-stage">
      {#if s}
        {#key i}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="frame c{i % 4}" data-cursor="swipe" on:pointerdown={down} on:pointerup={up} on:pointercancel={() => (x0 = null)}>
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
