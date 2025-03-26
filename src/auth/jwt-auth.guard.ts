// src/auth/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean {
    const activate = (req) => {
      // 可以在这里添加自定义逻辑，例如检查用户角色等
      return true;
    };
    //表示是否允许通过验证
    const request = context.switchToHttp().getRequest();
    return activate(request);
  }
}