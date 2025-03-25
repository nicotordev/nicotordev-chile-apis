import { Router } from 'express';

interface RouteConfig {
  path: string;
  route: Router;
  authenticate: boolean;
}

export type { RouteConfig };
