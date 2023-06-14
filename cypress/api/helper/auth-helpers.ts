export function login(user?: string, pass?: string): Cypress.Chainable<Cypress.Response<string>> {
    const username = user ?? Cypress.env('user');
    const password = pass ?? Cypress.env('password');
    return cy.request('POST', 'api/auth/login', { username, password }).then(response => {
        return response.body;
    });
}

export function logout(): Cypress.Chainable<Cypress.Response<void>> {
    return cy.request('POST', 'api/auth/logout').then(response => {
        return response.body;
    });
}

export function isAuthenticated(): Cypress.Chainable<Cypress.Response<boolean>> {
    return cy.request('GET', 'api/auth/isAuthenticated').then(response => {
        return response;
    });
}

export function getUserInfo(): Cypress.Chainable<Cypress.Response<string>> {
    return cy.request('GET', 'api/auth/userInfo').then(response => {
        return response;
    });
}
