import { Module } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './red-social.entity/red-social.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([RedSocialEntity]) ],

  providers: [RedSocialService],

  //  controllers:[RedSocialController]

})
export class RedSocialModule {}
