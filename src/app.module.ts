import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntidadModule } from './entidad/entidad.module';
import { MuseoModule } from './museo/museo.module';
import { DueñoModule } from './dueño/dueño.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadEntity } from './entidad/entidad.entity/entidad.entity'; 
import { MuseoEntity } from './museo/museo.entity/museo.entity';
import { DueñoEntity } from './dueño/dueño.entity/dueño.entity';

@Module({
  imports: [EntidadModule, MuseoModule, DueñoModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'museum',
    entities: [EntidadEntity, MuseoEntity, DueñoEntity], 
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
