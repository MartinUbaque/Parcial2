import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity/foto.entity';
import { FotoController } from './foto.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([FotoEntity]) ],

  providers: [FotoService],

  controllers: [FotoController],
//  controllers:[FotoController]
})
export class FotoModule {}
