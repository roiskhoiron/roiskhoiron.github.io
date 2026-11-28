<script lang="ts">
  import ShareButton from './ShareButton.svelte';
  import { videosData } from '../lib/data';
  export let id: string;
  $: v = videosData.find((x) => x.id === id);
</script>

{#if v}
  <p style="margin-bottom:24px"><a class="link mono" href="#videos">← All videos</a></p>
  <div class="stack" style="gap:20px;max-width:900px">
    <div class="embed" class:short={v.isShort}>
      <iframe src="https://www.youtube-nocookie.com/embed/{v.id}" title={v.title} loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
    </div>
    <p class="label">{v.isShort ? 'Short' : v.isLive ? 'Live' : 'Video'} · {v.duration} · {v.date} · {v.views} views</p>
    <h1 class="h2">{v.title}</h1>
    <p class="lead">{v.desc}</p>
    <div class="row"><a class="btn btn-line" href="https://www.youtube.com/watch?v={v.id}" target="_blank" rel="noopener">Watch on YouTube ↗</a><ShareButton variant="pill" item={{ section: 'videos', slug: v.id, title: v.title, text: v.desc, tags: [v.tag] }} /></div>
  </div>
{/if}
