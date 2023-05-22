import { AddTodoItem } from './add-todo-item';
import { selectors } from '../../../../cypress/support/po/todo-page/selectors';

describe('Component tests for the add todo item component', () => {
    let spyOnButton;
    beforeEach(() => {
        spyOnButton = cy.spy().as('add-button-spy');
        cy.mount(<AddTodoItem handleAddTodo={spyOnButton} />);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(selectors.inputTodoField).should('be.visible');
        cy.get(selectors.addButton).should('be.visible');
        cy.get(selectors.addButton).should('have.text', 'Add');
    });

    it('should be able to fill the input field with text', () => {
        cy.get(selectors.inputTodoField).type('Test input');
        cy.get(selectors.inputTodoField).should('have.value', 'Test input');
    });

    it('the add button should not be disabled and should be clickable', () => {
        cy.get(selectors.addButton).should('be.not.disabled');
        cy.get(selectors.addButton).click();
    });

    it('should have called with the proper event after clicking on the add button', () => {
        cy.get(selectors.inputTodoField).type('Test input');
        cy.get(selectors.addButton).click();
        cy.get('@add-button-spy').should('have.been.calledWith', 'Test input');
    });
});
