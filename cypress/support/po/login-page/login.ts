import { selectors as login } from './selectors';
import { Page } from '../base-page';

class LoginPage extends Page {
    constructor() {
        super();
        this.url = '/login';
    }

    getAllElementVisible(): void {
        cy.get(login.userNameField).should('be.visible');
        cy.get(login.passwordField).should('be.visible');
        cy.get(login.submitButton).should('be.visible');
    }

    typeInCredentials(user?: string, password?: string): void {
        const ensureUser = user ?? Cypress.env('user');
        const ensurePassword = password ?? Cypress.env('password');
        cy.get(login.userNameField).type(ensureUser);
        cy.get(login.userNameField).should('have.value', ensureUser);
        cy.get(login.passwordField).type(ensurePassword);
        cy.get(login.passwordField).should('have.value', ensurePassword);
    }

    clickOnSubmitButton(): void {
        cy.get(login.submitButton).should('be.visible');
        cy.get(login.submitButton).click();
    }
}

export default LoginPage;
