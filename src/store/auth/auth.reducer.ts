import { StoreonStore } from 'storeon';
import { DEFAULT_AUTH_STATE, AuthState } from './auth.state';
// import { AuthService } from '../../services/auth/auth-service.contract';
import { IsAuthenticatedEndedEvent, IsAuthenticatedEvent, LoginEndedEvent, LoginEvent, LogoutEndedEvent, LogoutEvent, GetUserInfoEvent, GetUserInfoEndedEvent } from './auth.events';
import { AppState } from '../../app.state';
import { AppEvents } from '../../app.events';
import { AuthServiceClient } from './auth.service-client';

export const getAuthReducer = (authService: AuthServiceClient) => (store: StoreonStore<AppState, AppEvents>) => {
    store.on('@init', (state) => ({ ...state, auth: DEFAULT_AUTH_STATE }));

    store.on(LoginEvent, async (_, { username, password }) => {
        try {
            const uname = await authService.login(username, password);
            store.dispatch(LoginEndedEvent, { username: uname, isAuthenticated: true });
        } catch (error) {
            store.dispatch(LoginEndedEvent, { error, username: '', isAuthenticated: false });
        }
    });

    store.on(LoginEndedEvent, (state, { username, isAuthenticated, error }) => ({
        ...state,
        auth: {
            ...state.auth,
            username,
            isAuthenticated,
            error
        }
    }));

    store.on(LogoutEvent, async () => {
        try {
            await authService.logout();
            store.dispatch(LogoutEndedEvent, {});
        } catch (error) {
            store.dispatch(LogoutEndedEvent, { error });
        }
    });

    store.on(LogoutEndedEvent, (state, { error }) => {
        if (error) {
            return state;
        }

        return {
            ...state,
            auth: {
                ...state.auth,
                username: '', isAuthenticated: false
            }
        };
    });

    store.on(IsAuthenticatedEvent, async () => {
        try {
            const authenticated = await authService.isAuthenticated();
            store.dispatch(IsAuthenticatedEndedEvent, authenticated);
        } catch (error) {
            store.dispatch(IsAuthenticatedEndedEvent, false);
        }
    });

    store.on(IsAuthenticatedEndedEvent, (state, authenticated) => {
        return {
            ...state,
            auth: {
                ...state.auth,
                isAuthenticated: authenticated
            }
        };
    });

    store.on(GetUserInfoEvent, async () => {
        try {
            const username = await authService.getUserInfo();
            store.dispatch(GetUserInfoEndedEvent, username);
        } catch (error) {
            console.log(error);
            store.dispatch(GetUserInfoEndedEvent, '');
        }
    });

    store.on(GetUserInfoEndedEvent, ({ auth }, username) => {
        return {
            auth: {
                ...auth,
                username
            }
        };
    });
}
