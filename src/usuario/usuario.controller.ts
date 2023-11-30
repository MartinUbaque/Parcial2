import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto/usuario.dto';
import { UsuarioEntity } from './usuario.entity/usuario.entity';



@UseInterceptors(BusinessErrorsInterceptor)
@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {} 

  @Get()
  async findAll() {
    return await this.usuarioService.findAllUsuarios(); 
  }

  @Get(':usuarioId') 
  async findOne(@Param('usuarioId') usuarioId: string) {
    return await this.usuarioService.findUsuarioById(usuarioId); 
  }

  @Post()
  async create(@Body() usuarioDto: UsuarioDto) { 
    const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto); 
    return await this.usuarioService.createUsuario(usuario); 
  }
}

