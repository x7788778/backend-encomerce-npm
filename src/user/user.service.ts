// src/user/user.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 注册用户
  async register(userData: CreateUserDto): Promise<User> {
    // 检查用户是否已存在
    const existingUser = await this.userRepository.findOne({ where: { username: userData.username } });
    console.log(userData,existingUser,'register')
    if (existingUser) {
      throw new UnauthorizedException('用户已存在');
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

  // 查找用户
  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  // 验证密码
  async validateUser(username: string, password: string): Promise<Omit<User,'password'>|null> {
    const user = await this.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // 密码匹配，返回用户信息（去掉密码）
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }
}