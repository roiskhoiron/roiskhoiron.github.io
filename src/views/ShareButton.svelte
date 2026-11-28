<script lang="ts">
  import { share, type ShareItem } from '../lib/share';
  export let item: ShareItem;
  export let variant: 'icon' | 'pill' | 'mini' = 'icon';
  let spin = false;
  function go(e: MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    spin = true; setTimeout(() => (spin = false), 500);
    share(item);
  }
</script>

<button class="share-btn {variant}" class:spin on:click={go} aria-label="Bagikan: {item.title}" title="Bagikan" data-cursor="share">
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" /><path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" />
  </svg>
  {#if variant !== 'icon' && variant !== 'mini'}<span>Bagikan</span>{/if}
</button>

<style>
  .share-btn { position: relative; z-index: 2; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 42px; min-width: 42px; padding: 0 12px; border-radius: 999px; border: 2px solid var(--fg); background: var(--card); color: var(--fg); font-weight: 700; font-size: 0.85rem; translate: var(--mx, 0) var(--my, 0); transition: translate .35s var(--spring), background .2s, color .2s, transform .3s var(--spring); }
  .share-btn:hover { background: var(--a2); color: var(--ink); }
  .share-btn:active { transform: scale(.9); }
  .share-btn.pill { height: 46px; padding: 0 18px; box-shadow: 4px 4px 0 var(--fg); }
  .share-btn.mini { height: 34px; min-width: 34px; padding: 0; border-width: 1.5px; }
  .share-btn svg { transition: transform .5s var(--spring); }
  .share-btn:hover svg { transform: rotate(-14deg) scale(1.1); }
  .share-btn.spin svg { transform: rotate(360deg) scale(1.2); }
</style>
