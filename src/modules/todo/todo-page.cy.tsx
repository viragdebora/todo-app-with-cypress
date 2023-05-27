import { TodoPage } from './todo-page';
import { todoPageSelectors } from '../../../cypress/support/selectors/todo-page-selectors';
import { todoDialogBoxSelectors } from '../../../cypress/support/selectors/todo-dialog-box';
import { waitForPageLoad } from '../../../cypress/support/helpers/page-load-helper';
import { TodoPageContext } from './todo-page-context';
import { TodoListModel } from './todo-list-model';
import { TodoServiceMock } from '../../services/todo/todo.service-mock';

describe('Component tests for the Todo page component', () => {
    beforeEach(() => {
        const todoService = Cypress.sinon.createStubInstance(TodoServiceMock);
        const todoListModel = new TodoListModel(todoService);
        cy.mount(<TodoPageContext.Provider value={{ todoListModel }}>
            <TodoPage />
        </TodoPageContext.Provider>);
    });

    it('all the element should be visible and have the correct text', () => {
        waitForPageLoad('basicTodo');
        cy.get(todoPageSelectors.noItemsVisible).should('have.text', 'Nothing to show');
        cy.get(todoPageSelectors.addListButton).should('have.text', 'Add list');
        cy.get(todoPageSelectors.addListButton).click();
        cy.get(todoDialogBoxSelectors.todoDialogBoxContainer).should('be.visible');
        cy.get(todoDialogBoxSelectors.todoDialogBoxInputField).should('be.visible');
        cy.get(todoDialogBoxSelectors.todoDialogBoxCreateButton).should('be.visible');
        cy.get(todoDialogBoxSelectors.todoDialogBoxCCancelButton).should('be.visible');
        cy.get(todoDialogBoxSelectors.todoDialogBoxTitle).should('be.visible');
    });

    it('the back to home button should not be disabled and should be clickable', () => {
        cy.get(todoPageSelectors.addListButton).click();
        cy.get(todoDialogBoxSelectors.todoDialogBoxContainer).should('be.visible');
        cy.get(todoDialogBoxSelectors.todoDialogBoxCreateButton).should('be.not.disabled');
        cy.get(todoDialogBoxSelectors.todoDialogBoxCCancelButton).should('be.not.disabled');
        cy.get(todoDialogBoxSelectors.todoDialogBoxCreateButton).click();
        cy.get(todoDialogBoxSelectors.todoDialogBoxCCancelButton).click();
    });
});
