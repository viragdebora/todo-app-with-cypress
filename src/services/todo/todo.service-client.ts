import type { TodoItem, TodoList } from '../../models/todo.model';
import type { TodoListService } from '../../modules/todo/todo-list-service';

export class TodoServiceClient implements TodoListService {
    async loadTodos(): Promise<TodoList[]> {
        const response = await fetch('/api/todos');
        return response.json();
    }

    async createTodoList(title: string): Promise<TodoList> {
        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify({ title }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    }

    async addTodoItem(listId: string, title: string): Promise<TodoItem> {
        const response = await fetch('/api/todos/addItem', {
            method: 'POST',
            body: JSON.stringify({ listId, title }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    }

    async removeTodoItem(listId: string, id: string): Promise<string> {
        const response = await fetch('/api/todos/removeItem', {
            method: 'DELETE',
            body: JSON.stringify({ listId, id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.text();
    }

    async updateTodoItem(listId: string, item: TodoItem): Promise<TodoItem> {
        const response = await fetch('/api/todos/updateItem', {
            method: 'PUT',
            body: JSON.stringify({ listId, item }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    }

    async removeTodoList(listId: string): Promise<string> {
        const response = await fetch('/api/todos', {
            method: 'DELETE',
            body: JSON.stringify({ listId }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/plain',
            },
        });

        return response.text();
    }
}
