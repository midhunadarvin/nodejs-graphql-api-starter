import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';

const jwtExpirySeconds = 300;

class AuthController {
    public path = '/auth';
    public router = Router();

    constructor(private authService: AuthService) {
        this.intializeRoutes();
    }

    public intializeRoutes(): void {
        this.router.post(`${this.path}/login`, this.login);
    }

    private login = async (request: express.Request, response: express.Response): Promise<void> => {
        // Get credentials from JSON body
        const { username, password } = request.body;
        if (!username || !password) {
            // return 401 error is username or password doesn't exist, or if password does
            // not match the password in our records
            return response.status(401).end()
        }
        const user = await this.authService.validateUser(username, password);
        if (user) {
            // Create a new token with the username in the payload
            // and which expires 300 seconds after issue
            const token = jwt.sign({ username, isAdmin: user.role === 1 }, process.env.JWT_SECRET_KEY as jwt.Secret, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })

            // set the cookie as the token string, with a similar max age as the token
            // here, the max age is in milliseconds, so we multiply by 1000
            response.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
            response.status(200).send({
                message: "success"
            });
        } else {
            return response.status(401).end();
        };
    }
}

export default AuthController;