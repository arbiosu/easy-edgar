import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z, type ZodError } from 'zod';

expand(config());

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3000),
});

export type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(process.env);
} catch (err) {
  const error = err as ZodError;
  console.error('Invalid env', error.flatten());
  process.exit(1);
}

export default env;
