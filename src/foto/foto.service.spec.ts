import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';

describe('FotoService', () => {
  let service: FotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
