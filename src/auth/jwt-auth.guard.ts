// src/auth/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, lastValueFrom as rxjsLastValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const parentResult = await (async () => {
            const result = super.canActivate(context);
            if (result instanceof Promise) {
                return await result;
            } else if (result instanceof Observable) {
                return await lastValueFrom(result);
            }
            return result;
        })();
        console.log('JWT Guard activated:', parentResult); // 添加日志检查激活状态
        const request = context.switchToHttp().getRequest();
        console.log('Request user after guard:', request.user); // 添加日志检查用户信息是否被设置
        return parentResult;
    }
}

function lastValueFrom(result: Observable<boolean>): Promise<boolean> {
    return rxjsLastValueFrom(result);
}
// AuthGuard 内部通过 Passport 的 authenticate() 方法，根据名称 'jwt' 找到之前注册的 JwtStrategy。
// 执行 JwtStrategy 的验证逻辑（validate() 方法）。