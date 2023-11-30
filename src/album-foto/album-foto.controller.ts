import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

import { plainToInstance } from 'class-transformer';
import { AlbumFotoService } from './album-foto.service';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumFotoController {
   constructor(private readonly albumFotoService: AlbumFotoService){}
@Post(':albumId/fotos/:fotoId')
async addFotoToAlbum(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string){
    return await this.albumFotoService.addFotoToAlbum(albumId, fotoId);
}
}