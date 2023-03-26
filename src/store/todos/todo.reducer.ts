import { StoreonStore } from 'storeon';
import { AppEvents } from '../../app.events';
import { AppState } from '../../app.state';
import { AddTodoItemEndedEvent, AddTodoItemEvent, CreateTodoListEndedEvent, CreateTodoListEvent, ListIdClickedEvent, LoadTodosEndedEvent, LoadTodosEvent, RemoveTodoItemEndedEvent, RemoveTodoItemEvent, RemoveTodoListEndedEvent, RemoveTodoListEvent, SetActiveListIdEvent, TodoEvents, UpdateTodoItemEndedEvent, UpdateTodoItemEvent } from './todo.events';
import { TodoServiceClient } from './todo.service-client';
import { DEFAULT_TODO_STATE } from './todo.state';

export const getTodoReducer = (todoService: TodoServiceClient) => (store: StoreonStore<AppState, AppEvents>) => {
    store.on('@init', (state) => ({ ...state, todos: DEFAULT_TODO_STATE }))

    store.on(LoadTodosEvent, async () => {
        try {
            const todoLists = await todoService.loadTodos();
            store.dispatch(LoadTodosEndedEvent, { todoLists });
        } catch (error) {
            store.dispatch(LoadTodosEndedEvent, { error, todoLists: [] });
        }
    });

    store.on(LoadTodosEndedEvent, (state, { todoLists }) => ({
        ...state,
        todos: {
            ...state.todos,
            todoLists
        }
    }));

    store.on(AddTodoItemEvent, async (_, { title, listId }) => {
        try {
            const item = await todoService.addTodoItem(listId, title);
            store.dispatch(AddTodoItemEndedEvent, { item, listId });
        } catch (error) {
            store.dispatch(AddTodoItemEndedEvent, { error, listId });
        }
    });

    store.on(AddTodoItemEndedEvent, (state, { item, listId }) => {
        if (!item) {
            return state;
        }

        const newLists = state.todos.todoLists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    items: [
                        item,
                        ...list.items
                    ]
                };
            }

            return list;
        });

        return { ...state, todos: { ...state.todos, todoLists: newLists } };
    });

    store.on(RemoveTodoItemEvent, async (_, { todoId, listId }) => {
        try {
            await todoService.removeTodoItem(listId, todoId);
            store.dispatch(RemoveTodoItemEndedEvent, { todoId, listId });
        } catch (error) {
            store.dispatch(RemoveTodoItemEndedEvent, { error, listId });
        }
    });

    store.on(RemoveTodoItemEndedEvent, (state, { todoId, listId }) => {
        if (!todoId) {
            return state;
        }

        const newLists = state.todos.todoLists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    items: list.items.filter(item => item.id !== todoId)
                }
            }

            return list;
        });

        return { ...state, todos: { ...state.todos, todoLists: newLists } };
    });

    store.on(CreateTodoListEvent, async (_, title) => {
        try {
            const todoList = await todoService.createTodoList(title);
            store.dispatch(CreateTodoListEndedEvent, todoList);
        } catch (error) {
            store.dispatch(CreateTodoListEndedEvent, null)
        }
    });

    store.on(CreateTodoListEndedEvent, (state, todoList) => {
        if (!todoList) {
            return state;
        }

        return { ...state, todos: { ...state.todos, todoLists: [...state.todos.todoLists, todoList] } };
    });

    store.on(ListIdClickedEvent, (state, id) => {
        store.dispatch(SetActiveListIdEvent, id);
        return state;
    });

    store.on(SetActiveListIdEvent, (state, id) => {
        return { ...state, todos: { ...state.todos, activeListId: id } };
    });

    store.on(UpdateTodoItemEvent, async (_, { listId, todoItem }) => {
        try {
            const item = await todoService.updateTodoItem(listId, todoItem);
            store.dispatch(UpdateTodoItemEndedEvent, { listId, todoItem: item });
        } catch (error) {
            console.log(error);
            store.dispatch(UpdateTodoItemEndedEvent, { listId, error });
        }
    });

    store.on(UpdateTodoItemEndedEvent, (state, { listId, error, todoItem }) => {
        if (error) {
            return state;
        }

        const newLists = state.todos.todoLists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    items: list.items.map(i => i.id === todoItem?.id ? todoItem : i)
                };
            }

            return list;
        });

        return { ...state, todos: { ...state.todos, todoLists: newLists } };
    });

    store.on(RemoveTodoListEvent, async (_, { listId }) => {
        try {
            await todoService.removeTodoList(listId);
            store.dispatch(RemoveTodoListEndedEvent, { listId });
        } catch (error) {
            console.log(error);
            store.dispatch(RemoveTodoListEndedEvent, { listId, error });
        }
    });

    store.on(RemoveTodoListEndedEvent, (state, { listId, error }) => {
        if (error) {
            return state;
        }

        const newLists = state.todos.todoLists.filter(list => list.id !== listId);

        return {
            ...state,
            todos: {
                ...state.todos,
                todoLists: newLists,
                activeListId: state.todos.activeListId === listId ? '' : state.todos.activeListId
            }
        };
    });
}
