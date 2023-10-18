import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
   constructor(@Inject('COUPON_SERVICE') private client: ClientProxy) {}

   async create(createUserDto: CreateUserDto) {
      const createUserResponse = await firstValueFrom(
         this.client.send('create_mock_user', createUserDto),
      );
      return createUserResponse;
   }

   async getAll() {
      const getAllUserResponse = await firstValueFrom(
         this.client.send('get_all_user', {}),
      );
      return getAllUserResponse;
   }

   async getOne(email: string) {
      const getOneUserResponse = await firstValueFrom(
         this.client.send('get_one_user', { email }),
      );
      return getOneUserResponse;
   }
}
