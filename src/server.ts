import { env } from './env';
import app from './app';

const PORT = env.API_PORT;

app.listen(PORT, () => {
  console.log(`Server is running`);
});
