<script lang="ts">
  import { blogData, blogFull } from '../lib/data';
  import { fmtDate } from '../lib/feed';
  import { saveResume } from '../lib/resume';
  export let slug: string;

  const sorted = [...blogData].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  $: i = sorted.findIndex((b) => b.slug === slug);
  $: post = sorted[i];
  $: full = blogFull[slug];
  $: newer = sorted[i - 1];
  $: older = sorted[i + 1];
  $: if (post) saveResume({ kind: 'blog', slug, title: post.title, idx: 0, total: 1 });
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
</script>

{#if post}
  <p style="margin-bottom:24px"><a class="link mono" href="#blog">← All notes</a></p>
  <div class="article">
    <article>
      <header class="page-head">
        <p class="label">{fmtDate(post.date)} · {post.mins} min read · by Khoiron Rois</p>
        <h1 class="h1">{post.title}</h1>
        <p class="lead">{post.excerpt}</p>
        <div class="row" style="gap:6px">{#each post.tags as t}<span class="tag">{t}</span>{/each}</div>
      </header>
      <div class="prose">
        {#if full}
          {#each full.sections as s}
            <section id={s.id}><h2>{s.title}</h2>{@html s.body}</section>
          {/each}
        {:else}
          <p class="muted">The full write-up for this note is not published yet.</p>
        {/if}
      </div>
      <nav class="pager" aria-label="More notes">
        {#if older}<a href="#blog/{older.slug}"><span class="label">← Older</span><b>{older.title}</b></a>{/if}
        {#if newer}<a href="#blog/{newer.slug}"><span class="label">Newer →</span><b>{newer.title}</b></a>{/if}
      </nav>
    </article>
    {#if full}
      <nav class="toc" aria-label="On this page">
        <p class="label">On this page</p>
        {#each full.sections as s}<a href="#blog/{slug}" on:click|preventDefault={() => jump(s.id)}>{s.title}</a>{/each}
      </nav>
    {/if}
  </div>
{/if}
