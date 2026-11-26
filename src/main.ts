import App from './App.svelte';
// order matters: Tailwind's layers load after app.css, matching the cascade the
// site was designed against when Tailwind was injected at runtime
import './app.css';
import './tailwind.css';

const app = new App({
  target: document.getElementById('app')!
});

export default app;
