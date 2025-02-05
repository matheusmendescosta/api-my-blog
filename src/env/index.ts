import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']),
  API_PORT: z.coerce.number(),
  PRISMA_STUDIO_PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  POSGRESDB_VOLUME_PATH: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  PGADMIN_DEFAULT_EMAIL: z.string().email(),
  PGADMIN_DEFAULT_PASSWORD: z.string(),
  PGADMIN_LISTEN_PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  MAILHOG_SMTP_PORT: z.string(),
  MAILHOG_HTTP_PORT: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
