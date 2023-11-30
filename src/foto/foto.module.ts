import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity/foto.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([FotoEntity]) ],

  providers: [FotoService],
//  controllers:[FotoController]
})
export class FotoModule {}
