import HomePage from '../../support/po/home-page/home';
import { selectors as headerSeletors } from '../../support/component/header';
import { selectors as homeSelectors } from '../../support/po/home-page/selectors';

const homePage = new HomePage();

describe('Health test for the Login page', () => {

    after(() => {
        cy.logout();
    });

    it('should display the proper elements before and after login', () => {
        cy.login(homePage);
        cy.get(headerSeletors.headerContainer).should('be.visible');
        cy.get(homeSelectors.welcomeText).should('be.visible');
        cy.get(homeSelectors.welcomeText).should('have.text', `Welcome ${Cypress.env('user')}`);
        cy.logout();
    });

    it('should display the proper elements after a page refresh', () => {
        cy.login(homePage);
        homePage.getAllElementVisible();
        cy.get(homeSelectors.welcomeText).should('have.text', `Welcome ${Cypress.env('user')}`);
        cy.reload(true);
        homePage.getAllElementVisible();
        cy.get(homeSelectors.welcomeText).should('have.text', `Welcome ${Cypress.env('user')}`);
    });
});