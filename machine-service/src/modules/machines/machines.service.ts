import { Injectable, Logger } from '@nestjs/common';
import { VmRepository } from './repositories/vm.repository';

@Injectable()
export class MachinesService {
    private readonly logger = new Logger(MachinesService.name);

    constructor(private readonly repo: VmRepository) { }

    async mockCreateVM(vmId: string) {
        // simulate async delay
        await new Promise((res) => setTimeout(res, 2000));

        const isFail = Math.random() < 0.1; // 10% fail rate

        if (isFail) {
            await this.repo.updateStatus(vmId, {
                status: 'failed',
                errorMessage: 'mock provider failure',
            });

            return;
        }

        await this.repo.updateStatus(vmId, {
            status: 'running',
            externalId: 'mock-' + vmId,
        });
    }
}
