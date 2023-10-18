import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClaimLogDocument = HydratedDocument<ClaimLog>;

@Schema({ collection: 'claimLogs', timestamps: true, strictQuery: true })
export class ClaimLog {
   @Prop()
   email: string;

   @Prop()
   code: string;

   @Prop()
   status: string;

   @Prop()
   reason: string;
}
export const ClaimLogSchema = SchemaFactory.createForClass(ClaimLog);
