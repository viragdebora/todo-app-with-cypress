import { type TodoList } from '../../../src/models/todo.model';
import { registerCommand } from '../commands/command-register';
import { todoDialogBoxSelectors } from '../selectors/todo-dialog-box';
import { todoPageSelectors } from '../selectors/todo-page-selectors';

export function newTodoListAppAction(todoListTitle: string): void {
    cy.window()
        .its('appActions')
        .its('todoModel')
        .invoke('createTodoList', todoListTitle);
    cy.get(todoPageSelectors.todoListItems).should('be.visible');
}

export function addTodoToTodoListAppAction(todoListIndex: number, todoItem: string): void {
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
}

export function removeAllTodoListAppAction(): void {
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
}

export function newTodoListNonAppAction(todoListTitle: string): void {
    cy.get(todoPageSelectors.addListButton).should('be.visible');
    cy.get(todoPageSelectors.addListButton).click();
    cy.get(todoDialogBoxSelectors.todoDialogBoxInputField).type(todoListTitle);
    cy.get(todoDialogBoxSelectors.todoDialogBoxCreateButton).click();
    cy.get(todoPageSelectors.todoListItems).should('be.visible');
}

export function addTodoToTodoListNonAppAction(todoListIndex: number, todoItem: string): void {
    cy.get(todoPageSelectors.todoListItems).should('be.visible');
    let text: string;
    cy.get(todoPageSelectors.todoListItems).eq(todoListIndex).then(($todoListItem) => {
        text = $todoListItem.text();
    });
    cy.get(todoPageSelectors.todoListItems).eq(todoListIndex).click();
    cy.get(todoPageSelectors.todoListTitle).should('be.visible');
    cy.get(todoPageSelectors.todoListTitle).should(($todoListTitle) => {
        expect($todoListTitle.text()).to.eql(text);
    });
    cy.get(todoPageSelectors.inputTodoField).type(todoItem);
    cy.get(todoPageSelectors.addButton).click();
}

export function removeAllTodoListNonAppAction(): void {
    cy.request('GET', '/api/todos/').then(response => {
        if (response.body) {
            const idArray: string[] = (response.body).map((responseObject: TodoList) => {
                return responseObject.id;
            });
            for (let i = 0; i < idArray.length; i++) {
                cy.request('DELETE', '/api/todos/removeItem', { listId: idArray[i] });
            }
        }
    });
}

registerCommand('newTodoList', newTodoListAppAction, newTodoListNonAppAction);
registerCommand('addTodoToTodoList', addTodoToTodoListAppAction, addTodoToTodoListNonAppAction);
registerCommand('removeAllTodoList', removeAllTodoListAppAction, removeAllTodoListNonAppAction);
