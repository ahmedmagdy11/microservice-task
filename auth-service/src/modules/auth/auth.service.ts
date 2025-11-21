import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { RegisterUseCase } from './use-cases/register.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) { }

    register(dto: RegisterDto) {
        return this.registerUseCase.execute(dto);
    }

    login(dto: LoginDto) {
        return this.loginUseCase.execute(dto);
    }
}
