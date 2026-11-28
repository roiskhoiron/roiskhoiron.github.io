import '@fontsource-variable/anybody/wdth.css';
import '@fontsource-variable/onest/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import './design/tokens.css';
import './styles.css';
import App from './App.svelte';

// After a deploy, a tab opened earlier still asks for the old hashed chunks, which no
// longer exist. Reload once to pick up the new build instead of leaving a dead page.
addEventListener('vite:preloadError', (e) => {
  try {
    if (sessionStorage.getItem('kl-reloaded') === location.href) return; // already tried
    sessionStorage.setItem('kl-reloaded', location.href);
  } catch {}
  e.preventDefault();
  location.reload();
});

const app = new App({ target: document.getElementById('app')! });

export default app;
