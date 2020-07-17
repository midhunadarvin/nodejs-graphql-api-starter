import express, { Router } from 'express';

class AuthController {
    public path = '/auth';
    public router = Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes(): void {
        this.router.post(`${this.path}/login`, this.login);
    }

    login = (request: express.Request, response: express.Response): void => {
        const post = request.body;
        response.send(post);
    }
}

export default AuthController;