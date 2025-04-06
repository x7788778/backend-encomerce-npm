// src/user/user.controller.ts
import { Controller, Post, Body, Res, Get, HttpStatus, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RedisTestService } from '../redis-test.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly RedisTestService: RedisTestService
  ) {}

  @Get("info")
  info():string{
    return "info"
  }

  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
  //   try {
  //     const user = await this.userService.register(createUserDto);
  //     res.status(201).json({ message: '注册成功', user });
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }
  @Post('register') 
  async register(@Body()CreateUserDto:CreateUserDto,@Res()res: Response ) { 
    try {
      const user = await this.userService.register( CreateUserDto ); 
      res.status( HttpStatus.CREATED ).json({ message : '注册成功' , user });
    } catch(error) {
       if(error instanceof UnauthorizedException) {
       res.status( HttpStatus.CONFLICT ).json({ message : error.message});
       } else { 
        res.status( HttpStatus.INTERNAL_SERVER_ERROR ).json({ message : '服务器错误' }); 
      } 
    } 
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Res() res: Response) {
    const { username, password } = body;
    const user = await this.userService.findOne(username);

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

  // 受保护的用户信息端点 
  @UseGuards(JwtAuthGuard)
  @Get('profile') 
  async getProfile(@Request() req, @Res() res: Response ) {
     const user = req.user ; // 由 JwtAuthGuard 提供 
     res.status( HttpStatus.OK ).json( { user } ) ; 
    }

  @Get('redis-test')
  async testRedis() {
    return this.RedisTestService.testConnection();
  }
}