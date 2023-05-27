import { AddTodoItem } from './add-todo-item';
import { todoPageSelectors } from '../../../../cypress/support/selectors/todo-page-selectors';

describe('Component tests for the add todo item component', () => {
    let spyOnButton;
    beforeEach(() => {
        spyOnButton = cy.spy().as('add-button-spy');
        cy.mount(<AddTodoItem handleAddTodo={spyOnButton} />);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(todoPageSelectors.inputTodoField).should('be.visible');
        cy.get(todoPageSelectors.addButton).should('be.visible');
        cy.get(todoPageSelectors.addButton).should('have.text', 'Add');
    });

    it('should be able to fill the input field with text', () => {
        cy.get(todoPageSelectors.inputTodoField).type('Test input');
        cy.get(todoPageSelectors.inputTodoField).should('have.value', 'Test input');
    });

    it('the add button should not be disabled and should be clickable', () => {
        cy.get(todoPageSelectors.addButton).should('be.not.disabled');
        cy.get(todoPageSelectors.addButton).click();
    });

    it('should have called with the proper event after clicking on the add button', () => {
        cy.get(todoPageSelectors.inputTodoField).type('Test input');
        cy.get(todoPageSelectors.addButton).click();
        cy.get('@add-button-spy').should('have.been.calledWith', 'Test input');
    });
});
