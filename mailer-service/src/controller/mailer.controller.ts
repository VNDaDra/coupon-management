import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailerService } from '../service/mailer.service';
import { ExchangeSuccessInput } from '../interface/exchange-success.interface';
import { ExchangeFailInput } from '../interface/exchange-fail.interface';

@Controller()
export class MailerController {

  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('send_exchange_success')
  sendExchangeSuccessEmail(@Payload() data: ExchangeSuccessInput): void {
    this.mailerService.sendExchangeSuccessEmail(data);
  }

  @EventPattern('send_exchange_fail')
  sendExchangeFailEmail(@Payload() data: ExchangeFailInput): void {
    this.mailerService.sendExchangeFailEmail(data);
  }

}