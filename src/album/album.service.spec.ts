import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AlbumFotoService } from 'src/album-foto/album-foto.service';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';

describe('FotoService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({

        titulo: faker.lorem.word(5),
        fechaInicio:faker.date.past(),
        fechaFin:faker.date.past()

      });
      albumList.push(album);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('deleteAlbum should remove a album', async () => {
    const strAlbum: AlbumEntity = albumList[0];
    await service.deleteAlbum(strAlbum.id);
    const deletedFoto: AlbumEntity = await repository.findOne({
      where: { id: strAlbum.id }, 
    });

    expect(deletedFoto).toBeNull(); 
  });
});
