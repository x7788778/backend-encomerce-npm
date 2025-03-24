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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const bcrypt = require("bcrypt");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    info() {
        return "info";
    }
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
        const { email, password } = body;
        const user = await this.userService.findOne(email);
        if (!user) {
            return res.status(401).json({ message: '用户不存在或密码错误' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: '用户不存在或密码错误' });
        }
        res.status(200).json({ message: '登录成功', user });
    }
};
exports.UserController = UserController;
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
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map