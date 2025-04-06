// src/auth/jwt.strategy.ts 配置 JWT 验证策略,并且实现 validate 方法，用于验证 JWT 令牌，检查token是否有效
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    console.log('Loaded JWT Secret:', secret); // 添加日志检查加载的密钥
    super({
      // 指定从请求头中提取 JWT 的方式，这里使用 Bearer Token。
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 是否忽略令牌过期。设置为 false 以确保验证过期的令牌。
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload); // 添加日志检查 JWT 的 payload
    if (!payload || !payload.sub || !payload.username) {
      throw new UnauthorizedException('无效的 JWT payload');
    }
    return { userId: payload.sub, username: payload.username };
  }
}