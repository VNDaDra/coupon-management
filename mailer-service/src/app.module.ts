import { Module } from '@nestjs/common';
import { configuration } from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { MailerController } from './controller/mailer.controller';
import { MailerService } from './service/mailer.service';
import { HtmlCompileService } from './service/html-compile.service';
import { SimpleEmailService } from './service/ses.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    })

  ],
  controllers: [MailerController],
  providers: [
    MailerService,
    HtmlCompileService,
    SimpleEmailService
  ],
})
export class AppModule {}
