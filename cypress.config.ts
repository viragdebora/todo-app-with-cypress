import { defineConfig } from "cypress";

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
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },
});
