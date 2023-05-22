import { AuthModel } from './auth-model';
import type { AuthService } from './auth.service';

export interface AuthModuleDeps {
    authService: AuthService;
}

export interface AuthModule {
    authModel: AuthModel;
}

export const initAuthModule = (deps: AuthModuleDeps): AuthModule => {
    const authModel = new AuthModel(deps.authService);
    window.appActions.authModel = authModel;

    return {
        authModel,
    };
};
