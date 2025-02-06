import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3005,
        origin: ' http://127.0.0.1:3005',
    },
    resolve: {
        alias: {
            src: '/src',
            components: '/src/components',
            context: '/src/calendar/context',
            utils: '/src/utils',
            test: '/src/test',
            hooks: '/src/hooks',
            shared: '/src/shared',
            types: '/src/types',
        },
    },
});

