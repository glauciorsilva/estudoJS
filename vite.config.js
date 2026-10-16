import { defineConfig } from 'vite';

export default defineConfig({
  // O worker do sandbox precisa ser um único arquivo (é carregado via Blob num iframe isolado).
  worker: { format: 'iife' },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
  },
  test: {
    environment: 'node',
    testTimeout: 15000,
  },
});
