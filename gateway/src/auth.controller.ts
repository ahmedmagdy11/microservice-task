import { Body, Controller, Post } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('auth')
export class AuthGatewayController {
    constructor(private readonly proxy: ProxyService) { }

    @Post('register')
    register(@Body() body: any) {
        return this.proxy.forwardToAuth('/auth/register', 'POST', body);
    }

    @Post('login')
    login(@Body() body: any) {
        return this.proxy.forwardToAuth('/auth/login', 'POST', body);
    }
}
