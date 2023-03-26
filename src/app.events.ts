import { AuthEvents } from "./store/auth/auth.events";
import { TodoEvents } from "./store/todos/todo.events";

export interface AppEvents extends AuthEvents, TodoEvents {}