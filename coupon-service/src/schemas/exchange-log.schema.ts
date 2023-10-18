import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExchangeLogDocument = HydratedDocument<ExchangeLog>;

@Schema({ collection: 'exchangeLogs', timestamps: true, strictQuery: true })
export class ExchangeLog {
   @Prop()
   email: string;

   @Prop()
   code: string;

   @Prop()
   status: string;

   @Prop()
   reason: string;
}
export const ExchangeLogSchema = SchemaFactory.createForClass(ExchangeLog);
