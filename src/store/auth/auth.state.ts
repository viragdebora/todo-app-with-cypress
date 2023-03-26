export interface AuthState {
    username: string;
    isAuthenticated: boolean;
    error?: any;
}

export interface WithAuthState {
    auth: AuthState;
}

export const DEFAULT_AUTH_STATE: AuthState = {
    username: '',
    isAuthenticated: false,
    error: null,
};
