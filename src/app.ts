/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import statusMonitor from 'express-status-monitor';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { swaggerOptions } from './config/swagger';
import { logger } from './config/winston';
import { ApiError } from './errors/api.errors';
import { adminAuthenticationMiddleware } from './middleware/admin-authentication.middleware';
import { authenticationMiddleware } from './middleware/authentication.middleware';
import apiKeysRoutes from './routes/apiKeys.routes';
import newsRoutes from './routes/news.routes';
import promptCategoriesRoutes from './routes/promptCategories.routes';
import promptsRoutes from './routes/prompts.routes';
import { RouteConfig } from './types/app';
import ApiResponse from './utils/apiResponse.util';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRateLimiter();
    this.initializeSwagger();
    this.initializeHealthCheck();
    this.initializeRoutes();
    this.initialize404();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRateLimiter(): void {
    // Global rate limiter for all routes
    const globalLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      message: 'Too many requests, please try again later.',
      handler: (req: Request, res: Response) => {
        return ApiResponse.tooManyRequests(res, 'Too many requests, please try again later.');
      },
    });

    // Health check and documentation routes with a more lenient rate limit
    const openRoutesLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 50, // Limit each IP to 50 requests per windowMs
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many requests, please try again later.',
      handler: (req: Request, res: Response) => {
        return ApiResponse.tooManyRequests(res, 'Too many requests, please try again later.');
      },
    });

    // Apply global rate limiter to all routes
    this.app.use(globalLimiter);

    // Apply more lenient rate limiter to health and docs routes
    this.app.use(['/health', '/api-docs'], openRoutesLimiter);
  }

  private initializeSwagger(): void {
    const specs = swaggerJsdoc(swaggerOptions);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling(): void {
    this.app.use((err: unknown, req: Request, res: Response, next: express.NextFunction) => {
      logger.error(err);

      if (err instanceof ApiError) {
        switch (err.statusCode) {
          case 400:
            return ApiResponse.badRequest(res, err.message);
          case 401:
            return ApiResponse.unauthorized(res, err.message);
          case 403:
            return ApiResponse.forbidden(res, err.message);
          case 404:
            return ApiResponse.notFound(res, err.message);
          case 409:
            return ApiResponse.conflict(res, err.message);
          case 429:
            return ApiResponse.tooManyRequests(res, err.message);
          case 500:
            return ApiResponse.internalServerError(res, err.message);
          default:
            return ApiResponse.internalServerError(res, 'Error interno del servidor');
        }
      }

      if (err instanceof Error && 'code' in err) {
        switch (err.code) {
          case 'P2000':
            return ApiResponse.badRequest(
              res,
              'El valor proporcionado para la columna es demasiado largo.'
            );
          case 'P2001':
            return ApiResponse.notFound(
              res,
              'El registro buscado en la condición WHERE no existe.'
            );
          case 'P2002':
            return ApiResponse.conflict(res, 'Violación de restricción única.');
          case 'P2003':
            return ApiResponse.conflict(res, 'Violación de restricción de clave foránea.');
          case 'P2004':
            return ApiResponse.badRequest(res, 'Falló una restricción en la base de datos.');
          case 'P2005':
            return ApiResponse.badRequest(
              res,
              'El valor almacenado en la base de datos para el campo es inválido para el tipo de campo.'
            );
          case 'P2006':
            return ApiResponse.badRequest(res, 'El valor proporcionado para el campo es inválido.');
          case 'P2007':
            return ApiResponse.badRequest(res, 'Error de validación de datos.');
          case 'P2008':
            return ApiResponse.internalServerError(res, 'Error al analizar la consulta.');
          case 'P2009':
            return ApiResponse.internalServerError(res, 'Error al validar la consulta.');
          case 'P2010':
            return ApiResponse.internalServerError(res, 'La consulta en bruto falló.');
          case 'P2011':
            return ApiResponse.badRequest(res, 'Violación de restricción de valor nulo.');
          case 'P2012':
            return ApiResponse.badRequest(res, 'Falta un valor requerido.');
          case 'P2013':
            return ApiResponse.badRequest(res, 'Falta un argumento requerido.');
          case 'P2014':
            return ApiResponse.badRequest(
              res,
              'El cambio que intentas realizar violaría la relación requerida.'
            );
          case 'P2015':
            return ApiResponse.notFound(res, 'No se pudo encontrar un registro relacionado.');
          case 'P2016':
            return ApiResponse.badRequest(res, 'Error de interpretación de la consulta.');
          case 'P2017':
            return ApiResponse.badRequest(
              res,
              'Los registros para la relación entre los modelos padre e hijo no están conectados.'
            );
          case 'P2018':
            return ApiResponse.badRequest(res, 'La referencia de conexión no es válida.');
          case 'P2019':
            return ApiResponse.badRequest(res, 'Error de interpretación de la entrada.');
          case 'P2020':
            return ApiResponse.notFound(res, 'Valor de clave fuera de rango.');
          case 'P2021':
            return ApiResponse.internalServerError(
              res,
              'La tabla actual no existe en la base de datos.'
            );
          case 'P2022':
            return ApiResponse.internalServerError(
              res,
              'La columna actual no existe en la base de datos.'
            );
          case 'P2023':
            return ApiResponse.internalServerError(
              res,
              'La entrada para la consulta no es válida.'
            );
          case 'P2024':
            return ApiResponse.internalServerError(
              res,
              'La consulta se agotó antes de completarse.'
            );
          case 'P2025':
            return ApiResponse.notFound(res, 'El registro buscado no existe.');
          case 'P2026':
            return ApiResponse.internalServerError(
              res,
              'No se pudo iniciar una transacción en el servidor.'
            );
          case 'P2027':
            return ApiResponse.internalServerError(
              res,
              'El motor de la base de datos no admite la característica solicitada.'
            );
          case 'P2028':
            return ApiResponse.internalServerError(res, 'Falló la transacción en el servidor.');
          case 'P2029':
            return ApiResponse.internalServerError(res, 'Error de protocolo de red.');
          case 'P2030':
            return ApiResponse.internalServerError(res, 'Error de base de datos desconocido.');
          case 'P2031':
            return ApiResponse.internalServerError(
              res,
              'No se pudo encontrar una base de datos válida en la cadena de conexión.'
            );
          case 'P2032':
            return ApiResponse.internalServerError(res, 'Error al convertir el campo.');
          case 'P2033':
            return ApiResponse.internalServerError(
              res,
              'No se pudo encontrar el archivo de base de datos.'
            );
          case 'P2034':
            return ApiResponse.internalServerError(
              res,
              'No se pudo encontrar una base de datos válida en la cadena de conexión.'
            );
          case 'P2035':
            return ApiResponse.internalServerError(
              res,
              'No se pudo encontrar una base de datos válida en la cadena de conexión.'
            );
          default:
            return ApiResponse.internalServerError(
              res,
              'Ocurrió un error inesperado con la base de datos.'
            );
        }
      }

      return ApiResponse.internalServerError(res, 'Error interno del servidor');
    });
  }

  private initialize404(): void {
    this.app.use((req: Request, res: Response) => {
      return ApiResponse.notFound(res, 'Resource not found');
    });
  }

  private initializeRoutes(): void {
    const allRoutes: RouteConfig[] = [
      {
        path: '/noticias',
        route: newsRoutes,
        adminOnly: false,
      },
      {
        path: '/api-keys',
        route: apiKeysRoutes,
        adminOnly: true,
      },
      {
        path: '/prompts',
        route: promptsRoutes,
        adminOnly: true,
      },
      {
        path: '/prompt-categories',
        route: promptCategoriesRoutes,
        adminOnly: true,
      },
    ];

    allRoutes.forEach(({ path, route, adminOnly }) => {
      if (adminOnly) {
        this.app.use(`/api/v1${path}`, adminAuthenticationMiddleware, route);
      } else {
        this.app.use(`/api/v1${path}`, authenticationMiddleware, route);
      }
    });
  }

  private initializeHealthCheck(): void {
    this.app.use(statusMonitor());
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
      });
    });
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  }
}

export default App;
