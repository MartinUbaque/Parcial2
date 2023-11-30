import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumFotoService } from './album-foto.service';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { FotoEntity } from '../foto/foto.entity/foto.entity';

describe('AlbumFotoService', () => {
  let service: AlbumFotoService;
  let albumRepository: Repository<AlbumEntity>;
  let fotoRepository: Repository<FotoEntity>;
  let foto:FotoEntity;
  let album: AlbumEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumFotoService],
    }).compile();

    service = module.get<AlbumFotoService>(AlbumFotoService);
    albumRepository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
    fotoRepository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });




  const seedDatabase = async () => {
    albumRepository.clear();
    fotoRepository.clear();
  

    const foto: FotoEntity = await fotoRepository.save({
      ISO: faker.number.int({min:100,max:6400}),
      velObturacion: faker.number.int({min:2,max:250}),
      apertura: faker.number.int({min:1,max:32}),
      fecha:faker.date.past()

    });
     
    const album: AlbumEntity = await albumRepository.save({

      titulo: faker.lorem.word(5),
      fechaInicio:faker.date.past(),
      fechaFin:faker.date.past()

    });
  
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
 
  it('addFotoToAlbum should add a foto to an album', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
      ISO: faker.number.int({min:100,max:6400}),
      velObturacion: faker.number.int({min:2,max:250}),
      apertura: faker.number.int({min:1,max:32}),
      fecha:faker.date.past()

    });
  
    const newAlbum: AlbumEntity = await albumRepository.save({

      titulo: faker.lorem.word(5),
      fechaInicio:faker.date.past(),
      fechaFin:faker.date.past()

    });
  
    const result: AlbumEntity = await service.addFotoToAlbum(newAlbum.id, newFoto.id);
    
    expect(result.fotos.length).toBe(1);
    expect(result.fotos[0]).not.toBeNull();
    expect(result.fotos[0].ISO).toBe(newFoto.ISO);
    expect(result.fotos[0].velObturacion).toBe(newFoto.velObturacion);

  });
  

  it('addFotoToAlbum should send an error if the album does not exist', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
      ISO: faker.number.int({min:100,max:6400}),
      velObturacion: faker.number.int({min:2,max:250}),
      apertura: faker.number.int({min:1,max:32}),
      fecha:faker.date.past()

    });
  

    await expect(() => service.addFotoToAlbum("0",newFoto.id)).rejects.toHaveProperty(
      'message',
      'El album con ese id no fue encontrado',
    );
  });

 
  
});
