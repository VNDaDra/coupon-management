import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ExchangeSuccessInput } from '../interface/exchange-success.interface';
import { ExchangeFailInput } from '../interface/exchange-fail.interface';

@Injectable()
export class HtmlCompileService {
	async generateSuccessExchangeEmail(inputData: ExchangeSuccessInput) {
		return this.compileEmail('exchange-success', inputData);
	}

	async generateFailExchangeEmail(inputData: ExchangeFailInput) {
		return this.compileEmail('exchange-fail', inputData);
	}

	private compileEmail(fileName:string, inputData): string {
		const templateHtml = readFileSync(
			resolve(__dirname, `../assets/mail-template/${fileName}.html`),
			'utf-8'
		);
		const template = handlebars.compile(templateHtml);
		const contentHtml = template(inputData);

		return contentHtml;
	}
}
