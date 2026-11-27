<script lang="ts">
  import { split } from '../lib/fx';
  // Shared list page for decks and carousels: heading, search, filter tabs, results.
  export let label: string;
  export let title: string;
  export let intro: string;
  export let placeholder: string;
  export let filters: string[] = [];
  export let filter = 'all';
  export let query = '';
  export let count = 0;
  export let noun = 'items';
</script>

<header class="page-head">
  <p class="label">{label} · {count} {noun}</p>
  <h1 class="h1" use:split>{title}</h1>
  <p class="lead">{intro}</p>
</header>
<div class="toolbar">
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
{#if count === 0}
  <p class="empty">Nothing matches “{query}”. <button class="link" on:click={() => { query = ''; filter = 'all'; }}>Clear the search</button></p>
{:else}
  <slot />
{/if}
