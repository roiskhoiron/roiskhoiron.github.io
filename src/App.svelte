<script lang="ts">
  import { onMount } from 'svelte';
  import { decksData, deckSlides, postsData, postsSlides, blogData, blogFull } from './lib/data';

  let view: string = 'home';
  let deckSlug: string | null = null;
  let postSlug: string | null = null;
  let blogSlug: string | null = null;
  let bootDone = false;
  let bootPct = 0;
  let theme: 'dark' | 'light' = 'dark';
  let deckIdx = 0;
  let postIdx = 0;
  let deckTag = 'all';
  let postTag = 'all';
  let blogTag = 'all';
  let deckSearch = '';
  let postSearch = '';
  let blogSearch = '';
  let postsCarIdx = 0;
  // boot
  onMount(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random()*18+6;
      if (p >= 100) { p = 100; bootPct = 100; clearInterval(t); setTimeout(()=> bootDone = true, 400); }
      else bootPct = Math.floor(p);
    }, 85);
    // theme init
    const saved = localStorage.getItem('theme-preference');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = (saved === 'light' || saved === 'dark') ? saved as any : (sysDark ? 'dark' : 'light');
    applyTheme(theme);
    // hash init
    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('scroll', () => { const hdr=document.getElementById('site-header'); if(hdr) hdr.classList.toggle('shadow-lg', window.scrollY>8); });
  });

  function applyTheme(t: 'dark'|'light') {
    theme = t;
    document.documentElement.classList.toggle('dark', t==='dark');
    document.documentElement.classList.toggle('light', t==='light');
    document.documentElement.style.colorScheme = t;
    localStorage.setItem('theme-preference', t);
  }
  function toggleTheme(){ applyTheme(theme==='dark'?'light':'dark'); }

  function handleHash(){
    const raw = location.hash.replace('#','') || 'home';
    if (raw.startsWith('decks/')) { const s=raw.split('/')[1]; if (deckSlides[s]) { deckSlug=s; deckIdx=0; view='deckDetail'; return; } }
    if (raw.startsWith('posts/')) { const s=raw.split('/')[1]; if (postsSlides[s]) { postSlug=s; postIdx=0; view='postDetail'; return; } }
    if (raw.startsWith('blog/')) { const s=raw.split('/')[1]; if (blogData.find(b=>b.slug===s)) { blogSlug=s; view='blogDetail'; return; } }
    if (['home','decks','posts','blog','about'].includes(raw)) view = raw;
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

  $: filteredDecks = decksData.filter(d=>{
    if(deckTag!=='all' && !d.type.toLowerCase().includes(deckTag)) return false;
    if(deckSearch && !(d.title+d.desc+d.tags.join(' ')).toLowerCase().includes(deckSearch.toLowerCase())) return false;
    return true;
  });
  $: filteredPosts = postsData.filter(p=>{
    if(postTag!=='all' && p.tag!==postTag) return false;
    if(postSearch && !(p.title+p.desc+p.tag).toLowerCase().includes(postSearch.toLowerCase())) return false;
    return true;
  });
  $: filteredBlog = [...blogData].filter(b=>{
    if(blogTag!=='all' && !b.tags.some(t=>t.toLowerCase().includes(blogTag.toLowerCase()))) return false;
    if(blogSearch && !(b.title+b.excerpt+b.tags.join(' ')).toLowerCase().includes(blogSearch.toLowerCase())) return false;
    return true;
  }).sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
  $: blogFeatured = filteredBlog.find(b=>b.featured) || filteredBlog[0];
  $: blogRest = filteredBlog.filter(b=>b!==blogFeatured);
</script>

{#if !bootDone}
<div class="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity" style="opacity:{bootPct===100?0:1}">
  <div class="flex flex-col items-center gap-6">
    <div class="flex items-center gap-3">
      <img src="/assets/images/khoirlabs.dev/logo-khoirlabs.jpeg" class="w-9 h-9 rounded-full bg-white p-1 object-contain" alt="Khoirlabs"/>
      <span class="text-[11px] tracking-[0.2em] font-semibold text-zinc-500 uppercase">Booting khoirlabs</span>
    </div>
    <div class="flex items-baseline gap-2"><span class="text-7xl font-light tracking-tight">{bootPct}</span><span class="text-2xl font-light text-zinc-600">%</span></div>
    <div class="w-[280px] h-[2px] bg-zinc-800 rounded-full overflow-hidden"><div class="h-full bg-white transition-all" style="width:{bootPct}%"></div></div>
  </div>
</div>
{/if}

<header id="site-header" class="sticky top-0 z-40 border-b border-zinc-800/60 bg-[#09090b]/60 backdrop-blur-xl">
  <nav class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
    <button on:click={()=> nav('home')} class="flex items-center gap-3">
      <img src="/assets/images/khoirlabs.dev/logo-khoirlabs.jpeg" class="w-8 h-8 rounded-full border border-zinc-800 bg-white object-contain p-1" alt="Khoirlabs"/>
      <div class="flex flex-col leading-none text-left">
        <span class="text-[15px] font-semibold tracking-tight">khoirlabs</span>
        <span class="hidden sm:block text-[11px] text-zinc-400">Software Engineer, Tech Speaker</span>
      </div>
    </button>
    <div class="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 rounded-full p-1">
      {#each ['home','about','decks','posts','blog'] as v}
        <button on:click={()=> nav(v)} class="px-4 py-1.5 rounded-full text-[13px] font-medium {view===v || view.startsWith(v+'/') ? 'bg-white text-black' : 'text-zinc-400'}">{v[0].toUpperCase()+v.slice(1)}</button>
      {/each}
    </div>
    <div class="flex items-center gap-2">
      <button on:click={toggleTheme} aria-label="Toggle theme" class="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 grid place-items-center text-zinc-400">
        {#if theme==='dark'}☾{:else}☀{/if}
      </button>
      <button class="md:hidden w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 grid place-items-center" on:click={()=> document.getElementById('mobile-menu')?.classList.toggle('hidden')}>☰</button>
    </div>
  </nav>
  <div id="mobile-menu" class="hidden md:hidden border-t border-zinc-800 bg-[#0a0a0a] px-4 py-3">
    {#each ['home','about','decks','posts','blog'] as v}
      <button on:click={()=> nav(v)} class="block w-full text-left px-3 py-2 rounded-lg {view===v?'bg-white text-black':'text-zinc-400'}">{v}</button>
    {/each}
  </div>
</header>

<main class="mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-6">
  {#if view==='home'}
    <section class="flex flex-col items-center gap-10 text-center">
      <div class="flex flex-col items-center gap-6 max-w-3xl">
        <h1 class="fraunces text-[42px] sm:text-[56px] md:text-[68px] font-medium leading-[0.9]">Mobile developer,<br><span class="italic">every framework.</span></h1>
        <p class="max-w-[560px] text-zinc-400">5+ years building complete products — Mobile (Flutter, SwiftUI & Kotlin), Backend systems & APIs, AI-powered. Product-driven, end-to-end, and system-thinking.</p>
        <div class="flex flex-wrap justify-center gap-2">
          {#each ['Android','Kotlin','Flutter','React Native','Swift','Dart','Firebase','Ionic'] as t}
            <span class="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs">{t}</span>
          {/each}
        </div>
      </div>
      <div class="w-[168px] h-[168px] rounded-full overflow-hidden border border-zinc-800 p-[5px] bg-zinc-900">
        <img src="/assets/images/khoirlabs.dev/khoiron-rois.jpeg" class="w-full h-full object-cover rounded-full object-top" alt="Khoiron Rois"/>
      </div>
      <div class="flex gap-3">
        <a href="https://github.com/khoirlabs" class="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm">GitHub</a>
        <button on:click={()=> nav('blog')} class="mono text-xs text-zinc-400">Or read the blog →</button>
      </div>
    </section>
    <section class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each filteredBlog.slice(0,3) as b}
        <article class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 cursor-pointer" on:click={()=> openBlog(b.slug)}>
          <div class="mono text-[11px] text-zinc-500">{b.date} — Blog</div>
          <h3 class="font-semibold mt-1">{b.title}</h3>
          <p class="text-xs text-zinc-400 mt-2 line-clamp-3">{b.excerpt}</p>
        </article>
      {/each}
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
      <h1 class="fraunces text-4xl font-medium">Presentation Library</h1>
      <div class="flex gap-2">
        <input bind:value={deckSearch} placeholder="Search decks…" class="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm"/>
        <select bind:value={deckTag} class="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2 text-xs">
          <option value="all">All</option><option value="editorial">Editorial</option><option value="spotlight">Spotlight</option>
        </select>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each filteredDecks as d}
          <article on:click={()=> openDeck(d.slug)} class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 cursor-pointer hover:border-zinc-700">
            <div class="mono text-[10px] text-zinc-500">{d.type} · {d.slides} slides</div>
            <h3 class="font-semibold mt-1">{d.title}</h3>
            <p class="text-xs text-zinc-400 mt-1 line-clamp-3">{d.desc}</p>
          </article>
        {/each}
      </div>
    </div>
  {:else if view==='deckDetail' && deckSlug}
    {@const deck = decksData.find(d=>d.slug===deckSlug)}
    {@const slides = deckSlides[deckSlug] || []}
    {@const cur = slides[deckIdx]}
    <div class="fixed inset-0 z-30 bg-black flex flex-col">
      <div class="h-[56px] border-b border-zinc-800 bg-[#09090b] flex items-center justify-between px-4">
        <button on:click={()=> nav('decks')} class="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs">← Exit</button>
        <span class="text-sm font-semibold">{deck?.title}</span>
        <span class="mono text-xs text-zinc-500">{deckIdx+1} / {slides.length}</span>
      </div>
      <div class="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 to-black">
        <div class="w-full max-w-4xl aspect-[16/9] bg-zinc-900 rounded-2xl border border-zinc-800 p-8 flex flex-col gap-3 overflow-auto">
          <span class="mono text-[11px] tracking-widest uppercase text-amber-400">{cur?.subtitle}</span>
          <h2 class="fraunces text-3xl font-semibold">{cur?.title}</h2>
          <p class="text-sm text-zinc-400">{cur?.message}</p>
          {#if cur?.points}<ul class="space-y-1.5 mt-2">{#each cur.points as pt}<li class="text-xs text-zinc-300">• {pt}</li>{/each}</ul>{/if}
          {#if cur?.code}<pre class="bg-black border border-zinc-800 rounded-xl p-3 mono text-[11px] overflow-auto">{cur.code}</pre>{/if}
        </div>
        <div class="flex gap-3 mt-4">
          <button on:click={()=> deckIdx=Math.max(0,deckIdx-1)} class="w-9 h-9 rounded-full border border-zinc-800 bg-zinc-900 grid place-items-center">‹</button>
          <div class="flex gap-1 items-center">{#each slides as _,i}<span class="w-1.5 h-1.5 rounded-full {i===deckIdx?'bg-white w-4':'bg-zinc-700'}"></span>{/each}</div>
          <button on:click={()=> deckIdx=Math.min(slides.length-1,deckIdx+1)} class="w-9 h-9 rounded-full bg-white text-black grid place-items-center">›</button>
        </div>
      </div>
    </div>
  {:else if view==='posts'}
    <div class="flex flex-col gap-6">
      <h1 class="fraunces text-4xl font-medium">Instagram Carousel Library</h1>
      <div class="flex gap-2">
        <input bind:value={postSearch} placeholder="Search…" class="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm"/>
        <select bind:value={postTag} class="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2 text-xs">
          <option value="all">All</option><option value="tips">tips</option><option value="css">css</option>
        </select>
      </div>
      <div class="flex gap-4 overflow-x-auto scrollbar-none pb-2">
        {#each filteredPosts as p}
          <article on:click={()=> openPost(p.slug)} class="shrink-0 w-[320px] aspect-[4/5] rounded-2xl border border-zinc-800 p-5 flex flex-col cursor-pointer {p.color}">
            <span class="mono text-[10px] uppercase">{p.tag}</span>
            <h3 class="fraunces text-xl font-medium mt-4 flex-1">{p.title}</h3>
            <p class="text-xs mt-2 line-clamp-3">{p.desc}</p>
          </article>
        {/each}
      </div>
    </div>
  {:else if view==='postDetail' && postSlug}
    {@const meta = postsData.find(p=>p.slug===postSlug)}
    {@const sls = postsSlides[postSlug] || []}
    {@const curP = sls[postIdx]}
    <div class="fixed inset-0 z-30 bg-black flex flex-col">
      <div class="h-[56px] border-b border-zinc-800 bg-[#09090b] flex items-center justify-between px-4">
        <button on:click={()=> nav('posts')} class="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs">← All posts</button>
        <span class="text-sm font-semibold">{meta?.title}</span>
        <span class="mono text-xs text-zinc-500">{postIdx+1} / {sls.length}</span>
      </div>
      <div class="flex-1 flex flex-col items-center justify-center p-6 gap-4 bg-gradient-to-br from-zinc-900 to-black">
        <div class="w-full max-w-[380px] aspect-[4/5] rounded-2xl bg-white text-black p-6 flex flex-col">
          <span class="mono text-[10px] uppercase">{curP?.label}</span>
          <h2 class="fraunces text-2xl font-semibold mt-4 flex-1">{curP?.title}</h2>
          <p class="text-sm mt-2">{curP?.body}</p>
          {#if curP?.bullets}<ul class="mt-2 space-y-1">{#each curP.bullets as b}<li class="text-xs">• {b}</li>{/each}</ul>{/if}
        </div>
        <div class="flex gap-2">
          <button on:click={()=> postIdx=Math.max(0,postIdx-1)} class="w-9 h-9 rounded-full border border-zinc-800 bg-zinc-900 text-white grid place-items-center">‹</button>
          <div class="flex gap-1 items-center">{#each sls as _,i}<span class="w-1.5 h-1.5 rounded-full {i===postIdx?'bg-white w-4':'bg-zinc-700'}"></span>{/each}</div>
          <button on:click={()=> postIdx=Math.min(sls.length-1,postIdx+1)} class="w-9 h-9 rounded-full bg-white text-black grid place-items-center">›</button>
        </div>
      </div>
    </div>
  {:else if view==='blog'}
    <div class="flex flex-col gap-6">
      <h1 class="fraunces text-4xl font-medium">Notes from the workshop.</h1>
      <div class="flex gap-2">
        <input bind:value={blogSearch} placeholder="Search notes…" class="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm"/>
        <select bind:value={blogTag} class="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2 text-xs">
          <option value="all">All tags</option><option value="mobile">mobile</option><option value="Expo">Expo</option>
        </select>
      </div>
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
        {#if blogFeatured}
          <div class="p-6">
            <span class="mono text-[11px] text-zinc-500">Latest · {blogFeatured.date}</span>
            <h2 class="fraunces text-2xl font-medium mt-1">{blogFeatured.title}</h2>
            <p class="text-sm text-zinc-400 mt-2">{blogFeatured.excerpt}</p>
            <button on:click={()=> openBlog(blogFeatured.slug)} class="mt-3 mono text-xs border border-zinc-800 rounded-full px-4 py-1">Read →</button>
          </div>
        {/if}
      </div>
      <div class="flex flex-col divide-y divide-zinc-800 border border-zinc-800 rounded-2xl">
        {#each blogRest as b}
          <button on:click={()=> openBlog(b.slug)} class="text-left p-4 hover:bg-zinc-900/50 flex justify-between gap-4">
            <div><div class="mono text-[11px] text-zinc-500">{b.date}</div><div class="font-medium mt-1">{b.title}</div></div>
            <span class="mono text-xs text-zinc-600">→</span>
          </button>
        {/each}
      </div>
    </div>
  {:else if view==='blogDetail' && blogSlug}
    {@const b = blogData.find(x=>x.slug===blogSlug)}
    <div class="max-w-3xl mx-auto">
      <button on:click={()=> nav('blog')} class="mono text-xs text-zinc-500 mb-4">← All posts</button>
      <div class="mono text-[11px] uppercase text-zinc-500">{b?.date} · {b?.mins} min</div>
      <h1 class="fraunces text-3xl font-semibold mt-2">{b?.title}</h1>
      <p class="text-lg text-zinc-300 mt-3">{b?.excerpt}</p>
      <div class="mt-8 prose prose-invert">
        {#if blogFull[blogSlug]}
          {#each blogFull[blogSlug].sections as s}
            <h2 class="fraunces text-xl font-semibold mt-6">{s.title}</h2>
            <div class="text-sm leading-7 text-zinc-300 mt-2">{@html s.body}</div>
          {/each}
        {:else}
          <p class="text-sm text-zinc-300">Full article placeholder for {blogSlug}.</p>
        {/if}
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
        <div class="flex flex-col gap-1 border-r border-zinc-800 pr-4">
          <span class="fraunces text-2xl font-semibold">5+</span>
          <span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Years engineering</span>
          <span class="text-xs text-zinc-500 leading-4">Mobile (Flutter, SwiftUI, Kotlin) + Backend & APIs.</span>
        </div>
        <div class="flex flex-col gap-1 border-r border-zinc-800 pr-4">
          <span class="fraunces text-2xl font-semibold">50+</span>
          <span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Products shipped</span>
          <span class="text-xs text-zinc-500 leading-4">End-to-end — mobile to backend.</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="fraunces text-2xl font-semibold">10K+</span>
          <span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Learners</span>
          <span class="text-xs text-zinc-500 leading-4">100+ records · 50K+ views via CodingSkuy.</span>
        </div>
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

      <!-- featured — CodingSkuy -->
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col gap-4">
        <span class="mono text-[11px] tracking-widest uppercase text-zinc-500">Featured — CodingSkuy! Engineering Journal</span>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <h3 class="fraunces text-xl font-semibold">CodingSkuy!</h3>
            <p class="text-xs mono text-zinc-500">Open engineering journal & knowledge hub — not a startup</p>
            <p class="text-sm leading-6 text-zinc-400 mt-2">Free community contribution documenting learning — 100+ journal records, 10K+ learners, 50K+ total views. Visit <a href="https://roiskhoiron.github.io" class="underline">roiskhoiron.github.io</a> · <a href="https://youtube.com/@codingskuy" class="underline">YouTube @codingskuy</a> · <a href="https://github.com/roiskhoiron" class="underline">github.com/roiskhoiron</a>. Portfolio https://roiskhoiron.github.io — WA +62 823-3462-6354 · rois.khoiron@gmail.com</p>
            <div class="flex gap-2 mt-3">
              <a href="https://roiskhoiron.github.io" target="_blank" class="rounded-full bg-white text-black px-4 py-1.5 text-xs font-medium">Portfolio — 50+ products</a>
              <a href="https://github.com/roiskhoiron/flutter_chat_realtime" target="_blank" class="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs">flutter_chat_realtime</a>
            </div>
          </div>
          <div class="hidden sm:flex flex-col gap-2 mono text-xs text-zinc-500">
            <span class="px-3 py-2 rounded-xl bg-zinc-800 text-white">10K+ learners</span><span class="px-3 py-2 rounded-xl bg-zinc-800 text-white">100+ records</span><span class="px-3 py-2 rounded-xl bg-zinc-800 text-white">50K+ views</span>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">
        <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5">
          <span class="mono text-[11px] uppercase text-zinc-500">Contact</span>
          <p class="text-sm mt-2"><a href="mailto:rois.khoiron@gmail.com" class="underline">rois.khoiron@gmail.com</a> · <a href="https://wa.me/6282334626354" class="underline">WA +62 823-3462-6354</a></p>
          <p class="text-xs text-zinc-500 mt-1">Yogyakarta, Indonesia · Typically responds within 24h · Portfolio: roiskhoiron.github.io</p>
          <p class="text-xs text-zinc-500">GitHub roiskhoiron · 16 followers · Dart, C++, TypeScript · Top: flutter_chat_realtime</p>
        </div>
        <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5">
          <span class="mono text-[11px] uppercase text-zinc-500">Outside the work & Recommendations</span>
          <p class="text-xs leading-5 text-zinc-400 mt-2">Arman Maulana: "Rois is very kind, critical in a positive way, strong problem-solving, skilled technically." · yosa angela: "Rois memastikan alur kerja jelas, komunikatif, semangat belajar hal baru."</p>
          <div class="flex gap-2 mt-3"><button on:click={()=> nav('decks')} class="mono text-xs border border-zinc-800 rounded-full px-3 py-1.5">See the decks →</button><button on:click={()=> nav('blog')} class="mono text-xs border border-zinc-800 rounded-full px-3 py-1.5">Read the blog →</button></div>
        </div>
      </div>
    </div>
  {/if}
</main>

<footer class="border-t border-zinc-800 bg-[#09090b]/70">
  <div class="mx-auto max-w-7xl px-4 py-8 flex justify-between text-xs">
    <div>© 2026 khoirlabs</div>
    <div class="flex gap-4"><button on:click={()=> nav('decks')}>Decks</button><button on:click={()=> nav('posts')}>Posts</button><button on:click={()=> nav('blog')}>Blog</button></div>
  </div>
</footer>
