import { selectors as errorPage } from './selectors';
import { Page } from '../base-page';

class ErrorPage extends Page {
    constructor() {
        super();
        this.url = '/not-found';
    }

    getAllElementVisible(): void {
        cy.get(errorPage.errorStatus).should('be.visible');
        cy.get(errorPage.errorMessage).should('be.visible');
        cy.get(errorPage.backToHomePageButton).should('be.visible');
    }
}

export default ErrorPage;
