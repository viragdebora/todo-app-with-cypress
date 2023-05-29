import { createContext, useContext } from 'react';
import { createObservable } from '../../common/observable';
import { type TodoList } from '../../models/todo.model';
import { type TodoListModel } from './todo-list-model';

export interface TodoPageContextType {
    todoListModel: TodoListModel;
}

export const TodoPageContext = createContext<TodoPageContextType>({
    todoListModel: {
        todoLists: createObservable<TodoList[]>([]),
        todoService: {
            addTodoItem() {
                throw new Error();
            },
            createTodoList() {
                throw new Error();
            },
            loadTodos() {
                throw new Error();
            },
        },
        getAll() {
            throw new Error();
        },
        createTodoList() {
            throw new Error();
        },
        addTodoItem() {
            throw new Error();
        },
    } as unknown as TodoListModel,
});

export const useTodoPageContext = (): TodoPageContextType => useContext(TodoPageContext);
