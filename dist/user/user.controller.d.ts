import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    info(): string;
    register(CreateUserDto: CreateUserDto, res: Response): Promise<void>;
    login(body: {
        email: string;
        password: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
}
