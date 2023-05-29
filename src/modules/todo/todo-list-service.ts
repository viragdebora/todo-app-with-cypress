import type { TodoItem, TodoList } from '../../models/todo.model';

export interface TodoListService {
    loadTodos(): Promise<TodoList[]>;
    createTodoList(todoListTitle: string): Promise<TodoList>;
    addTodoItem(listId: string, title: string): Promise<TodoItem>;
    removeTodoList(listId: string): Promise<string>;
    removeTodoItem(listId: string, id: string): Promise<string>;
    updateTodoItem(listId: string, item: TodoItem): Promise<TodoItem>;
}
