import { Module } from '@nestjs/common';
import { RedSocialService } from './red-social.service';

@Module({
  providers: [RedSocialService]
})
export class RedSocialModule {}
