import { WithAuthState } from "./store/auth/auth.state";
import { WithTodoState } from "./store/todos/todo.state";

export interface AppState extends WithAuthState, WithTodoState {}