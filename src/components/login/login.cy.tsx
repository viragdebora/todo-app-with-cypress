import { createStoreon } from 'storeon';
import { StoreContext } from 'storeon/react';
import { Login } from './login';
import { selectors } from '../../../cypress/support/selectors/login-page-selectors';

describe('Component tests for the Login component', () => {
    let loginSpy;

    beforeEach(() => {
        loginSpy = cy.spy().as('login-spy');
        const store = createStoreon([(s) => s.on('@init', () => ({ auth: {} }))]);
        cy.mount(<StoreContext.Provider value={store}>
            <Login login={loginSpy} />
        </StoreContext.Provider>);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(selectors.userNameField).should('be.visible');
        cy.get(selectors.passwordField).should('be.visible');
        cy.get(selectors.submitButton).should('be.visible');
        // cy.get(selectors.userNameLabel).should('have.text', 'Username *');
        // cy.get(selectors.passwordLabel).should('have.text', 'Password *');
        cy.get(selectors.submitButton).should('have.text', 'Sign In');
    });

    it('should be able to fill the input and password field', () => {
        cy.get(selectors.userNameField).type('test');
        cy.get(selectors.userNameField).should('have.value', 'test');
        cy.get(selectors.passwordField).type('password');
        cy.get(selectors.passwordField).should('have.value', 'password');
    });

    it('the submit button should not be disabled and should be clickable', () => {
        cy.get(selectors.submitButton).should('be.not.disabled');
        cy.get(selectors.submitButton).click();
    });

    it('should have called with the proper event in case loging in', () => {
        cy.get(selectors.userNameField).type('test');
        cy.get(selectors.passwordField).type('password');
        cy.get(selectors.submitButton).click();
        cy.get('@login-spy').should('have.been.called');
    });
});
