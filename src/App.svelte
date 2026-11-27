<script lang="ts">
  import { onMount } from 'svelte';
  import { route, pages, parentOf, go, startRouter } from './lib/router';
  import { decksData, postsData, blogData, videosData } from './lib/data';
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

  let theme: 'dark' | 'light' = 'light';
  let paletteOpen = false;
  let progress = 0;

  onMount(() => {
    theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    return startRouter();
  });

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    const h = document.documentElement;
    h.classList.toggle('dark', theme === 'dark');
    h.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e1014' : '#f3efe6');
    try { localStorage.setItem('theme-preference', theme); } catch {}
  }

  function keys(e: KeyboardEvent) {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? '');
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing && !paletteOpen)) { e.preventDefault(); paletteOpen = !paletteOpen; }
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
  $: title = view === 'deck' ? decksData.find((d) => d.slug === slug)?.title
    : view === 'post' ? postsData.find((d) => d.slug === slug)?.title
    : view === 'article' ? blogData.find((d) => d.slug === slug)?.title
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

<svelte:window on:keydown={keys} on:scroll={onScroll} />
<a class="skip" href="#main">Skip to content</a>
<CommandPalette bind:open={paletteOpen} {theme} on:go={(e) => go(e.detail)} on:theme={toggleTheme} />
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
      <button class="icon-btn" on:click={toggleTheme} aria-label="Switch to {theme === 'dark' ? 'light' : 'dark'} theme">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 4v16" /><path d="M12 4a8 8 0 010 16z" fill="currentColor" /></svg>
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
    <div class="foot-grid">
      <div>
        <p class="brand"><span>khoirlabs</span><span class="glyph" aria-hidden="true">&lt;|&gt;</span></p>
        <p class="muted small" style="margin-top:10px;max-width:38ch">The lab notebook of {profile.name}: mobile, backend and AI, written down so others can learn from it.</p>
      </div>
      <nav aria-label="Explore"><p class="label">Explore</p><ul><li><a class="link" href="#home">Home</a></li><li><a class="link" href="#about">About</a></li><li><a class="link" href="#blog">Blog</a></li></ul></nav>
      <nav aria-label="Library"><p class="label">Library</p><ul><li><a class="link" href="#decks">Decks</a></li><li><a class="link" href="#posts">Carousels</a></li><li><a class="link" href="#videos">Videos</a></li></ul></nav>
      <nav aria-label="Connect"><p class="label">Connect</p><ul>
        <li><a class="link" href={profile.links.github} target="_blank" rel="noopener">GitHub</a></li>
        <li><a class="link" href={profile.links.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a class="link" href={profile.links.instagram} target="_blank" rel="noopener">Instagram</a></li>
      </ul></nav>
    </div>
    <p class="foot-note label"><span>© 2026 khoirlabs · {profile.base}</span><a class="link" href={profile.whatsapp} target="_blank" rel="noopener">Contact</a></p>
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
