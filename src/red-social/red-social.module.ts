import { Module } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './red-social.entity/red-social.entity';
import { RedSocialController } from './red-social.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([RedSocialEntity]) ],

  providers: [RedSocialService],

  controllers: [RedSocialController],

  //  controllers:[RedSocialController]

})
export class RedSocialModule {}
