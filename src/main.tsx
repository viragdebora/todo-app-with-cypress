import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, redirect, RouterProvider, Outlet } from 'react-router-dom';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { Login } from './components/login/login';
import { storeonDevtools, storeonLogger } from 'storeon/devtools';
import { StoreContext } from 'storeon/react';
import { createStoreon } from 'storeon';
import type { AppEvents } from './app.events';
import type { AppState } from './app.state';
import { getAuthReducer } from './store/auth/auth.reducer';
import { GetUserInfoEndedEvent, GetUserInfoEvent, IsAuthenticatedEndedEvent, IsAuthenticatedEvent, LoginEndedEvent, LoginEvent, LogoutEndedEvent, LogoutEvent } from './store/auth/auth.events';
import { getTodoReducer } from './store/todos/todo.reducer';
import { AuthServiceClient } from './store/auth/auth.service-client';
import { TodoServiceClient } from './store/todos/todo.service-client';
import { TodoPageRoutingContext } from './modules/todo/todo-page-module';
import { loadTodoPage } from './modules/todo/lazy-load-todo-page';

(async () => {
    const authService = new AuthServiceClient();
    const todoService = new TodoServiceClient();

    const store = createStoreon<AppState, AppEvents>([
        storeonDevtools,
        storeonLogger,
        getAuthReducer(authService),
        getTodoReducer(todoService),
    ]);

    const promise = new Promise<void>(resolve => {
        const unsubscribe = store.on(IsAuthenticatedEndedEvent, () => {
            unsubscribe();
            resolve();
        });
    });
    store.dispatch(IsAuthenticatedEvent);
    await promise;

    const getUserInfoPromise = new Promise<void>(resolve => {
        const unsubscribe = store.on(GetUserInfoEndedEvent, () => {
            unsubscribe();
            resolve();
        });
    });
    store.dispatch(GetUserInfoEvent);
    await getUserInfoPromise;

    store.on(LoginEndedEvent, (_, { error }) => {
        if (!error) {
            const searchParams = new URLSearchParams(router.state.location.search);
            const redirectTo = decodeURIComponent(searchParams.get('redirectTo') ?? '/');
            router.navigate(redirectTo);
        }
    });

    store.on(LogoutEndedEvent, (_, { error }) => {
        if (!error) {
            router.navigate('/login');
        }
    });

    const todoPageContext: TodoPageRoutingContext = {
        todoService: new TodoServiceClient(),
    };

    const router = createBrowserRouter([
        {
            element: <App logout={() => store.dispatch(LogoutEvent)}><Outlet /></App>,
            path: '/',
            loader: ({ request }) => {
                if (!store.get().auth.isAuthenticated) {
                    const url = new URL(request.url);
                    const redirectTo = encodeURIComponent(url.pathname || '/');
                    return redirect(`/login?redirectTo=${redirectTo}`);
                }
                return {};
            },
            children: [
                {
                    path: '',
                    element: <Home />,
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
                        if (!store.get().auth.isAuthenticated) {
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
            element: <Login login={(username, password) => store.dispatch(LoginEvent, { username, password })} />,
            loader: ({ request }) => {
                const redirectTo = new URL(request.url).searchParams.get('redirectTo') ?? '/';
                if (store.get().auth.isAuthenticated) {
                    return redirect(decodeURIComponent(redirectTo));
                }
                return {};
            },
        },
    ]);

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <StoreContext.Provider value={store}>
                <RouterProvider router={router} />
            </StoreContext.Provider>
        </React.StrictMode>,
    );
})();
