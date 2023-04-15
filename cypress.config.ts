import { defineConfig } from "cypress";
import { devServer as cypressViteDevServer } from '@cypress/vite-dev-server';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:5173',
        excludeSpecPattern: './cypress/e2e/exclude/*',
        video: false
    },

    component: {
        devServer: (config) => {
            return cypressViteDevServer(config);
        }
    },
});
