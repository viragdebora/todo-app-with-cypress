import { createObservable, type Observable } from '../../common/observable';
import type { TodoItem, TodoList } from '../../models/todo.model';
import type { TodoListService } from './todo-list-service';

export class TodoListModel {
    public todoLists: Observable<TodoList[]> = createObservable<TodoList[]>([]);
    public activeListId: Observable<string> = createObservable<string>('');

    constructor(
        private readonly todoService: TodoListService,
    ) {}

    public async getAll(): Promise<TodoList[]> {
        const todoLists = await this.todoService.loadTodos();
        this.todoLists.value = todoLists;
        return this.todoLists.value;
    }

    public async createTodoList(todoListTitle: string): Promise<TodoList> {
        try {
            const todoList = await this.todoService.createTodoList(todoListTitle);
            this.todoLists.value = [...this.todoLists.value, todoList];
            return todoList;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async removeTodoList(listId: string): Promise<string> {
        try {
            await this.todoService.removeTodoList(listId);
            this.todoLists.value = this.todoLists.value.filter(list => list.id !== listId);
            this.activeListId.value = '';
            return listId;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async addTodoItem(listId: string, title: string): Promise<TodoItem> {
        try {
            const todoItem = await this.todoService.addTodoItem(listId, title);
            this.todoLists.value = this.todoLists.value.map(todoList => {
                if (todoList.id === listId) {
                    return {
                        ...todoList,
                        items: [todoItem, ...todoList.items],
                    };
                }

                return todoList;
            });

            return todoItem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async removeTodoItem(listId: string, id: string): Promise<string> {
        try {
            await this.todoService.removeTodoItem(listId, id);
            this.todoLists.value = this.todoLists.value.map(todoList => {
                if (todoList.id === listId) {
                    return {
                        ...todoList,
                        items: todoList.items.filter(item => item.id !== id),
                    };
                }

                return todoList;
            });
            return id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async updateTodoItem(listId: string, item: TodoItem): Promise<TodoItem> {
        try {
            await this.todoService.updateTodoItem(listId, item);
            this.todoLists.value = this.todoLists.value.map(todoList => {
                if (todoList.id === listId) {
                    return {
                        ...todoList,
                        items: todoList.items.map(todoItem => todoItem.id === item.id ? item : todoItem),
                    };
                }

                return todoList;
            });
            return item;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
