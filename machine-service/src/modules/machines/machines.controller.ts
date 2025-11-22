import { Body, Controller, Get, Post, Headers, BadRequestException, Query } from '@nestjs/common';
import { CreateVmDto } from './dtos/create-vm.dto';
import { CreateVmUseCase } from './use-cases/create-vm.usecase';
import { ListVmsUseCase } from './use-cases/list-vms.usecase';
import { MachinesService } from './machines.service';
import * as crypto from 'crypto';

@Controller('machines')
export class MachinesController {
    constructor(
        private readonly createVm: CreateVmUseCase,
        private readonly listVms: ListVmsUseCase,
        private readonly worker: MachinesService,
    ) { }

    verifySignature(body: any, signature: string) {
        const hmac = crypto
            .createHmac('sha256', process.env.HMAC_SECRET as string)
            .update(JSON.stringify(body || {}))
            .digest('hex');

        return hmac === signature;
    }

    @Post()
    async create(
        @Body() body: CreateVmDto,
        @Headers('x-user-id') userId: string,
        @Headers('x-signature') signature: string,
    ) {
        if (!this.verifySignature(body, signature)) {
            throw new BadRequestException('Invalid signature');
        }

        const vm = await this.createVm.execute(body, userId);

        this.worker.mockCreateVM(vm.id);

        return vm;
    }

    @Get()
    list(@Headers('x-user-id') userId: string, @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.listVms.execute(userId, page, limit);
    }
}
