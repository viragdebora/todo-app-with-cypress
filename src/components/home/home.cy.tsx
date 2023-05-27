import { Home } from './home';
import { homePageSelectors } from '../../../cypress/support/selectors/home-page-selectors';
import { createObservable } from '../../common/observable';

describe('Component tests for the Home component', () => {
    const usernameObs = createObservable('');

    beforeEach(() => {
        cy.mount(<Home usernameObs={usernameObs}/>);
    });

    it('all the element should be visible and have the correct text', () => {
        cy.get(homePageSelectors.welcomeText).should('be.visible');
        cy.get(homePageSelectors.welcomeText).should('include.text', 'Welcome');
    });
});
