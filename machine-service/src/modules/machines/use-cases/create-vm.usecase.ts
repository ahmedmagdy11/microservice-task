import { Injectable } from '@nestjs/common';
import { VmRepository } from '../repositories/vm.repository';
import { CreateVmDto } from '../dtos/create-vm.dto';

@Injectable()
export class CreateVmUseCase {
    constructor(private readonly vms: VmRepository) { }

    async execute(dto: CreateVmDto, userId: string) {
        const vm = await this.vms.create({
            ...dto,
            userId,
            status: 'creating'
        });

        return vm;
    }
}
