import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';
import errorMiddleware, {
    defaultErrorFallback,
} from '@/middleware/error.middleware';

export default class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        /**
         * Call all private methods (initialize database connection, middlewares and controllers)
         * 1.   Database connection
         * 2.   Application middlewares
         * 3.   Controllers
         * 4.   Error middelwares
         */

        this.initializeDatabaseConnection();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorMiddelwares();
    }

    private initializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_PROD_PATH } =
            process.env;

        (async function () {
            try {
                if (process.env.NODE_ENV === 'development') {
                    // This will use the local mongo path (ex. URI in MongoDB Compass )
                    await mongoose.connect(`${MONGO_PATH}/taskDB`);

                    console.log('(Development) Connected to the database...');
                } else {
                    // This will use the full mongo path including username and password specified in .env
                    await mongoose.connect(`${MONGO_PROD_PATH}`);
                    console.log('(Production) Connected to the database...');
                }
            } catch (error) {
                throw new Error('Cannot connect to the database...');
            }
        })();
    }

    private initializeMiddlewares(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorMiddelwares(): void {
        this.express.use(errorMiddleware, defaultErrorFallback);
    }

    public listen(): void {
        this.express.listen(this.port, () =>
            console.log(`Application is listening at port ${this.port}`)
        );
    }
}
