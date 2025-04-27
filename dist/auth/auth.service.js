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
exports.AuthService = void 0;
// src/auth/auth.service.ts
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = exports.AuthService = class AuthService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    // 注册用户
    async register(userData) {
        const existingUser = await this.userRepository.findOne({ where: { username: userData.username } });
        console.log(userData, existingUser, 'register');
        if (existingUser) {
            throw new common_1.UnauthorizedException('用户已存在');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = this.userRepository.create({
            username: userData.username,
            password: hashedPassword,
        });
        const user = await this.userRepository.save(newUser);
        const { password: _, ...result } = user;
        return result;
    }
    // 用户登录并生成 JWT
    async login(credentials) {
        const { username, password, id } = credentials;
        console.log('Raw credentials:', credentials);
        const expiresIn = this.configService.get('JWT_EXPIRES_IN');
        console.log('JWT_EXPIRES_IN:'); // 添加日志
        // // 查找用户
        // const dbuser = await this.userRepository.findOne({ where: { username } });
        // if (!dbuser) {
        //   throw new UnauthorizedException({ message: 'User not found' });
        // }
        // // 验证密码
        // console.log('Raw input password:', password);
        // console.log('Stored hashed password:', dbuser.password);
        // const isPasswordValid = await bcrypt.compare(password, dbuser.password);
        // console.log('isPasswordValid:', isPasswordValid);
        // if (!isPasswordValid) {
        //   // 额外调试：尝试同步比较
        //   const syncValid = bcrypt.compareSync(password, dbuser.password);
        //   console.log('Sync compare result:', syncValid);
        //   throw new UnauthorizedException({ 
        //     message: 'Invalid password',
        //     debug: {
        //       inputPassword: password,
        //       storedHash: dbuser.password,
        //       asyncCompare: isPasswordValid,
        //       syncCompare: syncValid
        //     }
        //   });
        // }
        const payload = { username: username, sub: id };
        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: expiresIn,
            }),
        };
    }
    // 验证用户密码
    async validateUser(username, password) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { ...result } = user;
            // console.log('validateUser:', result);
            return result;
        }
        return null;
    }
    // JWT 验证策略
    async validate(payload) {
        const user = await this.userRepository.findOne({ where: { id: payload.sub, username: payload.username } });
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map