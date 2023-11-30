import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([UsuarioEntity]) ],

  providers: [UsuarioService],

  controllers: [UsuarioController],

  //  controllers:[UsuarioController]

})
export class UsuarioModule {}
