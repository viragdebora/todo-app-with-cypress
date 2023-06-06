import './commands';

import { mount } from 'cypress/react18';

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }

        interface Cypress {
            env(key: 'user'): string;
            env(key: 'password'): string;
            env(key: 'non-app-action'): string;
        }
    }
}

Cypress.Commands.add('mount', mount);
