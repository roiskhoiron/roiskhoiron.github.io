<script lang="ts">
  import ShareButton from './ShareButton.svelte';
  import { allNotes, loadNote } from '../lib/content';
  import { listHash } from '../lib/router';
  import type { Full } from '../lib/blog-html';
  import { fmtDate } from '../lib/feed';
  import { saveResume } from '../lib/resume';
  export let slug: string;

  const sorted = allNotes;
  $: i = sorted.findIndex((b) => b.slug === slug);
  $: post = sorted[i];
  // bodies of pack notes arrive on demand
  let full: Full | undefined;
  let ready = false;
  $: { const want = slug; ready = false; loadNote(want).then((f) => { if (want === slug) { full = f; ready = true; } }); }
  $: newer = sorted[i - 1];
  $: older = sorted[i + 1];
  $: if (post) saveResume({ kind: 'blog', slug, title: post.title, idx: 0, total: 1 });
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
</script>

{#if post}
  <p style="margin-bottom:24px"><a class="link mono" href="#{listHash('blog')}">← All notes</a></p>
  <div class="article">
    <article>
      <header class="page-head">
        <p class="label">{fmtDate(post.date)} · {post.mins} min read · by Khoiron Rois</p>
        <h1 class="h1">{post.title}</h1>
        <p class="lead">{post.excerpt}</p>
        <div class="row" style="gap:6px">{#each post.tags as t}<span class="tag">{t}</span>{/each}</div>
        <div><ShareButton variant="pill" item={{ section: 'blog', slug, title: post.title, text: post.excerpt, tags: post.tags }} /></div>
      </header>
      <div class="prose">
        {#if !ready}
          <div class="slide-wait" role="status" aria-label="Memuat"><i></i><i></i><i></i></div>
        {:else if full}
          {#each full.sections as s}
            <section id={s.id}><h2>{s.title}</h2>{@html s.body}</section>
          {/each}
        {:else}
          <p class="muted">The full write-up for this note is not published yet.</p>
        {/if}
      </div>
      {#if ready}
        <aside class="share-cta">
          <p><b>Bermanfaat?</b> Kirim ke teman yang sedang belajar hal yang sama.</p>
          <ShareButton variant="pill" item={{ section: 'blog', slug, title: post.title, text: post.excerpt, tags: post.tags }} />
        </aside>
      {/if}
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
