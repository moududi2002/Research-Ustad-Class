// src/attendance/registration-lookup.service.ts

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool } from 'mysql2/promise';

import { WORKSHOP_DB } from '../workshop-db/workshop-db.module';

/**
 * Represents one registration row returned from MySQL.
 *
 * These property names match the column names
 * returned by the SQL query below.
 */
interface RegistrationRow {
  registration_id: string;
  full_name: string;
  email: string;
  whatsapp: string;
}

@Injectable()
export class RegistrationLookupService {
  constructor(
    /**
     * Workshop MySQL connection pool.
     *
     * WORKSHOP_DB is provided by
     * workshop-db.module.ts.
     */
    @Inject(WORKSHOP_DB)
    private readonly db: Pool,
  ) {}

  /**
   * Find a participant by registration ID.
   *
   * The registration ID is normalized before
   * querying the database:
   *
   * " ru-001 " -> "RU-001"
   */
  async findRegistration(registrationId: string) {
    const normalizedId = registrationId
      .trim()
      .toUpperCase();

    /**
     * Registration ID is required.
     */
    if (!normalizedId) {
      throw new BadRequestException(
        'Registration ID is required',
      );
    }

    /**
     * Search the Workshop MySQL database.
     *
     * The ? placeholder is used for the value
     * to avoid SQL injection.
     */
    const [rows] = await this.db.execute<RegistrationRow[]>(
      `
        SELECT
          registration_id,
          full_name,
          email,
          whatsapp
        FROM registrations
        WHERE registration_id = ?
        LIMIT 1
      `,
      [normalizedId],
    );

    /**
     * No registration was found.
     */
    if (!rows.length) {
      throw new NotFoundException(
        'Registration ID not found',
      );
    }

    const registration = rows[0];

    /**
     * Return a clean application-level object.
     *
     * Database column names are converted into
     * camelCase names used by the application.
     */
    return {
      registrationId: registration.registration_id,
      fullName: registration.full_name,
      email: registration.email,
      whatsapp: registration.whatsapp,
    };
  }
}
