import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity/foto.entity';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotoList: FotoEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        ISO: faker.number.int({min:100,max:6400}),
        valObturacion: faker.number.int({min:2,max:250}),
        apertura: faker.number.int({min:1,max:32}),
        fecha:faker.date.past()

      });
      fotoList.push(foto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createFoto should create a new foto', async () => {
    const foto: FotoEntity = await repository.save({
      ISO: faker.number.int({min:100,max:6400}),
      valObturacion: faker.number.int({min:2,max:250}),
      apertura: faker.number.int({min:1,max:32}),
      fecha:faker.date.past()

    });
    const newFoto: FotoEntity = await service.create(foto);
    expect(newFoto).not.toBeNull();

    const strFoto: FotoEntity = await repository.findOne({
      where: { id: newFoto.id },
    });
    expect(strFoto).not.toBeNull();
    expect(strFoto.ISO).toEqual(strFoto.ISO);
    expect(strFoto.velObturacion).toEqual(strFoto.velObturacion);
  });

  it('deleteFoto should remove a foto', async () => {
    const strFoto: FotoEntity = fotoList[0];
    await service.delete(strFoto.id);
    const deletedFoto: FotoEntity = await repository.findOne({
      where: { id: strFoto.id }, 
    });

    expect(deletedFoto).toBeNull(); 
  });



});


