import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, strictQuery: true })
export class ClaimedCoupon extends Document {
   @Prop()
   code: string;

   @Prop()
   claimedAt: Date;

   @Prop()
   point: number;

   @Prop()
   isExchanged: boolean;

   @Prop()
   exchangedAt: Date;
}
export const ClaimedCouponSchema = SchemaFactory.createForClass(ClaimedCoupon);

@Schema({ collection: 'users', timestamps: true, strictQuery: true })
export class User {
   @Prop()
   email: string;

   @Prop()
   points: number;

   @Prop({ type: [ClaimedCouponSchema] })
   claimedCoupons: ClaimedCoupon[];
}
export const UserSchema = SchemaFactory.createForClass(User);
