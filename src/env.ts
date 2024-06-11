import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(),
  JWT_PRIVATE: z.string(),
  JWT_PUBLIC: z.string(),
  PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof envSchema>;
