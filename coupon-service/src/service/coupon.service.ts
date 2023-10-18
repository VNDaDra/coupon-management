import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClaimStatus, ClaimFailReason } from '../common/enum/claim-status';
import { ClaimLog } from '../schemas/claim-log.schema';
import { Coupon } from '../schemas/coupon.schema';
import { User } from '../schemas/user.schema';
import { ServiceResponse } from '../interface/service-response.interface';

@Injectable()
export class CouponService {
   private readonly logger = new Logger(CouponService.name);
   constructor(
      @InjectModel(User.name)
      private readonly userModel: Model<User>,
      @InjectModel(Coupon.name)
      private readonly couponModel: Model<Coupon>,
      @InjectModel(ClaimLog.name)
      private readonly claimLogModel: Model<ClaimLog>,
   ) {}

   async getAllCoupons(query): Promise<ServiceResponse> {
      try {
         const { limit = 10, skip = 0 } = query;
         const items = await this.couponModel.find({}).limit(limit).skip(skip).lean();
         const total = await this.couponModel.count({});
         return {
            success: true,
            data: { items, total},
            message: 'get_all_coupon_success',
         };
      } catch (error) {
         this.logger.error('getAllCoupons', error);
         return { success: false, message: 'unknown_error' };
      }
   }

   async getClaimableCoupons(query): Promise<ServiceResponse> {
      try {
         const { email, skip = 0, limit = 10 } = query;
         const user = await this.userModel.findOne({ email }).lean();
         if (!user) {
            return {
               success: false,
               message: 'get_claimable_coupon_user_not_found',
            };
         }
         const claimedCouponCodes = user.claimedCoupons.map((cp) => cp.code);
         const coupons = await this.couponModel.aggregate([
            {
               $match: {
                  quantity: 100,
                  code: { $nin: claimedCouponCodes },
                  $expr: { $ne: ['$quantity', '$claimed'] }
               }
            },
            {              
               $facet: {
                  items: [

                     {
                        $skip: skip
                     },
                     {
                        $limit: limit
                     }
                  ],
                  total: [
                     { $count: 'count' }
                  ]
               }
            }
            
         ]);
         const responseData = { items: coupons[0].items, total: coupons[0]?.total[0]?.count ?? 0 };
         return {
            success: true,
            data: responseData,
            message: 'get_claimable_coupon_success',
         };
      } catch (error) {
         this.logger.error('getClaimableCoupons', error);
         return { success: false, message: 'unknown_error' };
      }
   }

   async processClaimCoupon(data): Promise<void> {
      try {
         const { email, code } = data;
         const coupon = await this.couponModel.findOne({ code }).lean();
         const user = await this.userModel.findOne({ email }).lean();

         let hasError = false;
         let claimLog = {
            email,
            code,
            status: ClaimStatus.FAIL,
            reason: ClaimFailReason.NONE,
         };

         if (!user) {
            hasError = true;
            claimLog.reason = ClaimFailReason.INVALID_USER;
         }
         if (!coupon) {
            hasError = true;
            claimLog.reason = ClaimFailReason.INVALID_COUPON_CODE;
         }
         if (coupon.isLimit && coupon.claimed === coupon.quantity) {
            hasError = true;
            claimLog.reason = ClaimFailReason.OUT_OF_STOCK;
         }
         const isClaimed = user.claimedCoupons.find((cp) => cp.code === code);
         if (isClaimed) {
            hasError = true;
            claimLog.reason = ClaimFailReason.ALREADY_CLAIMED;
         }

         if (hasError) {
            await this.claimLogModel.create(claimLog);
            return;
         }

         const claimedCoupon = {
            code,
            claimedAt: new Date(),
            point: coupon.point,
            isExchanged: false,
            exchangedAt: null,
         };
         claimLog.status = ClaimStatus.SUCCESS;
         await this.userModel.findOneAndUpdate(
            { email },
            { $push: { claimedCoupons: claimedCoupon } },
         );
         await this.couponModel.findOneAndUpdate(
            { code },
            { $inc: { claimed: 1 } },
         );
         await this.claimLogModel.create(claimLog);
      } catch (error) {
         this.logger.error('processClaimCoupon', error);
      }
   }

   async processExchangeCoupon(data): Promise<ServiceResponse> {
      try {
         const { email, code } = data;
         const user = await this.userModel.findOne({ email }).lean();

         if (!user) {
            return {
               success: false,
               message: 'exchange_coupon_user_not_found',
            };
         }
         const coupon = user.claimedCoupons.find((cp) => cp.code === code);
         if (!coupon) {
            return {
               success: false,
               message: 'exchange_coupon_coupon_not_found',
            };
         }
         if (coupon.isExchanged) {
            return {
               success: false,
               message: 'exchange_coupon_already_exchanged',
            };
         }

         await this.userModel.findOneAndUpdate(
            { email, 'claimedCoupons.code': code },
            {
               points: user.points + coupon.point,
               'claimedCoupons.$.isExchanged': true,
               'claimedCoupons.$.exchangedAt': new Date(),
            },
            { new: true },
         );
         return {
            data: coupon,
            success: true,
            message: 'exchange_coupon_success',
         };
      } catch (error) {
         this.logger.error('processExchangeCoupon', error);
         return { success: false, message: 'unknown_error' };
      }
   }
}
