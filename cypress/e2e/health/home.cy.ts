import pageUrls from '../../fixtures/page-urls.json';
import { headerSelectors } from '../../support/selectors/header';
import { homePageSelectors } from '../../support/selectors/home-page-selectors';
import { waitForPageLoad } from '../../support/helpers/page-load-helper';

describe('Health test for the Home page', () => {
    beforeEach(() => {
        cy.visit(pageUrls.homePage);
        cy.login();
    });

    afterEach(() => {
        cy.logout();
    });

    it('should display the proper elements before and after login', () => {
        cy.get(headerSelectors.headerContainer).should('be.visible');
        cy.get(homePageSelectors.welcomeText).should('be.visible');
        cy.get(homePageSelectors.welcomeText).should('have.text', `Welcome ${Cypress.env('user')}`);
    });

    it('should display the proper elements after a page refresh', () => {
        waitForPageLoad('home');
        cy.get(homePageSelectors.welcomeText).should('have.text', `Welcome ${Cypress.env('user')}`);
        cy.reload(true);
        waitForPageLoad('home');
        cy.get(homePageSelectors.welcomeText).should('have.text', `Welcome ${Cypress.env('user')}`);
    });
});
