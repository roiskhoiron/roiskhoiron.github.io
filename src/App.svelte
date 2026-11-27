<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { decksData, deckSlides, postsData, postsSlides, blogData, blogFull, videosData } from './lib/data';
  import type { Video } from './lib/data';
  import logoKhoirlabs from './assets/logo-192.webp';
  import avatar336 from './assets/avatar-336.webp';
  import avatar504 from './assets/avatar-504.webp';
  import icAndroid from './assets/icons/android.svg';
  import icKotlin from './assets/icons/kotlin.svg';
  import icFlutter from './assets/icons/flutter.svg';
  import icReact from './assets/icons/react.svg';
  import icSwift from './assets/icons/swift.svg';
  import icDart from './assets/icons/dart.svg';
  import icFirebase from './assets/icons/firebase.svg';
  import icIonic from './assets/icons/ionic.svg';
  import icAppStore from './assets/icons/appstore.svg';
  import icGitHub from './assets/icons/github.svg';
  import ParticleField from './lib/ParticleField.svelte';
  import CommandPalette from './lib/CommandPalette.svelte';
  import { buildFeed, fmtDate, type FeedKind } from './lib/feed';

  const stack = [
    ['Android', icAndroid], ['Kotlin', icKotlin], ['Flutter', icFlutter], ['React Native', icReact],
    ['Swift', icSwift], ['Dart', icDart], ['Firebase', icFirebase], ['Ionic', icIonic]
  ];
  const pages = ['home','about','decks','videos','posts','blog'];
  // which top-level nav item a view belongs to (detail views highlight their parent)
  const navParent: Record<string,string> = { deckDetail:'decks', postDetail:'posts', blogDetail:'blog', videoDetail:'videos' };
  let menuOpen = false;
  let paletteOpen = false;
  let recentKind: 'all' | FeedKind = 'all';
  const recentTabs: ['all' | FeedKind, string][] = [['all','All'],['blog','Blog'],['post','Carousels'],['deck','Decks']];
  const feed = buildFeed();
  // filter chips come from the content itself, so they can never point at an empty result
  const deckTypes = [...new Set(decksData.map(d=> d.type.split(' ')[0].toLowerCase()))];
  const postTags = [...new Set(postsData.map(p=> p.tag))];
  const blogTags = [...new Set(blogData.flatMap(b=> b.tags))].slice(0, 6);
  // send the curious to an article whose full text is published, not just an excerpt
  const blogPick = blogData.find(b=> b.featured) ?? blogData[0];
  const feedCount: Record<string, number> = { all: feed.length, blog: blogData.length, post: feed.filter(f=>f.kind==='post').length, deck: feed.filter(f=>f.kind==='deck').length };
  // in "All", a topic published as both deck and carousel shows once (newest format wins)
  $: recentItems = (recentKind==='all' ? feed.filter((f,i)=> feed.findIndex(g=>g.title===f.title)===i) : feed.filter(f=>f.kind===recentKind)).slice(0,6);
  type Resume = { kind: FeedKind; slug: string; title: string; idx: number; total: number };
  let resume: Resume | null = null;

  let view: string = 'home';
  let deckSlug: string | null = null;
  let postSlug: string | null = null;
  let blogSlug: string | null = null;
