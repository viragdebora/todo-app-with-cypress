import { TodoPage } from './todo-page';
import { TodoPageContext, type TodoPageContextType } from './todo-page-context';
import { TodoListModel } from './todo-list-model';
import { type TodoListService } from './todo-list-service';
import { type FunctionComponent } from 'react';

export interface TodoPageRoutingContext {
    todoPageModule?: Promise<TodoPageModule>;
    todoService: TodoListService;
}

export interface TodoPageModule {
    Component: FunctionComponent;
    todoListModel: TodoListModel;
}

export const initTodoPageModule = (context: TodoPageRoutingContext): TodoPageModule => {
    const todoListModel = new TodoListModel(context.todoService);
    window.appActions.todoModel = todoListModel;
    const todoPageContext: TodoPageContextType = {
        todoListModel,
    };

    return {
        Component: function TodoPageComponent() {
            return <TodoPageContext.Provider value={todoPageContext}>
                <TodoPage />
            </TodoPageContext.Provider>;
        },
        todoListModel,
    };
};
