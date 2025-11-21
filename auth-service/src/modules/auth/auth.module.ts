import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repositories/user.repository';
import { RegisterUseCase } from './use-cases/register.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { User } from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_secret',
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserRepository,
        RegisterUseCase,
        LoginUseCase,
    ],
    exports: [JwtModule],
})
export class AuthModule { }
