<script lang="ts">
  import Library from './Library.svelte';
  import { blogData } from '../lib/data';
  import { fmtDate } from '../lib/feed';

  const all = [...blogData].sort((a, b) => (a.date < b.date ? 1 : -1));
  const filters = [...new Set(all.flatMap((b) => b.tags))].slice(0, 7);
  let filter = 'all', query = '';
  $: q = query.trim().toLowerCase();
  $: list = all.filter((b) => (filter === 'all' || b.tags.includes(filter)) && (!q || (b.title + b.excerpt + b.tags.join(' ')).toLowerCase().includes(q)));
  $: lead = list.find((b) => b.featured) ?? list[0];
</script>

<Library label="Blog" title="Field notes." noun="notes" count={list.length} {filters} bind:filter bind:query
  intro="Write-ups of what I learn, teach and build. Mostly in Bahasa Indonesia."
  placeholder="Search notes: kmp, typescript, performance…">
  <div class="entries">
    {#each [lead, ...list.filter((b) => b !== lead)] as b, i (b.slug)}
      <article class="entry" class:featured={i === 0}>
        <div class="entry-meta"><span>{fmtDate(b.date)}</span><span>{b.mins} min read</span>{#if i === 0}<span class="pen">Latest</span>{/if}</div>
        <div>
          <h2 class="entry-title"><a href="#blog/{b.slug}"><span>{b.title}</span></a></h2>
          <p style="margin-top:6px">{b.excerpt}</p>
          <div class="row" style="gap:6px;margin-top:12px">{#each b.tags as t}<span class="tag">{t}</span>{/each}</div>
        </div>
        <span class="go">Read →</span>
      </article>
    {/each}
  </div>
</Library>
