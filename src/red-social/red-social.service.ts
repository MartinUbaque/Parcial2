import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { RedSocialEntity } from './red-social.entity/red-social.entity';

@Injectable()
export class RedSocialService {

    constructor(
        @InjectRepository(RedSocialEntity)
        private readonly redSocialRepository: Repository<RedSocialEntity>,
    ) {}


    async createLibreria(redSocial: RedSocialEntity): Promise<RedSocialEntity> {
        if (redSocial.slogan.length < 20) {
            throw new BusinessLogicException('El slogan debe tener al menos 20 caracteres', BusinessError.PRECONDITION_FAILED);
        }
        return await this.redSocialRepository.save(redSocial);
    }
}