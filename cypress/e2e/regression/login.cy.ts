import LoginPage from '../../support/po/login-page/login';
import TodoPage from '../../support/po/todo-page/todo-page';
import data from '../../fixtures/improper-user-credentail.json'

const loginPage = new LoginPage();
const todoPage = new TodoPage();

describe('Regression test for the Login page', () => {

    afterEach(() => {
        cy.logout();
    });

    it('should log in with the proper credentials ', () => {
        cy.visit('');
        cy.url().should('include', loginPage.url);
        loginPage.getAllElementVisible();
        loginPage.typeInCredentials();
        loginPage.clickOnSubmitButton()
        cy.url().should('not.include', loginPage.url);
    });

    it('should not log in with the improper credentials ', () => {
        cy.visit('');
        cy.url().should('include', loginPage.url);
        loginPage.getAllElementVisible();
        loginPage.typeInCredentials(data.username, data.password);
        loginPage.clickOnSubmitButton();
        cy.url().should('include', loginPage.url);
    });

    it('should redirect to login page unauthenticated and after login navigate to the originally opened page ', () => {
        cy.visit(todoPage.url);
        cy.url().should('include', loginPage.url);
        loginPage.getAllElementVisible();
        loginPage.typeInCredentials();
        loginPage.clickOnSubmitButton();
        cy.url().should('include', todoPage.url);
        todoPage.getAllElementVisible();
    });
})