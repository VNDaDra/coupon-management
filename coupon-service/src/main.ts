import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { configuration } from './config/configuration';
import { Logger } from '@nestjs/common';

async function bootstrap() {
   const { rabbitmq: rabbitmqConfig } = configuration();
   const logger = new Logger(`Coupon Service`);
   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
         transport: Transport.RMQ,
         options: {
            urls: [rabbitmqConfig.url],
            queue: rabbitmqConfig.queue,
            queueOptions: { durable: false },
         },
         logger: ['error', 'warn', 'debug', 'log'],
      },
   );

   await app.listen();
   logger.log('Coupon service started');
}
bootstrap();
