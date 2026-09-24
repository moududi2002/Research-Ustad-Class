// backend/src/seed/create-admin.ts
/**
 * Creates (or updates) the admin user from .env values.
 * Run:  npm run seed:admin
 */

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AppModule } from '../app.module';
import {
  AdminUser,
  AdminUserDocument,
} from '../auth/schemas/admin-user.schema';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  const config = app.get(ConfigService);
  const model = app.get<Model<AdminUserDocument>>(
    getModelToken(AdminUser.name),
  );

  const username = config.get<string>('admin.username')!;
  const email = config.get<string>('admin.email')!;
  const plainPassword = config.get<string>('admin.seedPassword')!;

  if (!plainPassword || plainPassword.length < 8) {
    throw new Error('ADMIN_SEED_PASSWORD must be at least 8 chars');
  }

  const passwordHash = await bcrypt.hash(plainPassword, 12);

  const existing = await model.findOne({ username });
  if (existing) {
    existing.passwordHash = passwordHash;
    existing.email = email;
    existing.isActive = true;
    await existing.save();
    console.log(`♻️  Updated admin user: ${username}`);
  } else {
    await model.create({ username, email, passwordHash, isActive: true });
    console.log(`✅ Created admin user: ${username}`);
  }

  await app.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});