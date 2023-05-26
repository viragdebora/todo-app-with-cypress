import data from '../../fixtures/improper-user-credentail.json';
import { waitForPageLoad } from '../../support/helpers/page-load-helper';
import pageUrls from '../../fixtures/page-urls.json';
import { clickOnSubmitButton, typeInCredentials } from '../../support/helpers/login-helper';

describe('Regression test for the Login page', () => {
    it('should not log in with the improper credentials ', () => {
        cy.visit('');
        cy.url().should('include', pageUrls.loginPage);
        waitForPageLoad('login');
        typeInCredentials(data.username, data.password);
        clickOnSubmitButton();
        cy.url().should('include', pageUrls.loginPage);
    });

    it('should redirect to login page unauthenticated and after login navigate to the originally opened page ', () => {
        cy.visit(pageUrls.todoPage);
        cy.url().should('include', pageUrls.loginPage);
        waitForPageLoad('login');
        typeInCredentials();
        clickOnSubmitButton();
        cy.url().should('include', pageUrls.todoPage);
        waitForPageLoad('basicTodo');
        cy.logout();
    });
});
