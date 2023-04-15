import { TodoListSideBar } from './todo-list-side-bar';
import { TodoList } from '../../../models/todo.model';
import { selectors } from '../../../../cypress/support/po/todo-page/selectors';
import domElements from '../../../../cypress/fixtures/dom-elements.json';

describe.only("Component tests for the Todo List Sidebar", () => {
    let onListItemClickedSpy;

    const items: Array<TodoList> = [
        {
            id: 'mockId1',
            items: [
                {
                    id: 'mockTodoItemId1',
                    state: 'NOT_STARTED',
                    title: 'Mock Todo Item 1'
                }
            ],
            title: 'Mock Todo List 1'
        }
    ];

    beforeEach(() => {
        const onAddTodoListClickedStub = cy.stub();
        onListItemClickedSpy = cy.spy().as('list-item-handler-spy');

        cy.mount(<TodoListSideBar items={items}
            activeIndex={-1}
            onAddTodoListClicked={onAddTodoListClickedStub}
            onListItemClicked={onListItemClickedSpy} />);
    });

    it('all the element should be visible', () => {
        cy.get(selectors.sideBar).should('be.visible');
        cy.get(selectors.todoListItems).eq(0).should('be.visible');
        cy.get(selectors.addListButton).should('be.visible');
        cy.get(selectors.todoListItems).eq(0).should('not.have.class', domElements.selectedClass);
    });

    it('the list items and add list button should not be disabled and should be clickable', () => {
        cy.get(selectors.todoListItems).eq(0).should('be.not.disabled');
        cy.get(selectors.addListButton).should('be.not.disabled');
        cy.get(selectors.todoListItems).eq(0).click();
        cy.get(selectors.addListButton).click();
    });

    it('should have called with the proper event in case of clicking on the list item', () => {
        cy.get(selectors.todoListItems).eq(0).click();
        cy.get('@list-item-handler-spy').should('have.been.calledWith', items[0].id);
    });
});