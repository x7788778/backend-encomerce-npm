// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 注册用户
  async register(userData: { username: string; password: string }): Promise<Omit<User, 'password'>> {
      const existingUser = await this.userRepository.findOne({ where: { username: userData.username } });
      console.log(userData,existingUser, 'register')
    if (existingUser) {
      throw new UnauthorizedException('用户已存在');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = this.userRepository.create({
      username: userData.username,
      password: hashedPassword,
    });
    const user = await this.userRepository.save(newUser);
    const { password:_, ...result } = user;
    return result;
  }

  // 用户登录并生成 JWT
  async login(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 验证用户密码
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const {  ...result } = user;
      return result;
    }
    return null;
  }

  // JWT 验证策略
  async validate(payload: any) {
    const user = await this.userRepository.findOne({ where: { id: payload.sub, username: payload.username } });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}