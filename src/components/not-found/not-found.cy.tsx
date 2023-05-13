import { NotFound } from './not-found';
import { selectors } from '../../../cypress/support/po/error-page/selectors';
import { BrowserRouter } from 'react-router-dom';

describe('Component tests for the Not Found component', () => {
    beforeEach(() => {
        cy.mount(<BrowserRouter>
            <NotFound />
        </BrowserRouter>);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(selectors.errorStatus).should('be.visible');
        cy.get(selectors.errorMessage).should('be.visible');
        cy.get(selectors.backToHomePageButton).should('be.visible');
        cy.get(selectors.errorStatus).should('have.text', '404');
        cy.get(selectors.errorMessage).should('have.text', 'The page you\'re looking for doesn\'t exist.');
        cy.get(selectors.backToHomePageButton).should('have.text', 'Back Home');
    });

    it('the back to home button should not be disabled and should be clickable', () => {
        cy.get(selectors.backToHomePageButton).should('be.not.disabled');
        cy.get(selectors.backToHomePageButton).click();
    });
});
