import { Test, TestingModule } from '@nestjs/testing';
import { AlbumFotoService } from './album-foto.service';

describe('AlbumFotoService', () => {
  let service: AlbumFotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumFotoService],
    }).compile();

    service = module.get<AlbumFotoService>(AlbumFotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
