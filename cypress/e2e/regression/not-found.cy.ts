import pageUrls from '../../fixtures/page-urls.json';
import { waitForPageLoad } from '../../support/helpers/page-load-helper';

describe('Regression test for the Login page', () => {
    afterEach(() => {
        cy.logout();
    });

    it('should open the not found error page in case of invalid page', () => {
        cy.visit('/invalidRoute');
        cy.login();
        cy.url().should('include', pageUrls.errorPage);
        waitForPageLoad('error');
    });
});
