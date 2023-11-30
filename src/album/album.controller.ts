import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto/album.dto';
import { AlbumEntity } from './album.entity/album.entity';



@Controller('albums') 
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController { 
    constructor(private readonly albumService: AlbumService) {} 


  @Get(':albumId') 
  async findOne(@Param('albumId') albumId: string) {
    return await this.albumService.findAlbumById(albumId); 
  }

  @Post()
  async create(@Body() albumDto: AlbumDto) { 
    const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto); 
    return await this.albumService.createAlbum(album); 
  }


  @Delete(':albumId') 
  @HttpCode(204)
  async delete(@Param('albumId') albumId: string) {
    return await this.albumService.deleteAlbum(albumId); // Changed 'museumService' to 'aerolineaService'
  }
}