import LoginPage from './po/login-page/login';
import { type Page } from './po/base-page';
import { selectors as todoSelectors } from './po/todo-page/selectors';
import { selectors as dialogBoxSeletors } from './component/todo-dialog-box';
import { type getTodoListType } from './models';

const loginPage = new LoginPage();

declare global {
    namespace Cypress {
        interface Chainable {
            login: (page: Page) => Chainable<void>;
            logout: () => Chainable<void>;
            newTodoList: (todoListTitle: string) => Chainable<void>;
            addTodoToTodoList: (todoNumber: number, todoItem: string) => Chainable<void>;
            removeAllTodoList: () => Chainable<void>;
        }
    }
}

Cypress.Commands.add('login', (page) => {
    cy.visit(page.url);
    cy.url().should('include', loginPage.url);
    loginPage.getAllElementVisible();
    loginPage.typeInCredentials();
    loginPage.clickOnSubmitButton();
    cy.url().should('include', page.url);
    page.getAllElementVisible();
});

Cypress.Commands.add('logout', () => {
    cy.url().then((url) => {
        if (!url.includes(loginPage.url)) {
            cy.request('POST', '/api/auth/logout');
        }
    });
});

Cypress.Commands.add('newTodoList', (todoListTitle) => {
    cy.get(todoSelectors.addListButton).should('be.visible');
    cy.get(todoSelectors.addListButton).click();
    cy.get(dialogBoxSeletors.todoDialogBoxInputField).type(todoListTitle);
    cy.get(dialogBoxSeletors.todoDialogBoxCreateButton).click();
    cy.get(todoSelectors.todoListItems).should('be.visible');
});

Cypress.Commands.add('addTodoToTodoList', (todoNumber, todoItem) => {
    cy.get(todoSelectors.todoListItems).should('be.visible');
    let text: string;
    cy.get(todoSelectors.todoListItems).eq(todoNumber - 1).then(($todoListItem) => {
        text = $todoListItem.text();
    });
    cy.get(todoSelectors.todoListItems).eq(todoNumber - 1).click();
    cy.get(todoSelectors.todoListTitle).should('be.visible');
    cy.get(todoSelectors.todoListTitle).should(($todoListTitle) => {
        expect($todoListTitle.text()).to.eql(text);
    });
    cy.get(todoSelectors.inputTodoField).type(todoItem);
    cy.get(todoSelectors.addButton).click();
});

Cypress.Commands.add('removeAllTodoList', () => {
    cy.request('GET', '/api/todos').then(response => {
        if (response.body) {
            const idArray: string[] = (response.body).map((responseObject: getTodoListType) => {
                return responseObject.id;
            });
            for (let i = 0; i < idArray.length; i++) {
                cy.request('DELETE', '/api/todos', { listId: idArray[i] });
            }
        }
    });
});
