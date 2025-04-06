import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const userData = { username: 'testuser', password: 'testpassword' };
      mockUserRepository.findOne.mockResolvedValue(undefined);
      mockUserRepository.save.mockResolvedValue({
        id: 1,
        ...userData,
        password: 'hashed_password',
      });

      const result = await service.register(userData);
      expect(result).toHaveProperty('id');
      expect(result.username).toBe(userData.username);
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const userData = { username: 'aaa', password: '111111',id:1 };
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: await bcrypt.hash('testpassword', 10),
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.login(userData);
      expect(result).toHaveProperty('access_token');
    });

    it('should throw an error if user not found', async () => {
        const userData = { username: 'testuser', password: 'testpassword',id:1 }; 
      mockUserRepository.findOne.mockResolvedValue(undefined);

      await expect(service.login(userData)).rejects.toThrow('User not found');
    });

    it('should throw an error if password is invalid', async () => {
      const userData = { username: 'testuser', password: 'wrongpassword',id:1 };
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: await bcrypt.hash('testpassword', 10),
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      await expect(service.login(userData)).rejects.toThrow('Invalid password');
    });
  });
});