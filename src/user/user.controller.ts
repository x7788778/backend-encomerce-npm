// src/user/user.controller.ts
import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("info")
  info():string{
    return "info"
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.register(createUserDto);
      res.status(201).json({ message: '注册成功', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.userService.findOne(email);

    if (!user) {
      return res.status(401).json({ message: '用户不存在或密码错误' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '用户不存在或密码错误' });
    }

    // 在实际项目中，应生成JWT令牌
    res.status(200).json({ message: '登录成功', user });
  }
}