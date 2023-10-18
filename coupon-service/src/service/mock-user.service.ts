import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { ServiceResponse } from '../interface/service-response.interface';

@Injectable()
export class MockUserService {
   private readonly logger = new Logger(MockUserService.name);

   constructor(
      @InjectModel(User.name)
      private readonly userModel: Model<User>,
   ) {}

   async createUser(data): Promise<ServiceResponse> {
      try {
         const isExist = await this.userModel.findOne({
            email: data.email.toLowerCase(),
         });
         if (isExist) return { success: false, message: 'create_user_existed' };

         const user = {
            email: data.email.toLowerCase(),
            points: 0,
            claimedCoupons: [],
         };
         const createdUser = await this.userModel.create(user);
         return {
            data: createdUser,
            success: true,
            message: 'create_user_success',
         };
      } catch (error) {
         this.logger.error('createUser', error);
         return { success: false, message: 'unknown_error' };
      }
   }

   async getUser(data): Promise<ServiceResponse> {
      try {
         const user = await this.userModel.find({
            email: data.email.toLowerCase(),
         });
         return { data: user, success: true, message: 'get_user_success' };
      } catch (error) {
         this.logger.error('getUser', error);
         return { success: false, message: 'unknown_error' };
      }
   }

   async getAll(): Promise<ServiceResponse> {
      try {
         const users = await this.userModel.find({});
         return { data: users, success: true, message: 'get_all_user_success' };
      } catch (error) {
         this.logger.error('getAll', error);
         return { success: false, message: 'unknown_error' };
      }
   }
}
