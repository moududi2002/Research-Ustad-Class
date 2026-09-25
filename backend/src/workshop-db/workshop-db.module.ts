//backend/src/workshop-db/workshop-db.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysql from 'mysql2/promise';

export const WORKSHOP_DB = 'WORKSHOP_DB';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: WORKSHOP_DB,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const db = config.get('workshopDb');

        return mysql.createPool({
          host: db.host,
          port: db.port,
          user: db.username,
          password: db.password,
          database: db.database,
          waitForConnections: true,
          connectionLimit: 5,
          queueLimit: 0,
        });
      },
    },
  ],
  exports: [WORKSHOP_DB],
})
export class WorkshopDbModule {}