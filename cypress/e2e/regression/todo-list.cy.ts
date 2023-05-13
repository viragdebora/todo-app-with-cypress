import TodoPage from '../../support/po/todo-page/todo-page';
import { selectors as todoSelectors } from '../../support/po/todo-page/selectors';
import domElements from '../../fixtures/dom-elements.json';
import data from '../../fixtures/test-data.json';
import { afterEach, beforeEach } from 'mocha';
const todoPage = new TodoPage();

describe('Regression tests for the Todo-List items', () => {
    beforeEach(() => {
        cy.login(todoPage);
        cy.newTodoList('Test Todo List');
        cy.get(todoSelectors.todoListItems).should('have.length', '1');
        todoPage.selectATodoListFromList(1);
        todoPage.getTodoListElementVisible();
        cy.addTodoToTodoList(1, data.todoListItemFirst);
        cy.addTodoToTodoList(1, data.todoListItemSecond);
        cy.addTodoToTodoList(1, data.todoListItemThird);
        cy.get(todoSelectors.todoItem).should('have.length', '3');
    });

    afterEach(() => {
        cy.removeAllTodoList();
        cy.logout();
    });

    data.todoListItems.forEach(item => {
        it(`should add item to the todo list with title - ${item}`, () => {
            cy.addTodoToTodoList(1, item);
            cy.get(todoSelectors.todoItem).should('have.length', '4');
        });
    });

    it('should be able to mark the todos as finished', () => {
        cy.get(todoSelectors.todoItemCheckbox).eq(1).click();
        cy.get(todoSelectors.todoItemCheckbox).eq(1).should('have.class', domElements.checkedClass);
        cy.get(todoSelectors.todoItem).should('have.length', '3');
    });

    it('should be able to remove the checked chechbox', () => {
        cy.get(todoSelectors.todoItemCheckbox).eq(1).click();
        cy.get(todoSelectors.todoItem).should('have.length', '3');
        cy.get(todoSelectors.todoItemCheckbox).eq(1).click();
        cy.get(todoSelectors.todoItemCheckbox).eq(1).should('not.have.class', domElements.checkedClass);
    });

    it('should be able to delete a todo item from the list', () => {
        cy.get(todoSelectors.todoItemDeleteButton).eq(1).should('be.visible');
        cy.get(todoSelectors.todoItemDeleteButton).eq(1).click();
        cy.get(todoSelectors.todoItemTitle).eq(1).should('not.contain.text', data.todoListItemSecond);
        cy.get(todoSelectors.todoItem).should('have.length', '2');
    });

    it('should be able to re-add todo items to the list', () => {
        cy.get(todoSelectors.todoItemDeleteButton).eq(1).click();
        cy.get(todoSelectors.todoItemTitle).eq(1).should('not.contain.text', data.todoListItemSecond);
        cy.get(todoSelectors.todoItem).should('have.length', '2');
        cy.addTodoToTodoList(1, 'Second Todo item');
        cy.get(todoSelectors.todoItem).should('have.length', '3');
    });

    it('should handle page refresh', () => {
        cy.get(todoSelectors.todoItem).should('have.length', '3');
        cy.get(todoSelectors.todoListItems).eq(0).should('have.class', domElements.selectedClass);
        cy.reload(true);
        todoPage.getTodoListElementVisible();
        cy.get(todoSelectors.todoItem).should('have.length', '3');
        cy.get(todoSelectors.todoListItems).eq(0).should('have.class', domElements.selectedClass);
    });
});
