<script lang="ts">
  // Shared list page: heading, search, filter tabs, the current page of results, pagination.
  import { split } from '../lib/fx';
  import { route } from '../lib/router';
  import Pager from './Pager.svelte';

  type T = $$Generic;
  export let base: string;
  export let label: string;
  export let title: string;
  export let intro: string;
  export let placeholder: string;
  export let noun = 'items';
  export let items: T[] = [];
  export let size = 12;
  export let filters: string[] = [];
  export let filter = 'all';
  export let query = '';

  let anchor: HTMLElement;
  $: pages = Math.max(1, Math.ceil(items.length / size));
  $: page = Math.min($route.page, pages);
  $: shown = items.slice((page - 1) * size, page * size);

  // a new search or filter starts again from page 1
  let last = filter + '\u0000' + query;
  $: {
    const now = filter + '\u0000' + query;
    if (now !== last) { last = now; if ($route.page !== 1) location.replace('#' + base); }
  }
</script>

<header class="page-head">
  <p class="label">{label} · {items.length} {noun}</p>
  <h1 class="h1" use:split>{title}</h1>
  <p class="lead">{intro}</p>
</header>
<div class="toolbar" bind:this={anchor}>
  <label class="field">
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-width="2" d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" /></svg>
    <input bind:value={query} type="search" {placeholder} aria-label={placeholder} />
  </label>
  {#if filters.length > 1}
    <div class="tabs" role="group" aria-label="Filter">
      {#each ['all', ...filters] as f}
        <button class="tab" aria-pressed={filter === f} on:click={() => (filter = f)}>{f}</button>
      {/each}
    </div>
  {/if}
</div>
{#if items.length === 0}
  <p class="empty">Nothing matches “{query}”. <button class="link" on:click={() => { query = ''; filter = 'all'; }}>Clear the search</button></p>
{:else}
  {#key page}
    <div class="page-flip"><slot {shown} {page} /></div>
  {/key}
  <Pager {base} {page} {pages} {size} total={items.length} {anchor} />
{/if}
