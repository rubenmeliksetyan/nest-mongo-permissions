import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(user: any) {
    const userObject = user.toObject ? user.toObject() : user;
    const payload = {
      userId: userObject._id?.toString(),
      email: userObject.email,
      role: userObject.role || 'user',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
