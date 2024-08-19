import 'reflect-metadata';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';

import ApiError from '../errors/ApiError';

import '../../database/connection';
import '../../shared/containers';

import routes from './routes/index.routes';
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*' }))

app.use(express.json());
app.use(routes);
app.use(errors());
app.use((error: any, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof ApiError) return res.status(error.code).json(error);

  console.error(error);

  return res.status(500).send({ message: 'Internal server error', code: 500 });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`🚀 Server stared on port ${process.env.APP_PORT}`);
});
