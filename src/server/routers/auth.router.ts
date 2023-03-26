import { Router } from "express";
import { AuthServiceMock } from "../../store/auth/auth.service";

export function getAuthRouter(authService: AuthServiceMock): Router {
    const authRouter = Router();

    authRouter.post('/login', async (req, res) => {
        try {

            const userinfo = await authService.login(req.body.username, req.body.password);
            res.send(userinfo);
        } catch (err) {
            if (err instanceof Error && err.message === 'Incorrect credentials!') {
                return res.status(401).send(err.message);
            }
            res.status(500).send(err);
        }
    });

    authRouter.post('/logout', async (req, res) => {
        await authService.logout();
        res.end();
    });

    authRouter.get('/isAuthenticated', async (req, res) => {
        const isAuthenticated = await authService.isAuthenticated();
        res.send(isAuthenticated);
    });

    authRouter.get('/userInfo', async (req, res) => {
        const userInfo = await authService.getUserInfo();
        res.send(userInfo);
    });

    return authRouter;
}
