import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuarioList: UsuarioEntity[];

  
  beforeEach(async () => {
    usuarioList=[];
  const module: TestingModule = await Test.createTestingModule({
    imports: [...TypeOrmTestingConfig()],
    providers: [UsuarioService],
  }).compile();

  service = module.get<UsuarioService>(UsuarioService);
  repository = module.get<Repository<UsuarioEntity>>(
    getRepositoryToken(UsuarioEntity),
  );

  await seedDatabase();


  


});

const seedDatabase = async () => {
  repository.clear();
  for (let i = 0; i < 5; i++) {
    const usuario: UsuarioEntity = await repository.save({

      nombre: faker.person.fullName(),
      telefono:(faker.number.int({min:1000000000 , max:9999999999}))+"",
    });
    usuarioList.push(usuario);
  }
};

it('should be defined', () => {
  expect(service).toBeDefined();
});

it('createUsuario should create a new usuario', async () => {
  const usuario: UsuarioEntity = await repository.save({

    nombre: faker.person.fullName(),
    telefono:(faker.number.int({min:1000000000 , max:9999999999}))+"",
  });
  const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
  expect(newUsuario).not.toBeNull();

  const strUsuario: UsuarioEntity = await repository.findOne({
    where: { id: newUsuario.id },
  });
  expect(strUsuario).not.toBeNull();
  expect(strUsuario.nombre).toEqual(strUsuario.nombre);
  expect(strUsuario.telefono).toEqual(strUsuario.telefono);
});


it('findUsuarioById should return an usuario by id', async () => {
  const strUsuario: UsuarioEntity = usuarioList[0];
  const usuario: UsuarioEntity = await service.findUsuarioById(
    strUsuario.id,
  );
  expect(usuario).not.toBeNull();
  expect(usuario.nombre).toEqual(usuario.nombre);
  expect(usuario.telefono).toEqual(usuario.telefono);
});

it('findUsuarioById should throw an error if usuario does not exist', async () => {
  await expect(() => service.findUsuarioById('0')).rejects.toHaveProperty(
    'message',
    'El usuario con el id no fue encontrado',
  );
});

it('findAll should return all usuarios', async () => {
  const usuarios: UsuarioEntity[] = await service.findAllUsuarios();
  expect(usuarios).not.toBeNull();
  expect(usuarios).toHaveLength(usuarioList.length);
});




  
});
