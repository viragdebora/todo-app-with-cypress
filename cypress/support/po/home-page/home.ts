import { selectors as home } from './selectors';
import { Page } from '../base-page';


class HomePage extends Page {
    constructor() {
        super();
        this.url = '';
    }

    getAllElementVisible() {
        cy.get(home.welcomeText).should('be.visible');
    }
}

export default HomePage;