import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwt: JwtService) { }

    use(req: any, res: any, next: () => void) {
        const header = req.headers['authorization'];
        if (!header) throw new UnauthorizedException('No Authorization header');

        const token = header.replace('Bearer ', '').trim();

        try {
            const payload = this.jwt.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            req.user = { id: payload.sub };
            next();
        } catch {
            throw new UnauthorizedException('Invalid Token');
        }
    }
}
