// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // No server runtime: the whole site ships as static files, which keeps
  // the deployed attack surface limited to headers + static file serving.
  output: 'static',
});
