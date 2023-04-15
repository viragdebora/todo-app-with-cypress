import { createStoreon } from 'storeon';
import { StoreContext } from 'storeon/react';
import { Home } from './home';
import { selectors } from '../../../cypress/support/po/home-page/selectors';

describe("Component tests for the Home component", () => {
    beforeEach(() => {
        const store = createStoreon([(s) => s.on('@init', () => ({ auth: {} }))]);
        cy.mount(<StoreContext.Provider value={store}>
            <Home/>
        </StoreContext.Provider>);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(selectors.welcomeText).should("be.visible");
        cy.get(selectors.welcomeText).should("include.text", "Welcome");
    });
});