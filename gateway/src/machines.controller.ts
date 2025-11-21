import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('machines')
export class MachinesGatewayController {
    constructor(private readonly proxy: ProxyService) { }

    @Post()
    async create(@Req() req, @Body() body: any) {
        const userId = req.user.id;
        return this.proxy.forwardToMachine('/machines', 'POST', body, userId);
    }

    @Get()
    async list(@Req() req) {
        const userId = req.user.id;
        return this.proxy.forwardToMachine('/machines', 'GET', {}, userId);
    }
}
