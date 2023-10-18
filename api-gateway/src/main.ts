import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configuration } from './config/configuration';

async function bootstrap() {
   const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'debug', 'log'],
   });
   const logger = new Logger(`Coupon Management`);

   const { http } = configuration();

   app.useGlobalPipes(new ValidationPipe({ transform: true }));

   const swaggerConfig = new DocumentBuilder()
      .setTitle('Coupon Management API')
      .setDescription('')
      .setVersion('1.0')
      .build();

   const document = SwaggerModule.createDocument(app, swaggerConfig);
   SwaggerModule.setup('api', app, document);

   logger.log(`Listening on ${http.port}`);

   await app.listen(http.port);
}
bootstrap();
