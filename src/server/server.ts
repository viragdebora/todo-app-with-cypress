import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { getTodosRouter } from './routers/todos-router';
import { TodoServiceMock } from '../store/todos/todo.service';
import { getAuthRouter } from './routers/auth.router';
import { AuthServiceMock } from '../store/auth/auth.service';
import bodyParser from 'body-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
    const app = express()

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom',
    })

    app.use(vite.middlewares);
    
    app.use(bodyParser.json());
    
    app.use('/api/todos', getTodosRouter(new TodoServiceMock()));
    app.use('/api/auth', getAuthRouter(new AuthServiceMock()));

    app.use('*', async (req, res) => {
        const url = req.originalUrl

        try {
            let template = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');

            template = await vite.transformIndexHtml(url, template);

            // 6. Send the rendered HTML back.
            res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (e: any) {
            console.log(e);
            console.log(vite.ssrFixStacktrace(e));
        }
    })

    app.listen(5173, () => {
        console.log('listening');
    })
}

createServer()