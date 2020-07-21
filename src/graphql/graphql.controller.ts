import { Router } from 'express';
import graphql from 'express-graphql';
import { GraphQLError } from 'graphql';
import schema from './schema';
import { Context } from './context';
class GraphQLController {
    public path = '/graphql';
    public router = Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes(): void {
        this.router.use(`${this.path}`,
            graphql((req: any) => ({
                schema,
                context: new Context(req),
                graphiql: process.env.APP_ENV !== 'production',
                pretty: false,
                customFormatErrorFn: (err: any) => {
                    console.error(err.originalError || err);
                    return {
                        message: err.message,
                        code: err.originalError && err.originalError.code,
                        state: err.originalError && err.originalError.state,
                        locations: err.locations,
                        path: err.path,
                    };
                },
            })));
    }
}

export default GraphQLController;