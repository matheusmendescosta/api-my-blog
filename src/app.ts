import cors from 'cors';
import express from 'express';
import categoryRoute from './http/controllers/category/route';
import commentRoute from './http/controllers/comment/route';
import likeRoute from './http/controllers/like/route';
import postRoute from './http/controllers/post/route';
import tagRoute from './http/controllers/tag/route';
import userRoute from './http/controllers/user/route';
import authRoute from './http/routes/route';

const app = express();

app.use(cors());

const baseUrl = '/api/v1/';

app.use(express.json());

app.use(baseUrl + 'health', (_, response) => {
  response.status(200).json({
    message: 'health',
  });
});

app.use(baseUrl, authRoute);
app.use(baseUrl, userRoute);
app.use(baseUrl, categoryRoute);
app.use(baseUrl, postRoute);
app.use(baseUrl, tagRoute);
app.use(baseUrl, commentRoute);
app.use(baseUrl, likeRoute);

export default app;
