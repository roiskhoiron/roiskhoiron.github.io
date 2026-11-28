<script lang="ts">
  import ShareButton from './ShareButton.svelte';
  import Library from './Library.svelte';
  import { allPosts } from '../lib/content';
  import { fmtDate } from '../lib/feed';
  import type { Post } from '../lib/data';

  const filters = [...new Set(allPosts.map((p) => p.tag))];
  let filter = 'all', query = '';
  $: q = query.trim().toLowerCase();
  $: list = allPosts.filter((p) => (filter === 'all' || p.tag === filter) && (!q || (p.title + p.desc + p.tag).toLowerCase().includes(q)));
  const asPosts = (x: unknown) => x as Post[];
</script>

<Library base="posts" label="Posts" title="Swipeable carousels." noun="carousels" items={list} size={12} {filters} bind:filter bind:query let:shown
  intro="Short lessons in a 4:5 frame, the way they go out on Instagram. Tap a cover and swipe through."
  placeholder="Search carousels: git, sql, ai…">
  <div class="tiles">
    {#each asPosts(shown) as p (p.slug)}
      <article class="tile" data-cursor="swipe">
        <p class="label">#{p.tag}</p>
        <h3><a href="#posts/{p.slug}"><span>{p.title}</span></a></h3>
        <p>{p.desc}</p>
        <div class="foot label"><span>{fmtDate(p.date)}</span><ShareButton variant="mini" item={{ section: 'posts', slug: p.slug, title: p.title, text: p.desc, tags: [p.tag] }} /></div>
      </article>
    {/each}
  </div>
</Library>
