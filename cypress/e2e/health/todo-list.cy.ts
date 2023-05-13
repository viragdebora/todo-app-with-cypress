import { after } from 'mocha';
import TodoPage from '../../support/po/todo-page/todo-page';
import data from '../../fixtures/test-data.json';

const todoPage = new TodoPage();

describe('Health tests for the Todo-List', () => {
    after(() => {
        cy.removeAllTodoList();
        cy.logout();
    });

    it('should display the proper elements on the todo page', () => {
        cy.login(todoPage);
        cy.newTodoList(data.todoListTitle);
        todoPage.selectATodoListFromList(1);
        todoPage.getTodoListElementVisible();
    });
});
