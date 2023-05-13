export const LoginEvent = Symbol('Login');
export const LoginEndedEvent = Symbol('LoginEnded');
export const LogoutEvent = Symbol('Logout');
export const LogoutEndedEvent = Symbol('LogoutEnded');
export const IsAuthenticatedEvent = Symbol('IsAuthenticated');
export const IsAuthenticatedEndedEvent = Symbol('IsAuthenticatedEnded');
export const GetUserInfoEvent = Symbol('GetUserInfo');
export const GetUserInfoEndedEvent = Symbol('GetUserInfoEnded');

type LoginPayload = { username: string; password: string; };
export type LoginEndedPayload = { username: string; isAuthenticated: boolean; error?: unknown; };
type LogoutPayload = never;
export type LogoutEndedPayload = { error?: unknown; };

export interface AuthEvents {
    [LoginEvent]: LoginPayload;
    [LoginEndedEvent]: LoginEndedPayload;
    [LogoutEvent]: LogoutPayload;
    [LogoutEndedEvent]: LogoutEndedPayload;
    [IsAuthenticatedEvent]: never;
    [IsAuthenticatedEndedEvent]: boolean;
    [GetUserInfoEvent]: never;
    [GetUserInfoEndedEvent]: string;
}
