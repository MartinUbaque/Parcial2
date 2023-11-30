import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { RedSocialService } from './red-social.service';
import { RedSocialDto } from './red-social.dto/red-social.dto';
import { RedSocialEntity } from './red-social.entity/red-social.entity';



@Controller('redesSociales') 
@UseInterceptors(BusinessErrorsInterceptor)
export class RedSocialController {

    constructor(private readonly redSocialService: RedSocialService) {} 

    @Post()
    async create(@Body() redSocialDto: RedSocialDto) { 
      const redSocial: RedSocialEntity = plainToInstance(RedSocialEntity, redSocialDto); 
      return await this.redSocialService.createLibreria(redSocial); 
    }
}
