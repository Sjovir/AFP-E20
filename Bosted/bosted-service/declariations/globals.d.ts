import { AxiosInstance } from 'axios';

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    JWT_SECRET: string;
    DB_ROOT_PASSWORD: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_PORT: string;
    KAFKA_HOST?: string;
  }
}

// https://stackoverflow.com/questions/43160598/adding-properties-to-koa2s-context-in-typescript
// module augmentation
declare module 'koa' {
  interface BaseContext {
    axios: AxiosInstance;
  }
}
