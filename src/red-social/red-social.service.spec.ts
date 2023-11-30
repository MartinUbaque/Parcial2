import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { getRepositoryToken } from '@nestjs/typeorm';
import { RedSocialService } from './red-social.service';
import { RedSocialEntity } from './red-social.entity/red-social.entity';

describe('UsuarioService', () => {
  let service: RedSocialService;
  let repository: Repository<RedSocialEntity>;
  let redSocialList: RedSocialEntity[];

  
  beforeEach(async () => {
    redSocialList=[];
  const module: TestingModule = await Test.createTestingModule({
    imports: [...TypeOrmTestingConfig()],
    providers: [RedSocialService],
  }).compile();

  service = module.get<RedSocialService>(RedSocialService);
  repository = module.get<Repository<RedSocialEntity>>(
    getRepositoryToken(RedSocialEntity),
  );

  await seedDatabase();


  


});

const seedDatabase = async () => {
  repository.clear();
  for (let i = 0; i < 5; i++) {
    const redSocial: RedSocialEntity = await repository.save({

      nombre: faker.person.fullName(),
      slogan:faker.lorem.word({length:25})
    });
    redSocialList.push(redSocial);
  }
};

it('should be defined', () => {
  expect(service).toBeDefined();
});

it('createLibreria should create a redSocial', async () => {
  const redSocial: RedSocialEntity = await repository.save({

    nombre: faker.person.fullName(),
    slogan:faker.lorem.words(25)
  });
  const newRedSocial: RedSocialEntity = await service.createLibreria(redSocial);
  expect(newRedSocial).not.toBeNull();

  const strRedSocial: RedSocialEntity = await repository.findOne({
    where: { id: newRedSocial.id },
  });
  expect(strRedSocial).not.toBeNull();
  expect(strRedSocial.nombre).toEqual(strRedSocial.nombre);
  expect(strRedSocial.slogan).toEqual(strRedSocial.slogan);
});

it('createLibreria should send an error if slogan"s length is below 20  redSocial', async () => {
  const redSocial: RedSocialEntity = await repository.save({

    nombre: faker.person.fullName(),
    slogan:faker.lorem.words(1)
  });
  await expect(() => service.createLibreria(redSocial)).rejects.toHaveProperty(
    'message',
    'El slogan debe tener al menos 20 caracteres',
  );
});





  
});