// backend/src/config/env.validation.ts

import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(4001),

  MONGODB_URI: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),

  ADMIN_USERNAME: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().email().required(),
  ADMIN_SEED_PASSWORD: Joi.string().min(8).required(),

  DEVICE_HASH_SALT: Joi.string().min(16).required(),

  CORS_ORIGINS: Joi.string().allow('').default(''),

  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(60),

  PDF_ACCESS_KEY: Joi.string().min(8).required(),
  FRONTEND_URL: Joi.string().uri().required(),
});