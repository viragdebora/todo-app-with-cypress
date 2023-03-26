import TodoPage from "../../support/po/todo-page/todo-page";
import { selectors as todoSelectors } from "../../support/po/todo-page/selectors";
import domElements from '../../fixtures/dom-elements.json';
import data from '../../fixtures/test-data.json';
import { beforeEach, afterEach } from "mocha";
const todoPage = new TodoPage();

describe('Regression tests for the Todo-List', () => {

    beforeEach(() => {
        cy.login(todoPage);
        cy.newTodoList(data.todoListTitleFirst);
        cy.newTodoList(data.todoListTitleSecond);
        cy.newTodoList(data.todoListTitleThird);
        cy.get(todoSelectors.todoListItems).should('have.length', '3');
    });

    afterEach(() => {
        cy.removeAllTodoList();
        cy.logout();
    })

    data.todoListTitles.forEach(title => {
        it(`should be able to add new todo list with title - ${title}`, () => {
            cy.newTodoList(title);
            cy.get(todoSelectors.todoListItems).should('have.length', '4');
            todoPage.selectATodoListFromList(4);
            todoPage.getTodoListElementVisible();
            cy.get(todoSelectors.todoListTitle).should('have.text', title);
            cy.get(todoSelectors.todoListItems).eq(3).should('have.class', domElements.selectedClass);
        });
    });

    it('should delete the todo list', () => {
        todoPage.selectATodoListFromList(1);
        cy.get(todoSelectors.todoListHeaderMenuButton).click();
        cy.get(todoSelectors.deleteTodoListButton).click();
        cy.get(todoSelectors.noItemsVisible).should('be.visible');
        cy.get(todoSelectors.todoListItems).should('have.length', '2');
        cy.get(todoSelectors.todoListItems).eq(0).should('not.have.class', domElements.selectedClass);
        cy.get(todoSelectors.todoListItems).eq(1).should('not.have.class', domElements.selectedClass);
    });

    it('should handle navigating between the todo lists', () => {
        todoPage.selectATodoListFromList(3);
        todoPage.getTodoListElementVisible();
        todoPage.selectATodoListFromList(1);
        cy.get(todoSelectors.todoListItems).should('have.length', '3');
        cy.get(todoSelectors.todoListItems).eq(0).should('have.class', domElements.selectedClass);
        cy.go('back');
        todoPage.getTodoListElementVisible();
        cy.get(todoSelectors.todoListItems).eq(2).should('have.text', data.todoListTitleThird);
        cy.get(todoSelectors.todoListItems).eq(0).should('not.have.class', domElements.selectedClass);
        cy.get(todoSelectors.todoListItems).eq(2).should('have.class', domElements.selectedClass);
    });
});