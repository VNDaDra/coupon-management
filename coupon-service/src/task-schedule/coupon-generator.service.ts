import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { generateCouponCode } from '../utils/coupon-code-generator';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from '../schemas/coupon.schema';
import { Model } from 'mongoose';

@Injectable()
export class CouponGeneratorService {
   private readonly logger = new Logger(CouponGeneratorService.name);

   constructor(
      @InjectModel(Coupon.name)
      private readonly couponModel: Model<Coupon>,
   ) {}

   @Cron(CronExpression.EVERY_10_MINUTES)
   async generateCoupon() {
      try {
         const couponCode = await generateCouponCode();
         const coupon = {
            name: '10 points coupon',
            code: couponCode,
            point: 10,
            isLimit: true,
            quantity: 1,
            availableAt: new Date(),
         };
         await this.couponModel.create(coupon);
      } catch (error) {
         this.logger.error('generateCoupon', error);
      }
   }
}
