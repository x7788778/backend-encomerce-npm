"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// src/user/user.controller.ts
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const bcrypt = __importStar(require("bcrypt"));
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const redis_test_service_1 = require("../redis-test.service");
let UserController = exports.UserController = class UserController {
    constructor(userService, RedisTestService) {
        this.userService = userService;
        this.RedisTestService = RedisTestService;
    }
    info() {
        return "info";
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
    async register(CreateUserDto, res) {
        try {
            const user = await this.userService.register(CreateUserDto);
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
    async login(body, res) {
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
    async getProfile(req, res) {
        const user = req.user; // 由 JwtAuthGuard 提供 
        res.status(common_1.HttpStatus.OK).json({ user });
    }
    async testRedis() {
        return this.RedisTestService.testConnection();
    }
};
__decorate([
    (0, common_1.Get)("info"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserController.prototype, "info", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('redis-test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "testRedis", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        redis_test_service_1.RedisTestService])
], UserController);
//# sourceMappingURL=user.controller.js.map