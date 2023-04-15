import { createStoreon } from 'storeon';
import { BrowserRouter } from 'react-router-dom';
import { TodoPage } from './todo-page';
import { selectors } from '../../../../cypress/support/po/todo-page/selectors';
import { StoreContext } from 'storeon/react';
import { AppState } from '../../../app.state';
import { DEFAULT_AUTH_STATE } from '../../../store/auth/auth.state';
import { DEFAULT_TODO_STATE } from '../../../store/todos/todo.state';

describe("Component tests for the Header component", () => {
    beforeEach(() => {
        const store = createStoreon<AppState>([(s) => s.on('@init', () => ({
            auth: DEFAULT_AUTH_STATE,
            todos: DEFAULT_TODO_STATE,
        }))]);
        cy.mount(<StoreContext.Provider value={store}>
            <TodoPage />
        </StoreContext.Provider>);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(selectors.noItemsVisible).should("be.visible");
    });
});