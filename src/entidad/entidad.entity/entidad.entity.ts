import { MuseoEntity } from 'src/museo/museo.entity/museo.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';


@Entity()
export class EntidadEntity {
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


@ManyToOne(() => MuseoEntity, museo => museo.entidades)
museo: MuseoEntity;
}

