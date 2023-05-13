import type { TodoItem, TodoList } from '../../models/todo.model';

export const LoadTodosEvent = Symbol('LoadTodos');
export const LoadTodosEndedEvent = Symbol('LoadTodosEnded');
export const AddTodoItemEvent = Symbol('AddTodoItem');
export const AddTodoItemEndedEvent = Symbol('AddTodoItemEnded');
export const RemoveTodoItemEvent = Symbol('RemoveTodoItem');
export const RemoveTodoItemEndedEvent = Symbol('RemoveTodoItemEnded');
export const CreateTodoListEvent = Symbol('CreateTodoList');
export const CreateTodoListEndedEvent = Symbol('CreateTodoListEnded');
export const ListIdClickedEvent = Symbol('ListIdClicked');
export const SetActiveListIdEvent = Symbol('SetActiveListId');
export const UpdateTodoItemEvent = Symbol('UpdateTodoItem');
export const UpdateTodoItemEndedEvent = Symbol('UpdateTodoItemEnded');
export const RemoveTodoListEvent = Symbol('RemoveTodoList');
export const RemoveTodoListEndedEvent = Symbol('RemoveTodoListEnded');

type AddTodoItemPayload = { listId: string; title: string; };
type AddTodoItemEndedPayload = { listId: string; item?: TodoItem; error?: unknown; };
type RemoveTodoItemPayload = { listId: string; todoId: string; };
type RemoveTodoItemEndedPayload = { listId: string; todoId?: string; error?: unknown; };

export interface TodoEvents {
    [LoadTodosEvent]: never;
    [LoadTodosEndedEvent]: { todoLists: TodoList[]; error?: unknown; };
    [AddTodoItemEvent]: AddTodoItemPayload;
    [AddTodoItemEndedEvent]: AddTodoItemEndedPayload;
    [RemoveTodoItemEvent]: RemoveTodoItemPayload;
    [RemoveTodoItemEndedEvent]: RemoveTodoItemEndedPayload;
    [CreateTodoListEvent]: string;
    [CreateTodoListEndedEvent]: TodoList | null;
    [ListIdClickedEvent]: string;
    [SetActiveListIdEvent]: string;
    [UpdateTodoItemEvent]: { listId: string; todoItem: TodoItem; };
    [UpdateTodoItemEndedEvent]: { listId: string; todoItem?: TodoItem; error?: unknown; };
    [RemoveTodoListEvent]: { listId: string; };
    [RemoveTodoListEndedEvent]: { listId: string; error?: unknown; };
}
