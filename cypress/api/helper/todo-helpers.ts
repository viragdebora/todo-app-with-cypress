import type { TodoItem, TodoList } from '../../../src/models/todo.model';

export function getAllTodos(): Cypress.Chainable<Cypress.Response<TodoList[]>> {
    return cy.request('GET', 'api/todos/');
}

export function createTodoList(title: string): Cypress.Chainable<Cypress.Response<TodoList>> {
    return cy.request('POST', 'api/todos/', { title });
}

export function addTodoListItem(listId: string, title: string): Cypress.Chainable<Cypress.Response<TodoItem>> {
    return cy.request('POST', 'api/todos/addItem', { listId, title });
}

export function updateTodoItem(listId: string, item: TodoItem): Cypress.Chainable<Cypress.Response<TodoItem>> {
    return cy.request('PUT', 'api/todos/updateItem', { listId, item });
}

export function removeTodoItem(listId: string, id: string): Cypress.Chainable<Cypress.Response<string>> {
    return cy.request('DELETE', 'api/todos/removeItem', { listId, id });
}

export function removeTodoList(listId: string): Cypress.Chainable<Cypress.Response<string>> {
    return cy.request('DELETE', 'api/todos/', { listId });
}

function create(todoList: TodoList, items: string[]): any {
    if (!items.length) {
        return cy.wrap(todoList);
    }
    return addTodoListItem(todoList.id, items.shift() as string).then(response => {
        todoList.items.unshift(response.body);
        return cy.wrap(todoList);
    }).then((list) => create(list, items));
}

export function addEntirelyTodoList(todoListTitle: string, todoItems: string[]): Cypress.Chainable<TodoList> {
    const chainable = createTodoList(todoListTitle).then(response => {
        return response.body;
    }).then(todoList => {
        return create(todoList, todoItems);
    });
    return chainable;
}

export function removeAllTodoList(): void {
    getAllTodos().then(response => {
        const idArray: string[] = (response.body).map((responseObject: TodoList) => {
            return responseObject.id;
        });
        idArray.forEach(id => removeTodoList(id));
    });
}
