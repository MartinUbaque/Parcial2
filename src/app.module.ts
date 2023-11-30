import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { FotoModule } from './foto/foto.module';
import { FotoEntity } from './foto/foto.entity/foto.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { RedSocialModule } from './red-social/red-social.module';
import { AlbumModule } from './album/album.module';
import { AlbumEntity } from './album/album.entity/album.entity';
import { RedSocialEntity } from './red-social/red-social.entity/red-social.entity';
import { UsuarioEntity } from './usuario/usuario.entity/usuario.entity';

@Module({
  imports: [FotoModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'redesSociales',
    entities: [FotoEntity,AlbumEntity,RedSocialEntity,UsuarioEntity], 
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }),
    UsuarioModule,
    RedSocialModule,
    AlbumModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
