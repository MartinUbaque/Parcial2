import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Module({
  providers: [UsuarioService]
})
export class UsuarioModule {}
