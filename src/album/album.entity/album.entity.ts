import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()   
export class AlbumEntity {

   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   titulo: string;
   @Column()
   fechaInicio: Date;
   @Column()
   fechaFin: Date;

   @OneToMany(() => FotoEntity, foto => foto.album)
    fotos: FotoEntity[];


}
