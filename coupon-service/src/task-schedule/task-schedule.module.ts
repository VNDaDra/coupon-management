import { Module } from '@nestjs/common';
import { CouponGeneratorService } from './coupon-generator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from '../schemas/coupon.schema';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
   ],
   providers: [CouponGeneratorService],
})
export class TaskScheduleModule {}
