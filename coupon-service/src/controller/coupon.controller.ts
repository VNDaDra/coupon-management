import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CouponService } from '../service/coupon.service';
import { ServiceResponse } from '../interface/service-response.interface';

@Controller()
export class CouponController {
   constructor(private readonly couponService: CouponService) {}

   @EventPattern('claim_coupon')
   claimCoupon(@Payload() data: any) {
      this.couponService.processClaimCoupon(data);
   }

   @MessagePattern('exchange_coupon')
   async exchangeCoupon(@Payload() data: any): Promise<ServiceResponse> {
      return await this.couponService.processExchangeCoupon(data);
   }

   @MessagePattern('get_all_coupons')
   async getAllCoupons(@Payload() data: any): Promise<ServiceResponse> {
      return await this.couponService.getAllCoupons(data);
   }

   @MessagePattern('get_claimable_coupons')
   async getClaimableCoupon(@Payload() data: any): Promise<ServiceResponse> {
      return await this.couponService.getClaimableCoupons(data);
   }
}
