import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { logger } from './Config/Logger.config';
import routes from './Routes/index.routes';

dotenv.config();
createConnection()
  .then(async () => {
    const app: Application = express();
    app.use(bodyParser.json());
    app.use('/', routes);
    app.get('/', (req: Request, res: Response) => {
      res.send({
        message: `Welcome to the matrix boys`
      });
    });
    app.listen(process.env.PORT || 5000, () => {
      logger.info(`app running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    logger.error(`${error}`);
  });
