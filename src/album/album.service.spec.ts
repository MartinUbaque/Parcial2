import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];


  beforeEach(async () => {
    albumList=[];
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

        titulo: faker.lorem.word(2),
        fechaInicio:faker.date.past(),
        fechaFin:faker.date.past()

      });
      albumList.push(album);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('createAlbum should create a new album', async () => {
    const album: AlbumEntity = await repository.save({
      titulo: faker.lorem.word(2),
        fechaInicio:faker.date.past(),
        fechaFin:faker.date.past()

    });
    const newAlbum: AlbumEntity = await service.createAlbum(album);
    expect(newAlbum).not.toBeNull();

    const strAlbum: AlbumEntity = await repository.findOne({
      where: { id: newAlbum.id },
    });
    expect(strAlbum).not.toBeNull();
    expect(strAlbum.titulo).toEqual(newAlbum.titulo);
  });

  it('findAlbumById should return an album by id', async () => {
    const strAlbum: AlbumEntity = albumList[0];
    const album: AlbumEntity = await service.findAlbumById(
      strAlbum.id,
    );
    expect(album).not.toBeNull();
    expect(album.titulo).toEqual(strAlbum.titulo);
  });


  it('findFotoById should throw an error if foto does not exist', async () => {
    await expect(() => service.findAlbumById('0')).rejects.toHaveProperty(
      'message',
      'El album con el id no fue encontrado',
    );
  });


  it('deleteAlbum should remove a album', async () => {
    const strAlbum: AlbumEntity = albumList[0];
    await service.deleteAlbum(strAlbum.id);
    const deletedAlbum: AlbumEntity = await repository.findOne({
      where: { id: strAlbum.id }, 
    });

    expect(deletedAlbum).toBeNull(); 
  });
});
