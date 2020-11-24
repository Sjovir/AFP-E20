import { AxiosInstance } from 'axios';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      DB_HOST: string;
      DB_DATABASE: string;
      DB_ROOT_PASSWORD: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_PORT: string;

      KAFKA_HOST: string;
      JWT_SECRET: string;

      FRONTEND_ADDRESS: string;
      FRONTEND_PORT: string;

      BOSTED_SERVICE: string;
      BOSTED_PORT: string;
    }
  }
}

declare module 'koa' {
  interface BaseContext {
    axios: AxiosInstance;
  }
}
