import TodoPage from "../../support/po/todo-page/todo-page";
import NotFound from '../../support/po/error-page/error-page';

const todoPage = new TodoPage();
const notFoundPage = new NotFound();

describe('Regression test for the Login page', () => {

    afterEach(() => {
        cy.logout();
    });

    it('should open the not found error page in case of invalid page', () => {
        cy.login(todoPage);
        cy.visit('/invalidRoute');
        cy.url().should('include', notFoundPage.url);
        notFoundPage.getAllElementVisible();
    });

})