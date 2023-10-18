import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { CouponModule } from './api/coupon/coupon.module';
import { UserModule } from './api/user/user.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         load: [configuration],
      }),
      CouponModule,
      UserModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
