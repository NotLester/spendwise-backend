import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiKey } from '../database/entities/api-key.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  const apiKeyRepositoryMock = {
    findOneBy: jest.mock,
  };

  const apiKeyMock = { id: 'b2edb9e5-8999-4aca-af65-6deacfd1bb9a' } as ApiKey;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(ApiKey),
          useValue: apiKeyRepositoryMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateApiKey', () => {
    it('should return false if api key is in invalid format', async () => {
      apiKeyRepositoryMock.findOneBy = jest.fn().mockResolvedValue(null);
      const apiKey = 'invalid-api-key-format';
      const result = await authService.validateApiKey(apiKey);
      expect(apiKeyRepositoryMock.findOneBy).not.toHaveBeenCalled();
    });

    it('should return false if the api key does not exist', async () => {
      apiKeyRepositoryMock.findOneBy = jest.fn().mockResolvedValue(null);
      const apiKey = 'b2edb9e5-8999-4aca-af65-6deacfd1bb9b';
      const result = await authService.validateApiKey(apiKey);
      expect(apiKeyRepositoryMock.findOneBy).toHaveBeenCalledWith({
        id: apiKey,
      });
      expect(result).toBe(false);
    });

    it('should return true if the api key exists', async () => {
      apiKeyRepositoryMock.findOneBy = jest.fn().mockResolvedValue(apiKeyMock);
      const result = await authService.validateApiKey(apiKeyMock.id);
      expect(apiKeyRepositoryMock.findOneBy).toHaveBeenCalledWith({
        id: apiKeyMock.id,
      });
      expect(result).toBe(true);
    });
  });
});
