import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

    async findAllUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find({ relations: ['fotos','redSocial'] });
    }

    async findUsuarioById(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id }, relations: ['fotos','redSocial'] });
        if (!usuario) {
            throw new BusinessLogicException('El usuario con el id no fue encontrado', BusinessError.NOT_FOUND);
        }
        return usuario;
    }

    async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if (usuario.telefono.length !== 10) {
            throw new BusinessLogicException('El telefono debe tener 10 caracteres '+usuario.telefono , BusinessError.PRECONDITION_FAILED);
        }
        return await this.usuarioRepository.save(usuario);
    }
}
