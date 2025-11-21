import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly users: UserRepository,
        private readonly jwt: JwtService,
    ) { }

    async execute(dto: LoginDto) {
        const user = await this.users.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, email: user.email };

        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
        });

        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
}
