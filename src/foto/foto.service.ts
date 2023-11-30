import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { FotoEntity } from './foto.entity/foto.entity';

@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
    ) {}

    async findAllFotos(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations: ['usuario', 'album'] });
    }

    async findFotoById(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({ where: { id }, relations: ['usuario', 'album'] });
        if (!foto) {
            throw new BusinessLogicException('La foto con ese id no fue encontrada.', BusinessError.NOT_FOUND);
        }
        return foto;
    }

    async create(foto: FotoEntity): Promise<FotoEntity> {

        let cotas=0;
        if (foto.ISO < 100 || foto.ISO>6400) {
            throw new BusinessLogicException('El ISO debe estar entre 100 y 6400', BusinessError.PRECONDITION_FAILED);
        }
        if (foto.ISO > 3250) {
            cotas+=1;
        }
        if (foto.velObturacion<2 || foto.velObturacion>250) {
            throw new BusinessLogicException('El valObturacion debe estar entre 2 y 250', BusinessError.PRECONDITION_FAILED);
        }
        if (foto.velObturacion>124 ) {
            cotas+=1;
        }
        if (foto.apertura<1 || foto.apertura>32) {
            throw new BusinessLogicException('La apertura debe estar entre 1 y 32', BusinessError.PRECONDITION_FAILED);
        }
        if (foto.apertura>15) {
            cotas+=1;    
        }
        if (cotas === 3) {
            throw new BusinessLogicException('Maximo 2 de los valores en la foto deben estar por encima del medio de su cota', BusinessError.PRECONDITION_FAILED);
        }
        return await this.fotoRepository.save(foto);
    }


    async delete(id: string): Promise<void> {
        const foto: FotoEntity = await this.fotoRepository.findOne({ where: { id } });
        if (!foto) {
            throw new BusinessLogicException('La foto con ese id no fue encontrada.', BusinessError.NOT_FOUND);
        }
        await this.fotoRepository.remove(foto);
    }
}
