import { dependencies } from './package.json';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompression from 'vite-plugin-compression';

function renderChunks(deps: Record<string, string>) {
    let chunks = {};
    Object.keys(deps).forEach((key) => {
        if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
        chunks[key] = [key];
    });
    return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteCompression()],
    resolve: {
        alias: {
            '@/components': path.resolve(__dirname, './src/components'),
            '@/pages': path.resolve(__dirname, './src/pages'),
            '@/interfaces': path.resolve(__dirname, './src/shared/interfaces'),
            '@/features': path.resolve(__dirname, './src/features'),
            '@/redux-hooks': path.resolve(__dirname, './src/app/hooks.ts'),
            '@/hooks': path.resolve(__dirname, './src/hooks'),
            '@/queries': path.resolve(__dirname, './src/queries'),
            '@/services': path.resolve(
                __dirname,
                './src/services/axios.config.ts'
            ),
            '@/utils': path.resolve(__dirname, './src/shared/utils'),
        },
    },
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-router-dom', 'react-dom'],
                    ...renderChunks(dependencies),
                },
            },
        },
    },
});
