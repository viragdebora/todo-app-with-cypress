import { todoPageSelectors } from './selectors/todo-page-selectors';
import pageUrls from '../fixtures/page-urls.json';

declare global {
    namespace Cypress {
        interface Chainable {
            login: () => Chainable<void>;
            logout: () => Chainable<void>;
            newTodoList: (todoListTitle: string) => Chainable<void>;
            addTodoToTodoList: (todoListIndex: number, todoItem: string) => Chainable<void>;
            removeAllTodoList: () => Chainable<void>;
            waitUntilElementsVisible: (selectors: string[]) => Chainable<void>;
        }
    }
}

Cypress.Commands.add('login', () => {
    cy.url().should('contain', pageUrls.loginPage).then(() => {
        cy.window()
            .its('appActions')
            .its('authModel')
            .invoke('login', Cypress.env('user'), Cypress.env('password'));
        cy.url().should('not.include', pageUrls.loginPage);
    });
});

Cypress.Commands.add('logout', () => {
    cy.url().should('not.include', pageUrls.loginPage).then(() => {
        cy.window()
            .its('appActions')
            .its('authModel')
            .invoke('logout');
    });
    cy.url().should('include', pageUrls.loginPage);
});

Cypress.Commands.add('newTodoList', (todoListTitle) => {
    cy.window()
        .its('appActions')
        .its('todoModel')
        .invoke('createTodoList', todoListTitle);
    cy.get(todoPageSelectors.todoListItems).should('be.visible');
});

Cypress.Commands.add('addTodoToTodoList', (todoListIndex, todoItem) => {
    cy.window()
        .its('appActions')
        .its('todoModel')
        .then((todoModel) => {
            if (todoModel) {
                const todoList = todoModel.todoLists.value[todoListIndex];
                const lengthOfList = todoList.items.length;
                todoModel.addTodoItem(todoList.id, todoItem);
                cy.get(todoPageSelectors.todoItem).should('have.length', lengthOfList + 1);
            }
        });
});

Cypress.Commands.add('removeAllTodoList', () => {
    cy.window()
        .its('appActions')
        .its('todoModel')
        .then((todoModel) => {
            if (todoModel) {
                const todoList = todoModel.todoLists.value;
                for (const list of todoList) {
                    todoModel.removeTodoList(list.id);
                }
                cy.get(todoPageSelectors.todoItem).should('not.exist');
            }
        });
});

Cypress.Commands.add('waitUntilElementsVisible', (selectors) => {
    for (const selector of selectors) {
        cy.get(selector).should('be.visible');
    }
});
