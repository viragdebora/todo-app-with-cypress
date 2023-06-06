import pageUrls from '../../fixtures/page-urls.json';
import { registerCommand } from '../commands/command-register';
import { clickOnSubmitButton, typeInCredentials } from '../helpers/login-helper';
import { waitForPageLoad } from '../helpers/page-load-helper';

export function loginAppAction(): void {
    cy.url().should('contain', pageUrls.loginPage).then(() => {
        cy.window()
            .its('appActions')
            .its('authModel')
            .invoke('login', Cypress.env('user'), Cypress.env('password'));
        cy.url().should('not.include', pageUrls.loginPage);
    });
}

export function loginNonAppAction(): void {
    cy.url().should('include', pageUrls.loginPage);
    waitForPageLoad('login');
    typeInCredentials();
    clickOnSubmitButton();
    cy.url().should('not.include', pageUrls.loginPage);
}

registerCommand('login', loginAppAction, loginNonAppAction);
