import { TodoPageRoutingContext } from "./todo-page-module";
import { TodoPageModule } from "./todo-page-module";

export const loadTodoPage = async (context: TodoPageRoutingContext): Promise<TodoPageModule> => {
    if (!context.todoPageModule) {
        context.todoPageModule = import('./todo-page-module').then(({ initTodoPageModule }) => {
            return Promise.resolve(initTodoPageModule(context));
        });
    }

    return context.todoPageModule;
};
