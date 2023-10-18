import { Module } from '@nestjs/common';
import { configuration } from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskScheduleModule } from './task-schedule/task-schedule.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Coupon, CouponSchema } from './schemas/coupon.schema';
import { User, UserSchema } from './schemas/user.schema';
import { ClaimLog, ClaimLogSchema } from './schemas/claim-log.schema';
import { MockUserController } from './controller/mock-user.controller';
import { MockUserService } from './service/mock-user.service';
import { CouponController } from './controller/coupon.controller';
import { CouponService } from './service/coupon.service';

@Module({
   imports: [
      ScheduleModule.forRoot(),
      ConfigModule.forRoot({
         isGlobal: true,
         load: [configuration],
      }),
      MongooseModule.forRootAsync({
         imports: [ConfigModule],
         useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('mongo.uri'),
         }),
         inject: [ConfigService],
      }),
      MongooseModule.forFeature([
         { name: Coupon.name, schema: CouponSchema },
         { name: User.name, schema: UserSchema },
         { name: ClaimLog.name, schema: ClaimLogSchema },
      ]),

      TaskScheduleModule,
   ],
   controllers: [CouponController, MockUserController],
   providers: [CouponService, MockUserService],
})
export class AppModule {}
