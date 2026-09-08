<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { decksData, deckSlides, postsData, postsSlides, blogData, blogFull, videosData } from './lib/data';
  import type { Video } from './lib/data';

  let view: string = 'home';
  let deckSlug: string | null = null;
  let postSlug: string | null = null;
  let blogSlug: string | null = null;
let booted = false;
  let theme: 'dark' | 'light' = 'dark';
  let deckIdx = 0;
  let postIdx = 0;
  let deckTag = 'all';
  let postTag = 'all';
  let blogTag = 'all';
  let videoFilter: 'all'|'video'|'short' = 'all';
  let deckSearch = '';
  let postSearch = '';
  let blogSearch = '';
  let videoSearch = '';
  let postsCarIdx = 0;
  let postsTick = 0;
  let selectedVideo: Video | null = null;
  let csStats: { installs: number; stars: number; contributors: number } | null = null;
  let csLoading = false;
// boot
   onMount(() => {
     // theme init (sebelum boot animation supaya background match)
     const saved = localStorage.getItem('theme-preference');
     const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
     theme = (saved === 'light' || saved === 'dark') ? saved as any : (sysDark ? 'dark' : 'light');
     applyTheme(theme);
      // run boot sequence
      runBootSequence();
      // hash & scroll & stats
      handleHash();
      window.addEventListener('hashchange', handleHash);
      window.addEventListener('scroll', handleScroll, {passive:true});
      handleScroll();
      loadCodingSchoolStats();
    });

  function runBootSequence(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      booted = true;
      setTimeout(() => { setupReveal(); }, 60);
      return;
    }
    setTimeout(() => {
      booted = true;
      setTimeout(() => { setupReveal(); }, 420);
    }, 1100);
  }

  function applyTheme(t: 'dark'|'light') {
    theme = t;
    document.documentElement.classList.add('theme-transition');
    setTimeout(()=> document.documentElement.classList.remove('theme-transition'), 520);
    document.documentElement.classList.toggle('dark', t==='dark');
    document.documentElement.classList.toggle('light', t==='light');
    document.documentElement.style.colorScheme = t;
    localStorage.setItem('theme-preference', t);
  }
  function toggleTheme(){
    applyTheme(theme==='dark'?'light':'dark');
  }

  async function loadCodingSchoolStats(){
    csLoading = true;
    const ctrl = new AbortController();
    const to = setTimeout(()=> ctrl.abort(), 4000);
    const today = new Date().toISOString().slice(0,10);
    try{
      const npmP = fetch(`https://api.npmjs.org/downloads/point/2026-07-13:${today}/@codingskuy/coding-school`, {signal:ctrl.signal}).then(r=>r.ok?r.json():null);
      const ghRepoP = fetch(`https://api.github.com/repos/codingskuy/coding-school`, {signal:ctrl.signal, headers:{'Accept':'application/vnd.github+json'}}).then(r=>r.ok?r.json():null);
      const ghConP = fetch(`https://api.github.com/repos/codingskuy/coding-school/contributors`, {signal:ctrl.signal, headers:{'Accept':'application/vnd.github+json'}}).then(r=>r.ok?r.json():null);
      const [npm,res,con] = await Promise.all([npmP,ghRepoP,ghConP]);
      csStats = {
        installs: npm?.downloads ?? 0,
        stars: res?.stargazers_count ?? 0,
        contributors: Array.isArray(con) ? con.length : 0
      };
    }catch{
      csStats = { installs: 0, stars: 0, contributors: 0 };
    }finally{
      clearTimeout(to);
      csLoading = false;
    }
  }

  function handleHash(){
    const raw = location.hash.replace('#','') || 'home';
    if (raw.startsWith('decks/')) { const s=raw.split('/')[1]; if (deckSlides[s]) { deckSlug=s; deckIdx=0; view='deckDetail'; return; } }
    if (raw.startsWith('posts/')) { const s=raw.split('/')[1]; if (postsSlides[s]) { postSlug=s; postIdx=0; view='postDetail'; return; } }
    if (raw.startsWith('blog/')) { const s=raw.split('/')[1]; if (blogData.find(b=>b.slug===s)) { blogSlug=s; view='blogDetail'; return; } }
    if (raw.startsWith('videos/')) { const id=raw.split('/')[1]; const v=videosData.find(x=>x.id===id); if(v){ selectedVideo=v; view='videoDetail'; return;} }
    if (['home','decks','videos','posts','blog','about'].includes(raw)) view = raw;
    else view = 'home';
  }
  function nav(v:string){
    if(v.startsWith('decks/')||v.startsWith('posts/')||v.startsWith('blog/')) location.hash = v;
    else { location.hash = v; view=v; }
    window.scrollTo({top:0, behavior:'smooth'});
  }
  function openDeck(slug:string){ location.hash='decks/'+slug; deckSlug=slug; deckIdx=0; view='deckDetail'; }
  function openPost(slug:string){ location.hash='posts/'+slug; postSlug=slug; postIdx=0; view='postDetail'; }
  function openBlog(slug:string){ location.hash='blog/'+slug; blogSlug=slug; view='blogDetail'; }
  function openVideo(v: Video){ selectedVideo=v; location.hash='videos/'+v.id; view='videoDetail'; }
  function deckNext(){ const sl= deckSlug ? deckSlides[deckSlug] : null; if(sl && deckIdx < sl.length-1) deckIdx++; }
  function deckPrev(){ if(deckIdx>0) deckIdx--; }
  function postNext(){ const sl= postSlug ? postsSlides[postSlug] : null; if(sl && postIdx < sl.length-1) postIdx++; }
  function postPrev(){ if(postIdx>0) postIdx--; }
  function requestDeckFullscreen(){ const el=document.getElementById('deck-stage'); if(!document.fullscreenElement) el?.requestFullscreen?.(); else document.exitFullscreen?.(); }
  function requestPostFullscreen(){ const el=document.getElementById('post-stage'); if(!document.fullscreenElement) el?.requestFullscreen?.(); else document.exitFullscreen?.(); }
  $: blogDetailPrev = blogSlug ? blogData[blogData.findIndex(b=>b.slug===blogSlug)-1] : null;
  $: blogDetailNext = blogSlug ? blogData[blogData.findIndex(b=>b.slug===blogSlug)+1] : null;
  $: postDetailPrevIdx = postSlug ? postsData.findIndex(p=>p.slug===postSlug)-1 : -1;
  $: postDetailNextIdx = postSlug ? postsData.findIndex(p=>p.slug===postSlug)+1 : -1;

  function handleKeys(e: KeyboardEvent){
    if(view==='deckDetail'){
      if(e.key==='ArrowRight' || e.key===' '){ e.preventDefault(); deckNext(); }
      if(e.key==='ArrowLeft'){ e.preventDefault(); deckPrev(); }
      if(e.key==='Escape') nav('decks');
    }
    if(view==='postDetail'){
      if(e.key==='ArrowRight' || e.key===' '){ e.preventDefault(); postNext(); }
      if(e.key==='ArrowLeft'){ e.preventDefault(); postPrev(); }
      if(e.key==='Escape') nav('posts');
    }
  }

  $: filteredDecks = decksData.filter(d=>{
    if(deckTag!=='all' && !d.type.toLowerCase().includes(deckTag)) return false;
    if(deckSearch && !(d.title+d.desc+d.tags.join(' ')).toLowerCase().includes(deckSearch.toLowerCase())) return false;
    return true;
  });
  $: filteredPosts = (()=>{ postsTick; return postsData.filter(p=>{
    if(postTag!=='all' && p.tag!==postTag) return false;
    if(postSearch && !(p.title+p.desc+p.tag).toLowerCase().includes(postSearch.toLowerCase())) return false;
    return true;
  }); })();
  $: filteredVideos = videosData.filter(v=>{
    if(videoFilter==='video' && v.isShort) return false;
    if(videoFilter==='short' && !v.isShort) return false;
    if(videoSearch && !(v.title+v.desc+v.tag).toLowerCase().includes(videoSearch.toLowerCase())) return false;
    return true;
  });
  $: videosLong = filteredVideos.filter(v=>!v.isShort);
  $: videosShort = filteredVideos.filter(v=>v.isShort);
  $: filteredBlog = [...blogData].filter(b=>{
    if(blogTag!=='all' && !b.tags.some(t=>t.toLowerCase().includes(blogTag.toLowerCase()))) return false;
    if(blogSearch && !(b.title+b.excerpt+b.tags.join(' ')).toLowerCase().includes(blogSearch.toLowerCase())) return false;
    return true;
  }).sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
  $: blogFeatured = filteredBlog.find(b=>b.featured) || filteredBlog[0];
  $: blogRest = filteredBlog.filter(b=>b!==blogFeatured);
  $: if(view) setTimeout(setupReveal, 280);

  let postsTouchStartX = 0;
  let postsDragDx = 0;
  let postsIsDragging = false;
  let postsMouseDown = false;
  let postsMouseStartX = 0;
  let scrollProgress = 0;
  let heroParallaxY = 0;
  function handlePostsTouchStart(e: TouchEvent){ postsTouchStartX = e.touches[0].clientX; postsIsDragging = true; postsDragDx = 0; }
  function handlePostsTouchMove(e: TouchEvent){ if(!postsIsDragging) return; postsDragDx = e.touches[0].clientX - postsTouchStartX; }
  function handlePostsTouchEnd(e: TouchEvent){
    const dx = e.changedTouches[0].clientX - postsTouchStartX;
    postsIsDragging = false; postsDragDx = 0;
    if(Math.abs(dx)>40){ if(dx<0 && postsCarIdx < filteredPosts.length-1) postsCarIdx++; else if(dx>0 && postsCarIdx>0) postsCarIdx--; }
  }
  function handlePostsMouseDown(e: MouseEvent){ postsMouseDown = true; postsMouseStartX = e.clientX; postsIsDragging = true; postsDragDx = 0; }
  function handlePostsMouseMove(e: MouseEvent){ if(!postsMouseDown) return; postsDragDx = e.clientX - postsMouseStartX; }
  function handlePostsMouseUp(e: MouseEvent){
    if(!postsMouseDown) return; postsMouseDown = false; postsIsDragging = false;
    const dx = e.clientX - postsMouseStartX; postsDragDx = 0;
    if(Math.abs(dx)>40){ if(dx<0 && postsCarIdx < filteredPosts.length-1) postsCarIdx++; else if(dx>0 && postsCarIdx>0) postsCarIdx--; }
  }
  function handleScroll(){
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    scrollProgress = max > 0 ? (window.scrollY / max) * 100 : 0;
    heroParallaxY = Math.min(window.scrollY * 0.12, 24);
    const hdr = document.getElementById('site-header');
    if(hdr){ hdr.classList.toggle('shadow-lg', window.scrollY>8); hdr.style.backdropFilter = `blur(${Math.min(12 + window.scrollY*0.02, 20)}px)`; }
  }
  function setupReveal(){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el=> obs.observe(el));
  }
