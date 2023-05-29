import { createContext } from 'react';
import { createObservable } from '../../common/observable';
import type { AuthModel } from './auth-model';
import type { AuthService } from './auth.service';

export interface AuthContextType {
    authModel: AuthModel;
}

export const AuthContext = createContext<AuthContextType>({
    authModel: {
        username: createObservable(''),
        isAuthenticated: createObservable<boolean>(false),
        error: createObservable<unknown>(null),
        authService: {} as unknown as AuthService,
        async login() {
            throw new Error('login not implemented');
        },
    } as unknown as AuthModel,
});
