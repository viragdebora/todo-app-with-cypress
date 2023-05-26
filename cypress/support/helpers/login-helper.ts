import { loginSelectors } from '../selectors/login-page-selectors';

export function typeInCredentials(user?: string, password?: string): void {
    const ensureUser = user ?? Cypress.env('user');
    const ensurePassword = password ?? Cypress.env('password');
    cy.get(loginSelectors.userNameField).type(ensureUser);
    cy.get(loginSelectors.userNameField).should('have.value', ensureUser);
    cy.get(loginSelectors.passwordField).type(ensurePassword);
    cy.get(loginSelectors.passwordField).should('have.value', ensurePassword);
}

export function clickOnSubmitButton(): void {
    cy.get(loginSelectors.submitButton).should('be.visible');
    cy.get(loginSelectors.submitButton).click();
}
