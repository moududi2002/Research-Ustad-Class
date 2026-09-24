// backend/src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  AdminUser,
  AdminUserDocument,
} from './schemas/admin-user.schema';
import type { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminUser.name)
    private readonly adminModel: Model<AdminUserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.adminModel
      .findOne({ username: dto.username, isActive: true })
      .exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user._id.toString(),
      username: user.username,
      role: 'admin' as const,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      success: true,
      accessToken,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
      },
    };
  }

  async findById(id: string) {
    return this.adminModel.findById(id).exec();
  }
}