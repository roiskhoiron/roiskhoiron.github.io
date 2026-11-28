<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { startFx, arm } from './lib/fx';
  import { remix, paletteName } from './lib/palette';
  import { route, pages, parentOf, go, startRouter } from './lib/router';
  import { videosData } from './lib/data';
  import { findDeck, findPost, findNote, prefetch } from './lib/content';
  import { startSmoothScroll } from './lib/scroll';
  import { profile } from './lib/profile';
  import logo from './assets/logo-192.webp';
  import CommandPalette from './lib/CommandPalette.svelte';
  import Home from './views/Home.svelte';
  import About from './views/About.svelte';
  import Decks from './views/Decks.svelte';
  import Posts from './views/Posts.svelte';
  import Blog from './views/Blog.svelte';
  import Article from './views/Article.svelte';
  import Videos from './views/Videos.svelte';
  import VideoDetail from './views/VideoDetail.svelte';
  import DeckPlayer from './views/DeckPlayer.svelte';
  import PostPlayer from './views/PostPlayer.svelte';

  let paletteOpen = false;
  let progress = 0;

  let ready = false;
  onMount(() => {
    const stopRouter = startRouter(), stopFx = startFx(), stopScroll = startSmoothScroll();
    ready = true;
    return () => { stopRouter(); stopFx(); stopScroll(); };
  });
  // re-arm scroll reveal whenever the view changes
  $: if (ready && $route) tick().then(arm);

  const deal = (e?: MouseEvent) => (e && e.clientX ? remix(e.clientX, e.clientY) : remix());

  function keys(e: KeyboardEvent) {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? '');
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing && !paletteOpen)) { e.preventDefault(); paletteOpen = !paletteOpen; }
    else if (e.key === 'c' && !typing && !paletteOpen && !e.metaKey && !e.ctrlKey) deal();
  }
  // reading progress, shown on articles only
  let raf = 0;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress = max > 0 ? Math.min(scrollY / max, 1) : 0;
    });
  }

  $: view = $route.view;
  $: slug = $route.slug;
  $: section = parentOf[view] ?? view;
  // the tab title follows the content, so history entries and shared tabs stay readable
  $: title = view === 'deck' ? findDeck(slug)?.title
    : view === 'post' ? findPost(slug)?.title
    : view === 'article' ? findNote(slug)?.title
    : view === 'video' ? videosData.find((d) => d.id === slug)?.title
    : view === 'home' ? '' : view[0].toUpperCase() + view.slice(1);
  $: if (typeof document !== 'undefined') document.title = title ? `${title} — khoirlabs` : 'Khoiron Rois — Software Engineer · khoirlabs';

  const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
  const tabIcons: Record<string, string> = {
    home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4z',
    decks: 'M4 5h16v11H4zM9 20h6M12 16v4',
    posts: 'M7 4h10v16H7zM4 7v10M20 7v10',
    videos: 'M4 6h16v12H4zM10 9.5v5l4.5-2.5z',
    blog: 'M6 4h9l3 3v13H6zM9 10h6M9 14h6'
  };
</script>

<svelte:window on:keydown={keys} on:scroll={onScroll} on:pointerover={(e) => { const a = e.target instanceof Element && e.target.closest('a[href^="#"]'); if (a) prefetch(a.getAttribute('href') ?? ''); }} />
<a class="skip" href="#main">Skip to content</a>
<CommandPalette bind:open={paletteOpen} on:go={(e) => go(e.detail)} on:theme={() => deal()} />
{#if view === 'article'}<div class="progress" style="transform:scaleX({progress})"></div>{/if}

<header class="site-head">
  <div class="wrap">
    <a class="brand" href="#home" aria-label="khoirlabs — home">
      <img src={logo} width="30" height="30" alt="" />
      <span>khoirlabs</span><span class="glyph" aria-hidden="true">&lt;|&gt;</span>
    </a>
    <nav class="nav" aria-label="Primary">
      {#each pages as p}<a href="#{p}" aria-current={section === p ? 'page' : undefined}>{p}</a>{/each}
    </nav>
    <div class="head-tools">
      <a class="head-about" href="#about" aria-current={section === 'about' ? 'page' : undefined}>about</a>
      <button class="icon-btn" on:click={() => (paletteOpen = true)} aria-label="Search the site" aria-keyshortcuts="Meta+K Control+K /">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-width="2" d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" /></svg>
        <span class="wide">search</span><kbd class="wide">/</kbd>
      </button>
      <button class="icon-btn remix" on:click={deal} aria-label="Remix colours (now: {$paletteName})" title="Remix colours — {$paletteName}" data-cursor="remix" aria-keyshortcuts="C">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 0113.7-5.7L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 01-13.7 5.7L4 15.5M4 20v-4.5h4.5" /></svg>
      </button>
    </div>
  </div>
</header>

<main id="main">
  {#key view + slug}
    <div class="wrap view">
      {#if view === 'about'}<About />
      {:else if view === 'decks'}<Decks />
      {:else if view === 'posts'}<Posts />
      {:else if view === 'blog'}<Blog />
      {:else if view === 'article'}<Article {slug} />
      {:else if view === 'videos'}<Videos />
      {:else if view === 'video'}<VideoDetail id={slug} />
      {:else if view === 'deck'}<Decks />
      {:else if view === 'post'}<Posts />
      {:else}<Home />{/if}
    </div>
  {/key}
</main>

{#if view === 'deck'}<DeckPlayer {slug} />{/if}
{#if view === 'post'}<PostPlayer {slug} />{/if}

<footer>
  <div class="wrap">
    <p class="bigword" aria-hidden="true">ngoding kuy</p>
    <div class="foot-grid">
      <div>
        <p class="brand"><span>khoirlabs</span><span class="glyph" aria-hidden="true">&lt;|&gt;</span></p>
        <p class="muted small" style="margin-top:10px;max-width:38ch">{profile.name} builds mobile products end to end and teaches what he learns along the way.</p>
      </div>
      <nav aria-label="Explore"><p class="label">Explore</p><ul><li><a class="link" href="#home">Home</a></li><li><a class="link" href="#about">About</a></li><li><a class="link" href="#blog">Blog</a></li></ul></nav>
      <nav aria-label="Library"><p class="label">Library</p><ul><li><a class="link" href="#decks">Decks</a></li><li><a class="link" href="#posts">Carousels</a></li><li><a class="link" href="#videos">Videos</a></li></ul></nav>
      <nav aria-label="Connect"><p class="label">Connect</p><ul>
        <li><a class="link" href={profile.links.github} target="_blank" rel="noopener">GitHub</a></li>
        <li><a class="link" href={profile.links.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a class="link" href={profile.links.instagram} target="_blank" rel="noopener">Instagram</a></li>
      </ul></nav>
    </div>
    <p class="foot-note label"><span>© 2026 khoirlabs · {profile.base} · palette: {$paletteName} (press C)</span><a class="link" href={profile.whatsapp} target="_blank" rel="noopener">Contact</a></p>
  </div>
</footer>

<nav class="tabbar" aria-label="Sections">
  {#each ['home', 'decks', 'posts', 'videos', 'blog'] as p}
    <a href="#{p}" aria-current={section === p ? 'page' : undefined}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d={tabIcons[p]} /></svg>
      {cap(p)}
    </a>
  {/each}
</nav>

<style>
  .skip { position: absolute; left: -9999px; }
  .skip:focus { left: 12px; top: 12px; z-index: 100; background: var(--ink); color: var(--paper); padding: 8px 14px; border-radius: 4px; }
</style>
