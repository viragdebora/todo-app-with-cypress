import LoginPage from '../../support/po/login-page/login';
import TodoPage from '../../support/po/todo-page/todo-page';
import HomePage from '../../support/po/home-page/home';
import { selectors as headerSeletors } from '../../support/component/header';

const loginPage = new LoginPage();
const todoPage = new TodoPage();
const homePage = new HomePage();

describe('Regression test for the Login page', () => {
    afterEach(() => {
        cy.logout();
    });

    it('should open the corresponding page when clicking on the header elements', () => {
        cy.login(homePage);
        cy.get(headerSeletors.todosPageButton).click();
        cy.url().should('include', todoPage.url);
        todoPage.getAllElementVisible();
        cy.get(headerSeletors.homePageButton).click();
        cy.url().should('include', homePage.url);
        homePage.getAllElementVisible();
    });

    it('should logout when clicking on the logout button', () => {
        cy.login(homePage);
        cy.get(headerSeletors.avatarButton).click();
        cy.get(headerSeletors.logoutButton).should('be.visible');
        cy.get(headerSeletors.logoutButton).click();
        cy.url().should('include', loginPage.url);
        loginPage.getAllElementVisible();
    });
});
