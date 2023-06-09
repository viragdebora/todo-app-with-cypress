import { Router } from 'express';
import type { TodoServiceMock } from '../../services/todo/todo.service-mock.js';

export function getTodosRouter(todoService: TodoServiceMock): Router {
    const todosRouter = Router();

    todosRouter.get('/', async (req, res) => {
        const todos = await todoService.loadTodos();
        res.send(todos);
    });

    todosRouter.post('/', async (req, res) => {
        const todoList = await todoService.createTodoList(req.body.title);
        res.send(todoList);
    });

    todosRouter.post('/addItem', async (req, res) => {
        const todoItem = await todoService.addTodoItem(req.body.listId, req.body.title);
        res.send(todoItem);
    });

    todosRouter.delete('/removeItem', async (req, res) => {
        const id = await todoService.removeTodoItem(req.body.listId, req.body.id);
        res.send(id);
    });

    todosRouter.put('/updateItem', async (req, res) => {
        const todoItem = await todoService.updateTodoItem(req.body.listId, req.body.item);
        res.send(todoItem);
    });

    todosRouter.delete('/', async (req, res) => {
        const id = await todoService.removeTodoList(req.body.listId);
        res.send(id);
    });

    return todosRouter;
}
