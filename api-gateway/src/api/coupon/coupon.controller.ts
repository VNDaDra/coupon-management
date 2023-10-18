import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { ApiTags } from '@nestjs/swagger';
import { ClaimCouponDto } from './dto/claim-coupon.dto';
import { ExchangeCouponDto } from './dto/exchange-coupon.dto';
import { GetAllCouponQuery, GetClaimableCouponQuery } from './dto/get-coupon.dto';

@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
   constructor(private readonly couponService: CouponService) {}

   @Post('claim')
   async claimCoupon(@Body() claimData: ClaimCouponDto) {
      return await this.couponService.claimCoupon(claimData);
   }

   @Post('exchange')
   async exchangeCoupon(@Body() exchangeData: ExchangeCouponDto) {
      return await this.couponService.exchangeCoupon(exchangeData);
   }

   @Get()
   async getAllCoupons(@Query() query: GetAllCouponQuery) {
      return await this.couponService.getAllCoupons(query);
   }

   @Get('claimable')
   async getClaimableCoupons(@Query() query: GetClaimableCouponQuery) {
      return await this.couponService.getClaimableCoupons(query);
   }
}
