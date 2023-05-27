import { BrowserRouter } from 'react-router-dom';
import { NotFound } from './not-found';
import { errorPageSelectors } from '../../../cypress/support/selectors/error-page-selectors';

describe('Component tests for the Not Found component', () => {
    beforeEach(() => {
        cy.mount(<BrowserRouter>
            <NotFound />
        </BrowserRouter>);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(errorPageSelectors.errorStatus).should('be.visible');
        cy.get(errorPageSelectors.errorMessage).should('be.visible');
        cy.get(errorPageSelectors.backToHomePageButton).should('be.visible');
        cy.get(errorPageSelectors.errorStatus).should('have.text', '404');
        cy.get(errorPageSelectors.errorMessage).should('have.text', 'The page you\'re looking for doesn\'t exist.');
        cy.get(errorPageSelectors.backToHomePageButton).should('have.text', 'Back Home');
    });

    it('the back to home button should not be disabled and should be clickable', () => {
        cy.get(errorPageSelectors.backToHomePageButton).should('be.not.disabled');
        cy.get(errorPageSelectors.backToHomePageButton).click();
    });
});
