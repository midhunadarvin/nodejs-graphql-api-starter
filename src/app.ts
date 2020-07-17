import express from 'express';
import * as bodyParser from 'body-parser';
import { express as voyager } from 'graphql-voyager/middleware';
import authMiddleware from './auth/auth.middleware';
import { printSchema } from 'graphql';
import fs from 'fs';
import schema from './graphql/schema';

class App {
    public app: express.Application;
    public port: number | string;

    constructor(controllers: any, port: number | string) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares(): void {
        this.app.use(authMiddleware);
        this.app.use(bodyParser.json());
        if (process.env.APP_ENV !== 'production') {
            this.app.use('/graphql/model', voyager({ endpointUrl: '/graphql' }));
        }
    }

    private initializeControllers(controllers: any[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.redirect('/graphql');
        });
        fs.writeFileSync(
            'schema.graphql',
            printSchema(schema, { commentDescriptions: true }),
            'utf8',
        );
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;