let booted = false;
  let bootSkipped = false;
  let bootProgress = 0;
  let theme: 'dark' | 'light' = 'dark';
  let deckIdx = 0;
  let postIdx = 0;
  let deckTag = 'all';
  let postTag = 'all';
  let blogTag = 'all';
  let videoFilter: 'all'|'video'|'short'|'live' = 'all';
  let deckSearch = '';
  let postSearch = '';
  let blogSearch = '';
  let videoSearch = '';
  let postsCarIdx = 0;
  let postsTick = 0;
  let selectedVideo: Video | null = null;
  let csStats: { installs: number; stars: number; contributors: number } | null = null;
  let csLoading = false;
  onMount(() => {
    // theme class is already set by the inline script in index.html (no flash)
    theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    try { resume = JSON.parse(localStorage.getItem('kl-resume') || 'null'); } catch {}
    handleHash();
    runBootSequence();
    window.addEventListener('hashchange', handleHash);
    handleScroll();
    setupGravity();
    return () => window.removeEventListener('hashchange', handleHash);
  });

  // Brand intro plays once per browser session and only on the home page —
  // deep links (a shared deck/post) and return visits go straight to content.
  function runBootSequence(){
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try { seen = sessionStorage.getItem('kl-booted') === '1'; sessionStorage.setItem('kl-booted','1'); } catch {}
    if (reduce || seen || view !== 'home'){
      bootProgress = 100; booted = true; bootSkipped = true;
      return;
    }
    const t0 = performance.now(), dur = 700;
    const step = () => {
      const k = Math.min((performance.now() - t0) / dur, 1);
      bootProgress = (1 - Math.pow(1 - k, 3)) * 100;
      if (k < 1) requestAnimationFrame(step); else booted = true;
    };
    requestAnimationFrame(step);
  }

  function applyTheme(t: 'dark'|'light') {
    theme = t;
    document.documentElement.classList.add('theme-transition');
    setTimeout(()=> document.documentElement.classList.remove('theme-transition'), 520);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t==='dark' ? '#09090b' : '#fcfcfc');
    document.documentElement.classList.toggle('dark', t==='dark');
    document.documentElement.classList.toggle('light', t==='light');
    document.documentElement.style.colorScheme = t;
    try { localStorage.setItem('theme-preference', t); } catch {}
  }
  function toggleTheme(){
    applyTheme(theme==='dark'?'light':'dark');
  }

  // only the About page shows these numbers, so only fetch there — and cache for the session
  // (the unauthenticated GitHub API allows just 60 requests/hour per visitor IP)
  let csRequested = false;
  $: if (view === 'about' && !csRequested) { csRequested = true; loadCodingSchoolStats(); }
  async function loadCodingSchoolStats(){
    try { const c = sessionStorage.getItem('kl-cs-stats'); if (c) { csStats = JSON.parse(c); return; } } catch {}
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
      try { if (npm && res) sessionStorage.setItem('kl-cs-stats', JSON.stringify(csStats)); } catch {}
    }catch{
      csStats = { installs: 0, stars: 0, contributors: 0 };
    }finally{
      clearTimeout(to);
      csLoading = false;
    }
  }

  let lastHash = '';
  function handleHash(){
    const prevHash = lastHash; lastHash = location.hash;
    const [head, slug] = (location.hash.replace('#','') || 'home').split('/');
    let next = 'home';
    if (slug) {
      if (head==='decks' && deckSlides[slug]) { if (deckSlug!==slug) deckIdx = resumeIdx('deck', slug); deckSlug=slug; next='deckDetail'; }
      else if (head==='posts' && postsSlides[slug]) { if (postSlug!==slug) postIdx = resumeIdx('post', slug); postSlug=slug; next='postDetail'; }
      else if (head==='blog' && blogData.some(b=>b.slug===slug)) { blogSlug=slug; next='blogDetail'; }
      else if (head==='videos') { const v=videosData.find(x=>x.id===slug); if(v){ selectedVideo=v; next='videoDetail'; } }
      else if (pages.includes(head)) next = head;
    } else if (pages.includes(head)) next = head;
    view = next;
    menuOpen = false;
    if (prevHash !== lastHash && booted) window.scrollTo({top:0, behavior:'instant' as ScrollBehavior});
  }
  // every navigation goes through the URL hash, so Back/Forward, deep links and
  // the command palette all share one code path
  function go(hash:string){
    if (location.hash.replace('#','') === hash) { handleHash(); window.scrollTo({top:0, behavior:'smooth'}); }
    else location.hash = hash;
  }
  function nav(v:string){ go(v); }
  function openDeck(slug:string){ go('decks/'+slug); }
  function openPost(slug:string){ go('posts/'+slug); }
  function openBlog(slug:string){ go('blog/'+slug); }
  function openVideo(v: Video){ go('videos/'+v.id); }
  function openFeed(kind: FeedKind, slug: string){ kind==='deck' ? openDeck(slug) : kind==='post' ? openPost(slug) : openBlog(slug); }

  // "Continue where you left off": remember the last deck / carousel / article and slide
  function resumeIdx(kind: FeedKind, slug: string){ return resume && resume.kind===kind && resume.slug===slug && resume.idx < resume.total-1 ? resume.idx : 0; }
  function saveResume(r: Resume){ resume = r; try { localStorage.setItem('kl-resume', JSON.stringify(r)); } catch {} }
  function clearResume(){ resume = null; try { localStorage.removeItem('kl-resume'); } catch {} }
  $: if (booted && view==='deckDetail' && deckSlug) saveResume({ kind:'deck', slug:deckSlug, title: decksData.find(d=>d.slug===deckSlug)?.title ?? deckSlug, idx:deckIdx, total:deckSlides[deckSlug].length });
  $: if (booted && view==='postDetail' && postSlug) saveResume({ kind:'post', slug:postSlug, title: postsData.find(d=>d.slug===postSlug)?.title ?? postSlug, idx:postIdx, total:postsSlides[postSlug].length });
  $: if (booted && view==='blogDetail' && blogSlug) saveResume({ kind:'blog', slug:blogSlug, title: blogData.find(d=>d.slug===blogSlug)?.title ?? blogSlug, idx:0, total:1 });

  // tab title follows the content, so history entries and shared tabs are readable
  $: pageTitle = view==='deckDetail' ? decksData.find(d=>d.slug===deckSlug)?.title
    : view==='postDetail' ? postsData.find(d=>d.slug===postSlug)?.title
    : view==='blogDetail' ? blogData.find(d=>d.slug===blogSlug)?.title
    : view==='videoDetail' ? selectedVideo?.title
    : view==='home' ? '' : view[0].toUpperCase()+view.slice(1);
  $: if (typeof document !== 'undefined') document.title = pageTitle ? `${pageTitle} — khoirlabs` : 'Khoiron Rois — Software Engineer · khoirlabs';

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
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? '');
    if ((e.key==='k' && (e.metaKey || e.ctrlKey)) || (e.key==='/' && !typing && !paletteOpen)) { e.preventDefault(); paletteOpen = !paletteOpen; return; }
    if (paletteOpen || typing) return;
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

  $: filteredDecks = [...decksData].filter(d=>{
    if(deckTag!=='all' && !d.type.toLowerCase().includes(deckTag)) return false;
    if(deckSearch && !(d.title+d.desc+d.tags.join(' ')).toLowerCase().includes(deckSearch.toLowerCase())) return false;
    return true;
  }).reverse();
  $: filteredPosts = (()=>{ postsTick; return [...postsData].filter(p=>{
    if(postTag!=='all' && p.tag!==postTag) return false;
    if(postSearch && !(p.title+p.desc+p.tag).toLowerCase().includes(postSearch.toLowerCase())) return false;
    return true;
  }).reverse(); })();
  $: filteredVideos = videosData.filter(v=>{
    if(videoFilter==='video' && v.isShort) return false;
    if(videoFilter==='short' && !v.isShort) return false;
    if(videoFilter==='live' && !v.isLive) return false;
    if(videoSearch && !(v.title+v.desc+v.tag).toLowerCase().includes(videoSearch.toLowerCase())) return false;
    return true;
  });
  $: videosLong = filteredVideos.filter(v=>!v.isShort);
  $: videosShort = filteredVideos.filter(v=>v.isShort);
  $: videosLive = filteredVideos.filter(v=>v.isLive);
  $: filteredBlog = [...blogData].filter(b=>{
    if(blogTag!=='all' && !b.tags.some(t=>t.toLowerCase().includes(blogTag.toLowerCase()))) return false;
    if(blogSearch && !(b.title+b.excerpt+b.tags.join(' ')).toLowerCase().includes(blogSearch.toLowerCase())) return false;
    return true;
  }).sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
  $: blogFeatured = filteredBlog.find(b=>b.featured) || filteredBlog[0];
  $: blogRest = filteredBlog.filter(b=>b!==blogFeatured);
  $: if(view && booted) setTimeout(()=> { setupReveal(); tagGravity(); }, bootSkipped ? 60 : 280);

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
  // GSAP-perf: batch scroll reads/writes in rAF to avoid layout thrashing.
  // Prefer transform/opacity only; avoid per-frame backdropFilter writes (paint) —
  // toggle class instead and let CSS handle blur once. For frequently updated
  // y (heroParallaxY) a GSAP quickTo() would be ideal:
  //   const yTo = gsap.quickTo(parallaxEl, "y", {duration:0.4, ease:"power3"});
  //   yTo(y); // reuses single tween, no new tween per scroll
  let scrollRaf = 0;
  let lastProgress = 0;
  function handleScroll(){
    if(scrollRaf) return;
    scrollRaf = requestAnimationFrame(()=>{
      scrollRaf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      // only write when delta > 0.15% to reduce paint
      if(Math.abs(p - lastProgress) > 0.15){ scrollProgress = p; lastProgress = p; }
      heroParallaxY = Math.min(window.scrollY * 0.08, 18);
      const hdr = document.getElementById('site-header');
      if(hdr){
        const scrolled = window.scrollY > 8;
        hdr.classList.toggle('is-scrolled', scrolled);
        hdr.classList.toggle('shadow-lg', scrolled);
        // GSAP-perf: removed per-frame backdropFilter write — CSS handles blur via .is-scrolled
      }
    });
  }
  function setupReveal(){
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){ document.querySelectorAll('.reveal:not(.in)').forEach(el=> el.classList.add('in')); return; }
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in');
          obs.unobserve(e.target);
          (e.target as HTMLElement).addEventListener('transitionend', ()=> (e.target as HTMLElement).style.willChange='auto', {once:true});
        }
      });
    }, {threshold:0.14, rootMargin:'0px 0px -56px 0px'});
    // auto-stagger cards inside same grid — cap to 3 steps to keep Emil restrained
    document.querySelectorAll('.reveal:not(.in)').forEach(el=> {
      const parent = el.parentElement;
      if(parent && parent.classList.contains('grid') && el.tagName.toLowerCase()==='article'){
        const idx = Array.from(parent.children).indexOf(el);
        const step = Math.min(idx, 2); // 0,1,2 only
        (el as HTMLElement).style.transitionDelay = `${55 + step*55}ms`;
      }
      obs.observe(el);
    });
  }

  // cursor gravity for every UI component — fluid pull toward cursor
  let gravityRaf = 0;
  let gMouseX = -9999, gMouseY = -9999;
  function setupGravity(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return; // off on touch
    gravityOn = true; tagGravity();
    window.addEventListener('mousemove', (e)=> {
      gMouseX = e.clientX; gMouseY = e.clientY;
      if (!gravityRaf) gravityRaf = requestAnimationFrame(applyGravity);
    }, { passive: true });
    window.addEventListener('mouseleave', ()=> {
      gMouseX = -9999; gMouseY = -9999;
      if (!gravityRaf) gravityRaf = requestAnimationFrame(applyGravity);
    });
  }
  let gravityEls: Element[] = [];
  let gravityOn = false;
  function tagGravity(){
    if (!gravityOn) return;
    gravityEls = Array.from(document.querySelectorAll('article.group, .platform-btn, #blog-featured, #about-section .rounded-2xl, .grid .rounded-2xl.border'));
    gravityEls.forEach(el=> el.classList.add('gravity-item'));
  }
  function applyGravity(){
    gravityRaf = 0;
    const els = gravityEls;
    if (!els.length) return;
    const vh = window.innerHeight;
    const radius = 340;
    const maxPull = 9; // px
    for (const el of els) {
      const r = (el as HTMLElement).getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = gMouseX - cx;
      const dy = gMouseY - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < radius && dist > 4) {
        const falloff = Math.pow(1 - dist / radius, 1.9);
        const pull = falloff * maxPull;
        const nx = (dx / dist) * pull;
        const ny = (dy / dist) * pull;
        const scale = 1 + falloff * 0.015;
        (el as HTMLElement).style.setProperty('--gx', nx.toFixed(2) + 'px');
        (el as HTMLElement).style.setProperty('--gy', ny.toFixed(2) + 'px');
        (el as HTMLElement).style.setProperty('--g-scale', scale.toFixed(3));
        // subtle orange glow intensity for border
        (el as HTMLElement).style.setProperty('--g-glow', falloff.toFixed(2));
      } else {
        (el as HTMLElement).style.setProperty('--gx', '0px');
        (el as HTMLElement).style.setProperty('--gy', '0px');
        (el as HTMLElement).style.setProperty('--g-scale', '1');
        (el as HTMLElement).style.setProperty('--g-glow', '0');
      }
    }
  }
