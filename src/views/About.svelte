<script lang="ts">
  import { onMount } from 'svelte';
  import { split, countUp } from '../lib/fx';
  import { profile, stats, principles, experience, skills, recommendations } from '../lib/profile';

  // Live numbers for the open-source project; cached for the session because the
  // unauthenticated GitHub API allows only 60 requests an hour per visitor.
  // a figure that failed to load is left out rather than shown as 0
  let cs: { installs?: number; stars?: number; contributors?: number } | null = null;
  onMount(async () => {
    try { const c = sessionStorage.getItem('kl-cs-stats'); if (c) { cs = JSON.parse(c); return; } } catch {}
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 4000);
    const get = (u: string) => fetch(u, { signal: ctrl.signal }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    const today = new Date().toISOString().slice(0, 10);
    const [npm, repo, con] = await Promise.all([
      get(`https://api.npmjs.org/downloads/point/2026-07-13:${today}/@codingskuy/coding-school`),
      get('https://api.github.com/repos/codingskuy/coding-school'),
      get('https://api.github.com/repos/codingskuy/coding-school/contributors')
    ]);
    clearTimeout(to);
    if (!npm && !repo) return; // show nothing rather than zeros
    cs = { installs: npm?.downloads, stars: repo?.stargazers_count, contributors: Array.isArray(con) && con.length ? con.length : undefined };
    try { sessionStorage.setItem('kl-cs-stats', JSON.stringify(cs)); } catch {}
  });
</script>

<header class="page-head">
  <p class="label">About · {profile.base}</p>
  <h1 class="h1" use:split>{`${profile.name}.`} <span class="hl">Mobile, backend &amp; AI.</span></h1>
  <p class="lead">{profile.intro} Product-driven, end to end, and system-thinking.</p>
  <div class="row" style="margin-top:6px">
    <a class="btn btn-ink" href="mailto:{profile.email}">{profile.email}</a>
    <a class="btn btn-line" href={profile.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
  </div>
  <p class="hero-ext">
    <a class="link" href={profile.links.github} target="_blank" rel="noopener">GitHub ↗</a>
    <a class="link" href={profile.links.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
    <a class="link" href={profile.links.youtube} target="_blank" rel="noopener">YouTube ↗</a>
    <a class="link" href={profile.links.instagram} target="_blank" rel="noopener">Instagram ↗</a>
  </p>
</header>

<div class="stats">
  {#each stats as s}
    <div><div class="n" use:countUp>{s.n}</div><div class="label" style="margin-top:8px">{s.label}</div><p class="small muted note" style="margin-top:4px">{s.note}</p></div>
  {/each}
</div>

<section class="section" aria-labelledby="build-h">
  <div class="section-head"><span class="no">01</span><h2 class="h2" id="build-h">How I build.</h2></div>
  <ol class="principles">
    {#each principles as [title, text]}
      <li><div><h3 class="h3">{title}</h3><p class="muted small" style="margin-top:4px">{text}</p></div></li>
    {/each}
  </ol>
</section>

<section class="section" aria-labelledby="xp-h">
  <div class="section-head"><span class="no">02</span><h2 class="h2" id="xp-h">Experience.</h2></div>
  {#each experience as x}
    <article class="xp">
      <div><p class="label">{x.date}</p><p class="mono muted" style="margin-top:4px">{x.loc}</p></div>
      <div>
        <h3 class="h3">{x.role}</h3>
        <p class="muted">{x.company}</p>
        <ul>{#each x.bullets as b}<li>{b}</li>{/each}</ul>
        <div class="row" style="gap:6px;margin-top:12px">{#each x.tags as t}<span class="tag">{t}</span>{/each}</div>
      </div>
    </article>
  {/each}
</section>

<section class="section" aria-labelledby="skills-h">
  <div class="section-head"><span class="no">03</span><h2 class="h2" id="skills-h">Skills &amp; tools.</h2></div>
  <dl class="facts" style="border-top:0">
    {#each skills as [group, list]}
      <div><dt class="label">{group}</dt><dd>{list.join(' · ')}</dd></div>
    {/each}
  </dl>
</section>

<section class="section" aria-labelledby="oss-h">
  <div class="section-head"><span class="no">04</span><h2 class="h2" id="oss-h">Open source.</h2></div>
  <div class="feature" style="margin-top:20px">
    <div class="stack" style="gap:10px">
      <p class="label pen">Featured project</p>
      <h3 class="h2">CodingSchool</h3>
      <p class="muted">An AI engineering mentor for OpenCode, Claude Code and any MCP host. It teaches, reviews and grows you through real projects instead of writing the code for you. MIT licensed.</p>
      <div class="row">
        <code class="cmd">npm i @codingskuy/coding-school</code>
        <a class="link small" href="https://github.com/codingskuy/coding-school" target="_blank" rel="noopener">Source on GitHub ↗</a>
        <a class="link small" href="#blog/codingschool-mentor-ai">Read the note →</a>
      </div>
    </div>
    {#if cs}
      <dl class="mono" style="display:grid;grid-template-columns:auto auto;gap:6px 14px;align-content:center">
        {#if cs.stars != null}<dt class="muted">stars</dt><dd>{cs.stars.toLocaleString()}</dd>{/if}
        {#if cs.contributors != null}<dt class="muted">contributors</dt><dd>{cs.contributors}</dd>{/if}
        {#if cs.installs != null}<dt class="muted">installs</dt><dd>{cs.installs.toLocaleString()}</dd>{/if}
      </dl>
    {/if}
  </div>
</section>

<section class="section" aria-labelledby="contact-h">
  <div class="section-head"><span class="no">05</span><h2 class="h2" id="contact-h">Say hello.</h2></div>
  <div class="two" style="padding-top:20px">
    <div class="stack" style="gap:14px">
      <p class="lead">The fastest way to reach me is email or WhatsApp. I usually reply within 24 hours.</p>
      <p><a class="link" href="mailto:{profile.email}">{profile.email}</a><br /><a class="link" href={profile.whatsapp} target="_blank" rel="noopener">WhatsApp {profile.whatsappLabel}</a></p>
      <div class="row"><a class="btn btn-line" href="#decks">See the decks</a><a class="btn btn-line" href="#blog">Read the notes</a></div>
    </div>
    <div class="stack" style="gap:18px">
      <p class="label">What colleagues say</p>
      {#each recommendations as r}
        <blockquote class="quote"><p>“{r.text}”</p><cite class="label">{r.by}</cite></blockquote>
      {/each}
    </div>
  </div>
</section>
