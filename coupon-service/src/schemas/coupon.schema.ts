import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CouponDocument = HydratedDocument<Coupon>;

@Schema({ collection: 'coupons', timestamps: true, strictQuery: true })
export class Coupon {
   @Prop()
   name: string;

   @Prop()
   code: string;

   @Prop()
   point: number;

   @Prop()
   isLimit: boolean;

   @Prop()
   quantity: number;

   @Prop()
   claimed: number;

   @Prop()
   availableAt: Date;
}
export const CouponSchema = SchemaFactory.createForClass(Coupon);