</script>

{#if !bootSkipped}
<div id="boot-screen" class="fixed inset-0 z-[100] overflow-hidden {booted?'boot-exit':''}" style="background:{theme==='dark'?'#050608':'#fcfcfc'};opacity:{booted?0:1};pointer-events:{booted?'none':'auto'};">
  <div class="boot-halo" aria-hidden="true"></div>
  <div class="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
    <div class="flex flex-col items-center gap-7 text-center">
      <div class="boot-logo-wrap">
        <span class="boot-ring" aria-hidden="true"></span>
        <img src={logoKhoirlabs} width="96" height="96" class="boot-logo" alt="Khoirlabs"/>
      </div>
      <div class="flex flex-col items-center gap-3">
        <div class="fraunces text-[34px] sm:text-[46px] font-medium leading-[0.95] tracking-tight boot-title" style="color:{theme==='dark'?'#fafafa':'#18181b'}">
          khoirlabs
        </div>
        <p class="mono text-[10px] tracking-[0.20em] uppercase boot-sub" style="color:{theme==='dark'?'#a1a1aa':'#71717a'}">
          Software · Product · Workshop
        </p>
        <div class="boot-track" aria-hidden="true">
          <div class="boot-fill" style="transform: scaleX({bootProgress/100})"></div>
        </div>
        <div class="boot-meta flex items-center gap-2 mono text-[10px] tracking-[0.14em]" style="color:{theme==='dark'?'#71717a':'#a1a1aa'}">
          <span>{Math.round(bootProgress)}%</span>
          <span class="w-1 h-1 rounded-full" style="background: currentColor; opacity:.5"></span>
          <span>loading</span>
        </div>
      </div>
    </div>
  </div>
  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 mono text-[10px] tracking-[0.16em] boot-meta" style="color:{theme==='dark'?'#3f3f46':'#a1a1aa'}">
    roiskhoiron.github.io
  </div>
</div>
{/if}

<a href="#main-content" class="skip-link">Skip to content</a>
<svelte:window on:keydown={handleKeys} on:scroll={handleScroll} />
<CommandPalette bind:open={paletteOpen} {theme} on:go={(e)=> go(e.detail)} on:theme={toggleTheme} />
<div id="scroll-progress" class="fixed top-0 left-0 h-[2px] bg-[#FF6B35] z-[60] pointer-events-none w-full origin-left" style="transform: scaleX({scrollProgress/100})"></div>

<!-- global nebula veil — scroll-oriented, covers whole site -->
<div class="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
  <ParticleField {theme} />
</div>
<div class="fixed inset-0 pointer-events-none z-0" aria-hidden="true" style="background: radial-gradient(ellipse 80% 60% at 50% {Math.min(30 + scrollProgress * 0.4, 70)}%, rgba(255,107,53,0.018) 0%, transparent 70%); opacity: 0.55"></div>
<header id="site-header" class="sticky top-0 z-40 border-b border-zinc-800/60 bg-[#09090b]/60 backdrop-blur-xl">
  <nav class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
    <a href="#home" on:click|preventDefault={()=> nav('home')} class="flex items-center gap-3" aria-label="khoirlabs — home">
      <img src={logoKhoirlabs} width="32" height="32" class="w-8 h-8 rounded-full border border-zinc-800 logo-bg object-contain p-1" alt=""/>
      <div class="flex flex-col leading-none text-left">
        <span class="text-[15px] font-semibold tracking-tight">khoirlabs</span>
        <span class="hidden lg:block text-[11px] text-zinc-400">Software Engineer, Tech Educator/Mentor, Security-First</span>
      </div>
    </a>
    <div class="flex items-center gap-2.5">
      <div class="hidden md:flex items-center gap-1.5">
        {#each pages as v}
          {@const on = (navParent[view] ?? view) === v}
          <a href="#{v}" on:click|preventDefault={()=> nav(v)} aria-current={on ? 'page' : undefined} class="relative px-3 py-2 rounded-full text-[13px] transition {on ? 'font-semibold text-white bg-zinc-800' : 'font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60'}">{v[0].toUpperCase()+v.slice(1)}{#if on}<span class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF6B35] rounded-full"></span>{/if}</a>
        {/each}
      </div>
      <button on:click={()=> paletteOpen = true} aria-label="Search the site" aria-keyshortcuts="Meta+K Control+K" class="h-9 min-w-9 justify-center rounded-full bg-zinc-900 border border-zinc-800 flex items-center gap-2 px-2.5 sm:pl-3 sm:pr-2 text-zinc-400 hover:border-zinc-700 hover:text-white transition shrink-0">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <span class="hidden sm:inline text-[12px]">Search</span>
        <kbd class="hidden sm:inline mono text-[10px] border border-zinc-700 rounded-md px-1.5 py-0.5">⌘K</kbd>
      </button>
      <button on:click={toggleTheme} aria-label="Switch to {theme==='dark'?'light':'dark'} mode" class="theme-toggle w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 grid place-items-center text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition shrink-0">
        {#if theme==='dark'}☾{:else}☀{/if}
      </button>
      <button aria-label="{menuOpen?'Close':'Open'} navigation menu" aria-expanded={menuOpen} aria-controls="mobile-menu" class="md:hidden w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 grid place-items-center text-zinc-400 shrink-0" on:click={()=> menuOpen = !menuOpen}>{menuOpen ? '✕' : '☰'}</button>
    </div>
  </nav>
  {#if menuOpen}
  <div id="mobile-menu" class="md:hidden border-t border-zinc-800 bg-[#0a0a0a] px-4 py-3 space-y-1" transition:fly={{y:-6, duration:180}}>
    {#each pages as v}
      {@const on = (navParent[view] ?? view) === v}
      <a href="#{v}" on:click|preventDefault={()=> { menuOpen = false; nav(v); }} aria-current={on ? 'page' : undefined} class="block w-full text-left px-3 py-2.5 rounded-xl text-sm {on?'bg-white text-black font-semibold':'text-zinc-400 hover:bg-zinc-900 hover:text-white'}">{v[0].toUpperCase()+v.slice(1)}</a>
    {/each}
  </div>
  {/if}
</header>

<main id="main-content" class="mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-6">
  {#key view}
  <div in:fly={{y:8, duration:320, delay:40, opacity:0}} out:fade={{duration:160}}>
  {#if view==='home'}
    <section class="hero-ek relative flex flex-col items-center gap-8 sm:gap-10 text-center scroll-section" id="section-hero">
      <div class="relative flex flex-col items-center gap-5 max-w-[640px]">
        <h1 class="fraunces text-[38px] sm:text-[54px] md:text-[64px] font-medium leading-[0.92] tracking-[-0.02em]">Complete products,<br><span class="italic font-[450] text-zinc-300">not just apps.</span></h1>
        <p class="hero-lead max-w-[560px] text-[15px] leading-7 text-zinc-400">5+ years building complete products — Mobile (Flutter, SwiftUI & Kotlin), Backend systems & APIs, AI-powered. Product-driven, end-to-end, and system-thinking.</p>
        <div class="ek-pills flex flex-wrap justify-center gap-2 max-w-[560px]">
          {#each stack as [name, icon]}
            <span class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium"><img src={icon} width="16" height="16" class="w-4 h-4" alt=""> {name}</span>
          {/each}
        </div>
      </div>
      <div class="relative flex flex-col items-center gap-4">
        <div class="ek-avatar relative parallax will-change-transform" style="transform: translate3d(0,{heroParallaxY}px,0)"><div class="w-[168px] h-[168px] rounded-full overflow-hidden border border-zinc-800 p-[5px] bg-zinc-900"><img src={avatar336} srcset="{avatar336} 1x, {avatar504} 2x" width="168" height="168" fetchpriority="high" decoding="async" class="w-full h-full object-cover rounded-full" alt="Khoiron Rois"/></div><div class="absolute -bottom-2 -right-2 bg-white text-black mono text-[10px] font-bold tracking-widest px-2 py-1 rounded-full border border-zinc-200">5+ YRS</div></div>
        <div class="ek-avatar-meta text-center"><div class="text-[15px] font-semibold">Khoiron Rois</div><div class="mono text-[11px] tracking-wide text-zinc-500">Android · iOS · Flutter · React Native</div></div>
        <div class="ek-cta flex flex-wrap justify-center gap-3 mt-1">
          <a href="https://apps.apple.com/developer/khoirlabs" target="_blank" rel="noopener" class="platform-btn inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-2.5 min-w-[148px]"><img src={icAppStore} width="20" height="20" class="w-5 h-5 platform-icon" alt=""><span class="flex flex-col leading-none text-left"><span class="mono text-[9px] tracking-[0.14em] uppercase font-semibold text-zinc-400">Apps on the</span><span class="text-[13px] font-semibold -mt-0.5">App Store</span></span></a>
          <a href="https://github.com/roiskhoiron" target="_blank" rel="noopener" class="platform-btn inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-2.5 min-w-[148px]"><img src={icGitHub} width="20" height="20" class="w-5 h-5 platform-icon" alt=""><span class="flex flex-col leading-none text-left"><span class="mono text-[9px] tracking-[0.14em] uppercase font-semibold text-zinc-400">Code on</span><span class="text-[13px] font-semibold -mt-0.5">GitHub</span></span></a>
        </div>
        {#if resume}
          <div class="ek-cta flex items-center gap-1 mt-1 rounded-full border border-[#FF6B35]/40 bg-[#FF6B35]/10 pl-4 pr-1.5 py-1.5 max-w-[calc(100vw-2rem)]">
            <a href="#{resume.kind==='deck'?'decks':resume.kind==='post'?'posts':'blog'}/{resume.slug}" class="flex items-center gap-2 min-w-0 text-[12px]">
              <span class="mono text-[10px] tracking-[0.14em] uppercase text-[#FF6B35] shrink-0">Continue</span>
              <span class="truncate font-medium">{resume.title}</span>
              {#if resume.total > 1}<span class="mono text-[11px] text-zinc-500 shrink-0">{resume.idx+1}/{resume.total}</span>{/if}
              <span aria-hidden="true">→</span>
            </a>
            <button on:click={clearResume} aria-label="Dismiss" class="w-6 h-6 grid place-items-center rounded-full text-zinc-500 hover:text-white shrink-0">✕</button>
          </div>
        {:else}
          <button on:click={()=> paletteOpen = true} class="ek-cta mono text-[12px] text-zinc-400 hover:text-white inline-flex items-center gap-1.5 mt-1 transition">Looking for something? <span class="hidden md:inline">Press <kbd class="border border-zinc-700 rounded px-1.5 py-0.5 text-[10px]">/</kbd> to search</span><span class="md:hidden underline underline-offset-4">Tap to search</span></button>
        {/if}
      </div>
    </section>

    <section class="flex flex-col gap-6 mt-14 md:mt-16 reveal scroll-section" id="paths" aria-labelledby="paths-h">
      <div class="flex flex-col gap-3"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Start here</span><h2 id="paths-h" class="fraunces text-[28px] sm:text-[34px] font-medium leading-none tracking-[-0.015em]">What brings you here?</h2></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 hover:border-zinc-700 transition">
          <span class="mono text-[11px] tracking-widest uppercase text-[#FF6B35]">01 — Hiring / collaborating</span>
          <h3 class="text-[16px] font-semibold leading-5"><a href="#about" class="after:absolute after:inset-0">See how I work</a></h3>
          <p class="text-[13px] leading-5 text-zinc-400">Experience, stack and the products I've shipped — then a direct line to me. Two minutes, top to bottom.</p>
          <span class="mono text-[11px] text-zinc-300 mt-auto pt-2 inline-flex gap-1">Experience &amp; contact <span class="group-hover:translate-x-0.5 transition">→</span></span>
        </article>
        <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 hover:border-zinc-700 transition">
          <span class="mono text-[11px] tracking-widest uppercase text-[#FF6B35]">02 — Learning</span>
          <h3 class="text-[16px] font-semibold leading-5"><a href="#decks" class="after:absolute after:inset-0">Learn something in 5 minutes</a></h3>
          <p class="text-[13px] leading-5 text-zinc-400">{decksData.length} slide decks, {postsData.length} swipeable carousels and {videosData.length} CodingSkuy videos — Kotlin, TypeScript and mobile.</p>
          <span class="mono text-[11px] text-zinc-300 mt-auto pt-2 inline-flex gap-1">Open the library <span class="group-hover:translate-x-0.5 transition">→</span></span>
        </article>
        <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 hover:border-zinc-700 transition">
          <span class="mono text-[11px] tracking-widest uppercase text-[#FF6B35]">03 — Just curious</span>
          <h3 class="text-[16px] font-semibold leading-5"><a href="#blog/{blogPick.slug}" class="after:absolute after:inset-0">Read a build note</a></h3>
          <p class="text-[13px] leading-5 text-zinc-400">“{blogPick.title}” — {blogPick.mins} min. One of {blogData.length} field notes on mobile, TypeScript and learning with AI.</p>
          <span class="mono text-[11px] text-zinc-300 mt-auto pt-2 inline-flex gap-1">Start reading <span class="group-hover:translate-x-0.5 transition">→</span></span>
        </article>
      </div>
    </section>

    <section class="flex flex-col gap-8 mt-16 md:mt-20 reveal scroll-section" id="recent" aria-labelledby="recent-h">
      <div class="flex flex-col gap-3"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Recent</span><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><h2 id="recent-h" class="fraunces text-[28px] sm:text-[34px] font-medium leading-none tracking-[-0.015em]">Fresh from CodingSkuy.</h2>
        <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 -mb-1" role="group" aria-label="Filter recent items">
          {#each recentTabs as [k,label]}
            <button on:click={()=> recentKind = k} aria-pressed={recentKind===k} class="whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium border {recentKind===k ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-400 hover:text-white'}">{label} <span class="opacity-60 ml-1">{feedCount[k]}</span></button>
          {/each}
        </div>
      </div></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {#each recentItems as it (it.kind + it.slug)}
          <article class="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 hover:border-zinc-700 transition" in:fly={{y:6, duration:240}}>
            <div class="flex items-center justify-between gap-2 mono text-[11px] tracking-widest uppercase text-zinc-500"><span>{fmtDate(it.date)}</span><span class="feed-kind feed-{it.kind}">{it.kind==='post' ? 'Carousel' : it.kind}</span></div>
            <h3 class="text-[16px] font-semibold leading-5"><a href="#{it.kind==='deck'?'decks':it.kind==='post'?'posts':'blog'}/{it.slug}" class="after:absolute after:inset-0">{it.title}</a></h3>
            <p class="text-[13px] leading-5 text-zinc-400 line-clamp-3">{it.desc}</p>
            <span class="mono text-[11px] text-zinc-300 mt-auto pt-2 inline-flex items-center gap-1">{it.kind==='blog' ? 'Read' : it.kind==='deck' ? 'Open deck' : 'Swipe'} · {it.meta} <span class="group-hover:translate-x-0.5 transition">→</span></span>
          </article>
        {/each}
      </div>
      <div class="flex justify-center"><button on:click={()=> nav(recentKind==='deck' ? 'decks' : recentKind==='post' ? 'posts' : 'blog')} class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 text-xs font-medium px-5 py-2.5 text-zinc-400 hover:border-zinc-700 hover:text-white transition">Browse all {recentKind==='deck' ? feedCount.deck+' decks' : recentKind==='post' ? feedCount.post+' carousels' : feedCount.blog+' notes'} →</button></div>
    </section>
    <section id="about-section" class="flex flex-col gap-8 mt-16 md:mt-20 border-t border-zinc-800 pt-12 md:pt-16 scroll-section">
      <div class="flex flex-col gap-2"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">About</span><div class="grid md:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-12 items-start"><h2 class="fraunces text-[28px] sm:text-[34px] md:text-[38px] font-medium leading-[0.95] tracking-tight">Hi, I'm Khoiron — 5+ years building complete products, not just apps.</h2><div class="flex flex-col gap-4 text-[14px] leading-6 text-zinc-400"><p>Software Engineer — Mobile (Flutter, SwiftUI & Kotlin), Backend & APIs, AI-powered. Product-driven, end-to-end, system-thinking. Based in Yogyakarta, building for enterprise (AI Care, Callink) and teaching via BIT House.</p><div class="flex gap-3"><button on:click={()=> nav('about')} class="inline-flex items-center justify-center rounded-full bg-white text-black text-xs font-semibold px-5 py-2.5 hover:bg-zinc-100 transition">Read the full story</button><a href="mailto:rois.khoiron@gmail.com" class="inline-flex items-center justify-center rounded-full border border-zinc-800 text-xs font-medium px-5 py-2.5 hover:border-zinc-700 hover:text-white transition">Get in touch</a></div></div></div></div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col gap-4"><h3 class="font-semibold">Focus areas</h3><div class="grid grid-cols-1 gap-3 text-sm text-zinc-400"><div><span class="text-white font-medium">Product-driven engineering</span> — why before code.</div><div><span class="text-white font-medium">End-to-end scalability</span> — mobile + APIs that grow.</div><div><span class="text-white font-medium">AI-powered integration</span> — intelligent UX.</div></div></div>
        <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col gap-4"><h3 class="font-semibold">Experience</h3><div class="flex flex-col gap-3 text-sm"><div class="flex justify-between"><span class="text-zinc-300">Mobile Developer</span><span class="mono text-xs text-zinc-500">Nov 2023 — Now</span></div><div class="text-xs text-zinc-500">Digital Sekuriti Indonesia · Yogyakarta</div><div class="flex justify-between"><span class="text-zinc-400">Mobile Developer — Product Bridge</span><span class="mono text-xs text-zinc-500">Feb 2022 — Nov 2023</span></div><div class="text-xs text-zinc-500">Digital Sekuriti Indonesia · South Jakarta</div><div class="flex justify-between"><span class="text-zinc-400">Coding Tutor — Edukoding</span><span class="mono text-xs text-zinc-500">Jul 2024 — Jul 2025</span></div></div></div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 border border-zinc-800 rounded-2xl bg-zinc-900/30 p-4 sm:p-6">
        <div class="flex flex-col gap-1 border-r border-zinc-800 pr-4"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Based</span><span class="text-sm font-medium">Yogyakarta, Indonesia</span><span class="text-xs text-zinc-500">GMT+7 · Remote first</span></div>
        <div class="flex flex-col gap-1 border-r border-zinc-800 pr-4"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Working with</span><span class="text-sm font-medium">WFO, Hybrid or Remote</span><span class="text-xs text-zinc-500">Product + engineering</span></div>
        <div class="flex flex-col gap-1 border-r border-zinc-800 pr-4"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Stack</span><span class="text-sm font-medium">Kotlin, Swift, Dart, TypeScript</span><span class="text-xs text-zinc-500">Android · Flutter · RN</span></div>
        <div class="flex flex-col gap-1"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Side projects</span><span class="text-sm font-medium">Security, AI Product and Education</span><span class="text-xs text-zinc-500">CodingSchool · CodingSkuy</span></div>
      </div>
    </section>
  {:else if view==='decks'}
    <div class="flex flex-col gap-6 scroll-section">
      <div class="flex flex-col gap-3">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Decks</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium tracking-tight leading-none">Slide decks.</h1>
        <p class="text-[14px] leading-6 text-zinc-400 max-w-2xl">Talks and study sessions as slides. Open one, press → or Space to advance, Esc to come back. <span class="text-zinc-500 mono text-xs ml-2">{filteredDecks.length} decks</span></p>
      </div>
      <div class="sticky sticky-filter top-[65px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-zinc-800/60 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div class="flex items-center gap-2 flex-1 max-w-xl">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input bind:value={deckSearch} placeholder="Search decks — try 'kotlin', 'typescript', 'promise'" class="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"/>
          </div>
          <select bind:value={deckTag} class="hidden sm:flex bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2.5 text-xs text-zinc-400 focus:outline-none"><option value="all">All</option>{#each deckTypes as t}<option value={t}>{t}</option>{/each}</select>
        </div>
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div class="flex gap-1.5">
            {#each ['all', ...deckTypes] as t}
              <button on:click={()=> deckTag = t} aria-pressed={deckTag===t} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium capitalize {deckTag===t?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">{t}</button>
            {/each}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {#each filteredDecks as d}
          <article on:click={()=> deckSlides[d.slug] && openDeck(d.slug)} aria-disabled={!deckSlides[d.slug]} class="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/60 transition {deckSlides[d.slug] ? 'cursor-pointer' : 'cursor-default opacity-70'}">
            <div class="h-[132px] bg-gradient-to-br {d.color} flex flex-col justify-between p-4">
              <div class="flex items-center justify-between"><span class="mono text-[10px] tracking-widest uppercase bg-black/40 backdrop-blur text-white/80 px-2 py-1 rounded-full">{d.type}</span><span class="mono text-[10px] bg-white text-black px-2 py-1 rounded-full font-semibold">{d.slides} slides</span></div>
              <div class="mono text-[11px] text-white/60">{d.lang} · {d.date}</div>
            </div>
            <div class="p-5 flex flex-col gap-2 flex-1">
              <h3 class="text-[16px] font-semibold leading-5 line-clamp-2 group-hover:text-white">{d.title}</h3>
              <div class="flex gap-1.5 flex-wrap">{#each d.tags as t}<span class="mono text-[10px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">{t}</span>{/each}</div>
              <p class="text-[13px] leading-5 text-zinc-400 line-clamp-3">{d.desc}</p>
              <span class="mono text-[11px] text-zinc-300 mt-1 inline-flex gap-1">{#if deckSlides[d.slug]}Open deck{:else}Slides coming soon{/if} <span class="group-hover:translate-x-0.5 transition">{deckSlides[d.slug] ? '→' : ''}</span></span>
            </div>
          </article>
        {/each}
      </div>
      {#if filteredDecks.length===0}<div class="empty-state flex flex-col items-center justify-center gap-3 py-14 rounded-2xl"><span class="empty-state-icon">∅</span><span class="mono text-xs tracking-widest uppercase text-zinc-500">No decks found</span><p class="text-sm text-zinc-500">Try another keyword or clear filters.</p></div>{/if}
    </div>
  {:else if view==='deckDetail' && deckSlug}
    {@const deck = decksData.find(d=>d.slug===deckSlug)}
    {@const slides = deckSlides[deckSlug] || []}
    {@const cur = slides[deckIdx]}
    <div id="view-deck-detail" class="fixed inset-0 z-50 bg-black flex flex-col" in:fade={{duration:200}} out:fade={{duration:150}}>
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
    <div class="flex flex-col gap-8 scroll-section">
      <div class="flex flex-col gap-3">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Videos</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium tracking-tight leading-none">CodingSkuy on YouTube.</h1>
        <p class="text-[14px] leading-6 text-zinc-400 max-w-2xl">Tutorial panjang 12–22 menit untuk deep dive, dan Shorts 30–60 detik untuk tips cepat. Semua dari <a href="https://www.youtube.com/@codingskuy/videos" target="_blank" rel="noopener" class="underline text-zinc-300">youtube.com/@codingskuy</a> — dinamis via RSS/API, fallback statis kalau API diblok. <span class="mono text-xs text-zinc-500 ml-2">{filteredVideos.length} videos</span></p>
      </div>
      <div class="sticky sticky-filter top-[65px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-zinc-800/60 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div class="relative flex-1 max-w-xl">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input bind:value={videoSearch} placeholder="Search videos — 'flutter', 'css', 'ai'" class="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"/>
        </div>
        <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button on:click={()=> videoFilter='all'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {videoFilter==='all'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">All</button>
          <button on:click={()=> videoFilter='video'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {videoFilter==='video'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">Videos</button>
          <button on:click={()=> videoFilter='short'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {videoFilter==='short'?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">Shorts</button>
          <button on:click={()=> videoFilter='live'} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {videoFilter==='live'?'bg-[#FF6B35] text-white':'border border-zinc-800 text-zinc-400 hover:text-white'}">Live</button>
        </div>
      </div>
      {#if videosLong.length>0}
        <div class="flex flex-col gap-3 reveal in">
          <div class="flex items-center gap-2"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Videos</span><span class="flex-1 h-px bg-zinc-800"></span><span class="mono text-xs text-zinc-500">{videosLong.length} · 16:9</span></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each videosLong as v}
              <button on:click={()=> openVideo(v)} class="group text-left rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60 transition cursor-pointer flex flex-col">
                <div class="relative aspect-video bg-zinc-900 overflow-hidden">
                  <img src={v.thumb.replace('hq720','mqdefault')} alt="" loading="lazy" decoding="async" width="320" height="180" class="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"/>
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
      {#if videosLive.length>0}
        <div class="flex flex-col gap-3 reveal">
          <div class="flex items-center gap-2"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Live</span><span class="flex-1 h-px bg-zinc-800"></span><span class="mono text-xs text-zinc-500">{videosLive.length} · Live</span></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each videosLive as v}
              <button on:click={()=> openVideo(v)} class="group text-left rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60 transition cursor-pointer flex-col">
                <div class="relative aspect-video bg-zinc-900 overflow-hidden">
                  <img src={v.thumb.replace('hq720','mqdefault')} alt="" loading="lazy" decoding="async" width="320" height="180" class="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"/>
                  <span class="absolute top-2 left-2 bg-[#FF6B35] text-white mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">LIVE</span>
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
      {#if videosShort.length>0},
        <div class="flex flex-col gap-3 reveal">
          <div class="flex items-center gap-2"><span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Shorts</span><span class="flex-1 h-px bg-zinc-800"></span><span class="mono text-xs text-zinc-500">{videosShort.length} · 9:16</span></div>
          <div class="flex gap-3 overflow-x-auto scrollbar-none pb-2 snap-x snap-mandatory">
            {#each videosShort as v}
              <button on:click={()=> openVideo(v)} class="shrink-0 w-[180px] snap-start rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition text-left flex flex-col">
                <div class="relative aspect-[9/16] bg-zinc-900 overflow-hidden">
                  <img src={v.thumb.replace('hq720','mqdefault')} alt="" loading="lazy" decoding="async" width="320" height="180" class="w-full h-full object-cover"/>
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
      {#if filteredVideos.length===0}<div class="empty-state flex flex-col items-center justify-center gap-3 py-14 rounded-2xl"><span class="empty-state-icon">∅</span><span class="mono text-xs tracking-widest uppercase text-zinc-600">No videos found</span></div>{/if}
    </div>
  {:else if view==='videoDetail' && selectedVideo}
    <div class="fixed inset-0 z-50 bg-black flex flex-col" in:fade={{duration:200}} out:fade={{duration:150}}>
      <div class="h-[56px] shrink-0 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur flex items-center justify-between px-4 sm:px-6">
        <button on:click={()=> nav('videos')} class="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white">← All videos</button>
        <span class="mono text-xs text-zinc-500 hidden sm:inline">{selectedVideo.isShort ? 'Short' : 'Video'} · {selectedVideo.duration}</span>
        <a href={"https://www.youtube.com/watch?v="+selectedVideo.id} target="_blank" rel="noopener" class="rounded-full bg-white text-black px-3 py-1.5 text-xs font-semibold hover:bg-zinc-100">Open on YouTube →</a>
      </div>
      <div class="flex-1 overflow-auto bg-gradient-to-br from-[#0a0a0a] via-[#0f0f12] to-[#0a0a0a] p-4 sm:p-8 flex flex-col items-center gap-6">
        <div class="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <iframe src={"https://www.youtube.com/embed/"+selectedVideo.id+"?autoplay=0"} title={selectedVideo.title} class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="w-full max-w-4xl flex flex-col gap-2">
          <h1 class="fraunces text-[22px] sm:text-[26px] font-semibold leading-tight">{selectedVideo.title}</h1>
          <div class="flex flex-wrap gap-2 mono text-[11px] text-zinc-500"><span>{selectedVideo.date}</span><span>·</span><span>{selectedVideo.views} views</span><span>·</span><span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{selectedVideo.tag}</span><span class="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{selectedVideo.isShort?'Short':'Video'}</span></div>
          <p class="text-sm leading-6 text-zinc-400 mt-1">{selectedVideo.desc} — dari <a href="https://www.youtube.com/@codingskuy/videos" target="_blank" rel="noopener" class="underline">youtube.com/@codingskuy</a>. Dinamis via RSS/API, fallback ke data statis kalau fetch diblok.</p>
        </div>
      </div>
    </div>
  {:else if view==='posts'}
    <div class="flex flex-col gap-6 scroll-section">
      <div class="flex flex-col gap-3">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Posts</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium tracking-tight leading-none">Swipeable carousels.</h1>
        <p class="text-[14px] leading-6 text-zinc-400 max-w-2xl">Short lessons in a 4:5 frame, the way they go out on Instagram. Tap a cover and swipe through. <span class="text-zinc-500 mono text-xs ml-2">{filteredPosts.length} posts</span></p>
      </div>
      <div class="sticky sticky-filter top-[65px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-zinc-800/60 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div class="relative flex-1 max-w-xl">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input bind:value={postSearch} placeholder="Search carousels — 'kotlin', 'typescript', 'cli'" class="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"/>
        </div>
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div class="flex gap-1.5">
            {#each ['all', ...postTags] as t}
              <button on:click={()=> {postTag = t; postsCarIdx = 0}} aria-pressed={postTag===t} class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium {postTag===t?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">{t==='all' ? 'All' : t}</button>
            {/each}
          </div>
          <button on:click={()=> { postsData.sort(()=>Math.random()-0.5); postsTick++; postsCarIdx=0; }} class="hidden sm:inline-flex mono text-xs border border-zinc-800 rounded-full px-3.5 py-1.5 text-zinc-400 hover:text-white hover:border-zinc-700 whitespace-nowrap">Shuffle ↻</button>
        </div>
      </div>
      <div class="relative">
        <div class="overflow-hidden select-none" style="cursor:{postsIsDragging||postsMouseDown?'grabbing':'grab'}" on:touchstart={handlePostsTouchStart} on:touchmove={handlePostsTouchMove} on:touchend={handlePostsTouchEnd} on:mousedown={handlePostsMouseDown} on:mousemove={handlePostsMouseMove} on:mouseup={handlePostsMouseUp} on:mouseleave={handlePostsMouseUp}>
          <div class="flex gap-4" style="will-change:{postsIsDragging||postsMouseDown?'transform':'auto'}; transition: {postsIsDragging||postsMouseDown ? 'none' : 'transform 420ms cubic-bezier(0.22,1,0.36,1)'}; transform: translate3d({-postsCarIdx * 336 + postsDragDx}px,0,0);">
            {#each filteredPosts as p}
              <article on:click={()=> openPost(p.slug)} class="shrink-0 w-[320px] aspect-[4/5] rounded-2xl border border-zinc-800 p-5 flex flex-col cursor-pointer {p.color} snap-center" style="scroll-snap-align:center;">
                <div class="flex items-center justify-between"><img src={logoKhoirlabs} class="w-6 h-6 rounded-full {p.color.includes('white')?'':'bg-white'} object-contain p-0.5" alt=""><span class="mono text-[10px] tracking-widest uppercase {p.color.includes('white')?'text-zinc-500':'text-zinc-400'}">{p.accent}</span></div>
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
      {#if filteredPosts.length===0}<div class="empty-state flex flex-col items-center justify-center gap-3 py-14 rounded-2xl"><span class="empty-state-icon">∅</span><span class="mono text-xs tracking-widest uppercase text-zinc-600">No posts found</span><p class="text-sm text-zinc-500">Try a different tag or search.</p></div>{/if}
    </div>
  {:else if view==='postDetail' && postSlug}
    {@const meta = postsData.find(p=>p.slug===postSlug)}
    {@const sls = postsSlides[postSlug] || []}
    <div id="view-post-detail" class="fixed inset-0 z-50 bg-black flex flex-col" in:fade={{duration:200}} out:fade={{duration:150}}>
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
            <div id="post-stage" class="flex h-full" style="width:{sls.length*100}%; transform:translate3d(-{postIdx * (100/sls.length)}%,0,0); transition: transform 420ms cubic-bezier(0.22,1,0.36,1); will-change: transform">
              {#each sls as s}
                {@const isWhite = s.theme==='white'}
                <div class="w-full h-full {isWhite?'bg-white text-black':'bg-zinc-900 text-white'} flex flex-col p-6 relative shrink-0" style="width:{100/sls.length}%">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2"><img src={logoKhoirlabs} class="w-6 h-6 rounded-full {isWhite?'':'bg-white'} object-contain p-0.5" alt=""/><span class="text-[11px] font-bold tracking-tight">khoirlabs</span></div>
                    <span class="mono text-[10px] tracking-widest uppercase text-zinc-500">{s.label} {s.num? '· '+s.num: ''}</span>
                  </div>
                  <div class="flex-1 flex flex-col justify-center gap-3 py-6 overflow-auto">
                    <h2 class="fraunces text-[24px] font-semibold leading-[1.1]">{s.title}</h2>
                    <p class="text-[13px] leading-6 {isWhite?'text-zinc-600':'text-zinc-400'}">{s.body}</p>
                    {#if s.bullets}<ul class="space-y-1.5 mt-1">{#each s.bullets as b}<li class="flex gap-2 text-[12px] leading-5 {isWhite?'text-zinc-700':'text-zinc-300'}"><span class="mt-1">•</span><span>{b}</span></li>{/each}</ul>{/if}
                    {#if s.code}<pre class="mt-2 {isWhite?'bg-zinc-900 text-zinc-100 border-zinc-800':'bg-black text-zinc-300 border-zinc-700'} rounded-xl p-3 mono text-[11px] leading-5 overflow-auto whitespace-pre-wrap border">{s.code}</pre>{/if}
                  </div>
                  <div class="flex items-center justify-between pt-4 border-t {isWhite?'border-zinc-200':'border-zinc-800'}">
                    <span class="mono text-[10px] text-zinc-500 flex items-center gap-1">                    <img src={isWhite ? new URL('../assets/images/khoirlabs.dev/ig-khoirlabs-black-ad89c2c91f.png', import.meta.url).href : new URL('../assets/images/khoirlabs.dev/ig-khoirlabs-white-2d8fecd0f2.png', import.meta.url).href} class="w-4 h-4 rounded-full" alt=""/>@khoirlabs</span>
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
    <div class="flex flex-col gap-6 scroll-section">
      <div class="flex flex-col gap-3">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Blog</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium tracking-tight leading-none">Field notes.</h1>
        <p class="text-[14px] leading-6 text-zinc-400 max-w-2xl">Write-ups of what I learn, teach and build — mostly in Bahasa Indonesia. <span class="mono text-xs text-zinc-500 ml-2">{filteredBlog.length} posts</span></p>
      </div>
      <div class="sticky sticky-filter top-[65px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-zinc-800/60 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div class="relative flex-1 max-w-xl">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4-4m2-4a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input bind:value={blogSearch} placeholder="Search notes — 'kmp', 'typescript', 'performance'" class="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2.5 text-[13px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"/>
        </div>
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <select bind:value={blogTag} class="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2 text-xs text-zinc-400"><option value="all">All tags</option>{#each blogTags as t}<option value={t}>{t}</option>{/each}</select>
          <div class="hidden sm:flex gap-1.5">
            {#each ['all', ...blogTags] as t}
              <button on:click={()=> blogTag = t} aria-pressed={blogTag===t} class="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium {blogTag===t?'bg-white text-black':'border border-zinc-800 text-zinc-400 hover:text-white'}">{t==='all' ? 'All tags' : t}</button>
            {/each}
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
            <div class="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-zinc-800"><div class="rounded-xl bg-[#0a0a0a] border border-zinc-800 p-4 mono text-xs leading-5 text-zinc-400 max-w-[260px]">“{blogFeatured.excerpt.slice(0,120)}…”<br><span class="text-white font-medium mt-2 block">— {blogFeatured.mins} min read</span></div></div>
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
      {#if filteredBlog.length===0}<div class="empty-state flex flex-col items-center justify-center gap-3 py-14 rounded-2xl"><span class="empty-state-icon">∅</span><span class="mono text-xs tracking-widest uppercase text-zinc-600">No notes found</span></div>{/if}
    </div>
  {:else if view==='blogDetail' && blogSlug}
    {@const b = blogData.find(x=>x.slug===blogSlug)}
    <div class="max-w-5xl mx-auto">
      <button on:click={()=> nav('blog')} class="inline-flex items-center gap-1.5 mono text-xs text-zinc-500 hover:text-white mb-6">← All posts</button>
      <div class="flex flex-col lg:flex-row gap-8">
        <article class="prose-article flex-1 min-w-0 rounded-2xl border border-transparent px-4 sm:px-6 py-6 sm:py-8 bg-transparent">
          <div class="mono text-[11px] tracking-widest uppercase text-zinc-500 flex flex-wrap items-center gap-2"><span>{b?.date}</span><span>·</span><span>{b?.mins} min read</span><span>·</span><span>By Khoiron Rois</span><span class="hidden sm:inline">·</span><span class="flex flex-wrap gap-1.5">{#if b}{#each b.tags as t}<span class="mono text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">{t}</span>{/each}{/if}</span></div>
          <h1 class="fraunces text-[32px] sm:text-[40px] font-semibold leading-[1.05] tracking-tight mt-3">{b?.title}</h1>
          <p class="text-[18px] leading-7 text-zinc-300 mt-4">{b?.excerpt}</p>
           <div class="mt-8 flex flex-col gap-8 text-[15px] leading-7 text-zinc-300 prose prose-invert max-w-[68ch]">
            {#if blogSlug && blogFull[blogSlug]}
              {#each blogFull[blogSlug].sections as s}
                <section id={s.id} class="scroll-mt-24"><h2 class="fraunces text-[20px] sm:text-[22px] font-semibold leading-tight">{s.title}</h2><div class="mt-3 text-[14px] leading-7">{@html s.body}</div></section>
              {/each}
            {:else}
              <p>{b?.excerpt}</p><p class="mt-4 text-zinc-400">The full write-up for this note is not published yet.</p><section class="mt-6"><h2 class="fraunces text-xl font-medium">Highlights</h2><ul class="list-disc pl-5 mt-3 space-y-1.5 text-zinc-300">{#if b}{#each b.tags as t}<li>{t}</li>{/each}{/if}</ul></section>
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
    <div class="flex flex-col gap-10 scroll-section">
      <!-- hero — Khoiron Rois  -->
      <div class="flex flex-col gap-4 max-w-3xl">
        <span class="mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Yogyakarta, Indonesia · rois.khoiron@gmail.com</span>
        <h1 class="fraunces text-[36px] sm:text-[44px] font-medium leading-[0.9] tracking-tight">Khoiron Rois.<br><span class="italic text-zinc-400">Software Engineer — Mobile, Backend & AI.</span></h1>
        <p class="text-[14px] leading-7 text-zinc-300">Hi, I'm Khoiron — a Software Engineer who builds <strong class="text-white">complete products, not just apps</strong>. With 5+ years developing iOS and Android using Flutter, SwiftUI & Kotlin, I design robust Backend systems and APIs to ensure apps are scalable, performant, and thoughtful. I work at the intersection of mobile, backend, and AI — transforming ideas into intelligent, data-driven experiences. Product-driven, end-to-end, and system-thinking.</p>
        <div class="flex flex-wrap gap-2">
          <a href="mailto:rois.khoiron@gmail.com" class="rounded-full bg-white text-black px-4 py-1.5 text-xs font-medium">rois.khoiron@gmail.com</a>
          <a href="https://github.com/roiskhoiron" target="_blank" rel="noopener" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">GitHub — roiskhoiron</a>
          <a href="https://linkedin.com/in/rois-khoiron" target="_blank" rel="noopener" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">LinkedIn — 885 · 950 followers</a>
          <a href="https://roiskhoiron.github.io" target="_blank" rel="noopener" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">Portfolio — roiskhoiron.github.io</a>
          <a href="https://youtube.com/@codingskuy" target="_blank" rel="noopener" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">YouTube — CodingSkuy!</a>
          <a href="https://wa.me/6282334626354" target="_blank" rel="noopener" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">WhatsApp</a>
        </div>
      </div>

      <!-- counters — real Khoiron stats -->
      <div class="grid grid-cols-3 gap-4 border border-zinc-800 rounded-2xl bg-zinc-900/30 p-4 sm:p-6">
         <a href="https://www.linkedin.com/in/rois-khoiron/details/experience/" target="_blank" rel="noopener noreferrer" class="about-counter flex flex-col gap-1 border-r border-zinc-800 pr-4 no-underline group">
          <span class="fraunces text-2xl font-semibold group-hover:text-[#FF6B35] transition">5+</span>
          <span class="mono text-[11px] tracking-widest uppercase text-zinc-500 group-hover:text-[#FF6B35] transition">Years engineering</span>
          <span class="text-xs text-zinc-500 leading-4">Mobile (Flutter, SwiftUI, Kotlin) + Backend & APIs.</span>
        </a>
        <a href="https://www.linkedin.com/in/rois-khoiron/details/projects/" target="_blank" rel="noopener noreferrer" class="about-counter flex flex-col gap-1 border-r border-zinc-800 pr-4 no-underline group">
          <span class="fraunces text-2xl font-semibold group-hover:text-[#FF6B35] transition">22+</span>
          <span class="mono text-[11px] tracking-widest uppercase text-zinc-500 group-hover:text-[#FF6B35] transition">Projects delivered</span>
          <span class="text-xs text-zinc-500 leading-4">End-to-end — mobile to backend.</span>
        </a>
         <a href="https://www.linkedin.com/in/rois-khoiron/details/certifications/" target="_blank" rel="noopener noreferrer" class="about-counter flex flex-col gap-1 no-underline group">
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
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 reveal reveal-delay-1"><h3 class="font-semibold text-sm">Product-driven engineering</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Understanding the why and user problem before writing code.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 reveal reveal-delay-2"><h3 class="font-semibold text-sm">End-to-end scalability</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Clean mobile codebases backed by reliable API development — architectures that evolve with growth.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 reveal reveal-delay-3"><h3 class="font-semibold text-sm">AI-powered integration</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Intelligent features to enhance UX and decision-making. Bridging mobile with Data Science & AI ecosystem.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 reveal reveal-delay-4"><h3 class="font-semibold text-sm">System thinking</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Performance optimization, clean architecture, data-driven decisions — building adaptive, smart software for the AI era.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 reveal reveal-delay-5"><h3 class="font-semibold text-sm">Cross-platform delivery</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Flutter, SwiftUI, Kotlin — picking the right stack for the team that has to maintain it.</p></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 reveal reveal-delay-5"><h3 class="font-semibold text-sm">Constrained device & real-time</h3><p class="text-xs leading-5 text-zinc-400 mt-1">Security, real-time transactions, BLE/USB/MQTT/FCM — reliability over features.</p></div>
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
            <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5 flex gap-4 reveal">
              <span class="hidden sm:grid w-8 h-8 rounded-full bg-zinc-800 text-white place-items-center text-xs font-mono shrink-0">{i+1}</span>
              <div class="flex-1 flex flex-col gap-2">
                <div class="flex flex-wrap gap-2 mono text-[11px] text-zinc-500"><span>{exp.date}</span><span>·</span><span>{exp.loc}</span></div>
                <h3 class="font-semibold text-[15px]">{exp.role}</h3>
                <span class="mono text-xs text-zinc-500">{exp.company}</span>
                <ul class="mt-1 list-disc pl-4 space-y-1 text-xs leading-5 text-zinc-400">{#each exp.bullets as bl}<li>{bl}</li>{/each}</ul>
                <div class="flex flex-wrap gap-1.5 mt-2">{#each exp.tags as t}<span class="skill-pill mono text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">{t}</span>{/each}</div>
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
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2 reveal reveal-delay-1"><span class="mono text-[11px] uppercase text-zinc-500">Mobile engineering</span><div class="flex flex-wrap gap-1.5"><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Flutter</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">SwiftUI</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Kotlin</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Dart</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">C++</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">TypeScript</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2 reveal reveal-delay-2"><span class="mono text-[11px] uppercase text-zinc-500">Backend & APIs</span><div class="flex flex-wrap gap-1.5"><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">REST APIs</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Firebase</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Node.js</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">System Design</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Scalability</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2 reveal reveal-delay-3"><span class="mono text-[11px] uppercase text-zinc-500">AI & Data</span><div class="flex flex-wrap gap-1.5"><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">AI Integration</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Data Science</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Performance</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Clean Architecture</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2 reveal reveal-delay-4"><span class="mono text-[11px] uppercase text-zinc-500">Featured work</span><div class="flex flex-wrap gap-1.5"><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">HappyExpress Logistics</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">AI Care</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Callink</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Nikah Saja</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2 reveal reveal-delay-5"><span class="mono text-[11px] uppercase text-zinc-500">Tools</span><div class="flex flex-wrap gap-1.5"><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Git</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Figma</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">IntelliJ</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Rive Studio</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Dart</span></div></div>
          <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 flex flex-col gap-2 reveal reveal-delay-5"><span class="mono text-[11px] uppercase text-zinc-500">Certifications</span><div class="flex flex-wrap gap-1.5"><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">IDCamp</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">BEKRAF</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Dicoding MADE</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">SQL</span><span class="skill-pill px-2 py-1 rounded-full bg-zinc-800">Sololearn</span></div></div>
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
    <div class="flex flex-col gap-3 max-w-sm"><div class="flex items-center gap-2"><img src={logoKhoirlabs} class="w-6 h-6 rounded-full logo-bg object-contain p-1" alt=""><span class="text-sm font-semibold">khoirlabs</span></div><p class="text-xs leading-5 text-zinc-500">Software Engineer — Mobile (Flutter, SwiftUI & Kotlin), Backend & APIs, AI-powered. Product-driven, end-to-end, system-thinking.</p><div class="flex items-center gap-3 mono text-[11px] text-zinc-500"><span>© 2026 khoirlabs</span><span class="w-1 h-1 rounded-full bg-zinc-700"></span><a href="https://wa.me/6282334626354" target="_blank" rel="noopener" class="hover:text-white">Contact</a></div></div>
    <div class="flex gap-10 sm:gap-14 text-xs"><div class="flex flex-col gap-2"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Explore</span><button on:click={()=> nav('home')} class="text-left text-zinc-400 hover:text-white">Home</button><button on:click={()=> nav('about')} class="text-left text-zinc-400 hover:text-white">About</button><button on:click={()=> nav('blog')} class="text-left text-zinc-400 hover:text-white">Blog</button></div><div class="flex flex-col gap-2"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Library</span><button on:click={()=> nav('decks')} class="text-left text-zinc-400 hover:text-white">Decks</button><button on:click={()=> nav('posts')} class="text-left text-zinc-400 hover:text-white">Carousels</button><button on:click={()=> nav('videos')} class="text-left text-zinc-400 hover:text-white">Videos</button></div><div class="flex flex-col gap-2"><span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Connect</span><a href="https://github.com/roiskhoiron" target="_blank" rel="noopener" class="text-zinc-400 hover:text-white">GitHub</a><a href="https://www.instagram.com/codingskuy_/" target="_blank" rel="noopener" class="text-zinc-400 hover:text-white">Instagram</a><a href="https://www.linkedin.com/in/rois-khoiron/" target="_blank" rel="noopener" class="text-zinc-400 hover:text-white">LinkedIn</a></div></div>
  </div>
</footer>
