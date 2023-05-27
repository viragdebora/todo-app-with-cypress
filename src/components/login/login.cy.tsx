import { Login } from './login';
import { loginSelectors } from '../../../cypress/support/selectors/login-page-selectors';

describe('Component tests for the Login component', () => {
    let loginSpy;

    beforeEach(() => {
        loginSpy = cy.spy().as('login-spy');
        cy.mount(<Login login={loginSpy} />);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(loginSelectors.userNameField).should('be.visible');
        cy.get(loginSelectors.passwordField).should('be.visible');
        cy.get(loginSelectors.submitButton).should('be.visible');
        // cy.get(loginSelectors.userNameLabel).should('have.text', 'Username *');
        // cy.get(loginSelectors.passwordLabel).should('have.text', 'Password *');
        cy.get(loginSelectors.submitButton).should('have.text', 'Sign In');
    });

    it('should be able to fill the input and password field', () => {
        cy.get(loginSelectors.userNameField).type('test');
        cy.get(loginSelectors.userNameField).should('have.value', 'test');
        cy.get(loginSelectors.passwordField).type('password');
        cy.get(loginSelectors.passwordField).should('have.value', 'password');
    });

    it('the submit button should not be disabled and should be clickable', () => {
        cy.get(loginSelectors.submitButton).should('be.not.disabled');
        cy.get(loginSelectors.submitButton).click();
    });

    it('should have called with the proper event in case loging in', () => {
        cy.get(loginSelectors.userNameField).type('test');
        cy.get(loginSelectors.passwordField).type('password');
        cy.get(loginSelectors.submitButton).click();
        cy.get('@login-spy').should('have.been.called');
    });
});
