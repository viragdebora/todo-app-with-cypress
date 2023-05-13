import { v4 } from 'uuid';
import type { TodoItem, TodoList } from '../../models/todo.model';

export class TodoServiceMock {
    private todos: TodoList[] = [];

    async loadTodos(): Promise<TodoList[]> {
        return this.todos;
    }

    async createTodoList(title: string): Promise<TodoList> {
        const todoLists = await this.loadTodos();
        const todoList: TodoList = {
            id: v4(),
            title,
            items: [],
        };

        this.todos = [...todoLists, todoList];

        return todoList;
    }

    async addTodoItem(listId: string, title: string): Promise<TodoItem> {
        const items = await this.loadTodos();
        const item: TodoItem = {
            id: v4(),
            state: 'NOT_STARTED',
            title,
        };
        const newItems = items.map(listItem => {
            if (listItem.id === listId) {
                return {
                    ...listItem,
                    items: [item, ...listItem.items],
                };
            }
            return listItem;
        });
        this.todos = newItems;
        return item;
    }

    async removeTodoItem(listId: string, id: string): Promise<string> {
        const items = await this.loadTodos();
        const newItems = items.map(listItem => {
            if (listItem.id === listId) {
                return {
                    ...listItem,
                    items: listItem.items.filter(i => i.id !== id),
                };
            }

            return listItem;
        });
        this.todos = newItems;
        return id;
    }

    async updateTodoItem(listId: string, item: TodoItem): Promise<TodoItem> {
        const lists = await this.loadTodos();
        const newLists = lists.map(listItem => {
            if (listItem.id === listId) {
                return {
                    ...listItem,
                    items: listItem.items.map(i => i.id === item.id ? item : i),
                };
            }

            return listItem;
        });

        this.todos = newLists;

        return item;
    }

    async removeTodoList(listId: string): Promise<string> {
        const lists = await this.loadTodos();
        const newLists = lists.filter(l => l.id !== listId);
        this.todos = newLists;

        return listId;
    }
}
