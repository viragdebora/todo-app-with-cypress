import type { TodoItem } from '../../../models/todo.model';
import { TodoListItem } from './todo-list-item';
import { todoPageSelectors } from '../../../../cypress/support/selectors/todo-page-selectors';

describe('Component tests for the todo list item component', () => {
    let handleRemoveSpy;
    let handleUpdateSpy;

    const item: TodoItem =
    {
        id: 'mockTodoItemId1',
        state: 'NOT_STARTED',
        title: 'Mock Todo Item 1',
    };

    beforeEach(() => {
        handleRemoveSpy = cy.spy().as('handle-remove-spy');
        handleUpdateSpy = cy.spy().as('handle-update-spy');
        cy.mount(<TodoListItem item={item}
            handleRemove={handleRemoveSpy}
            handleUpdate={handleUpdateSpy}
        />);
    });

    it('all the element should be visible', () => {
        cy.get(todoPageSelectors.todoItem).should('be.visible');
        cy.get(todoPageSelectors.todoItemCheckbox).should('be.visible');
        cy.get(todoPageSelectors.todoItemDeleteButton).should('be.visible');
    });

    it('the checkbox and remove button should not be disabled and should be clickable', () => {
        cy.get(todoPageSelectors.todoItemCheckbox).should('be.not.disabled');
        cy.get(todoPageSelectors.todoItemDeleteButton).should('be.not.disabled');
        cy.get(todoPageSelectors.todoItemCheckbox).click();
        cy.get(todoPageSelectors.todoItemDeleteButton).click();
    });

    it('should have called with the proper event in case of clicking on the checkbox', () => {
        const expectedResult = {
            id: 'mockTodoItemId1',
            state: 'COMPLETED',
            title: 'Mock Todo Item 1',
        };
        cy.get(todoPageSelectors.todoItemCheckbox).click();
        cy.get('@handle-update-spy').should('have.been.calledWith', expectedResult);
    });

    it('should have called with the proper event in case of clicking on the remove button', () => {
        cy.get(todoPageSelectors.todoItemDeleteButton).click();
        cy.get('@handle-remove-spy').should('have.been.calledWith', item.id);
    });
});
