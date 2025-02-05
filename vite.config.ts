import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: './',
    resolve: {
        alias: {
            src: '/',
            components: '/src/components',
            context: '/src/context',
            shared: '/src/shared',
            utils: '/src/utils',
            types: '/src/types',
        },
    },
});
