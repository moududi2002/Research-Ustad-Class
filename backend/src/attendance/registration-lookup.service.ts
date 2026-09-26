import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Pool, RowDataPacket  } from 'mysql2/promise';
import { WORKSHOP_DB } from '../workshop-db/workshop-db.module';

interface RegistrationRow extends RowDataPacket {
  registration_id: string;
  full_name: string;
  email: string;
  whatsapp: string;
}

@Injectable()
export class RegistrationLookupService {
  constructor(
    @Inject(WORKSHOP_DB)
    private readonly db: Pool,
  ) {}

  private maskPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');

    if (digits.length < 7) {
      return '****';
    }

    let formatted = digits;

    /*
     * Bangladesh number:
     * 01712345678
     * becomes:
     * +8801712****78
     */
    if (digits.startsWith('01') && digits.length === 11) {
      formatted = `+880${digits}`;
    }

    if (formatted.length < 7) {
      return '****';
    }

    return (
      formatted.slice(0, 7) +
      '****' +
      formatted.slice(-2)
    );
  }

  private maskEmail(email: string): string {
    const trimmed = email.trim().toLowerCase();

    const atIndex = trimmed.indexOf('@');

    if (atIndex <= 0) {
      return '***@****.com';
    }

    const localPart = trimmed.slice(0, atIndex);
    const domain = trimmed.slice(atIndex + 1);

    const dotIndex = domain.lastIndexOf('.');

    if (dotIndex <= 0) {
      return `${localPart.slice(0, 5)}***@****`;
    }

    const extension = domain.slice(dotIndex);

    return `${localPart.slice(0, 5)}***@****${extension}`;
  }

  async findRegistrationInternal(
  registrationId: string,
) {
  const normalizedId =
    registrationId.trim().toUpperCase();

  if (!normalizedId) {
    throw new BadRequestException(
      'Registration ID is required',
    );
  }

  const [rows] = await this.db.execute<RegistrationRow []>(
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

  if (!rows.length) {
    throw new NotFoundException(
      'Registration ID not found',
    );
  }

  const registration = rows[0];

  return {
    registrationId: registration.registration_id,
    fullName: registration.full_name,
    email: registration.email,
    whatsapp: registration.whatsapp,
  };
}

  async findRegistration(registrationId: string) {
    const normalizedId =
      registrationId.trim().toUpperCase();

    if (!normalizedId) {
      throw new BadRequestException(
        'Registration ID is required',
      );
    }

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

    if (!rows.length) {
      throw new NotFoundException(
        'Registration ID not found',
      );
    }

    const registration = rows[0];

    return {
      registrationId: registration.registration_id,
      fullName: registration.full_name,
      email: this.maskEmail(registration.email),
      whatsapp: this.maskPhone(registration.whatsapp),
    };
  }
}