import type { TodoItem } from '../../../models/todo.model';
import { TodoList } from './todo-list';
import { todoPageSelectors } from '../../../../cypress/support/selectors/todo-page-selectors';

describe('Component tests for the todo list', () => {
    let handleUpdateSpy;

    const items: TodoItem[] = [
        {
            id: 'mockTodoItemId1',
            state: 'NOT_STARTED',
            title: 'Mock Todo Item 1',
        },
        {
            id: 'mockTodoItemId2',
            state: 'COMPLETED',
            title: 'Mock Todo Item 2',
        },
        {
            id: 'mockTodoItemId3',
            state: 'NOT_STARTED',
            title: 'Mock Todo Item 3',
        },
    ];

    beforeEach(() => {
        const handleRemoveStub = cy.stub();
        handleUpdateSpy = cy.spy().as('handle-update-spy');
        cy.mount(<TodoList items={items}
            handleRemove={handleRemoveStub}
            handleUpdate={handleUpdateSpy}
        />);
    });

    it('all the element should be visible', () => {
        cy.get(todoPageSelectors.todoItem).should('have.length', 3);
        cy.get(todoPageSelectors.todoItemCheckbox).should('have.length', 3);
        cy.get(todoPageSelectors.todoItemDeleteButton).should('have.length', 3);
    });

    it('should have called with the proper event in case of clicking on the checkbox', () => {
        const expectedResult = {
            id: 'mockTodoItemId2',
            state: 'NOT_STARTED',
            title: 'Mock Todo Item 2',
        };
        cy.get(todoPageSelectors.todoItemCheckbox).eq(1).click();
        cy.get('@handle-update-spy').should('have.been.calledWith', expectedResult);
    });
});
