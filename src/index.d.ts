import { type AuthModel } from './modules/auth/auth-model';
import { type TodoListModel } from './modules/todo/todo-list-model';

type AppActions = {
    authModel?: AuthModel;
    todoModel?: TodoListModel;
};

declare global {
    var appActions: AppActions;
}
