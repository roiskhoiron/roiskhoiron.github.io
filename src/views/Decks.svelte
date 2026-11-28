<script lang="ts">
  import ShareButton from './ShareButton.svelte';
  import Library from './Library.svelte';
  import { allDecks, slideCount } from '../lib/content';
  import { fmtDate } from '../lib/feed';
  import type { Deck } from '../lib/data';

  const kind = (t: string) => t.split(' ')[0].toLowerCase();
  const filters = [...new Set(allDecks.map((d) => kind(d.type)))];
  let filter = 'all', query = '';
  $: q = query.trim().toLowerCase();
  $: list = allDecks.filter((d) => (filter === 'all' || kind(d.type) === filter) && (!q || (d.title + d.desc + d.tags.join(' ')).toLowerCase().includes(q)));
  const asDecks = (x: unknown) => x as Deck[];
</script>

<Library base="decks" label="Decks" title="Slide decks." noun="decks" items={list} size={12} {filters} bind:filter bind:query let:shown
  intro="Talks and study sessions as slides. Open one, press → or Space to advance, Esc to come back."
  placeholder="Search decks: kotlin, sql, keamanan…">
  <div class="grid" style="padding-top:8px">
    {#each asDecks(shown) as d (d.slug)}
      <article class="card" data-cursor="open">
        <span class="tabmark">{kind(d.type)} · {d.lang}</span>
        <span class="label count">{slideCount(d)} slides</span>
        <h3 class="h3"><a class="stretch" href="#decks/{d.slug}"><span>{d.title}</span></a></h3>
        <p>{d.desc}</p>
        <div class="row" style="gap:6px">{#each d.tags as t}<span class="tag">{t}</span>{/each}</div>
        <div class="card-foot"><p class="label">{fmtDate(d.date)}</p><ShareButton variant="mini" item={{ section: 'decks', slug: d.slug, title: d.title, text: d.desc }} /></div>
      </article>
    {/each}
  </div>
</Library>
