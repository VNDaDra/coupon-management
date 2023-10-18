import {
   Inject,
   Injectable,
   InternalServerErrorException,
   Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ClaimCouponDto } from './dto/claim-coupon.dto';
import { ExchangeCouponDto } from './dto/exchange-coupon.dto';
import { GetClaimableCouponQuery } from './dto/get-coupon.dto';

@Injectable()
export class CouponService {
   private readonly logger = new Logger(CouponService.name);

   constructor(
      @Inject('COUPON_SERVICE') private couponClient: ClientProxy,
      @Inject('MAILER_SERVICE') private mailerClient: ClientProxy,
   ) {}

   async getAllCoupons(query) {
      try {
         const couponsResponse = await firstValueFrom(
            this.couponClient.send('get_all_coupons', query),
         );
         return couponsResponse;
      } catch (error) {
         this.logger.error(error);
         throw new InternalServerErrorException();
      }
   }

   async getClaimableCoupons(query: GetClaimableCouponQuery) {
      try {
         const clamableCouponResponse = await firstValueFrom(
            this.couponClient.send('get_claimable_coupons', query),
         );
         return clamableCouponResponse;
      } catch (error) {
         this.logger.error(error);
         throw new InternalServerErrorException();
      }
   }

   async claimCoupon(claimData: ClaimCouponDto) {
      try {
         this.couponClient.emit('claim_coupon', claimData);
         return { success: true, message: 'claim_coupon_processing' };
      } catch (error) {
         this.logger.error(error);
         throw new InternalServerErrorException();
      }
   }

   async exchangeCoupon(exchangeData: ExchangeCouponDto) {
      try {
         const exchangeCouponResponse = await firstValueFrom(
            this.couponClient.send('exchange_coupon', exchangeData),
         );

         if (exchangeCouponResponse.success) {
            this.mailerClient.emit('send_exchange_success', {
               email: exchangeData.email,
               code: exchangeData.code,
               point: exchangeCouponResponse?.data?.point,
            });
         } else {
            this.mailerClient.emit('send_exchange_fail', {
               email: exchangeData.email,
               code: exchangeData.code,
               reason: exchangeCouponResponse?.message,
            });
         }

         return exchangeCouponResponse;
      } catch (error) {
         this.logger.error(error);
         throw new InternalServerErrorException();
      }
   }
}
