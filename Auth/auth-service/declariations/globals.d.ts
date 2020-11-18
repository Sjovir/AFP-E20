declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    JWT_SECRET: string;
    DB_ROOT_PASSWORD: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE_AUTH: string;
    KAFKA_HOST?: string;
  }
}
