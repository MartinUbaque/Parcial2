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

    fotoList=[];
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
        velObturacion: faker.number.int({min:2,max:250}),
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
      ISO: faker.number.int({min:100,max:3000}),
      velObturacion: faker.number.int({min:2,max:250}),
      apertura: faker.number.int({min:1,max:32}),
      fecha:faker.date.past()

    });
    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();

    const strFoto: FotoEntity = await repository.findOne({
      where: { id: newFoto.id },
    });
    expect(strFoto).not.toBeNull();
    expect(strFoto.ISO).toEqual(newFoto.ISO);
    expect(strFoto.velObturacion).toEqual(newFoto.velObturacion);
  });

  it('createFoto should send an error if more than two values are over ther means', async () => {
    const foto: FotoEntity = await repository.save({
      ISO: faker.number.int({min:5000,max:6000}),
      velObturacion: faker.number.int({min:130,max:250}),
      apertura: faker.number.int({min:25,max:32}),
      fecha:faker.date.past()

    });
    await expect(() => service.createFoto(foto)).rejects.toHaveProperty(
      'message',
      'Maximo 2 de los valores en la foto deben estar por encima del medio de su cota',
    );
  });

  it('deleteFoto should remove a foto', async () => {
    const strFoto: FotoEntity = fotoList[0];
    await service.deleteFoto(strFoto.id);
    const deletedFoto: FotoEntity = await repository.findOne({
      where: { id: strFoto.id }, 
    });

    expect(deletedFoto).toBeNull(); 
  });

  it('findFotoById should return a foto by id', async () => {
    const strFoto: FotoEntity = fotoList[0];
    const foto: FotoEntity = await service.findFotoById(
      strFoto.id,
    );
    expect(foto).not.toBeNull();
    expect(foto.ISO).toEqual(strFoto.ISO);
    expect(foto.velObturacion).toEqual(strFoto.velObturacion);
  });


  it('findFotoById should throw an error if foto does not exist', async () => {
    await expect(() => service.findFotoById('0')).rejects.toHaveProperty(
      'message',
      'La foto con ese id no fue encontrada.',
    );
  });
  
  it('findAll should return all usuarios', async () => {
    const fotos: FotoEntity[] = await service.findAllFotos();
    expect(fotos).not.toBeNull();
    expect(fotos).toHaveLength(fotoList.length);
  });


});


