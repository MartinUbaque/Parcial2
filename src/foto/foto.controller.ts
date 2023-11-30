import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { FotoService } from './foto.service';
import { FotoDto } from './foto.dto/foto.dto';
import { FotoEntity } from './foto.entity/foto.entity';


@Controller('fotos') 
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController { 
    constructor(private readonly fotoService: FotoService) {} 

  @Get()
  async findAll() {
    return await this.fotoService.findAllFotos(); 
  }

  @Get(':fotoId') 
  async findOne(@Param('fotoId') fotoId: string) {
    return await this.fotoService.findFotoById(fotoId); 
  }

  @Post()
  async create(@Body() fotoDto: FotoDto) { 
    const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto); 
    return await this.fotoService.createFoto(foto); 
  }


  @Delete(':fotoId') 
  @HttpCode(204)
  async delete(@Param('fotoId') fotoId: string) {
    return await this.fotoService.deleteFoto(fotoId); // Changed 'museumService' to 'aerolineaService'
  }
}
