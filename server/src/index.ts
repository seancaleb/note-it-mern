import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import ExpressApp from './app';
import TaskController from '@/resources/task/task.controller';
import UserController from '@/resources/user/user.controller';

/**
 * Validate environment variables
 */
validateEnv();

/**
 * Instantiate a new application passing in an array containing a list of instantiated Controllers
 */
const app = new ExpressApp(
    [new TaskController(), new UserController()],
    Number(process.env.PORT)
);

app.listen();
