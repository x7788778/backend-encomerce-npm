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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
// src/auth/auth.controller.ts
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    // 注册端点
    async register(createUserDto, res) {
        try {
            const user = await this.authService.register(createUserDto);
            res.status(common_1.HttpStatus.CREATED).json({ message: '注册成功', user });
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                res.status(common_1.HttpStatus.CONFLICT).json({ message: error.message });
            }
            else {
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '服务器错误' });
            }
        }
    }
    // 登录端点
    async login(body, res) {
        const { username, password } = body;
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException('用户不存在或密码错误');
        }
        const token = await this.authService.login(user);
        res.status(common_1.HttpStatus.OK).json({ access_token: token.access_token });
    }
    getProfile(req) {
        console.log('Request object:', req); // 添加日志检查整个请求对象
        console.log('Decoded JWT payload:', req.user); // 添加日志检查解析的用户信息
        if (!req.user) {
            throw new common_1.UnauthorizedException('用户信息未找到');
        }
        return { userId: req.user.userId, username: req.user.username };
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map