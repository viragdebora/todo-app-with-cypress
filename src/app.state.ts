import type { WithAuthState } from './store/auth/auth.state';
import type { WithTodoState } from './store/todos/todo.state';

export interface AppState extends WithAuthState, WithTodoState {}
