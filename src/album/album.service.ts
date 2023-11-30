import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { AlbumEntity } from './album.entity/album.entity';

@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    ) {}



    async findAlbumById(id: string): Promise<AlbumEntity> {
        const usuario: AlbumEntity = await this.albumRepository.findOne({ where: { id }, relations: ['fotos'] });
        if (!usuario) {
            throw new BusinessLogicException('El album con el id no fue encontrado', BusinessError.NOT_FOUND);
        }
        return usuario;
    }

    async createAlbum(usuario: AlbumEntity): Promise<AlbumEntity> {
        if (usuario.titulo.length === 0) {
            throw new BusinessLogicException('El titulo no debe estar vacio ', BusinessError.PRECONDITION_FAILED);
        }
        return await this.albumRepository.save(usuario);
    }

    async deleteAlbum(id: string): Promise<void> {
        const foto: AlbumEntity = await this.albumRepository.findOne({ where: { id } });
        if (!foto) {
            throw new BusinessLogicException('el album con ese id no fue encontrada.', BusinessError.NOT_FOUND);
        }
        await this.albumRepository.remove(foto);
    }
}