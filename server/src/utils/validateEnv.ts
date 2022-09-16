import { cleanEnv, str, port } from 'envalid';

export default function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['development', 'production'] }),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        PORT: port({
            default: 3000,
        }),
        JWT_SECRET: str(),
        MONGO_PROD_PATH: str(),
    });
}
