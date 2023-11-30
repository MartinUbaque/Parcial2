/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../../album/album.entity/album.entity';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { RedSocialEntity } from '../../red-social/red-social.entity/red-social.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [UsuarioEntity, AlbumEntity,FotoEntity,RedSocialEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([UsuarioEntity, AlbumEntity,FotoEntity,RedSocialEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/