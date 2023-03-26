export type TodoStatus = 'NOT_STARTED' | 'COMPLETED' | 'IN_PROGRESS';

export interface TodoItem {
    title: string;
    state: TodoStatus;
    id: string;
}

export interface TodoList {
    id: string;
    title: string;
    items: Array<TodoItem>;
}
