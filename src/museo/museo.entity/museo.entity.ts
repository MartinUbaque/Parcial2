import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { EntidadEntity } from 'src/entidad/entidad.entity/entidad.entity';
import { DueñoEntity } from 'src/dueño/dueño.entity/dueño.entity';

@Entity()

export class MuseoEntity {
@PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 name: string;
 
 @Column()
 description: string;
 
 @Column()
 address: string;
 
 @Column()
 city: string;

 @Column()
 image: string;

 @OneToMany(() => EntidadEntity, entidad => entidad.museo)
   entidades: EntidadEntity[];

   @OneToOne(() => DueñoEntity, dueño => dueño.museo)
   dueño: DueñoEntity;
}

