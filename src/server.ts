import { env } from './env';
import app from './app';

const PORT = env.API_PORT;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running`);
});
