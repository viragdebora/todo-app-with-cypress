import { createStoreon } from 'storeon';
import { TodoPage } from './todo-page';
import TodoPagePo from '../../../../cypress/support/po/todo-page/todo-page';
import { selectors as todoSelectors } from '../../../../cypress/support/po/todo-page/selectors';
import { selectors as dialogBoxSelectors } from '../../../../cypress/support/component/todo-dialog-box';
import { StoreContext } from 'storeon/react';
import type { AppState } from '../../../app.state';
import { DEFAULT_AUTH_STATE } from '../../../store/auth/auth.state';
import { DEFAULT_TODO_STATE } from '../../../store/todos/todo.state';

const todoPagePo = new TodoPagePo();

describe('Component tests for the Todo page component', () => {
    beforeEach(() => {
        const store = createStoreon<AppState>([(s) => s.on('@init', () => ({
            auth: DEFAULT_AUTH_STATE,
            todos: DEFAULT_TODO_STATE,
        }))]);
        cy.mount(<StoreContext.Provider value={store}>
            <TodoPage />
        </StoreContext.Provider>);
    });

    it('all the element should be visible and have the correct text', () => {
        todoPagePo.getAllElementVisible();
        cy.get(todoSelectors.noItemsVisible).should('have.text', 'Nothing to show');
        cy.get(todoSelectors.addListButton).should('have.text', 'Add list');
        cy.get(todoSelectors.addListButton).click();
        cy.get(dialogBoxSelectors.todoDialogBoxContainer).should('be.visible');
        cy.get(dialogBoxSelectors.todoDialogBoxInputField).should('be.visible');
        cy.get(dialogBoxSelectors.todoDialogBoxCreateButton).should('be.visible');
        cy.get(dialogBoxSelectors.todoDialogBoxCCancelButton).should('be.visible');
        cy.get(dialogBoxSelectors.todoDialogBoxTitle).should('be.visible');
    });

    it('the back to home button should not be disabled and should be clickable', () => {
        cy.get(todoSelectors.addListButton).click();
        cy.get(dialogBoxSelectors.todoDialogBoxContainer).should('be.visible');
        cy.get(dialogBoxSelectors.todoDialogBoxCreateButton).should('be.not.disabled');
        cy.get(dialogBoxSelectors.todoDialogBoxCCancelButton).should('be.not.disabled');
        cy.get(dialogBoxSelectors.todoDialogBoxCreateButton).click();
        cy.get(dialogBoxSelectors.todoDialogBoxCCancelButton).click();
    });
});
