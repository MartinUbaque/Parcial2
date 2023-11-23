import { MuseoEntity } from 'src/museo/museo.entity/museo.entity';
import { Column, Entity,JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';


@Entity()
export class DueñoEntity {

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

 @OneToOne(() => MuseoEntity, museo => museo.dueño)
 museo: MuseoEntity;
}
