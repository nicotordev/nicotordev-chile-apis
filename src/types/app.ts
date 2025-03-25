import { Router } from 'express';

interface RouteConfig {
  path: string;
  route: Router;
  adminOnly: boolean;
}

export type { RouteConfig };
