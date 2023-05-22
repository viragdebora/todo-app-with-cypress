import { TodoPage } from './todo-page';
import { TodoPageContext, TodoPageContextType } from './todo-page-context';
import { TodoListModel } from './todo-list-model';
import { TodoListService } from './todo-list-service';
import { FunctionComponent } from 'react';

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
    // window.todoListModel = todoListModel;
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
