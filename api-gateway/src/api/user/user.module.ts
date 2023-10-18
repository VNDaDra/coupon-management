import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
   imports: [
      ClientsModule.registerAsync([
         {
            name: 'COUPON_SERVICE',
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
               transport: Transport.RMQ,
               options: {
                  urls: [configService.get<string>('rabbitMq.url')],
                  queue: configService.get('rabbitMq.couponServiceQueue'),
                  queueOptions: {
                     durable: false,
                  },
               },
            }),
            inject: [ConfigService],
         },
      ]),
   ],
   controllers: [UserController],
   providers: [UserService],
})
export class UserModule {}
