import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vm } from '../vms.entity';

@Injectable()
export class VmRepository {
    constructor(
        @InjectRepository(Vm)
        private readonly repo: Repository<Vm>,
    ) { }

    create(data: Partial<Vm>) {
        const vm = this.repo.create(data);
        return this.repo.save(vm);
    }

    async listForUser(userId: string, page: number, limit: number) {
        const [data, count] = await this.repo.findAndCount({
            where: { userId },
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            }
        };
    }

    updateStatus(id: string, data: Partial<Vm>) {
        return this.repo.update(id, data);
    }

    findById(id: string) {
        return this.repo.findOne({ where: { id } });
    }


    async findByIdempotencyKey(key: string) {
        return this.repo.findOne({ where: { idempotencyKey: key } });
    }

}
