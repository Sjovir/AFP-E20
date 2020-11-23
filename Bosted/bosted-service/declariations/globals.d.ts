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

      AUTH_SERVICE: string;
      AUTH_PORT: string;

      MEDICINE_SERVICE: string;
      MEDICINE_PORT: string;
    }
  }
}

// https://stackoverflow.com/questions/43160598/adding-properties-to-koa2s-context-in-typescript
// module augmentation
declare module 'koa' {
  interface BaseContext {
    axios: AxiosInstance;
  }
}
