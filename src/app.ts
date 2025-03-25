import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import statusMonitor from 'express-status-monitor';

import { swaggerOptions } from './config/swagger';
import { logger } from './config/winston';
import ApiResponse from './middleware/apiResponse.middleware';

import newsRoutes from './routes/news.routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeHealthCheck();
    this.initializeRoutes();
    this.initialize404();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeSwagger() {
    const specs = swaggerJsdoc(swaggerOptions);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
      logger.error(err);
      ApiResponse.internalServerError(res, 'Internal server error');
    });
  }

  private initialize404() {
    this.app.use((req: Request, res: Response) => {
      ApiResponse.notFound(res, 'Resource not found');
    });
  }


  private initializeRoutes() {
    const allRoutes: Array<Record<string, express.Router>> = [{
      '/noticias': newsRoutes
    }];
    allRoutes.forEach((routes) => {
      Object.keys(routes).forEach((route) => {
        this.app.use(`/api/v1${route}`, routes[route]);
      });
    });
  }


  private initializeHealthCheck() {
    this.app.use(statusMonitor());

    this.app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString()
      });
    });
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  }
}

export default App;