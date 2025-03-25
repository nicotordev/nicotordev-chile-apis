// src/types/environment.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: 'development' | 'production';
      LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
      NOTICIAS_STATUS: 'true' | 'false';
      GOOGLE_GENERATIVE_AI_API_KEY: string;
      MASTER_KEY: string;
      BRD_PROXY_HOST: string;
      BRD_PROXY_PORT: string;
      BRD_PROXY_AUTH: string;
    }
  }
}

// This is crucial to make the file a module
export {};
