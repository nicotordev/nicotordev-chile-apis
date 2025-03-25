import cors from 'cors';
import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import statusMonitor from 'express-status-monitor';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { swaggerOptions } from './config/swagger';
import { logger } from './config/winston';
import adminApiKeyRoutes from './routes/admin/apiKey.routes';
import newsRoutes from './routes/news.routes';
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
        ApiResponse.tooManyRequests(res, 'Too many requests, please try again later.');
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
        ApiResponse.tooManyRequests(res, 'Too many requests, please try again later.');
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
    this.app.use((err: unknown, req: Request, res: Response) => {
      logger.error(err);
      ApiResponse.internalServerError(res, 'Internal server error');
    });
  }

  private initialize404(): void {
    this.app.use((req: Request, res: Response) => {
      ApiResponse.notFound(res, 'Resource not found');
    });
  }

  private initializeRoutes(): void {
    const allRoutes: Record<string, express.Router>[] = [
      {
        '/noticias': newsRoutes,
      },
    ];
    const adminRoutes: Record<string, express.Router>[] = [
      {
        '/api-keys': adminApiKeyRoutes,
      },
    ];

    allRoutes.forEach((routes) => {
      Object.keys(routes).forEach((route) => {
        this.app.use(`/api/v1${route}`, routes[`${route}`]);
      });
    });

    adminRoutes.forEach((routes) => {
      Object.keys(routes).forEach((route) => {
        this.app.use(`/api/v1/admin${route}`, routes[`${route}`]);
      });
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
