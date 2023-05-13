import { BrowserRouter } from 'react-router-dom';
import { Header } from './header';
import { selectors } from '../../../cypress/support/component/header';

describe('Component tests for the Header component', () => {
    let logoutSpy;

    beforeEach(() => {
        logoutSpy = cy.spy().as('logout-spy');
        cy.mount(<BrowserRouter>
            <Header
                username={'string'}
                isAuthenticated={false}
                login= {() => null}
                logout= {logoutSpy}
            />
        </BrowserRouter>);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(selectors.homePageButton).should('be.visible');
        cy.get(selectors.todosPageButton).should('be.visible');
        cy.get(selectors.avatarButton).should('be.visible');
        cy.get(selectors.homePageButton).should('include.text', 'Home');
        cy.get(selectors.todosPageButton).should('include.text', 'Todo');
        cy.get(selectors.avatarButton).click();
        cy.get(selectors.logoutButton).should('be.visible');
        cy.get(selectors.logoutButton).should('include.text', 'Logout');
    });

    it('the menu items should not be disabled', () => {
        cy.get(selectors.homePageButton).should('be.not.disabled');
        cy.get(selectors.todosPageButton).should('be.not.disabled');
        cy.get(selectors.homePageButton).should('be.not.disabled');
        cy.get(selectors.avatarButton).should('be.not.disabled');
        cy.get(selectors.avatarButton).click();
        cy.get(selectors.logoutButton).should('be.not.disabled');
    });

    it('should have called with the proper event in case of clicking on the logout button', () => {
        cy.get(selectors.avatarButton).click();
        cy.get(selectors.logoutButton).click();
        cy.get('@logout-spy').should('have.been.called');
    });
});
