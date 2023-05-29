import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, redirect, RouterProvider, Outlet } from 'react-router-dom';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { Login } from './components/login/login';
import { AuthServiceClient } from './services/auth/auth.service-client';
import { TodoServiceClient } from './services/todo/todo.service-client';
import { type TodoPageRoutingContext } from './modules/todo/todo-page-module';
import { loadTodoPage } from './modules/todo/lazy-load-todo-page';
import { initAuthModule } from './modules/auth/auth-module';
import { AuthContext } from './modules/auth/auth-context';
import './index.css';

(async () => {
    window.appActions = {};
    const authService = new AuthServiceClient();

    const { authModel } = initAuthModule({ authService });

    await authModel.checkIsAuthenticated();
    await authModel.getUserInfo();

    authModel.onLogin(({ error }) => {
        if (!error) {
            const searchParams = new URLSearchParams(router.state.location.search);
            const redirectTo = decodeURIComponent(searchParams.get('redirectTo') ?? '/');
            router.navigate(redirectTo);
        }
    });

    authModel.onLogout(({ error }) => {
        if (!error) {
            router.navigate('/login');
        }
    });

    const todoPageContext: TodoPageRoutingContext = {
        todoService: new TodoServiceClient(),
    };

    const router = createBrowserRouter([
        {
            element: <App logout={async () => authModel.logout()}><Outlet /></App>,
            path: '/',
            loader: ({ request }) => {
                if (!authModel.isAuthenticated.value) {
                    const url = new URL(request.url);
                    const redirectTo = encodeURIComponent(url.pathname || '/');
                    return redirect(`/login?redirectTo=${redirectTo}`);
                }
                return {};
            },
            children: [
                {
                    path: '',
                    element: <Home usernameObs={authModel.username} />,
                },
                {
                    path: 'todos',
                    lazy: async () => {
                        const { todoListModel } = await loadTodoPage(todoPageContext);
                        todoListModel.activeListId.onChange((activeId) => {
                            if (router.state.initialized) {
                                router.navigate(`/todos?${activeId ? `id=${activeId}` : ''}`);
                            }
                        });
                        const { LazyComponent } = await import('./components/lazy-component/lazy-component');
                        return { Component: LazyComponent };
                    },
                    loader: async ({ request }) => {
                        if (!authModel.isAuthenticated.value) {
                            return {};
                        }
                        const { Component, todoListModel } = await loadTodoPage(todoPageContext);

                        const id = new URL(request.url).searchParams.get('id') ?? '';
                        if (id && todoListModel.activeListId.value !== id) {
                            todoListModel.activeListId.value = id;
                        }

                        todoListModel.getAll();

                        return {
                            Component,
                        };
                    },
                },
                {
                    path: '/not-found',
                    element: <NotFound />,
                },
                {
                    path: '*',
                    loader: () => {
                        return redirect('/not-found');
                    },
                },
            ],
        },
        {
            path: '/login',
            element: <Login login={async (username, password) => authModel.login(username, password)} />,
            loader: ({ request }) => {
                const redirectTo = new URL(request.url).searchParams.get('redirectTo') ?? '/';
                if (authModel.isAuthenticated.value) {
                    return redirect(decodeURIComponent(redirectTo));
                }
                return {};
            },
        },
    ]);

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <AuthContext.Provider value={{ authModel }}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
        </React.StrictMode>,
    );
})();
