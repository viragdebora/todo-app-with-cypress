import pageUrls from '../../fixtures/page-urls.json';
import { typeInCredentials, clickOnSubmitButton } from '../../support/helpers/login-helper';
import { waitForPageLoad } from '../../support/helpers/page-load-helper';

describe('Health test for the Login page', () => {
    after(() => {
        cy.logout();
    });

    it('should display the proper elements before and after login', () => {
        cy.visit(pageUrls.loginPage);
        cy.url().should('include', pageUrls.loginPage);
        waitForPageLoad('login');
        typeInCredentials();
        clickOnSubmitButton();
        cy.url().should('not.include', pageUrls.loginPage);
        waitForPageLoad('home');
    });
});
