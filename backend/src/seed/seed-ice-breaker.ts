// backend/src/seed/seed-ice-breaker.ts
/**
 * Seeds the Ice Breaking poll from Workshop One.
 * Run:  npm run seed:poll
 */

import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AppModule } from '../app.module';
import { Poll, PollDocument } from '../polls/schemas/poll.schema';

const ICE_BREAKER = {
  slug: 'ice-breaker-1',
  workshopId: 'workshop-one',
  question: 'Why do you want to learn Research?',
  durationSec: 60,
  options: [
    { id: 'opt1', label: 'Scholarship' },
    { id: 'opt2', label: 'Higher Study' },
    { id: 'opt3', label: 'Publication' },
    { id: 'opt4', label: 'Career Growth' },
    { id: 'opt5', label: 'Pure Curiosity' },
  ],
};

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  const model = app.get<Model<PollDocument>>(getModelToken(Poll.name));

  const existing = await model.findOne({ slug: ICE_BREAKER.slug });
  if (existing) {
    console.log(`ℹ️  Poll "${ICE_BREAKER.slug}" already exists — skipping.`);
  } else {
    await model.create({ ...ICE_BREAKER, status: 'idle' });
    console.log(`✅ Seeded poll: ${ICE_BREAKER.slug}`);
  }

  await app.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});