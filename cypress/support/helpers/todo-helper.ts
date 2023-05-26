import { todoPageSelectors } from '../selectors/todo-page-selectors';
import { todoDialogBoxSelectors } from '../selectors/todo-dialog-box';

export function selectATodoListFromList(number: number): void {
    cy.get(todoPageSelectors.todoListItems).should('be.visible');
    cy.get(todoPageSelectors.todoListItems).eq(number).click();
    cy.get(todoPageSelectors.todoListTitle).should('be.visible');
}

export function addNewTodoList(todoListTitle: string): void {
    cy.get(todoPageSelectors.addListButton).should('be.visible');
    cy.get(todoPageSelectors.addListButton).click();
    cy.get(todoDialogBoxSelectors.todoDialogBoxInputField).type(todoListTitle);
    cy.get(todoDialogBoxSelectors.todoDialogBoxCreateButton).click();
    cy.get(todoPageSelectors.todoListItems).should('be.visible');
}

export function addNewTodoToList(todoNumber: number, todoItem: string): void {
    cy.get(todoPageSelectors.todoListItems).should('be.visible');
    let text: string;
    cy.get(todoPageSelectors.todoListItems).eq(todoNumber).then(($todoListItem) => {
        text = $todoListItem.text();
    });
    cy.get(todoPageSelectors.todoListItems).eq(todoNumber).click();
    cy.get(todoPageSelectors.todoListTitle).should('be.visible');
    cy.get(todoPageSelectors.todoListTitle).should(($todoListTitle) => {
        expect($todoListTitle.text()).to.eql(text);
    });
    cy.get(todoPageSelectors.inputTodoField).type(todoItem);
    cy.get(todoPageSelectors.addButton).click();
}
