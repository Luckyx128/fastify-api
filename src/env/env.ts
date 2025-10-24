import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  AMBIENTE_SIGRA: z.enum(['dev','hom' ,'prod']),
});

export const env = envSchema.parse(process.env)
