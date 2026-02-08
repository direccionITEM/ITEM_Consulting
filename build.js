#!/usr/bin/env node
import { build } from 'vite';

// Build de producción
build({
  mode: 'production',
}).then(() => {
  console.log('Build completed successfully!');
  process.exit(0);
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
