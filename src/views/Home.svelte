<script lang="ts">
  import { videosData } from '../lib/data';
  import { allDecks, allPosts, allNotes } from '../lib/content';
  import { buildFeed, fmtDate, kindLabel, kindRoute, type FeedKind } from '../lib/feed';
  import { profile, experience } from '../lib/profile';
  import { resume, clearResume } from '../lib/resume';
  import { split, fling } from '../lib/fx';
  import portrait400 from '../assets/portrait-400.webp';
  import portrait800 from '../assets/portrait-800.webp';

  const feed = buildFeed();
  const tabs: ['all' | FeedKind, string][] = [['all', 'All'], ['blog', 'Blog'], ['post', 'Carousels'], ['deck', 'Decks']];
  const count = (k: 'all' | FeedKind) => (k === 'all' ? feed.length : feed.filter((f) => f.kind === k).length);
  let kind: 'all' | FeedKind = 'all';
  // in "All", a topic published as both a deck and a carousel is listed once
  $: items = (kind === 'all' ? feed.filter((f, i) => feed.findIndex((g) => g.title === f.title) === i) : feed.filter((f) => f.kind === kind)).slice(0, 6);
  $: allHref = kind === 'all' || kind === 'blog' ? '#blog' : '#' + kindRoute[kind];
  $: allText = kind === 'deck' ? `All ${allDecks.length} decks` : kind === 'post' ? `All ${allPosts.length} carousels` : `All ${allNotes.length} notes`;
  const pick = allNotes.find((b) => b.featured) ?? allNotes[0];
  const cta = { blog: 'Read', post: 'Swipe', deck: 'Open' };
  // stickers land somewhere different on every visit
  const stickers = profile.stack.map((name) => ({ name, left: Math.random() * 68, top: 1 + Math.random() * 46 }));
  const ticker = [...profile.stack, 'Backend & APIs', 'AI', 'ngoding kuy!'];
</script>

