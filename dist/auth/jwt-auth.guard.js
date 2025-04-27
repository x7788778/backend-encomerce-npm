"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
// src/auth/jwt-auth.guard.ts
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const rxjs_1 = require("rxjs");
let JwtAuthGuard = exports.JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    async canActivate(context) {
        const parentResult = await (async () => {
            const result = super.canActivate(context);
            if (result instanceof Promise) {
                return await result;
            }
            else if (result instanceof rxjs_1.Observable) {
                return await lastValueFrom(result);
            }
            return result;
        })();
        console.log('JWT Guard activated:', parentResult); // 添加日志检查激活状态
        const request = context.switchToHttp().getRequest();
        console.log('Request user after guard:', request.user); // 添加日志检查用户信息是否被设置
        return parentResult;
    }
};
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
function lastValueFrom(result) {
    return (0, rxjs_1.lastValueFrom)(result);
}
// AuthGuard 内部通过 Passport 的 authenticate() 方法，根据名称 'jwt' 找到之前注册的 JwtStrategy。
// 执行 JwtStrategy 的验证逻辑（validate() 方法）。
//# sourceMappingURL=jwt-auth.guard.js.map