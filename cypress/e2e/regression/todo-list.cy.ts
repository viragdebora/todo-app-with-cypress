import { todoPageSelectors } from '../../support/selectors/todo-page-selectors';
import domElements from '../../fixtures/dom-elements.json';
import data from '../../fixtures/test-data.json';
import pageUrls from '../../fixtures/page-urls.json';
import { waitForPageLoad } from '../../support/helpers/page-load-helper';
import { addNewTodoToList, selectATodoListFromList } from '../../support/helpers/todo-helper';

describe('Regression tests for the Todo-List items', () => {
    beforeEach(() => {
        cy.visit(pageUrls.todoPage);
        cy.login();
        cy.newTodoList('Test Todo List');
        selectATodoListFromList(0);
        waitForPageLoad('todos');
        cy.addTodoToTodoList(0, data.todoListItemFirst);
        cy.addTodoToTodoList(0, data.todoListItemSecond);
        cy.addTodoToTodoList(0, data.todoListItemThird);
        cy.get(todoPageSelectors.todoItem).should('have.length', '3');
    });

    afterEach(() => {
        cy.removeAllTodoList();
        cy.logout();
    });

    data.todoListItems.forEach(item => {
        it(`should add item to the todo list with title - ${item}`, () => {
            addNewTodoToList(0, item);
            cy.get(todoPageSelectors.todoItem).should('have.length', '4');
        });
    });

    it('should be able to mark the todos as finished', () => {
        cy.get(todoPageSelectors.todoItemCheckbox).eq(1).click();
        cy.get(todoPageSelectors.todoItemCheckbox).eq(1).should('have.class', domElements.checkedClass);
        cy.get(todoPageSelectors.todoItem).should('have.length', '3');
    });

    it('should be able to remove the checked chechbox', () => {
        cy.get(todoPageSelectors.todoItemCheckbox).eq(1).click();
        cy.get(todoPageSelectors.todoItem).should('have.length', '3');
        cy.get(todoPageSelectors.todoItemCheckbox).eq(1).click();
        cy.get(todoPageSelectors.todoItemCheckbox).eq(1).should('not.have.class', domElements.checkedClass);
    });

    it('should be able to delete a todo item from the list', () => {
        cy.get(todoPageSelectors.todoItemDeleteButton).eq(1).should('be.visible');
        cy.get(todoPageSelectors.todoItemDeleteButton).eq(1).click();
        cy.get(todoPageSelectors.todoItemTitle).eq(1).should('not.contain.text', data.todoListItemSecond);
        cy.get(todoPageSelectors.todoItem).should('have.length', '2');
    });

    it('should be able to re-add todo items to the list', () => {
        cy.get(todoPageSelectors.todoItemDeleteButton).eq(1).click();
        cy.get(todoPageSelectors.todoItemTitle).eq(1).should('not.contain.text', data.todoListItemSecond);
        cy.get(todoPageSelectors.todoItem).should('have.length', '2');
        addNewTodoToList(0, 'Second Todo item');
        cy.get(todoPageSelectors.todoItem).should('have.length', '3');
    });

    it('should handle page refresh', () => {
        cy.get(todoPageSelectors.todoItem).should('have.length', '3');
        cy.get(todoPageSelectors.todoListItems).eq(0).should('have.class', domElements.selectedClass);
        cy.reload(true);
        waitForPageLoad('todos');
        cy.get(todoPageSelectors.todoItem).should('have.length', '3');
        cy.get(todoPageSelectors.todoListItems).eq(0).should('have.class', domElements.selectedClass);
    });
});
