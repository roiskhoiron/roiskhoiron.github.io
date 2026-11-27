<script lang="ts">
  import { split } from '../lib/fx';
  import { videosData, type Video } from '../lib/data';
  import { profile } from '../lib/profile';

  const tabs: [string, string][] = [['all', 'All'], ['video', 'Videos'], ['short', 'Shorts'], ['live', 'Live']];
  let filter = 'all', query = '';
  $: q = query.trim().toLowerCase();
  $: list = videosData.filter((v) =>
    (filter === 'all' || (filter === 'video' && !v.isShort) || (filter === 'short' && v.isShort) || (filter === 'live' && v.isLive)) &&
    (!q || (v.title + v.desc + v.tag).toLowerCase().includes(q)));
  $: long = list.filter((v) => !v.isShort);
  $: shorts = list.filter((v) => v.isShort);
  // card-sized thumbnail instead of the 720p one
  const thumb = (v: Video) => v.thumb.replace('hq720', 'mqdefault');
</script>

<header class="page-head">
  <p class="label">Videos · {list.length} videos</p>
  <h1 class="h1" use:split>CodingSkuy on YouTube.</h1>
  <p class="lead">Live coding, seri belajar bareng, dan Shorts dari channel <a class="link" href={profile.links.youtube} target="_blank" rel="noopener">@codingskuy</a>.</p>
</header>
<div class="toolbar">
  <label class="field">
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-width="2" d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" /></svg>
    <input bind:value={query} type="search" placeholder="Search videos: kotlin, typescript…" aria-label="Search videos" />
  </label>
  <div class="tabs" role="group" aria-label="Filter">
    {#each tabs as [k, label]}<button class="tab" aria-pressed={filter === k} on:click={() => (filter = k)}>{label}</button>{/each}
  </div>
</div>

{#if list.length === 0}
  <p class="empty">No videos match. <button class="link" on:click={() => { query = ''; filter = 'all'; }}>Clear the search</button></p>
{/if}
{#if long.length}
  <div class="videos">
    {#each long as v (v.id)}
      <a class="video" data-cursor="play" href="#videos/{v.id}">
        <div class="thumb">
          <img src={thumb(v)} alt="" loading="lazy" decoding="async" width="320" height="180" />
          {#if v.isLive}<span class="live">LIVE</span>{/if}
          <span class="dur">{v.duration}</span>
        </div>
        <h3>{v.title}</h3>
        <p class="label">{v.date} · {v.views} views · {v.tag}</p>
      </a>
    {/each}
  </div>
{/if}
{#if shorts.length}
  <p class="label subhead">Shorts · {shorts.length}</p>
  <div class="videos shorts">
    {#each shorts as v (v.id)}
      <a class="video" data-cursor="play" href="#videos/{v.id}">
        <div class="thumb"><img src={thumb(v)} alt="" loading="lazy" decoding="async" width="180" height="320" /><span class="dur">{v.duration}</span></div>
        <h3 class="small">{v.title}</h3>
      </a>
    {/each}
  </div>
{/if}
