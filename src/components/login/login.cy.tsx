import { createStoreon } from 'storeon';
import { StoreContext } from 'storeon/react';
import { Login } from './login';

describe("This is the first component test", () => {
    it('check for the sign in button text', () => {
        const store = createStoreon([(s) => s.on('@init', () => ({ auth: {} }))]);
        cy.mount(<StoreContext.Provider value={store}>
            <Login login={() => { }} />
        </StoreContext.Provider>);
        cy.get("button[type='submit']").should("have.text", "Sign In");
    });
});