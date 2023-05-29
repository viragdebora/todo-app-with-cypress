import { BrowserRouter } from 'react-router-dom';
import { Header } from './header';
import { headerSelectors } from '../../../cypress/support/selectors/header';

describe('Component tests for the Header component', () => {
    let logoutSpy;

    beforeEach(() => {
        logoutSpy = cy.spy().as('logout-spy');
        cy.mount(<BrowserRouter>
            <Header
                login= {() => null}
                logout= {logoutSpy}
            />
        </BrowserRouter>);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(headerSelectors.homePageButton).should('be.visible');
        cy.get(headerSelectors.todosPageButton).should('be.visible');
        cy.get(headerSelectors.avatarButton).should('be.visible');
        cy.get(headerSelectors.homePageButton).should('include.text', 'Home');
        cy.get(headerSelectors.todosPageButton).should('include.text', 'Todo');
        cy.get(headerSelectors.avatarButton).click();
        cy.get(headerSelectors.logoutButton).should('be.visible');
        cy.get(headerSelectors.logoutButton).should('include.text', 'Logout');
    });

    it('the menu items should not be disabled', () => {
        cy.get(headerSelectors.homePageButton).should('be.not.disabled');
        cy.get(headerSelectors.todosPageButton).should('be.not.disabled');
        cy.get(headerSelectors.homePageButton).should('be.not.disabled');
        cy.get(headerSelectors.avatarButton).should('be.not.disabled');
        cy.get(headerSelectors.avatarButton).click();
        cy.get(headerSelectors.logoutButton).should('be.not.disabled');
    });

    it('should have called with the proper event in case of clicking on the logout button', () => {
        cy.get(headerSelectors.avatarButton).click();
        cy.get(headerSelectors.logoutButton).click();
        cy.get('@logout-spy').should('have.been.called');
    });
});
