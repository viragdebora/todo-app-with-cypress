import { todoPageSelectors } from '../../support/selectors/todo-page-selectors';
import domElements from '../../fixtures/dom-elements.json';
import data from '../../fixtures/test-data.json';
import pageUrls from '../../fixtures/page-urls.json';
import { waitForPageLoad } from '../../support/helpers/page-load-helper';
import { addNewTodoList, selectATodoListFromList } from '../../support/helpers/todo-helper';

describe('Regression tests for the Todo-List', () => {
    beforeEach(() => {
        cy.visit(pageUrls.todoPage);
        cy.login();
        cy.newTodoList(data.todoListTitleFirst);
        cy.newTodoList(data.todoListTitleSecond);
        cy.newTodoList(data.todoListTitleThird);
        cy.get(todoPageSelectors.todoListItems).should('have.length', '3');
    });

    afterEach(() => {
        cy.removeAllTodoList();
        cy.logout();
    });

    data.todoListTitles.forEach(title => {
        it(`should be able to add new todo list with title - ${title}`, () => {
            addNewTodoList(title);
            cy.get(todoPageSelectors.todoListItems).should('have.length', '4');
            selectATodoListFromList(3);
            waitForPageLoad('todos');
            cy.get(todoPageSelectors.todoListTitle).should('have.text', title);
            cy.get(todoPageSelectors.todoListItems).eq(3).should('have.class', domElements.selectedClass);
        });
    });

    it('should delete the todo list', () => {
        selectATodoListFromList(0);
        cy.get(todoPageSelectors.todoListHeaderMenuButton).click();
        cy.get(todoPageSelectors.deleteTodoListButton).click();
        cy.get(todoPageSelectors.noItemsVisible).should('be.visible');
        cy.get(todoPageSelectors.todoListItems).should('have.length', '2');
        cy.get(todoPageSelectors.todoListItems).eq(0).should('not.have.class', domElements.selectedClass);
        cy.get(todoPageSelectors.todoListItems).eq(1).should('not.have.class', domElements.selectedClass);
    });

    it('should handle navigating between the todo lists', () => {
        selectATodoListFromList(2);
        waitForPageLoad('todos');
        selectATodoListFromList(0);
        cy.get(todoPageSelectors.todoListItems).should('have.length', '3');
        cy.get(todoPageSelectors.todoListItems).eq(0).should('have.class', domElements.selectedClass);
        cy.go('back');
        waitForPageLoad('todos');
        cy.get(todoPageSelectors.todoListItems).eq(2).should('have.text', data.todoListTitleThird);
        cy.get(todoPageSelectors.todoListItems).eq(0).should('not.have.class', domElements.selectedClass);
        cy.get(todoPageSelectors.todoListItems).eq(2).should('have.class', domElements.selectedClass);
    });
});
