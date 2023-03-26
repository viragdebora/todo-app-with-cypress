export class AuthServiceClient {
    async login(username: string, password: string): Promise<string> {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (response.status === 401) {
            throw new Error('Incorrect credentials!');
        }

        return response.text();
    }

    async logout(): Promise<void> {
        await fetch('/api/auth/logout', {
            method: 'POST',
        });
    }

    async isAuthenticated(): Promise<boolean> {
        const response = await fetch('/api/auth/isAuthenticated');

        return (await response.text()) === 'true';
    }

    async getUserInfo(): Promise<string> {
        const response = await fetch('/api/auth/userInfo');
        return response.text();
    }
}
