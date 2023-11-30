import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { FotoEntity } from 'src/foto/foto.entity/foto.entity';
import { AlbumFotoService } from './album-foto.service';
import { AlbumFotoController } from './album-foto.controller';

@Module({
    imports: [ TypeOrmModule.forFeature([AlbumEntity,FotoEntity]) ],
    providers: [AlbumFotoService],
    controllers: [AlbumFotoController],
    //controllers: [AlbumFotoController],
  })
export class AlbumFotoModule {}