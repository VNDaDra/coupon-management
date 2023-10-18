import { Injectable, Logger } from '@nestjs/common';
import { SimpleEmailService } from './ses.service';
import { ExchangeSuccessInput } from '../interface/exchange-success.interface';
import { HtmlCompileService } from './html-compile.service';
import { ExchangeFailInput } from '../interface/exchange-fail.interface';

@Injectable()
export class MailerService {
    private readonly logger = new Logger(MailerService.name);
    constructor(
        private readonly sesService: SimpleEmailService,
        private readonly HtmlCompileService: HtmlCompileService
    ) { }

    async sendExchangeSuccessEmail(data: ExchangeSuccessInput) {
        const pdf = await this.HtmlCompileService.generateSuccessExchangeEmail(data);
        await this.sesService.sendAnEmail(pdf, [data.email]);
    }

    async sendExchangeFailEmail(data: ExchangeFailInput) {
        const pdf = await this.HtmlCompileService.generateFailExchangeEmail(data);
        await this.sesService.sendAnEmail(pdf, [data.email]);
    }
}
