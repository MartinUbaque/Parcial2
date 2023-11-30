import { Test, TestingModule } from '@nestjs/testing';
import { RedSocialService } from './red-social.service';

describe('RedSocialService', () => {
  let service: RedSocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedSocialService],
    }).compile();

    service = module.get<RedSocialService>(RedSocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
