<script lang="ts">
  import Library from './Library.svelte';
  import { decksData, deckSlides } from '../lib/data';
  import { fmtDate } from '../lib/feed';

  const all = decksData.filter((d) => deckSlides[d.slug]).sort((a, b) => (a.date < b.date ? 1 : -1));
  const kind = (t: string) => t.split(' ')[0].toLowerCase();
  const filters = [...new Set(all.map((d) => kind(d.type)))];
  let filter = 'all', query = '';
  $: q = query.trim().toLowerCase();
  $: list = all.filter((d) => (filter === 'all' || kind(d.type) === filter) && (!q || (d.title + d.desc + d.tags.join(' ')).toLowerCase().includes(q)));
</script>

<Library label="Decks" title="Slide decks." noun="decks" count={list.length} {filters} bind:filter bind:query
  intro="Talks and study sessions as slides. Open one, press → or Space to advance, Esc to come back."
  placeholder="Search decks: kotlin, typescript, promise…">
  <div class="grid" style="padding-top:8px">
    {#each list as d (d.slug)}
      <article class="card" data-cursor="open">
        <span class="tabmark">{kind(d.type)} · {d.lang}</span>
        <span class="label count">{deckSlides[d.slug].length} slides</span>
        <h3 class="h3"><a class="stretch" href="#decks/{d.slug}"><span>{d.title}</span></a></h3>
        <p>{d.desc}</p>
        <div class="row" style="gap:6px">{#each d.tags as t}<span class="tag">{t}</span>{/each}</div>
        <p class="label" style="margin-top:4px">{fmtDate(d.date)}</p>
      </article>
    {/each}
  </div>
</Library>
