import { createEventEmitter } from '../../common/event-emitter';
import { createObservable } from '../../common/observable';
import type { AuthService } from './auth.service';

export class AuthModel {
    public username = createObservable<string>('');
    public isAuthenticated = createObservable<boolean>(false);
    public error = createObservable<unknown>(null);

    public onLogin = createEventEmitter<{ error: unknown; }>();
    public onLogout = createEventEmitter<{ error: unknown; }>();

    constructor(private readonly authService: AuthService) {}

    public async login(username: string, password: string): Promise<string> {
        try {
            const uname = await this.authService.login(username, password);
            this.username.value = uname;
            this.error.value = null;
            this.isAuthenticated.value = true;

            this.onLogin.emit({ error: null });
        } catch (error) {
            this.error.value = error;
            this.onLogin.emit({ error });
        }

        return this.username.value;
    }

    async logout(): Promise<void> {
        await this.authService.logout();
        this.username.value = '';
        this.isAuthenticated.value = false;
        this.onLogout.emit({ error: null });
    }

    async checkIsAuthenticated(): Promise<boolean> {
        const isAuthenticated = await this.authService.isAuthenticated();
        this.isAuthenticated.value = isAuthenticated;
        return this.isAuthenticated.value;
    }

    async getUserInfo(): Promise<string> {
        const userinfo = await this.authService.getUserInfo();
        this.username.value = userinfo;
        return this.username.value;
    }
}
