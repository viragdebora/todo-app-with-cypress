import { login, logout, getUserInfo } from '../../helper/auth-helpers';

describe('API tests for the GET / auth/getUserInfo', () => {
    describe('Authenticated positive cases', () => {
        let userInfo: string;

        afterEach(() => {
            logout();
        });

        before(() => {
            login(Cypress.env('user'), Cypress.env('password'));
            getUserInfo().then(response => {
                userInfo = response.body;
            });
        });

        it('should return a boolean', () => {
            expect(userInfo).to.be.an('string');
            expect(userInfo.length).to.be.greaterThan(0);
        });

        it('should return with the same username that the user logged in', () => {
            expect(userInfo).to.equal(Cypress.env('user'));
        });
    });

    describe('Unauthenticated cases', () => {
        it('should return with false', () => {
            getUserInfo().then(response => {
                expect(response.body).to.equal('');
            });
        });
    });
});
