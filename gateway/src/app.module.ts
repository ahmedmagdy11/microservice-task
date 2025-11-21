import { Module, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProxyService } from './proxy.service';
import { AuthGatewayController } from './auth.controller';
import { MachinesGatewayController } from './machines.controller';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [AuthGatewayController, MachinesGatewayController],
  providers: [ProxyService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('machines');
  }
}
