import type { AuthEvents } from './store/auth/auth.events';
import type { TodoEvents } from './store/todos/todo.events';

export interface AppEvents extends AuthEvents, TodoEvents {}