<section class="hero">
  <div class="hero-copy">
    <p class="hello"><i>👋</i> {profile.name} · {profile.role} · {profile.base}</p>
    <h1 class="display" use:split>Complete products,<br /><span class="hl">not just apps.</span></h1>
    <p class="lead">5+ years building mobile products end to end — Flutter, SwiftUI and Kotlin on the device, the backend systems and APIs behind it, and AI where it earns its place.</p>
    <div class="hero-cta">
      <a class="btn btn-ink" href="#about">See how I work <span aria-hidden="true">→</span></a>
      <a class="btn btn-line" href="#decks">Browse the library</a>
    </div>
    {#if $resume}
      <div class="resume">
        <a href="#{kindRoute[$resume.kind]}/{$resume.slug}">
          <span class="label pen">Continue</span>
          <b>{$resume.title}</b>
          {#if $resume.total > 1}<span class="small muted">{$resume.idx + 1}/{$resume.total}</span>{/if}
        </a>
        <button on:click={clearResume} aria-label="Dismiss">✕</button>
      </div>
    {/if}
    <p class="hero-ext">
      <a class="link" href={profile.links.appstore} target="_blank" rel="noopener">App Store ↗</a>
      <a class="link" href={profile.links.github} target="_blank" rel="noopener">GitHub ↗</a>
      <a class="link" href={profile.links.youtube} target="_blank" rel="noopener">CodingSkuy on YouTube ↗</a>
    </p>
  </div>

  <div class="hero-art">
  {#each stickers as s}
    <span class="sticker" style="left:{s.left}%;top:{s.top}%" use:fling data-cursor="throw">{s.name}</span>
  {/each}
  <span class="hint" aria-hidden="true">↑ throw the stickers</span>
  <aside class="spec" aria-label="Profile summary">
    <figure class="spec-photo">
      <img src={portrait400} srcset="{portrait400} 400w, {portrait800} 800w" sizes="(min-width: 900px) 380px, 92vw" width="400" height="400" alt="Portrait of Khoiron Rois" fetchpriority="high" />
      <figcaption>5+ yrs</figcaption>
    </figure>
    <dl>
      <dt>Name</dt><dd>{profile.name}</dd>
      <dt>Focus</dt><dd>{profile.focus}</dd>
      <dt>Stack</dt><dd>{profile.stack.join(' · ')}</dd>
      <dt>Base</dt><dd>{profile.base} · {profile.tz}</dd>
      <dt>Teaches</dt><dd>CodingSkuy</dd>
    </dl>
  </aside>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">{#each [...ticker, ...ticker, ...ticker, ...ticker] as t}<span>{t} ✦</span>{/each}</div>
</div>

<section class="section" aria-labelledby="paths-h">
  <div class="section-head"><span class="no">01</span><h2 class="h2" id="paths-h">What brings you here?</h2></div>
  <div class="paths">
    <article class="path" data-cursor="go">
      <span class="big" aria-hidden="true">A</span>
      <p class="label">Hiring or collaborating</p>
      <h3 class="h3"><a href="#about"><span>See how I work</span></a></h3>
      <p class="muted small">Experience, stack and shipped products, then a direct line to me. Two minutes, top to bottom.</p>
      <span class="go">Experience &amp; contact</span>
    </article>
    <article class="path" data-cursor="go">
      <span class="big" aria-hidden="true">B</span>
      <p class="label">Learning</p>
      <h3 class="h3"><a href="#decks"><span>Learn something in 5 minutes</span></a></h3>
      <p class="muted small">{allDecks.length} slide decks, {allPosts.length} swipeable carousels and {videosData.length} CodingSkuy videos: history, theory and hands-on practice.</p>
      <span class="go">Open the library</span>
    </article>
    <article class="path" data-cursor="go">
      <span class="big" aria-hidden="true">C</span>
      <p class="label">Just curious</p>
      <h3 class="h3"><a href="#blog/{pick.slug}"><span>Read a field note</span></a></h3>
      <p class="muted small">“{pick.title}” — {pick.mins} min. One of {allNotes.length} field notes on software, from history to AI.</p>
      <span class="go">Start reading</span>
    </article>
  </div>
</section>

<section class="section" aria-labelledby="recent-h">
  <div class="section-head">
    <span class="no">02</span><h2 class="h2" id="recent-h">Fresh from the lab.</h2>
    <div class="tabs tools" role="group" aria-label="Filter recent items">
      {#each tabs as [k, label]}
        <button class="tab" aria-pressed={kind === k} on:click={() => (kind = k)}>{label}<span class="n">{count(k)}</span></button>
      {/each}
    </div>
  </div>
  <div class="entries">
    {#each items as it (it.kind + it.slug)}
      <article class="entry" data-cursor={cta[it.kind]}>
        <div class="entry-meta"><span>{fmtDate(it.date)}</span><span class="kind kind-{it.kind}">{kindLabel[it.kind]}</span></div>
        <div>
          <h3 class="entry-title"><a href="#{kindRoute[it.kind]}/{it.slug}"><span>{it.title}</span></a></h3>
          <p>{it.desc}</p>
        </div>
        <span class="go">{cta[it.kind]} · {it.meta}</span>
      </article>
    {/each}
  </div>
  <p style="margin-top:20px"><a class="btn btn-line" href={allHref}>{allText} →</a></p>
</section>

<section class="section" aria-labelledby="about-h">
  <div class="section-head"><span class="no">03</span><h2 class="h2" id="about-h">About, in short.</h2></div>
  <div class="two" style="padding-top:20px">
    <div class="stack" style="gap:18px">
      <p class="lead">Hi, I'm Khoiron. I work where mobile, backend and AI meet: building for enterprise at Digital Sekuriti Indonesia (AI Care, Callink) and teaching through CodingSkuy.</p>
      <div class="row">
        <a class="btn btn-ink" href="#about">Read the full story</a>
        <a class="btn btn-line" href="mailto:{profile.email}">Get in touch</a>
      </div>
    </div>
    <dl class="facts">
      {#each experience.slice(0, 3) as x}
        <div><dt class="label">{x.date}</dt><dd><b>{x.role}</b><br />{x.company}</dd></div>
      {/each}
      <div><dt class="label">Working with</dt><dd>On-site, hybrid or remote · product + engineering</dd></div>
      <div><dt class="label">Side projects</dt><dd>CodingSchool · CodingSkuy</dd></div>
    </dl>
  </div>
</section>
