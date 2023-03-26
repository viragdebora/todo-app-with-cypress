import LoginPage from '../../support/po/login-page/login';
import { selectors as headerSeletors } from '../../support/component/header';

const loginPage = new LoginPage();

describe('Health test for the Login page', () => {

    after(() => {
        cy.logout();
    });

    it('should display the proper elements before and after login', () => {
        cy.visit(loginPage.url);
        cy.url().should('include', loginPage.url);
        loginPage.getAllElementVisible();
        loginPage.typeInCredentials();
        loginPage.clickOnSubmitButton()
        cy.url().should('not.include', loginPage.url);
        cy.url().should('include', '');
        cy.get(headerSeletors.headerContainer).should('be.visible');
    });
});