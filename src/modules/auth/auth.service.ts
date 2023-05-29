export interface AuthService {
    login(username: string, password: string): Promise<string>;
    logout(): Promise<void>;
    isAuthenticated(): Promise<boolean>;
    getUserInfo(): Promise<string>;
}
