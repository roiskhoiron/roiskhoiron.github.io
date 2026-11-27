<script lang="ts">
  import Library from './Library.svelte';
  import { postsData, postsSlides } from '../lib/data';
  import { fmtDate } from '../lib/feed';

  const all = postsData.filter((p) => postsSlides[p.slug]).sort((a, b) => (a.date < b.date ? 1 : -1));
  const filters = [...new Set(all.map((p) => p.tag))];
  let filter = 'all', query = '';
  $: q = query.trim().toLowerCase();
  $: list = all.filter((p) => (filter === 'all' || p.tag === filter) && (!q || (p.title + p.desc + p.tag).toLowerCase().includes(q)));
</script>

<Library label="Posts" title="Swipeable carousels." noun="carousels" count={list.length} {filters} bind:filter bind:query
  intro="Short lessons in a 4:5 frame, the way they go out on Instagram. Tap a cover and swipe through."
  placeholder="Search carousels: kotlin, typescript, cli…">
  <div class="tiles">
    {#each list as p (p.slug)}
      <article class="tile">
        <p class="label">#{p.tag} · {postsSlides[p.slug].length} cards</p>
        <h3><a href="#posts/{p.slug}"><span>{p.title}</span></a></h3>
        <p>{p.desc}</p>
        <div class="foot label"><span>{fmtDate(p.date)}</span><span>Swipe →</span></div>
      </article>
    {/each}
  </div>
</Library>
