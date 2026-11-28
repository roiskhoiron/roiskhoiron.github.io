<script lang="ts">
  import ShareButton from './ShareButton.svelte';
  import Library from './Library.svelte';
  import { allNotes } from '../lib/content';
  import { fmtDate } from '../lib/feed';
  import type { BlogPost } from '../lib/data';

  // the seven most used tags, most frequent first
  const freq = new Map<string, number>();
  for (const t of allNotes.flatMap((b) => b.tags)) freq.set(t, (freq.get(t) ?? 0) + 1);
  const filters = [...freq].sort((x, y) => y[1] - x[1]).slice(0, 7).map(([t]) => t);
  let filter = 'all', query = '';
  $: q = query.trim().toLowerCase();
  $: found = allNotes.filter((b) => (filter === 'all' || b.tags.includes(filter)) && (!q || (b.title + b.excerpt + b.tags.join(' ')).toLowerCase().includes(q)));
  // the featured note leads page 1
  $: lead = found.find((b) => b.featured) ?? found[0];
  $: list = lead ? [lead, ...found.filter((b) => b !== lead)] : [];
  const asNotes = (x: unknown) => x as BlogPost[];
</script>

<Library base="blog" label="Blog" title="Field notes." noun="notes" items={list} size={10} {filters} bind:filter bind:query let:shown let:page
  intro="Write-ups of what I learn, teach and build. Mostly in Bahasa Indonesia."
  placeholder="Search notes: kmp, sql, keamanan…">
  <div class="entries">
    {#each asNotes(shown) as b, i (b.slug)}
      {@const top = page === 1 && i === 0}
      <article class="entry" data-cursor="read" class:featured={top}>
        <div class="entry-meta"><span>{fmtDate(b.date)}</span><span>{b.mins} min read</span>{#if top}<span class="pen">Pilihan</span>{/if}</div>
        <div>
          <h2 class="entry-title"><a href="#blog/{b.slug}"><span>{b.title}</span></a></h2>
          <p style="margin-top:6px">{b.excerpt}</p>
          <div class="row" style="gap:6px;margin-top:12px">{#each b.tags as t}<span class="tag">{t}</span>{/each}</div>
        </div>
        <div class="entry-end"><span class="go">Read</span><ShareButton variant="mini" item={{ section: 'blog', slug: b.slug, title: b.title, text: b.excerpt, tags: b.tags }} /></div>
      </article>
    {/each}
  </div>
</Library>
