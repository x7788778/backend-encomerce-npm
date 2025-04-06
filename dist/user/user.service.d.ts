import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    register(userData: CreateUserDto): Promise<User>;
    findOne(username: string): Promise<User | undefined>;
    validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null>;
}
