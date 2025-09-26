import './instrument';
import express from 'express';
import cors from 'cors';
import categoryRoute from './http/controllers/category/route';
import commentRoute from './http/controllers/comment/route';
import likeRoute from './http/controllers/like/route';
import postRoute from './http/controllers/post/route';
import tagRoute from './http/controllers/tag/route';
import userRoute from './http/controllers/user/route';
import authRoute from './http/routes/route';
import * as Sentry from '@sentry/node';

const app = express();
app.use(express.json());
app.use(cors());

const baseUrl = '/api/v1/';

app.set('trust proxy', true);

app.get(baseUrl + 'debug-sentry', (_, res, next) => {
  try {
    throw new Error('Test Sentry error!');
  } catch (err) {
    next(err);
  }
});

app.use(baseUrl + 'health', (_, response) => {
  response.status(200).json({ message: 'health' });
});

app.use(baseUrl, authRoute);
app.use(baseUrl, userRoute);
app.use(baseUrl, categoryRoute);
app.use(baseUrl, postRoute);
app.use(baseUrl, tagRoute);
app.use(baseUrl, commentRoute);
app.use(baseUrl, likeRoute);

Sentry.setupExpressErrorHandler(app);
Sentry.logger.info('User triggered test log', { action: 'test_log' });

export default app;
