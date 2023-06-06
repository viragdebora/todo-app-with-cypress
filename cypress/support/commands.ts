import { type CustomCommands } from './commands/command-register';

declare global {
    namespace Cypress {
        interface Chainable extends CustomCommands {}
    }
}

Cypress.Commands.add('waitUntilElementsVisible', (selectors) => {
    for (const selector of selectors) {
        cy.get(selector).should('be.visible');
    }
});
