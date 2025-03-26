// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 注册端点
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(createUserDto);
      res.status(HttpStatus.CREATED).json({ message: '注册成功', user });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        res.status(HttpStatus.CONFLICT).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '服务器错误' });
      }
    }
  }

  // 登录端点
  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Res() res: Response) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('用户不存在或密码错误');
    }

    const token = await this.authService.login(user);
    res.status(HttpStatus.OK).json({ access_token: token.access_token });
  }
}