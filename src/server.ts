import App from './app';
import AuthController from './auth/auth.controller';
import GraphQLController from './graphql/graphql.controller';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
const port = process.env.PORT || 8080;

const app = new App(
    [
        new AuthController(),
        new GraphQLController(),
    ],
    port,
);

app.listen();