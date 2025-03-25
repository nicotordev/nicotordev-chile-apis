// src/types/express/index.d.ts
declare global {
  namespace Express {
    interface Request {
      getBody: <T = unknown>() => T;
    }
  }
}

export {};
