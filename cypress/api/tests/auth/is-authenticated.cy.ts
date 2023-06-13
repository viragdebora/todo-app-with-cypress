import { login, logout, isAuthenticated } from '../../helper/auth-helpers';

describe('API tests for the GET / auth/isAuthenticated', () => {
    describe('Authenticated positive cases', () => {
        let isUserAuthenticated: boolean;

        afterEach(() => {
            logout();
        });

        before(() => {
            login();
            isAuthenticated().then(response => {
                isUserAuthenticated = response.body;
            });
        });

        it('should return a boolean', () => {
            expect(isUserAuthenticated).to.be.an('boolean');
            expect(isUserAuthenticated).to.equal(true);
        });
    });

    describe('Unauthenticated cases', () => {
        it('should return with false', () => {
            isAuthenticated().then(response => {
                expect(response.body).to.equal(false);
            });
        });
    });
});
