import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';

@Module({
  providers: [FotoService]
})
export class FotoModule {}
