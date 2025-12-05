import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { json } from 'body-parser';
import logger from './utils/logger';

const app = express();
app.use(helmet());
app.use(cors({ origin: true }));
app.use(json());

app.use('/api', routes);

app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
