export class AuthServiceMock {
    private userInfo = '';
    private isLoggedIn = false;

    async login(username: string, password: string): Promise<string> {
        const uname = 'Testuser';
        if (username !== uname || password !== 'Test123') {
            throw new Error('Incorrect credentials!');
        }

        this.userInfo = uname;
        this.isLoggedIn = true;

        return uname;
    }

    async logout(): Promise<void> {
        this.userInfo = '';
        this.isLoggedIn = false;
    }

    async isAuthenticated(): Promise<boolean> {
        return this.isLoggedIn;
    }

    async getUserInfo(): Promise<string> {
        return this.userInfo;
    }
}
