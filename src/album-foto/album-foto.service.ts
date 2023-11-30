import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { FotoEntity } from '../foto/foto.entity/foto.entity';

@Injectable()
export class AlbumFotoService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
     
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ) {}

    async addFotoToAlbum(albumId: string, fotoId: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({ where: { id: albumId }, relations: ['fotos'] });
        if (!album) {
            throw new BusinessLogicException('El album con ese id no fue encontrado', BusinessError.NOT_FOUND);
        }
       
        const foto: FotoEntity = await this.fotoRepository.findOne({ where: { id: fotoId } });
        if (!foto) {
            throw new BusinessLogicException('La foto con ese id no fue encontrada', BusinessError.NOT_FOUND);
        }
     
        album.fotos.push(foto);
        const updatedAlbum = await this.albumRepository.save(album);
      
        return updatedAlbum;
    }
   
}
