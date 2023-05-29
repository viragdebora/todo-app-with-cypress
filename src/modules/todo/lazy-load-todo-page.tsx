import type { TodoPageRoutingContext, TodoPageModule } from './todo-page-module';

export const loadTodoPage = async (context: TodoPageRoutingContext): Promise<TodoPageModule> => {
    if (!context.todoPageModule) {
        context.todoPageModule = import('./todo-page-module').then(async ({ initTodoPageModule }) => {
            return initTodoPageModule(context);
        });
    }

    return context.todoPageModule;
};
