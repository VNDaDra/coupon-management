import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
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
         {
            name: 'MAILER_SERVICE',
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
               transport: Transport.RMQ,
               options: {
                  urls: [configService.get<string>('rabbitMq.url')],
                  queue: configService.get('rabbitMq.mailerServiceQueue'),
                  queueOptions: {
                     durable: false,
                  },
               },
            }),
            inject: [ConfigService],
         },
      ]),
   ],
   controllers: [CouponController],
   providers: [CouponService],
})
export class CouponModule {}
