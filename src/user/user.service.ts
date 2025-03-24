// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(userData: any): Promise<User> {
    // 检查用户是否已存在
    const existingUser = await this.userRepository.findOne({ where: { username: userData.username } });
    console.log(userData,existingUser,'register')
    if (existingUser) {
      throw new Error('用户已存在');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // 创建新用户
    const newUser = this.userRepository.create({
      username: userData.username,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }
}