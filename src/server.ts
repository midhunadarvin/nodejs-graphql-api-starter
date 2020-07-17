import App from './app';
import AuthController from './auth/auth.controller';
import GraphQLController from './graphql/graphql.controller';
import dotenv from 'dotenv';
import { AuthService } from './auth/auth.service';
import UserDao from './repository/user.dao';

dotenv.config({ path: '.env' });
const port = process.env.PORT || 8080;

const userDao = new UserDao();
const authService = new AuthService(userDao);

const app = new App(
    [
        new AuthController(authService),
        new GraphQLController(),
    ],
    port,
);

app.listen();