</script>

<div id="boot-screen" class="fixed inset-0 z-[100] overflow-hidden" style="background:{theme==='dark'?'#050608':'#f4f4f5'};opacity:{booted?0:1};pointer-events:{booted?'none':'auto'};">
  <!-- ambient backdrop -->
  <div class="boot-orb boot-orb-1" aria-hidden="true"></div>
  <div class="boot-orb boot-orb-2" aria-hidden="true"></div>

  <div class="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
    <div class="flex flex-col items-center gap-6 text-center">
      <div class="boot-logo-wrap">
        <img src="./assets/images/khoirlabs.dev/logo-khoirlabs.jpeg" class="boot-logo" alt="Khoirlabs"/>
      </div>
      <div class="flex flex-col items-center gap-3">
        <h1 class="fraunces text-[36px] sm:text-[52px] md:text-[60px] font-medium leading-[0.95] tracking-tight boot-title">
          khoirlabs
        </h1>
        <div class="boot-line" aria-hidden="true"></div>
        <p class="mono text-[11px] sm:text-xs tracking-[0.18em] {theme==='dark'?'text-zinc-400':'text-zinc-600'} boot-fade">
          loading experiences
        </p>
      </div>
    </div>
  </div>
</div>

<svelte:window on:keydown={handleKeys} on:scroll={handleScroll} />
<div id="scroll-progress" class="fixed top-0 left-0 h-[2px] bg-[#FF6B35] z-[60] pointer-events-none" style="width:{scrollProgress}%"></div>
<header id="site-header" class="sticky top-0 z-40 border-b border-zinc-800/60 bg-[#09090b]/60 backdrop-blur-xl">
  <nav class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
    <button on:click={()=> nav('home')} class="flex items-center gap-3">
      <img src="./assets/images/khoirlabs.dev/logo-khoirlabs.jpeg" class="w-8 h-8 rounded-full border border-zinc-800 bg-white object-contain p-1" alt="Khoirlabs"/>
      <div class="flex flex-col leading-none text-left">
        <span class="text-[15px] font-semibold tracking-tight">khoirlabs</span>
        <span class="hidden sm:block text-[11px] text-zinc-400">Software Engineer, Tech Educator/Mentor, Security-First</span>
      </div>
    </button>
    <div class="flex items-center gap-3">
      <div class="hidden md:flex items-center gap-6">
        {#each ['home','about','decks','videos','posts','blog'] as v}
          <button on:click={()=> nav(v)} class="relative px-1 py-1.5 text-[13px] {view===v || view.startsWith(v+'/') ? 'font-semibold text-white' : 'font-medium text-zinc-400 hover:text-white'}">{v[0].toUpperCase()+v.slice(1)}{#if view===v || view.startsWith(v+'/')}<span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF6B35] rounded-full"></span>{/if}</button>
        {/each}
      </div>
      <button on:click={toggleTheme} aria-label="Toggle theme" class="w-9 h-9 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 grid place-items-center text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition">
        {#if theme==='dark'}☾{:else}☀{/if}
      </button>
      <button class="md:hidden w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 grid place-items-center text-zinc-400" on:click={()=> document.getElementById('mobile-menu')?.classList.toggle('hidden')}>☰</button>
    </div>
  </nav>
    <div id="mobile-menu" class="hidden md:hidden border-t border-zinc-800 bg-[#0a0a0a] px-4 py-3">
    {#each ['home','about','decks','videos','posts','blog'] as v}
      <button on:click={()=> nav(v)} class="block w-full text-left px-3 py-2 rounded-lg {view===v?'bg-white text-black':'text-zinc-400'}">{v}</button>
    {/each}
  </div>
</header>

<main class="mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-6">
  {#key view}
  <div in:fade={{duration:220, delay:30}} out:fade={{duration:150}}>
  {#if view==='home'}
    <section class="flex flex-col items-center gap-10 text-center reveal in">
      <div class="flex flex-col items-center gap-6 max-w-3xl reveal in">
        <h1 class="fraunces text-[42px] sm:text-[56px] md:text-[68px] font-medium leading-[0.9]">Mobile developer,<br><span class="italic">every framework.</span></h1>
        <p class="max-w-[560px] text-zinc-400">5+ years building complete products — Mobile (Flutter, SwiftUI & Kotlin), Backend systems & APIs, AI-powered. Product-driven, end-to-end, and system-thinking.</p>
        <div class="flex flex-wrap justify-center gap-2 max-w-[560px] reveal">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium"><img src="https://cdn.simpleicons.org/android/3DDC84" class="w-4 h-4" alt=""> Android</span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium"><img src="https://cdn.simpleicons.org/kotlin/7F52FF" class="w-4 h-4" alt=""> Kotlin</span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium"><img src="https://cdn.simpleicons.org/flutter/02569B" class="w-4 h-4" alt=""> Flutter</span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium"><img src="https://cdn.simpleicons.org/react/61DAFB" class="w-4 h-4" alt=""> React Native</span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium"><img src="https://cdn.simpleicons.org/swift/F05138" class="w-4 h-4" alt=""> Swift</span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium"><img src="https://cdn.simpleicons.org/dart/0175C2" class="w-4 h-4" alt=""> Dart</span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium"><img src="https://cdn.simpleicons.org/firebase/DD2C00" class="w-4 h-4" alt=""> Firebase</span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium"><img src="https://cdn.simpleicons.org/ionic/3880FF" class="w-4 h-4" alt=""> Ionic</span>
        </div>
      </div>
      <div class="flex flex-col items-center gap-4 reveal">
        <div class="relative parallax" style="transform: translateY({heroParallaxY}px)"><div class="w-[168px] h-[168px] rounded-full overflow-hidden border border-zinc-800 p-[5px] bg-zinc-900"><img src="./assets/images/khoirlabs.dev/khoiron-rois.jpeg" class="w-full h-full object-cover rounded-full object-top" alt="Khoiron Rois"/></div><div class="absolute -bottom-2 -right-2 bg-white text-black mono text-[10px] font-bold tracking-widest px-2 py-1 rounded-full border border-zinc-200">5+ YRS</div></div>
        <div class="text-center"><div class="text-[15px] font-semibold">Khoiron Rois</div><div class="mono text-[11px] tracking-wide text-zinc-500">Android · iOS · Flutter · React Native</div></div>
        <div class="flex flex-wrap justify-center gap-3 mt-1">
          <a href="https://play.google.com/store/apps/dev?id=8721309729295189926" target="_blank" class="inline-flex items-center gap-3 bg-white text-black rounded-xl px-4 py-2.5 hover:bg-zinc-100 transition min-w-[148px]"><img src="https://cdn.simpleicons.org/googleplay/000000" class="w-5 h-5" alt=""><span class="flex flex-col leading-none text-left"><span class="mono text-[9px] tracking-[0.14em] uppercase font-semibold text-zinc-500">Apps on</span><span class="text-[13px] font-semibold -mt-0.5">Google Play</span></span></a>
          <a href="https://apps.apple.com/developer/khoirlabs" target="_blank" class="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-2.5 hover:bg-zinc-800 transition min-w-[148px]"><img src="https://cdn.simpleicons.org/appstore/FFFFFF" class="w-5 h-5" alt=""><span class="flex flex-col leading-none text-left"><span class="mono text-[9px] tracking-[0.14em] uppercase font-semibold text-zinc-400">Apps on the</span><span class="text-[13px] font-semibold -mt-0.5">App Store</span></span></a>
          <a href="https://github.com/roiskhoiron" target="_blank" class="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-2.5 hover:bg-zinc-800 transition min-w-[148px]"><img src="https://cdn.simpleicons.org/github/FFFFFF" class="w-5 h-5" alt=""><span class="flex flex-col leading-none text-left"><span class="mono text-[9px] tracking-[0.14em] uppercase font-semibold text-zinc-400">Code on</span><span class="text-[13px] font-semibold -mt-0.5">GitHub</span></span></a>
        </div>
        <button on:click={()=> nav('blog')} class="mono text-[12px] text-zinc-400 hover:text-white inline-flex items-center gap-1.5 mt-1 transition">Or read the blog <span>→</span></button>
      </div>
    </section>
    <section class="flex flex-col gap-10 mt-20 md:mt-24 reveal" id="recent">
      <div class="flex flex-col gap-2"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Recent</span><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><h2 class="fraunces text-[30px] sm:text-[36px] font-medium leading-none tracking-tight">Latest from the workshop.</h2><div class="flex items-center gap-2 overflow-x-auto scrollbar-none"><button on:click={()=> nav('blog')} class="whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium border bg-white text-black border-white">All <span class="opacity-60 ml-1">9</span></button><button on:click={()=> nav('blog')} class="whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium border border-zinc-800 text-zinc-400">Blog <span class="opacity-60 ml-1">3</span></button><button on:click={()=> nav('posts')} class="whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium border border-zinc-800 text-zinc-400">Carousels <span class="opacity-60 ml-1">3</span></button><button on:click={()=> nav('decks')} class="whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium border border-zinc-800 text-zinc-400">Decks <span class="opacity-60 ml-1">3</span></button></div></div></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 hover:border-zinc-700 transition cursor-pointer" on:click={()=> openBlog('four-repos-to-a-monorepo')}><div class="mono text-[11px] tracking-widest uppercase text-zinc-500">Jun 21, 2026 — Blog</div><h3 class="text-[16px] font-semibold leading-5">From four repos to a monorepo</h3><p class="text-[13px] leading-5 text-zinc-400 line-clamp-3">Consolidating four byte-identical app repos into one shared core plus thin app shells, the expo-router and Metro problems it surfaced.</p><span class="mono text-[11px] text-zinc-300 mt-2 inline-flex gap-1">Read post <span class="group-hover:translate-x-0.5 transition">→</span></span></article>
        <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 transition cursor-pointer" on:click={()=> openBlog('shipping-then-listening')}><div class="mono text-[11px] tracking-widest uppercase text-zinc-500">Jun 20, 2026 — Blog</div><h3 class="text-[16px] font-semibold leading-5">Shipping, then listening</h3><p class="text-[13px] leading-5 text-zinc-400 line-clamp-3">The first round of real tester feedback and the small, high-leverage fixes it produced.</p><span class="mono text-[11px] text-zinc-300 mt-2 inline-flex gap-1">Read post →</span></article>
        <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 transition cursor-pointer" on:click={()=> openBlog('the-play-store-gauntlet')}><div class="mono text-[11px] tracking-widest uppercase text-zinc-500">Jun 19, 2026 — Blog</div><h3 class="text-[16px] font-semibold leading-5">The Play Store gauntlet</h3><p class="text-[13px] leading-5 text-zinc-400 line-clamp-3">Everything between a finished app and a live listing: store assets, data safety, content rating.</p><span class="mono text-[11px] text-zinc-300 mt-2 inline-flex gap-1">Read post →</span></article>
        <article class="group relative flex flex-col rounded-2xl border border-zinc-800 bg-[#1a1a1e] overflow-hidden hover:border-zinc-700 transition cursor-pointer" on:click={()=> openPost('save-claude-tokens-rtk-caveman')}><div class="h-[140px] bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-zinc-900 flex items-center justify-center p-6"><div class="rounded-xl bg-white text-black px-4 py-3 mono text-[11px] leading-4 font-medium shadow-xl max-w-[220px]">Cut Your Claude Bill By 90%<br><span class="text-zinc-500 font-normal">Two tiny tools, one habit.</span></div></div><div class="p-5 flex flex-col gap-2"><div class="mono text-[11px] tracking-widest uppercase text-zinc-500">May 18, 2026 — Carousel</div><h3 class="text-[15px] font-semibold leading-5">Cut Your Claude Bill By 90%</h3><p class="text-[13px] leading-5 text-zinc-400">RTK filters bash output, Caveman compresses replies.</p></div></article>
        <article class="group relative flex flex-col rounded-2xl border border-zinc-800 bg-[#1a1a1e] overflow-hidden hover:border-zinc-700 transition cursor-pointer" on:click={()=> openPost('css-container-queries')}><div class="h-[140px] bg-gradient-to-br from-emerald-600/20 via-teal-500/10 to-zinc-900 flex items-center justify-center p-6"><div class="rounded-xl bg-white text-black px-4 py-3 mono text-[11px] font-medium shadow-xl">Components That<br>Scale Like Images</div></div><div class="p-5 flex flex-col gap-2"><div class="mono text-[11px] tracking-widest uppercase text-zinc-500">May 15, 2026 — Carousel</div><h3 class="text-[15px] font-semibold leading-5">Components That Scale Like Images</h3><p class="text-[13px] leading-5 text-zinc-400">Container queries plus an em cascade.</p></div></article>
        <article class="group relative flex flex-col rounded-2xl border border-zinc-800 bg-[#1a1a1e] overflow-hidden hover:border-zinc-700 transition cursor-pointer" on:click={()=> openPost('cron-jobs-in-five-minutes')}><div class="h-[140px] bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-zinc-900 flex items-center justify-center p-6"><div class="rounded-xl bg-zinc-900 border border-zinc-700 text-white px-4 py-3 mono text-[11px] font-medium">cron_jobs.sh<br><span class="text-zinc-400">* * * * *</span></div></div><div class="p-5 flex flex-col gap-2"><div class="mono text-[11px] tracking-widest uppercase text-zinc-500">May 15, 2026 — Carousel</div><h3 class="text-[15px] font-semibold leading-5">Cron Jobs in Five Minutes</h3><p class="text-[13px] leading-5 text-zinc-400">Five asterisks, one command.</p></div></article>
        <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 transition cursor-pointer" on:click={()=> openDeck('save-claude-tokens-rtk-caveman')}><div class="mono text-[11px] tracking-widest uppercase text-zinc-500">May 18, 2026 — Deck</div><h3 class="text-[16px] font-semibold leading-5 flex items-center gap-2"><span class="w-5 h-5 rounded bg-white text-black grid place-items-center text-[10px]">◧</span> Cut Your Claude Bill By 90%</h3><p class="text-[13px] leading-5 text-zinc-400">A short editorial deck on saving Claude tokens.</p><span class="mono text-[11px] text-zinc-300 mt-1">Open deck →</span></article>
        <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 transition cursor-pointer" on:click={()=> openDeck('cron-jobs-101')}><div class="mono text-[11px] tracking-widest uppercase text-zinc-500">May 15, 2026 — Deck</div><h3 class="text-[16px] font-semibold leading-5 flex items-center gap-2"><span class="w-5 h-5 rounded bg-amber-400 text-black grid place-items-center text-[10px]">◧</span> Cron Jobs, Explained</h3><p class="text-[13px] leading-5 text-zinc-400">The mental model, syntax, three real examples.</p><span class="mono text-[11px] text-zinc-300 mt-1">Open deck →</span></article>
        <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 transition cursor-pointer" on:click={()=> openDeck('css-container-queries')}><div class="mono text-[11px] tracking-widest uppercase text-zinc-500">May 15, 2026 — Deck</div><h3 class="text-[16px] font-semibold leading-5 flex items-center gap-2"><span class="w-5 h-5 rounded bg-emerald-400 text-black grid place-items-center text-[10px]">◧</span> Container Queries & The Em Cascade</h3><p class="text-[13px] leading-5 text-zinc-400">Components that scale uniformly using cqi and em.</p><span class="mono text-[11px] text-zinc-300 mt-1">Open deck →</span></article>
      </div>
    </section>
    <section id="about-section" class="flex flex-col gap-8 mt-16 md:mt-20 border-t border-zinc-800 pt-12 md:pt-16">
      <div class="flex flex-col gap-2"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">About</span><div class="grid md:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-12 items-start"><h2 class="fraunces text-[28px] sm:text-[34px] md:text-[38px] font-medium leading-[0.95] tracking-tight">Hi, I'm Khoiron — 5+ years building complete products, not just apps.</h2><div class="flex flex-col gap-4 text-[14px] leading-6 text-zinc-400"><p>Software Engineer — Mobile (Flutter, SwiftUI & Kotlin), Backend & APIs, AI-powered. Product-driven, end-to-end, system-thinking. Based in Yogyakarta, building for enterprise (AI Care, Callink) and teaching via BIT House.</p><div class="flex gap-3"><button on:click={()=> nav('about')} class="inline-flex items-center justify-center rounded-full bg-white text-black text-xs font-semibold px-5 py-2.5 hover:bg-zinc-100 transition">Read the full story</button><a href="mailto:rois.khoiron@gmail.com" class="inline-flex items-center justify-center rounded-full border border-zinc-800 text-xs font-medium px-5 py-2.5 hover:border-zinc-700 hover:text-white transition">Get in touch</a></div></div></div></div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col gap-4"><h3 class="font-semibold">Focus areas</h3><div class="grid grid-cols-1 gap-3 text-sm text-zinc-400"><div><span class="text-white font-medium">Product-driven engineering</span> — why before code.</div><div><span class="text-white font-medium">End-to-end scalability</span> — mobile + APIs that grow.</div><div><span class="text-white font-medium">AI-powered integration</span> — intelligent UX.</div></div></div>
        <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col gap-4"><h3 class="font-semibold">Experience</h3><div class="flex flex-col gap-3 text-sm"><div class="flex justify-between"><span class="text-zinc-300">Mobile Developer</span><span class="mono text-xs text-zinc-500">Nov 2023 — Now</span></div><div class="text-xs text-zinc-500">Digital Sekuriti Indonesia · Yogyakarta</div><div class="flex justify-between"><span class="text-zinc-400">Mobile Developer — Product Bridge</span><span class="mono text-xs text-zinc-500">Feb 2022 — Nov 2023</span></div><div class="text-xs text-zinc-500">Digital Sekuriti Indonesia · South Jakarta</div><div class="flex justify-between"><span class="text-zinc-400">Coding Tutor — Edukoding</span><span class="mono text-xs text-zinc-500">Jul 2024 — Jul 2025</span></div></div></div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 border border-zinc-800 rounded-2xl bg-zinc-900/30 p-4 sm:p-6">
        <div class="flex flex-col gap-1 border-r border-zinc-800 pr-4"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Based</span><span class="text-sm font-medium">Yogyakarta, Indonesia</span><span class="text-xs text-zinc-500">GMT+7 · Remote first</span></div>
        <div class="flex flex-col gap-1 border-r border-zinc-800 pr-4"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Working with</span><span class="text-sm font-medium">WFO, Hybrid or Remote</span><span class="text-xs text-zinc-500">Product + engineering</span></div>
        <div class="flex flex-col gap-1 border-r border-zinc-800 pr-4"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Stack</span><span class="text-sm font-medium">Kotlin, Swift, Dart, TypeScript</span><span class="text-xs text-zinc-500">Android · Flutter · RN</span></div>
        <div class="flex flex-col gap-1"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Side projects</span><span class="text-sm font-medium">Security, AI Product and Education</span><span class="text-xs text-zinc-500">Printama · Tools</span></div>
      </div>
    </section>
  {:else if view==='decks'}
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Decks</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium tracking-tight leading-none">Presentation Library</h1>
        <p class="text-[14px] leading-6 text-zinc-400 max-w-2xl">Open any deck in fullscreen mode. Each presentation now runs on a shared slide engine, which keeps the visual language, keyboard controls, and navigation consistent across topics. <span class="text-zinc-500 mono text-xs ml-2">{filteredDecks.length} decks</span></p>
      </div>
      <div class="sticky top-[65px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-zinc-800/60 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div class="flex items-center gap-2 flex-1 max-w-xl">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input bind:value={deckSearch} placeholder="Search decks — try 'claude', 'cron', 'cube'" class="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"/>
          </div>
          <select bind:value={deckTag} class="hidden sm:flex bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2.5 text-xs text-zinc-400 focus:outline-none"><option value="all">All</option><option value="editorial">Editorial</option><option value="spotlight">Spotlight</option><option value="presentation">Presentation</option></select>
        </div>
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div class="flex gap-1.5">
            <button on:click={()=> deckTag='all'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {deckTag==='all'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">All</button>
            <button on:click={()=> deckTag='editorial'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {deckTag==='editorial'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">Editorial</button>
            <button on:click={()=> deckTag='spotlight'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {deckTag==='spotlight'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">Spotlight</button>
            <button on:click={()=> deckTag='presentation'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {deckTag==='presentation'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">Presentation</button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {#each filteredDecks as d}
          <article on:click={()=> openDeck(d.slug)} class="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/60 transition cursor-pointer">
            <div class="h-[132px] bg-gradient-to-br {d.color} flex flex-col justify-between p-4">
              <div class="flex items-center justify-between"><span class="mono text-[10px] tracking-widest uppercase bg-black/40 backdrop-blur text-white/80 px-2 py-1 rounded-full">{d.type}</span><span class="mono text-[10px] bg-white text-black px-2 py-1 rounded-full font-semibold">{d.slides} slides</span></div>
              <div class="mono text-[11px] text-white/60">{d.lang} · {d.date}</div>
            </div>
            <div class="p-5 flex flex-col gap-2 flex-1">
              <h3 class="text-[16px] font-semibold leading-5 line-clamp-2 group-hover:text-white">{d.title}</h3>
              <div class="flex gap-1.5 flex-wrap">{#each d.tags as t}<span class="mono text-[10px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">{t}</span>{/each}</div>
              <p class="text-[13px] leading-5 text-zinc-400 line-clamp-3">{d.desc}</p>
              <span class="mono text-[11px] text-zinc-300 mt-1 inline-flex gap-1">Open deck <span class="group-hover:translate-x-0.5 transition">→</span></span>
            </div>
          </article>
        {/each}
      </div>
      {#if filteredDecks.length===0}<div class="flex flex-col items-center justify-center gap-3 py-16 border border-dashed border-zinc-800 rounded-2xl"><span class="mono text-xs tracking-widest uppercase text-zinc-600">No decks found</span><p class="text-sm text-zinc-500">Try another keyword.</p></div>{/if}
    </div>
  {:else if view==='deckDetail' && deckSlug}
    {@const deck = decksData.find(d=>d.slug===deckSlug)}
    {@const slides = deckSlides[deckSlug] || []}
    {@const cur = slides[deckIdx]}
    <div class="fixed inset-0 z-50 bg-black flex flex-col" in:fade={{duration:200}} out:fade={{duration:150}}>
      <!-- top bar — identik vanilla -->
      <div class="h-[56px] shrink-0 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur flex items-center justify-between px-4 sm:px-6">
        <div class="flex items-center gap-3">
          <button on:click={()=> nav('decks')} class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700">← Exit</button>
          <span class="hidden sm:inline mono text-[11px] tracking-widest uppercase text-zinc-600">Presentation</span>
          <span class="hidden md:inline text-sm font-semibold truncate max-w-[280px]">{deck?.title}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="mono text-xs text-zinc-500">{deckIdx+1} / {slides.length}</span>
          <div class="hidden sm:flex items-center gap-1">
            <button on:click={deckPrev} class="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 grid place-items-center">‹</button>
            <button on:click={deckNext} class="w-8 h-8 rounded-full bg-white text-black hover:bg-zinc-100 grid place-items-center">›</button>
          </div>
          <button on:click={requestDeckFullscreen} class="hidden sm:inline-flex items-center gap-1 mono text-xs border border-zinc-800 rounded-full px-3 py-1.5 text-zinc-400 hover:text-white">⛶ Fullscreen</button>
        </div>
      </div>
      <!-- stage — layout-aware, sama seperti vanilla renderDeck() -->
      <div class="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-auto bg-gradient-to-br from-[#0a0a0a] via-[#0f0f12] to-[#0a0a0a]">
        <div id="deck-stage" class="w-full max-w-5xl aspect-[16/9] bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl flex relative">
          {#key deckIdx}
          <div class="flex-1 flex" in:fade={{duration:180}}>
          {#if cur}
            {#if cur.layout==='cover'}
              <div class="flex-1 grid md:grid-cols-2">
                <div class="p-8 sm:p-10 flex flex-col justify-center gap-4 bg-zinc-900">
                  <span class="mono text-[11px] tracking-[0.16em] uppercase text-amber-400">{cur.subtitle}</span>
                  <h2 class="fraunces text-[28px] sm:text-[36px] font-semibold leading-[1.05] tracking-tight">{cur.title}</h2>
                  <p class="text-[14px] leading-6 text-zinc-400">{cur.message}</p>
                  {#if cur.points}<ul class="mt-2 space-y-1.5">{#each cur.points as p}<li class="flex gap-2 text-[12px] leading-5 text-zinc-300"><span class="text-amber-400 mt-1">•</span><span>{p}</span></li>{/each}</ul>{/if}
                </div>
                <div class="relative bg-gradient-to-br {cur.gradient || 'from-zinc-800 to-zinc-900'} flex items-center justify-center p-6 border-t md:border-t-0 md:border-l border-zinc-800">
                  <div class="w-full max-w-[360px] aspect-[16/10] rounded-xl bg-[#0a0a0a] border border-zinc-800 p-4 flex flex-col gap-2 overflow-hidden">
                    <div class="flex gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span><span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span><span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span></div>
                    <div class="flex-1 rounded-lg bg-gradient-to-br {cur.gradient || 'from-zinc-800 to-zinc-900'} border border-zinc-800/50 mt-2"></div>
                    <span class="mono text-[10px] text-zinc-600">preview • {deckIdx+1}/{slides.length}</span>
                  </div>
                </div>
              </div>
            {:else if cur.layout==='bullets'}
              <div class="flex-1 p-8 sm:p-10 flex flex-col gap-5 bg-zinc-900 overflow-auto">
                <div><span class="mono text-[11px] tracking-[0.16em] uppercase text-indigo-400">{cur.subtitle}</span><h2 class="fraunces text-[26px] sm:text-[32px] font-semibold leading-tight mt-1">{cur.title}</h2><p class="text-[13px] leading-6 text-zinc-400 mt-2">{cur.message}</p></div>
                {#if cur.points}<ul class="grid gap-2.5">{#each cur.points as p}<li class="flex gap-3 bg-zinc-800/60 border border-zinc-800 rounded-xl px-4 py-3 text-[13px] leading-5 text-zinc-300"><span class="text-white">—</span><span>{p}</span></li>{/each}</ul>{/if}
              </div>
            {:else if cur.layout==='code'}
              <div class="flex-1 grid md:grid-cols-[1.1fr_0.9fr] gap-0 bg-zinc-900 overflow-auto">
                <div class="p-8 sm:p-10 flex flex-col gap-4"><span class="mono text-[11px] tracking-[0.16em] uppercase text-emerald-400">{cur.subtitle}</span><h2 class="fraunces text-[24px] font-semibold leading-tight">{cur.title}</h2><p class="text-[13px] leading-6 text-zinc-400">{cur.message}</p>{#if cur.points}<ul class="space-y-1.5">{#each cur.points as p}<li class="mono text-[11px] text-zinc-500">• {p}</li>{/each}</ul>{/if}</div>
                <div class="bg-[#0a0a0a] border-t md:border-t-0 md:border-l border-zinc-800 p-4 flex flex-col"><div class="mono text-[11px] tracking-widest uppercase text-zinc-600 mb-2">code</div><pre class="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-4 mono text-[11px] leading-5 text-zinc-300 overflow-auto whitespace-pre-wrap">{cur.code}</pre></div>
              </div>
            {:else if cur.layout==='cards'}
              <div class="flex-1 p-8 sm:p-10 flex flex-col gap-5 bg-zinc-900 overflow-auto">
                <div><span class="mono text-[11px] tracking-[0.16em] uppercase text-sky-400">{cur.subtitle}</span><h2 class="fraunces text-[24px] font-semibold leading-tight mt-1">{cur.title}</h2><p class="text-[13px] leading-6 text-zinc-400 mt-2">{cur.message}</p></div>
                {#if cur.cards}<div class="grid grid-cols-2 gap-3">{#each cur.cards as c}<div class="rounded-xl border border-zinc-800 bg-zinc-800/40 p-4 flex flex-col gap-1"><span class="w-7 h-7 rounded-full bg-white text-black grid place-items-center text-xs">{c.icon}</span><span class="text-sm font-semibold mt-1">{c.title}</span><span class="text-xs leading-5 text-zinc-400">{c.desc}</span></div>{/each}</div>{/if}
              </div>
            {:else if cur.layout==='split'}
              <div class="flex-1 grid md:grid-cols-2 gap-0 bg-zinc-900 overflow-auto">
                <div class="p-8 flex flex-col gap-4 border-r border-zinc-800"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">{cur.leftTitle}</span><h3 class="fraunces text-[18px] font-semibold">{cur.title}</h3>{#if cur.leftPoints}<ul class="space-y-2">{#each cur.leftPoints as p}<li class="flex gap-2 text-xs leading-5 text-zinc-400"><span class="text-red-400">✕</span>{p}</li>{/each}</ul>{/if}</div>
                <div class="p-8 flex flex-col gap-4 bg-gradient-to-br {cur.gradient || 'from-zinc-800 to-zinc-900'}"><span class="mono text-[11px] tracking-widest uppercase text-emerald-400">{cur.rightTitle}</span><h3 class="fraunces text-[18px] font-semibold text-white">After</h3>{#if cur.rightPoints}<ul class="space-y-2">{#each cur.rightPoints as p}<li class="flex gap-2 text-xs leading-5 text-zinc-300"><span class="text-emerald-400">✓</span>{p}</li>{/each}</ul>{/if}</div>
              </div>
            {/if}
           {/if}
          </div>
          {/key}
         </div>
        <div class="mt-4 flex items-center gap-3">
          <button on:click={deckPrev} class="sm:hidden w-9 h-9 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 grid place-items-center">‹</button>
          <div class="flex items-center gap-1.5">{#each slides as _,i}<span class="h-1.5 rounded-full transition-all {i===deckIdx?'bg-white w-4':'bg-zinc-700 w-1.5'}"></span>{/each}</div>
          <button on:click={deckNext} class="sm:hidden w-9 h-9 rounded-full bg-white text-black grid place-items-center">›</button>
        </div>
      </div>
    </div>
  {:else if view==='videos'}
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Videos</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium tracking-tight leading-none">CodingSkuy on YouTube.</h1>
        <p class="text-[14px] leading-6 text-zinc-400 max-w-2xl">Tutorial panjang 12–22 menit untuk deep dive, dan Shorts 30–60 detik untuk tips cepat. Semua dari <a href="https://www.youtube.com/@codingskuy/videos" target="_blank" class="underline text-zinc-300">youtube.com/@codingskuy</a> — dinamis via RSS/API, fallback statis kalau API diblok. <span class="mono text-xs text-zinc-500 ml-2">{filteredVideos.length} videos</span></p>
      </div>
      <div class="sticky top-[65px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-zinc-800/60 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div class="relative flex-1 max-w-xl">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input bind:value={videoSearch} placeholder="Search videos — 'flutter', 'css', 'ai'" class="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"/>
        </div>
        <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button on:click={()=> videoFilter='all'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {videoFilter==='all'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">All</button>
          <button on:click={()=> videoFilter='video'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {videoFilter==='video'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">Videos</button>
          <button on:click={()=> videoFilter='short'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {videoFilter==='short'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">Shorts</button>
        </div>
      </div>
      {#if videosLong.length>0}
        <div class="flex flex-col gap-3 reveal in">
          <div class="flex items-center gap-2"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Videos</span><span class="flex-1 h-px bg-zinc-800"></span><span class="mono text-xs text-zinc-500">{videosLong.length} · 16:9</span></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each videosLong as v}
              <button on:click={()=> openVideo(v)} class="group text-left rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60 transition cursor-pointer flex flex-col">
                <div class="relative aspect-video bg-zinc-900 overflow-hidden">
                  <img src={v.thumb} alt={v.title} class="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"/>
                  <span class="absolute bottom-2 right-2 bg-black/80 text-white mono text-[10px] px-1.5 py-0.5 rounded">{v.duration}</span>
                  <span class="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition bg-black/30"><span class="w-10 h-10 rounded-full bg-white text-black grid place-items-center text-sm">▶</span></span>
                </div>
                <div class="p-4 flex flex-col gap-1.5 flex-1">
                  <h3 class="text-[14px] font-semibold leading-5 line-clamp-2 group-hover:text-white">{v.title}</h3>
                  <p class="text-[12px] leading-5 text-zinc-400 line-clamp-2">{v.desc}</p>
                  <div class="flex items-center gap-2 mono text-[10px] text-zinc-500 mt-1"><span>{v.date}</span><span>·</span><span>{v.views} views</span><span>·</span><span class="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-full">{v.tag}</span></div>
                </div>
              </button>
            {/each}
          </div>
        </div>
      {/if}
      {#if videosShort.length>0}
        <div class="flex flex-col gap-3 reveal">
          <div class="flex items-center gap-2"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Shorts</span><span class="flex-1 h-px bg-zinc-800"></span><span class="mono text-xs text-zinc-500">{videosShort.length} · 9:16</span></div>
          <div class="flex gap-3 overflow-x-auto scrollbar-none pb-2 snap-x snap-mandatory">
            {#each videosShort as v}
              <button on:click={()=> openVideo(v)} class="shrink-0 w-[180px] snap-start rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition text-left flex flex-col">
                <div class="relative aspect-[9/16] bg-zinc-900 overflow-hidden">
                  <img src={v.thumb} alt={v.title} class="w-full h-full object-cover"/>
                  <span class="absolute bottom-1.5 right-1.5 bg-black/80 text-white mono text-[10px] px-1 py-0.5 rounded">{v.duration}</span>
                  <span class="absolute top-2 left-2 bg-[#FF6B35] text-white mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">SHORT</span>
                </div>
                <div class="p-2.5 flex flex-col gap-1">
                  <h4 class="text-[12px] font-semibold leading-4 line-clamp-2">{v.title}</h4>
                  <span class="mono text-[10px] text-zinc-500">{v.views} · {v.date}</span>
                </div>
              </button>
            {/each}
          </div>
        </div>
      {/if}
      {#if filteredVideos.length===0}<div class="flex flex-col items-center justify-center gap-3 py-16 border border-dashed border-zinc-800 rounded-2xl"><span class="mono text-xs tracking-widest uppercase text-zinc-600">No videos found</span></div>{/if}
    </div>
  {:else if view==='videoDetail' && selectedVideo}
    <div class="fixed inset-0 z-50 bg-black flex flex-col" in:fade={{duration:200}} out:fade={{duration:150}}>
      <div class="h-[56px] shrink-0 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur flex items-center justify-between px-4 sm:px-6">
        <button on:click={()=> nav('videos')} class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white">← All videos</button>
        <span class="mono text-xs text-zinc-500 hidden sm:inline">{selectedVideo.isShort ? 'Short' : 'Video'} · {selectedVideo.duration}</span>
        <a href={"https://www.youtube.com/watch?v="+selectedVideo.id} target="_blank" class="rounded-full bg-white text-black px-3 py-1.5 text-xs font-semibold hover:bg-zinc-100">Open on YouTube →</a>
      </div>
      <div class="flex-1 overflow-auto bg-gradient-to-br from-[#0a0a0a] via-[#0f0f12] to-[#0a0a0a] p-4 sm:p-8 flex flex-col items-center gap-6">
        <div class="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <iframe src={"https://www.youtube.com/embed/"+selectedVideo.id+"?autoplay=0"} title={selectedVideo.title} class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="w-full max-w-4xl flex flex-col gap-2">
          <h1 class="fraunces text-[22px] sm:text-[26px] font-semibold leading-tight">{selectedVideo.title}</h1>
          <div class="flex flex-wrap gap-2 mono text-[11px] text-zinc-500"><span>{selectedVideo.date}</span><span>·</span><span>{selectedVideo.views} views</span><span>·</span><span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{selectedVideo.tag}</span><span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{selectedVideo.isShort?'Short':'Video'}</span></div>
          <p class="text-sm leading-6 text-zinc-400 mt-1">{selectedVideo.desc} — dari <a href="https://www.youtube.com/@codingskuy/videos" target="_blank" class="underline">youtube.com/@codingskuy</a>. Dinamis via RSS/API, fallback ke data statis kalau fetch diblok.</p>
        </div>
      </div>
    </div>
  {:else if view==='posts'}
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Posts</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium tracking-tight leading-none">Instagram Carousel Library</h1>
        <p class="text-[14px] leading-6 text-zinc-400 max-w-2xl">Each post is designed for a 4:5 portrait frame. Tap a cover to open the full carousel. Swipe through 8–10 cards per story. <span class="text-zinc-500 mono text-xs ml-2">{filteredPosts.length} posts</span></p>
      </div>
      <div class="sticky top-[65px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-zinc-800/60 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div class="relative flex-1 max-w-xl">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input bind:value={postSearch} placeholder="Search carousels — 'claude', 'css', 'cube'" class="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"/>
        </div>
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div class="flex gap-1.5">
            <button on:click={()=> {postTag='all'; postsCarIdx=0}} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {postTag==='all'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">All</button>
            <button on:click={()=> {postTag='tips'; postsCarIdx=0}} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {postTag==='tips'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">tips</button>
            <button on:click={()=> {postTag='css'; postsCarIdx=0}} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {postTag==='css'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">css</button>
            <button on:click={()=> {postTag='coding'; postsCarIdx=0}} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {postTag==='coding'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">coding</button>
            <button on:click={()=> {postTag='hobby'; postsCarIdx=0}} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {postTag==='hobby'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">hobby</button>
          </div>
          <button on:click={()=> { postsData.sort(()=>Math.random()-0.5); postsTick++; postsCarIdx=0; }} class="hidden sm:inline-flex mono text-xs border border-zinc-800 rounded-full px-3.5 py-1.5 text-zinc-400 hover:text-white hover:border-zinc-700 whitespace-nowrap">Shuffle ↻</button>
        </div>
      </div>
      <div class="relative">
        <div class="overflow-hidden select-none" style="cursor:{postsIsDragging||postsMouseDown?'grabbing':'grab'}" on:touchstart={handlePostsTouchStart} on:touchmove={handlePostsTouchMove} on:touchend={handlePostsTouchEnd} on:mousedown={handlePostsMouseDown} on:mousemove={handlePostsMouseMove} on:mouseup={handlePostsMouseUp} on:mouseleave={handlePostsMouseUp}>
          <div class="flex gap-4 will-change-transform" style="transition: {postsIsDragging||postsMouseDown ? 'none' : 'transform 420ms cubic-bezier(0.22,1,0.36,1)'}; transform: translateX({-postsCarIdx * 336 + postsDragDx}px);">
            {#each filteredPosts as p}
              <article on:click={()=> openPost(p.slug)} class="shrink-0 w-[320px] aspect-[4/5] rounded-2xl border border-zinc-800 p-5 flex flex-col cursor-pointer {p.color} snap-center" style="scroll-snap-align:center;">
                <div class="flex items-center justify-between"><img src="./assets/images/khoirlabs.dev/logo-khoirlabs.jpeg" class="w-6 h-6 rounded-full {p.color.includes('white')?'':'bg-white'} object-contain p-0.5" alt=""><span class="mono text-[10px] tracking-widest uppercase {p.color.includes('white')?'text-zinc-500':'text-zinc-400'}">{p.accent}</span></div>
                <h3 class="fraunces text-[22px] font-medium mt-4 flex-1 leading-[1.05]">{p.title}</h3>
                <p class="text-[12px] leading-5 {p.color.includes('white')?'text-zinc-600':'text-zinc-400'} line-clamp-3">{p.desc}</p>
                <div class="flex items-center justify-between mt-4"><span class="mono text-[10px] {p.color.includes('white')?'text-zinc-400':'text-zinc-500'}">{p.date}</span><span class="mono text-[11px] flex items-center gap-1 {p.color.includes('white')?'text-black':'text-white'}">tap to open →</span></div>
              </article>
            {/each}
          </div>
        </div>
        <button on:click={()=> { if(postsCarIdx>0) postsCarIdx--; }} class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-9 h-9 rounded-full bg-white text-black shadow-lg grid place-items-center hover:bg-zinc-100 hidden md:grid" style="opacity:{postsCarIdx===0?0.3:1}; pointer-events:{postsCarIdx===0?'none':'auto'}">‹</button>
        <button on:click={()=> { if(postsCarIdx < filteredPosts.length-1) postsCarIdx++; }} class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-9 h-9 rounded-full bg-white text-black shadow-lg grid place-items-center hover:bg-zinc-100 hidden md:grid" style="opacity:{postsCarIdx>=filteredPosts.length-1?0.3:1}; pointer-events:{postsCarIdx>=filteredPosts.length-1?'none':'auto'}">›</button>
      </div>
      <div class="flex items-center justify-center gap-2 mt-3">
        <div class="flex items-center gap-1.5">{#each filteredPosts as _,i}<button on:click={()=> postsCarIdx=i} class="h-1.5 rounded-full transition-all {i===postsCarIdx?'bg-white w-6':'bg-zinc-700 w-1.5'}" aria-label="go {i}"></button>{/each}</div>
        <span class="mono text-[11px] text-zinc-600 ml-2 hidden sm:inline">drag / swipe untuk geser — fokus 1 item per slide</span>
      </div>
      {#if filteredPosts.length===0}<div class="flex flex-col items-center justify-center gap-3 py-16 border border-dashed border-zinc-800 rounded-2xl"><span class="mono text-xs tracking-widest uppercase text-zinc-600">No posts found</span><p class="text-sm text-zinc-500">Try a different tag.</p></div>{/if}
    </div>
  {:else if view==='postDetail' && postSlug}
    {@const meta = postsData.find(p=>p.slug===postSlug)}
    {@const sls = postsSlides[postSlug] || []}
    <div class="fixed inset-0 z-50 bg-black flex flex-col" in:fade={{duration:200}} out:fade={{duration:150}}>
      <div class="h-[56px] shrink-0 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur flex items-center justify-between px-4 sm:px-6">
        <div class="flex items-center gap-3">
          <button on:click={()=> nav('posts')} class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700">← All posts</button>
          <span class="hidden sm:inline mono text-[11px] tracking-widest uppercase text-zinc-600">Instagram Carousel</span>
          <span class="hidden md:inline text-sm font-semibold truncate max-w-[260px]">{meta?.title}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="mono text-xs text-zinc-500">{postIdx+1} / {sls.length}</span>
          <button on:click={()=> alert('Download All PNGs — ZIP of '+sls.length+' slides (mock)')} class="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-black px-3 py-1.5 text-xs font-semibold hover:bg-zinc-100">⬇ Download All PNGs</button>
          <button on:click={requestPostFullscreen} class="hidden sm:inline-flex w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white grid place-items-center">⛶</button>
        </div>
      </div>
      <div class="flex-1 flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#0f0f12] to-[#0a0a0a]">
        <div class="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 gap-4 overflow-auto">
          <div class="w-full max-w-[380px] aspect-[4/5] rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl bg-black">
            <div id="post-stage" class="flex h-full will-change-transform" style="width:{sls.length*100}%; transform:translateX(-{postIdx * (100/sls.length)}%); transition: transform 420ms cubic-bezier(0.22,1,0.36,1)">
              {#each sls as s}
                {@const isWhite = s.theme==='white'}
                <div class="w-full h-full {isWhite?'bg-white text-black':'bg-zinc-900 text-white'} flex flex-col p-6 relative shrink-0" style="width:{100/sls.length}%">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2"><img src="./assets/images/khoirlabs.dev/logo-khoirlabs.jpeg" class="w-6 h-6 rounded-full {isWhite?'':'bg-white'} object-contain p-0.5" alt=""/><span class="text-[11px] font-bold tracking-tight">khoirlabs</span></div>
                    <span class="mono text-[10px] tracking-widest uppercase text-zinc-500">{s.label} {s.num? '· '+s.num: ''}</span>
                  </div>
                  <div class="flex-1 flex flex-col justify-center gap-3 py-6 overflow-auto">
                    <h2 class="fraunces text-[24px] font-semibold leading-[1.1]">{s.title}</h2>
                    <p class="text-[13px] leading-6 {isWhite?'text-zinc-600':'text-zinc-400'}">{s.body}</p>
                    {#if s.bullets}<ul class="space-y-1.5 mt-1">{#each s.bullets as b}<li class="flex gap-2 text-[12px] leading-5 {isWhite?'text-zinc-700':'text-zinc-300'}"><span class="mt-1">•</span><span>{b}</span></li>{/each}</ul>{/if}
                    {#if s.code}<pre class="mt-2 {isWhite?'bg-zinc-900 text-zinc-100 border-zinc-800':'bg-black text-zinc-300 border-zinc-700'} rounded-xl p-3 mono text-[11px] leading-5 overflow-auto whitespace-pre-wrap border">{s.code}</pre>{/if}
                  </div>
                  <div class="flex items-center justify-between pt-4 border-t {isWhite?'border-zinc-200':'border-zinc-800'}">
                    <span class="mono text-[10px] text-zinc-500 flex items-center gap-1"><img src="./assets/images/khoirlabs.dev/{isWhite?'ig-khoirlabs-black-ad89c2c91f.png':'ig-khoirlabs-white-2d8fecd0f2.png'}" class="w-4 h-4 rounded-full" alt=""/>@khoirlabs</span>
                    <span class="mono text-[11px] {isWhite?'text-zinc-900':'text-white'}">{s.num===''?'swipe →':'• • •'}</span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button on:click={postPrev} class="w-9 h-9 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 grid place-items-center hover:text-white">‹</button>
            <div class="flex items-center gap-1.5">{#each sls as _,i}<span class="h-1.5 rounded-full transition-all {i===postIdx?'bg-white w-4':'bg-zinc-700 w-1.5'}"></span>{/each}</div>
            <button on:click={postNext} class="w-9 h-9 rounded-full bg-white text-black grid place-items-center hover:bg-zinc-100">›</button>
          </div>
          <div class="flex gap-2 text-xs mono">
            <button on:click={()=> { if(postDetailPrevIdx>=0) openPost(postsData[postDetailPrevIdx].slug)}} class="text-zinc-500 hover:text-white hidden sm:inline">← Previous</button>
            <span class="text-zinc-700 hidden sm:inline">·</span>
            <button on:click={()=> { if(postDetailNextIdx < postsData.length) openPost(postsData[postDetailNextIdx].slug)}} class="text-zinc-500 hover:text-white hidden sm:inline">Next →</button>
          </div>
        </div>
        <div class="w-full lg:w-[380px] shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-800 bg-zinc-900/30 overflow-auto">
          <div class="p-6 flex flex-col gap-4">
            <div><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">About this carousel</span><h2 class="fraunces text-xl font-medium mt-1">{meta?.title}</h2><p class="text-sm leading-6 text-zinc-400 mt-2">{meta?.desc}</p></div>
            <div class="flex items-center gap-2"><span class="mono text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">{sls.length} slides</span><button on:click={()=> alert('Export ZIP — mock download')} class="mono text-xs border border-zinc-800 rounded-full px-3 py-1.5 text-zinc-400 hover:text-white">Export ZIP →</button></div>
            <div class="h-px bg-zinc-800"></div>
            <div class="flex flex-col gap-2">
              <span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Slide previews</span>
              <div class="grid grid-cols-3 lg:grid-cols-2 gap-2">
                {#each sls as sl,i}
                  <button on:click={()=> postIdx=i} class="aspect-[4/5] rounded-xl border {i===postIdx?'border-white ring-1 ring-white':'border-zinc-800'} overflow-hidden p-2 flex flex-col gap-1 text-left {sl.theme==='white'?'bg-white text-black':'bg-zinc-900 text-white'} transition-all">
                    <span class="mono text-[8px] tracking-widest uppercase {sl.theme==='white'?'text-zinc-500':'text-zinc-500'}">{sl.label} {sl.num}</span>
                    <span class="fraunces text-[11px] font-semibold leading-tight line-clamp-2">{sl.title}</span>
                    <span class="mono text-[9px] {sl.theme==='white'?'text-zinc-600':'text-zinc-400'} line-clamp-2">{(sl.body||'').slice(0,60)}</span>
                  </button>
                {/each}
              </div>
            </div>
            <div class="flex gap-2 pt-2">
              <button on:click={()=> { if(postDetailPrevIdx>=0) openPost(postsData[postDetailPrevIdx].slug)}} class="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-left hover:border-zinc-700"><span class="mono text-[10px] text-zinc-500 block">Previous</span><span class="font-medium text-zinc-300 truncate block">{postDetailPrevIdx>=0 ? postsData[postDetailPrevIdx].title : '—'}</span></button>
              <button on:click={()=> { if(postDetailNextIdx < postsData.length) openPost(postsData[postDetailNextIdx].slug)}} class="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-left hover:border-zinc-700"><span class="mono text-[10px] text-zinc-500 block">Next</span><span class="font-medium text-zinc-300 truncate block">{postDetailNextIdx < postsData.length ? postsData[postDetailNextIdx].title : '—'}</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else if view==='blog'}
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Blog</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium tracking-tight leading-none">Notes from the workshop.</h1>
        <p class="text-[14px] leading-6 text-zinc-400 max-w-2xl">Long-form writing on what I'm learning, building, and breaking. Daily-ish, depending on how the day goes. <span class="mono text-xs text-zinc-500 ml-2">{filteredBlog.length} posts</span></p>
      </div>
      <div class="sticky top-[65px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-zinc-800/60 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div class="relative flex-1 max-w-xl">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input bind:value={blogSearch} placeholder="Search notes — 'monorepo', 'RevenueCat', 'Expo'" class="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"/>
        </div>
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <select bind:value={blogTag} class="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2 text-xs text-zinc-400"><option value="all">All tags</option><option value="mobile">mobile</option><option value="Expo">Expo</option><option value="ai">ai</option></select>
          <div class="hidden sm:flex gap-1.5">
            <button on:click={()=> blogTag='all'} class="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium {blogTag==='all'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">All tags</button>
            <button on:click={()=> blogTag='mobile'} class="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium {blogTag==='mobile'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">mobile</button>
            <button on:click={()=> blogTag='Expo'} class="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium {blogTag==='Expo'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">Expo</button>
            <button on:click={()=> blogTag='ai'} class="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium {blogTag==='ai'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">ai</button>
          </div>
        </div>
      </div>
      <div id="blog-featured" on:click={()=> openBlog(blogFeatured.slug)} class="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-zinc-700 transition cursor-pointer">
        {#if blogFeatured}
          <div class="grid md:grid-cols-[1.3fr_0.7fr] gap-0">
            <div class="p-6 sm:p-8 flex flex-col gap-3">
              <div class="mono text-[11px] tracking-widest uppercase text-zinc-500 flex items-center gap-2"><span class="bg-white text-black px-2 py-1 rounded-full text-[10px] font-bold">Latest</span> {blogFeatured.date} · {blogFeatured.mins} min · {blogFeatured.tags.slice(0,3).join(' / ')}</div>
              <h2 class="fraunces text-[24px] sm:text-[28px] font-medium leading-tight">{blogFeatured.title}</h2>
              <p class="text-[14px] leading-6 text-zinc-400">{blogFeatured.excerpt}</p>
              <button on:click={()=> openBlog(blogFeatured.slug)} class="self-start mt-1 inline-flex items-center gap-1 mono text-xs border border-zinc-800 rounded-full px-4 py-2 hover:border-zinc-700 hover:text-white">Read <span>→</span></button>
            </div>
            <div class="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-zinc-800"><div class="rounded-xl bg-[#0a0a0a] border border-zinc-800 p-4 mono text-xs leading-5 text-zinc-400 max-w-[260px]">“{blogFeatured.excerpt.slice(0,120)}…”<br><span class="text-white font-medium mt-2 block">— workshop note</span></div></div>
          </div>
        {/if}
      </div>
      <div class="flex items-center gap-2"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">More posts</span><span class="flex-1 h-px bg-zinc-800"></span><span class="mono text-xs text-zinc-500">{blogRest.length} more</span></div>
      <div class="flex flex-col divide-y divide-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/20">
        {#each blogRest as b}
          <button on:click={()=> openBlog(b.slug)} class="text-left p-5 hover:bg-zinc-900/50 flex flex-col sm:flex-row sm:items-center gap-3 group">
            <div class="mono text-[11px] text-zinc-500 whitespace-nowrap w-[140px] shrink-0">{b.date} · {b.mins} min</div>
            <div class="flex-1 flex flex-col gap-1"><h3 class="text-[15px] font-semibold leading-5 group-hover:text-white line-clamp-2">{b.title}</h3><p class="text-[13px] leading-5 text-zinc-400 line-clamp-2 hidden sm:block">{b.excerpt}</p><div class="flex gap-1.5 mt-1 flex-wrap">{#each b.tags.slice(0,4) as t}<span class="mono text-[10px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-500">{t}</span>{/each}</div></div>
            <span class="hidden sm:block mono text-xs text-zinc-600 group-hover:text-white shrink-0">Read →</span>
          </button>
        {/each}
      </div>
      {#if filteredBlog.length===0}<div class="flex flex-col items-center justify-center gap-3 py-16 border border-dashed border-zinc-800 rounded-2xl"><span class="mono text-xs tracking-widest uppercase text-zinc-600">No notes found</span></div>{/if}
    </div>
  {:else if view==='blogDetail' && blogSlug}
    {@const b = blogData.find(x=>x.slug===blogSlug)}
    <div class="max-w-5xl mx-auto">
      <button on:click={()=> nav('blog')} class="inline-flex items-center gap-1.5 mono text-xs text-zinc-500 hover:text-white mb-6">← All posts</button>
      <div class="flex flex-col lg:flex-row gap-8">
        <article class="flex-1 min-w-0">
          <div class="mono text-[11px] tracking-widest uppercase text-zinc-500 flex flex-wrap items-center gap-2"><span>{b?.date}</span><span>·</span><span>{b?.mins} min read</span><span>·</span><span>By Khoiron Rois</span><span class="hidden sm:inline">·</span><span class="flex flex-wrap gap-1.5">{#if b}{#each b.tags as t}<span class="mono text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">{t}</span>{/each}{/if}</span></div>
          <h1 class="fraunces text-[32px] sm:text-[40px] font-semibold leading-[1.05] tracking-tight mt-3">{b?.title}</h1>
          <p class="text-[18px] leading-7 text-zinc-300 mt-4">{b?.excerpt}</p>
          <div class="mt-8 flex flex-col gap-8 text-[14px] leading-7 text-zinc-300 prose prose-invert max-w-none">
            {#if blogSlug && blogFull[blogSlug]}
              {#each blogFull[blogSlug].sections as s}
                <section id={s.id} class="scroll-mt-24"><h2 class="fraunces text-[20px] sm:text-[22px] font-semibold leading-tight">{s.title}</h2><div class="mt-3 text-[14px] leading-7">{@html s.body}</div></section>
              {/each}
            {:else}
              <p>{b?.excerpt}</p><p class="mt-4 text-zinc-400">Full article would render here — original at khoirlabs.dev/blog/{blogSlug}. This faithful placeholder keeps the same Fraunces headings, zinc prose, and code styling as the original.</p><section class="mt-6"><h2 class="fraunces text-xl font-medium">Highlights</h2><ul class="list-disc pl-5 mt-3 space-y-1.5 text-zinc-300">{#if b}{#each b.tags as t}<li>{t}</li>{/each}{/if}</ul></section>
            {/if}
          </div>
          <div class="mt-10 flex gap-3 border-t border-zinc-800 pt-6">
            <button on:click={()=> { if(blogDetailPrev) openBlog(blogDetailPrev.slug)}} class="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:bg-zinc-900/60 transition text-left" style="opacity:{blogDetailPrev?1:0.35}; pointer-events:{blogDetailPrev?'auto':'none'}"><span class="mono text-[10px] tracking-widest uppercase text-zinc-500">Previous</span><span class="text-sm font-medium leading-5 mt-1 block">{blogDetailPrev?.title || '—'}</span></button>
            <button on:click={()=> { if(blogDetailNext) openBlog(blogDetailNext.slug)}} class="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:bg-zinc-900/60 transition text-left" style="opacity:{blogDetailNext?1:0.35}; pointer-events:{blogDetailNext?'auto':'none'}"><span class="mono text-[10px] tracking-widest uppercase text-zinc-500">Next</span><span class="text-sm font-medium leading-5 mt-1 block">{blogDetailNext?.title || '—'}</span></button>
          </div>
        </article>
        <aside class="hidden lg:block w-[220px] shrink-0">
          <div class="sticky top-[80px] border border-zinc-800 rounded-2xl bg-zinc-900/20 p-4">
            <span class="mono text-[11px] tracking-widest uppercase text-zinc-500">On this page</span>
            <nav class="mt-3 flex flex-col gap-1.5 text-xs leading-5">
              {#if blogSlug && blogFull[blogSlug]}
                {#each blogFull[blogSlug].sections as s}<a href={"#"+s.id} class="hover:text-white text-zinc-400 transition block">{s.title}</a>{/each}
              {:else}<span class="mono text-xs text-zinc-600">No sections yet</span>{/if}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  {:else if view==='about'}
    <div class="flex flex-col gap-10">
      <!-- hero — Khoiron Rois (acuan khoirlabs.dev/about) -->
      <div class="flex flex-col gap-4 max-w-3xl">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Yogyakarta, Indonesia · rois.khoiron@gmail.com</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium leading-[0.9] tracking-tight">Khoiron Rois.<br><span class="italic text-zinc-400">Software Engineer — Mobile, Backend & AI.</span></h1>
        <p class="text-[14px] leading-7 text-zinc-300">Hi, I'm Khoiron — a Software Engineer who builds <strong class="text-white">complete products, not just apps</strong>. With 5+ years developing iOS and Android using Flutter, SwiftUI & Kotlin, I design robust Backend systems and APIs to ensure apps are scalable, performant, and thoughtful. I work at the intersection of mobile, backend, and AI — transforming ideas into intelligent, data-driven experiences. Product-driven, end-to-end, and system-thinking.</p>
        <div class="flex flex-wrap gap-2">
          <a href="mailto:rois.khoiron@gmail.com" class="rounded-full bg-white text-black px-4 py-1.5 text-xs font-medium">rois.khoiron@gmail.com</a>
          <a href="https://github.com/roiskhoiron" target="_blank" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">GitHub — roiskhoiron</a>
          <a href="https://linkedin.com/in/rois-khoiron" target="_blank" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">LinkedIn — 885 · 950 followers</a>
          <a href="https://roiskhoiron.github.io" target="_blank" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">Portfolio — roiskhoiron.github.io</a>
          <a href="https://youtube.com/@codingskuy" target="_blank" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">YouTube — CodingSkuy!</a>
          <a href="https://wa.me/6282334626354" target="_blank" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">WhatsApp</a>
        </div>
      </div>

      <!-- counters — real Khoiron stats -->
      <div class="grid grid-cols-3 gap-4 border border-zinc-800 rounded-2xl bg-zinc-900/30 p-4 sm:p-6">
         <a href="https://www.linkedin.com/in/rois-khoiron/details/experience/" target="_blank" rel="noopener noreferrer" class="flex flex-col gap-1 border-r border-zinc-800 pr-4 no-underline group">
          <span class="fraunces text-2xl font-semibold group-hover:text-[#FF6B35] transition">5+</span>
          <span class="mono text-[11px] tracking-widest uppercase text-zinc-500 group-hover:text-[#FF6B35] transition">Years engineering</span>
          <span class="text-xs text-zinc-500 leading-4">Mobile (Flutter, SwiftUI, Kotlin) + Backend & APIs.</span>
        </a>
        <a href="https://www.linkedin.com/in/rois-khoiron/details/projects/" target="_blank" rel="noopener noreferrer" class="flex flex-col gap-1 border-r border-zinc-800 pr-4 no-underline group">
          <span class="fraunces text-2xl font-semibold group-hover:text-[#FF6B35] transition">22+</span>
          <span class="mono text-[11px] tracking-widest uppercase text-zinc-500 group-hover:text-[#FF6B35] transition">Projects delivered</span>
          <span class="text-xs text-zinc-500 leading-4">End-to-end — mobile to backend.</span>
        </a>
         <a href="https://www.linkedin.com/in/rois-khoiron/details/certifications/" target="_blank" rel="noopener noreferrer" class="flex flex-col gap-1 no-underline group">
           <span class="fraunces text-2xl font-semibold group-hover:text-[#FF6B35] transition">33</span>
           <span class="mono text-[11px] tracking-widest uppercase text-zinc-500 group-hover:text-[#FF6B35] transition">Licenses & Certificates</span>
           <span class="text-xs text-zinc-500 leading-4">Professional skill certifications.</span>
         </a>
      </div>

      <!-- focus areas — 4 pillars -->
      <div class="flex flex-col gap-4">
        <h2 class="fraunces text-[24px] font-semibold">How I build</h2>
        <p class="text-sm text-zinc-400 -mt-2">Product-driven, scalable, AI-powered, and system-thinking — acuan design Focus areas.</p>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"><h3 class="font-semibold text-sm">Product-driven engineering</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Understanding the why and user problem before writing code.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"><h3 class="font-semibold text-sm">End-to-end scalability</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Clean mobile codebases backed by reliable API development — architectures that evolve with growth.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"><h3 class="font-semibold text-sm">AI-powered integration</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Intelligent features to enhance UX and decision-making. Bridging mobile with Data Science & AI ecosystem.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"><h3 class="font-semibold text-sm">System thinking</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Performance optimization, clean architecture, data-driven decisions — building adaptive, smart software for the AI era.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"><h3 class="font-semibold text-sm">Cross-platform delivery</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Flutter, SwiftUI, Kotlin — picking the right stack for the team that has to maintain it.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"><h3 class="font-semibold text-sm">Constrained device & real-time</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Security, real-time transactions, BLE/USB/MQTT/FCM — reliability over features.</p></div>
        </div>
      </div>

      <!-- experience — LinkedIn rois-khoiron/details/experience -->
      <div class="flex flex-col gap-6">
        <h2 class="fraunces text-[24px] font-semibold">Experience</h2>
        <p class="text-sm text-zinc-400 -mt-4">Mobile & backend — Digital Sekuriti Indonesia + teaching + volunteer (linkedin.com/in/rois-khoiron).</p>
        <div class="flex flex-col gap-4">
          {#each [
            {date:'Nov 2023 — Now', loc:'Yogyakarta, Indonesia', role:'Mobile Developer', company:'Digital Sekuriti Indonesia', bullets:['Mobile (Flutter, SwiftUI & Kotlin) — secure, scalable mobile architecture','Backend systems & APIs for enterprise apps — AI Care & Callink','End-to-end product engineering — mobile to backend to system design','In production — serving enterprise users (health & messaging)','885 connections · 950 followers'], tags:['Flutter','SwiftUI','Kotlin','Firebase','Security','Real-Time']},
            {date:'Feb 2022 — Nov 2023', loc:'South Jakarta, Indonesia', role:'Mobile Developer — Product Bridge', company:'Digital Sekuriti Indonesia', bullets:['Bridging product ↔ dev — analyzing specs & requests','Explaining technical tasks for Mobile Engineer team','Determining application system architecture & database structure','Product-driven insight into tech stack'], tags:['Flutter','Kotlin','System Design','APIs']},
            {date:'Jul 2024 — Jul 2025', loc:'Bali, Indonesia', role:'Coding Tutor — Edukoding', company:'PT Bangun Inovasi Teknologi (BIT House)', bullets:['Teaching kids basics of programming via games & web projects','Logic, algorithms, HTML/CSS/JS in fun, interactive way','Creating materials, feedback, problem-solving skills'], tags:['HTML','CSS','JavaScript','Scratch','Teaching']},
            {date:'Oct 2025 — Jan 2026', loc:'Yogyakarta, Indonesia', role:'JCH Volunteer', company:'JCH by Coding Collective', bullets:['Volunteer — community contribution'], tags:['Volunteer','Community']},
            {date:'Apr 2023 — Present', loc:'Virginia, USA (Remote)', role:'Contributor', company:'SWUSHD Kitchens', bullets:['Remote collaboration — portfolio project'], tags:['Remote','Product']}
          ] as exp, i}
            <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5 flex gap-4">
              <span class="hidden sm:grid w-8 h-8 rounded-full bg-zinc-800 text-white place-items-center text-xs font-mono shrink-0">{i+1}</span>
              <div class="flex-1 flex flex-col gap-2">
                <div class="flex flex-wrap gap-2 mono text-[11px] text-zinc-500"><span>{exp.date}</span><span>·</span><span>{exp.loc}</span></div>
                <h3 class="font-semibold text-[15px]">{exp.role}</h3>
                <span class="mono text-xs text-zinc-500">{exp.company}</span>
                <ul class="mt-1 list-disc pl-4 space-y-1 text-xs leading-5 text-zinc-400">{#each exp.bullets as bl}<li>{bl}</li>{/each}</ul>
                <div class="flex flex-wrap gap-1.5 mt-2">{#each exp.tags as t}<span class="mono text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">{t}</span>{/each}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- technical skills — Khoiron stack -->
      <div class="flex flex-col gap-4">
        <h2 class="fraunces text-[24px] font-semibold">Technical skills</h2>
        <p class="text-sm text-zinc-400 -mt-2">Mobile is centre of mass — backed by backend & AI.</p>
        <div class="grid sm:grid-cols-2 gap-4 text-xs">
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2"><span class="mono text-[11px] uppercase text-zinc-500">Mobile engineering</span><div class="flex flex-wrap gap-1.5"><span class="px-2 py-1 rounded-full bg-zinc-800">Flutter</span><span class="px-2 py-1 rounded-full bg-zinc-800">SwiftUI</span><span class="px-2 py-1 rounded-full bg-zinc-800">Kotlin</span><span class="px-2 py-1 rounded-full bg-zinc-800">Dart</span><span class="px-2 py-1 rounded-full bg-zinc-800">C++</span><span class="px-2 py-1 rounded-full bg-zinc-800">TypeScript</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2"><span class="mono text-[11px] uppercase text-zinc-500">Backend & APIs</span><div class="flex flex-wrap gap-1.5"><span class="px-2 py-1 rounded-full bg-zinc-800">REST APIs</span><span class="px-2 py-1 rounded-full bg-zinc-800">Firebase</span><span class="px-2 py-1 rounded-full bg-zinc-800">Node.js</span><span class="px-2 py-1 rounded-full bg-zinc-800">System Design</span><span class="px-2 py-1 rounded-full bg-zinc-800">Scalability</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2"><span class="mono text-[11px] uppercase text-zinc-500">AI & Data</span><div class="flex flex-wrap gap-1.5"><span class="px-2 py-1 rounded-full bg-zinc-800">AI Integration</span><span class="px-2 py-1 rounded-full bg-zinc-800">Data Science</span><span class="px-2 py-1 rounded-full bg-zinc-800">Performance</span><span class="px-2 py-1 rounded-full bg-zinc-800">Clean Architecture</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2"><span class="mono text-[11px] uppercase text-zinc-500">Featured work</span><div class="flex flex-wrap gap-1.5"><span class="px-2 py-1 rounded-full bg-zinc-800">HappyExpress Logistics</span><span class="px-2 py-1 rounded-full bg-zinc-800">AI Care</span><span class="px-2 py-1 rounded-full bg-zinc-800">Callink</span><span class="px-2 py-1 rounded-full bg-zinc-800">Nikah Saja</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2"><span class="mono text-[11px] uppercase text-zinc-500">Tools</span><div class="flex flex-wrap gap-1.5"><span class="px-2 py-1 rounded-full bg-zinc-800">Git</span><span class="px-2 py-1 rounded-full bg-zinc-800">Figma</span><span class="px-2 py-1 rounded-full bg-zinc-800">IntelliJ</span><span class="px-2 py-1 rounded-full bg-zinc-800">Rive Studio</span><span class="px-2 py-1 rounded-full bg-zinc-800">Dart</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2"><span class="mono text-[11px] uppercase text-zinc-500">Certifications</span><div class="flex flex-wrap gap-1.5"><span class="px-2 py-1 rounded-full bg-zinc-800">IDCamp</span><span class="px-2 py-1 rounded-full bg-zinc-800">BEKRAF</span><span class="px-2 py-1 rounded-full bg-zinc-800">Dicoding MADE</span><span class="px-2 py-1 rounded-full bg-zinc-800">SQL</span><span class="px-2 py-1 rounded-full bg-zinc-800">Sololearn</span></div></div>
        </div>
      </div>

      <!-- featured — CodingSchool (content loaded live from codingskuy.github.io/codingschool) -->
      <a href="https://codingskuy.github.io/codingschool/" target="_blank" rel="noopener noreferrer" class="group block rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 no-underline transition hover:border-zinc-700">
        <span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Featured — Open Source</span>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1 min-w-0">
            <h3 class="fraunces text-xl font-semibold group-hover:text-[#FF6B35] transition">CodingSchool</h3>
            <p class="text-xs mono text-zinc-500">AI Engineering Mentor for OpenCode</p>
            <p class="text-sm leading-6 text-zinc-400 mt-2">The free OpenCode plugin that teaches, reviews, and grows you through real software projects. MIT licensed — built by khoirlabs.</p>
            <div class="flex items-center gap-2 mt-3">
              <span class="mono text-[9px] text-zinc-600">npm i @codingskuy/coding-school</span>
            </div>
          </div>
          {#if csLoading}
            <div class="hidden sm:flex flex-col gap-2 mono text-xs text-zinc-500">
              <span class="px-3 py-2 rounded-xl bg-zinc-800 w-[90px] animate-pulse">—</span>
              <span class="px-3 py-2 rounded-xl bg-zinc-800 w-[90px] animate-pulse">—</span>
              <span class="px-3 py-2 rounded-xl bg-zinc-800 w-[90px] animate-pulse">—</span>
            </div>
          {:else if csStats}
            <div class="hidden sm:flex flex-col gap-2 mono text-xs text-zinc-500" in:fade={{duration:240}} out:fade={{duration:160}}>
              <span class="px-3 py-2 rounded-xl bg-zinc-800 text-white">{csStats.stars.toLocaleString()}+ stars</span>
              <span class="px-3 py-2 rounded-xl bg-zinc-800 text-white">{csStats.contributors}+ contributors</span>
              <span class="px-3 py-2 rounded-xl bg-zinc-800 text-white">{csStats.installs.toLocaleString()}+ installs</span>
            </div>
          {/if}
        </div>
      </a>

      <div class="grid sm:grid-cols-2 gap-4">
        <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5">
          <span class="mono text-[11px] uppercase text-zinc-500">Contact</span>
          <p class="text-sm mt-2"><a href="mailto:rois.khoiron@gmail.com" class="underline">rois.khoiron@gmail.com</a> · <a href="https://wa.me/6282334626354" class="underline">WA +62 823-3462-6354</a></p>
          <p class="text-xs text-zinc-500 mt-1">Yogyakarta, Indonesia · Typically responds within 24h · Portfolio: roiskhoiron.github.io</p>
          <p class="text-xs text-zinc-500">GitHub roiskhoiron · 16 followers · Dart, C++, TypeScript · Top: flutter_chat_realtime</p>
        </div>
        <a href="https://www.linkedin.com/in/rois-khoiron/details/recommendations/" target="_blank" rel="noopener" class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5 block no-underline hover:border-zinc-700 transition">
          <span class="mono text-[11px] uppercase text-zinc-500">Outside the work & Recommendations</span>
          <p class="text-xs leading-5 text-zinc-400 mt-2">Arman Maulana: "Rois is very kind, critical in a positive way, strong problem-solving, skilled technically." · yosa angela: "Rois memastikan alur kerja jelas, komunikatif, semangat belajar hal baru."</p>
          <div class="flex gap-2 mt-3"><span class="mono text-xs border border-zinc-800 rounded-full px-3 py-1.5 text-zinc-500">See the decks →</span><span class="mono text-xs border border-zinc-800 rounded-full px-3 py-1.5 text-zinc-500">Read the blog →</span></div>
        </a>
      </div>
    </div>
  {/if}
  </div>
  {/key}
</main>

<footer class="border-t border-zinc-800/80 bg-[#09090b]/70" data-od-id="footer">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col md:flex-row justify-between gap-8">
    <div class="flex flex-col gap-3 max-w-sm"><div class="flex items-center gap-2"><img src="./assets/images/khoirlabs.dev/logo-khoirlabs.jpeg" class="w-6 h-6 rounded-full bg-white object-contain p-1" alt=""><span class="text-sm font-semibold">khoirlabs</span></div><p class="text-xs leading-5 text-zinc-500">Software Engineer — Mobile (Flutter, SwiftUI & Kotlin), Backend & APIs, AI-powered. Product-driven, end-to-end, system-thinking.</p><div class="flex items-center gap-3 mono text-[11px] text-zinc-500"><span>© 2026 khoirlabs</span><span class="w-1 h-1 rounded-full bg-zinc-700"></span><a href="https://wa.me/082334626354" target="_blank" rel="noopener" class="hover:text-white">Contact</a></div></div>
    <div class="flex gap-10 sm:gap-14 text-xs"><div class="flex flex-col gap-2"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Explore</span><button on:click={()=> nav('home')} class="text-left text-zinc-400 hover:text-white">Home</button><button on:click={()=> nav('about')} class="text-left text-zinc-400 hover:text-white">About</button><button on:click={()=> nav('blog')} class="text-left text-zinc-400 hover:text-white">Blog</button></div><div class="flex flex-col gap-2"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Library</span><button on:click={()=> nav('decks')} class="text-left text-zinc-400 hover:text-white">Presentation Library</button><button on:click={()=> nav('posts')} class="text-left text-zinc-400 hover:text-white">Instagram Posts</button><button on:click={()=> nav('decks')} class="text-left text-zinc-400 hover:text-white">Decks</button></div><div class="flex flex-col gap-2"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Connect</span><a href="https://github.com/roiskhoiron" target="_blank" rel="noopener" class="text-zinc-400 hover:text-white">GitHub</a><a href="https://www.instagram.com/codingskuy_/" target="_blank" rel="noopener" class="text-zinc-400 hover:text-white">Instagram</a><a href="https://www.linkedin.com/in/rois-khoiron/" target="_blank" rel="noopener" class="text-zinc-400 hover:text-white">LinkedIn</a></div></div>
  </div>
</footer>
