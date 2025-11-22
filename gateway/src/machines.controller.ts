import { Body, Controller, Get, Header, Post, Req } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('machines')
export class MachinesGatewayController {
    constructor(private readonly proxy: ProxyService) { }

    @Post()
    async create(@Req() req, @Body() body: any) {
        const userId = req.user.id;
        const idempotencyKey = req.headers['idempotency-key']

        return this.proxy.forwardToMachine('/machines', 'POST', body, userId, idempotencyKey);
    }

    @Get()
    async list(@Req() req) {
        const userId = req.user.id;

        return this.proxy.forwardToMachine('/machines', 'GET', {}, userId);
    }
}
