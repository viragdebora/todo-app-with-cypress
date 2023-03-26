import { TodoList } from "../../models/todo.model";

export interface TodoState {
    todoLists: Array<TodoList>;
    activeListId: string;
}

export interface WithTodoState {
    todos: TodoState;
}

export const DEFAULT_TODO_STATE: TodoState = {
    todoLists: [],
    activeListId: '',
};
