import { Page } from '../base-page';
import { selectors as todo } from './selectors';

class TodoPage extends Page {
    constructor() {
        super();
        this.url = '/todos';
    }

    getAllElementVisible(): void {
        cy.get(todo.noItemsVisible).should('be.visible');
        cy.get(todo.sideBar).should('be.visible');
        cy.get(todo.addListButton).should('be.visible');
    }

    getTodoListElementVisible(): void {
        cy.get(todo.todoListHeader).should('be.visible');
        cy.get(todo.todoListTitle).should('be.visible');
        cy.get(todo.inputTodoField).should('be.visible');
        cy.get(todo.addButton).should('be.visible');
    }

    selectATodoListFromList(number: number): void {
        cy.get(todo.todoListItems).should('be.visible');
        cy.get(todo.todoListItems).eq(number - 1).click();
        cy.get(todo.todoListTitle).should('be.visible');
    }
}

export default TodoPage;
