declare namespace NodeJS
{
    export interface ProcessEnv
    {
        NODE_ENV: "development" | "production";
        JWT_SECRET: string;
        DB_ROOT_PASSWORD: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_DATABASE: string;
        DB_HOST: string;
    }
}
