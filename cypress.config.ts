import { defineConfig } from "cypress";
import { devServer as cypressViteDevServer } from '@cypress/vite-dev-server';
import { merge } from 'mochawesome-merge';
import marge from 'mochawesome-report-generator';
import { existsSync } from "fs";
import { rm } from "fs/promises";
import { join } from "path";

export default defineConfig({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/results',
        overwrite: false,
        html: false,
        json: true,
    },
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on('before:run', async () => {
                if (existsSync('./cypress/results')) {
                    await rm('./cypress/results', { recursive: true });
                    console.log('deleted results')
                }
            });
            on('after:run', async () => {
                const report = await merge({
                    files: [
                        join(process.cwd(), './cypress/results/*.json'),
                    ]
                });
                console.log('merge finished');
                marge.create(report);
            });
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
