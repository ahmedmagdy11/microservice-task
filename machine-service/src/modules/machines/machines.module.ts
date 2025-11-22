import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VmRepository } from './repositories/vm.repository';
import { CreateVmUseCase } from './use-cases/create-vm.usecase';
import { ListVmsUseCase } from './use-cases/list-vms.usecase';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { Vm } from './vms.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Vm])],
    controllers: [MachinesController],
    providers: [VmRepository, CreateVmUseCase, ListVmsUseCase, MachinesService],
})
export class MachinesModule { }
