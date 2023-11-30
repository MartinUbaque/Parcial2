import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity/album.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([AlbumEntity]) ],

  providers: [AlbumService],

  //  controllers:[AlbumController ]

})
export class AlbumModule {}
