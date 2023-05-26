import { addNewTodoList, selectATodoListFromList } from '../../support/helpers/todo-helper';
import pageUrls from '../../fixtures/page-urls.json';
import data from '../../fixtures/test-data.json';
import { waitForPageLoad } from '../../support/helpers/page-load-helper';

describe('Health tests for the Todo-List', () => {
    after(() => {
        cy.removeAllTodoList();
        cy.logout();
    });

    it('should display the proper elements on the todo page', () => {
        cy.visit(pageUrls.todoPage);
        cy.login();
        addNewTodoList(data.todoListTitle);
        selectATodoListFromList(0);
        waitForPageLoad('todos');
    });
});
