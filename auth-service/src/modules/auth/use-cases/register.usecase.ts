import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class RegisterUseCase {
    constructor(private readonly users: UserRepository) { }

    async execute(dto: RegisterDto) {
        const exists = await this.users.findByEmail(dto.email);
        if (exists) {
            throw new BadRequestException('Email already taken');
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);

        const user = await this.users.createUser({
            email: dto.email,
            passwordHash,
            name: dto.name,
        });

        return { id: user.id, email: user.email, name: user.name };
    }
}
