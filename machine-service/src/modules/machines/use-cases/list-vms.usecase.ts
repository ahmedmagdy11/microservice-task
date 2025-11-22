import { Injectable } from '@nestjs/common';
import { VmRepository } from '../repositories/vm.repository';

@Injectable()
export class ListVmsUseCase {
    constructor(private readonly vms: VmRepository) { }

    async execute(userId: string, page: number, limit: number) {
        return this.vms.listForUser(userId, page, limit);
    }
}
