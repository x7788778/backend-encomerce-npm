"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
// src/auth/jwt.strategy.ts 配置 JWT 验证策略,并且实现 validate 方法，用于验证 JWT 令牌，检查token是否有效
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
let JwtStrategy = exports.JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        const secret = configService.get('JWT_SECRET');
        console.log('Loaded JWT Secret:', secret); // 添加日志检查加载的密钥
        super({
            // 指定从请求头中提取 JWT 的方式，这里使用 Bearer Token。
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 是否忽略令牌过期。设置为 false 以确保验证过期的令牌。
            ignoreExpiration: false,
            secretOrKey: secret,
        });
        this.configService = configService;
    }
    async validate(payload) {
        console.log('JWT payload:', payload); // 添加日志检查 JWT 的 payload
        if (!payload || !payload.sub || !payload.username) {
            throw new common_1.UnauthorizedException('无效的 JWT payload');
        }
        return { userId: payload.sub, username: payload.username };
    }
};
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map