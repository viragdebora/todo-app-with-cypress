import { removeAllTodoList } from '../../api/helper/todo-helpers';
import { registerCommand } from '../commands/command-register';
import { addNewTodoList, addNewTodoToList } from '../helpers/todo-helper';
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
    addNewTodoList(todoListTitle);
}

export function addTodoToTodoListNonAppAction(todoListIndex: number, todoItem: string): void {
    addNewTodoToList(todoListIndex, todoItem);
}

export function removeAllTodoListNonAppAction(): void {
    removeAllTodoList();
}

registerCommand('newTodoList', newTodoListAppAction, newTodoListNonAppAction);
registerCommand('addTodoToTodoList', addTodoToTodoListAppAction, addTodoToTodoListNonAppAction);
registerCommand('removeAllTodoList', removeAllTodoListAppAction, removeAllTodoListNonAppAction);
