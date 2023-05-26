import { headerSelectors } from '../../support/selectors/header';
import pageUrls from '../../fixtures/page-urls.json';
import { waitForPageLoad } from '../../support/helpers/page-load-helper';

describe('Regression test for the Login page', () => {
    beforeEach(() => {
        cy.visit(pageUrls.homePage);
        cy.login();
    });

    it('should open the corresponding page when clicking on the header elements', () => {
        cy.get(headerSelectors.todosPageButton).click();
        cy.url().should('include', pageUrls.todoPage);
        waitForPageLoad('basicTodo');
        cy.get(headerSelectors.homePageButton).click();
        cy.url().should('include', pageUrls.homePage);
        waitForPageLoad('home');
        cy.logout();
    });

    it('should logout when clicking on the logout button', () => {
        waitForPageLoad('home');
        cy.get(headerSelectors.avatarButton).click();
        cy.get(headerSelectors.logoutButton).should('be.visible');
        cy.get(headerSelectors.logoutButton).click();
        cy.url().should('include', pageUrls.loginPage);
        waitForPageLoad('login');
    });
});
