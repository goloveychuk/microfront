import { entrypoint } from './dep.mjs';

setTimeout(async () => {
  import('./mod.mjs');
  await entrypoint();
}, 10);
