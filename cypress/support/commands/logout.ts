import pageUrls from '../../fixtures/page-urls.json';
import { registerCommand } from '../commands/command-register';
import { headerSelectors } from '../selectors/header';

export function logoutAppAction(): void {
    cy.url().should('not.include', pageUrls.loginPage).then(() => {
        cy.window()
            .its('appActions')
            .its('authModel')
            .invoke('logout');
    });
    cy.url().should('include', pageUrls.loginPage);
}

export function logoutNonAppAction(): void {
    cy.get(headerSelectors.avatarButton).click();
    cy.get(headerSelectors.logoutButton).should('be.visible');
    cy.get(headerSelectors.logoutButton).click();
    cy.url().should('include', pageUrls.loginPage);
}

registerCommand('logout', logoutAppAction, logoutNonAppAction);
