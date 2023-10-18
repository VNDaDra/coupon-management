import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MockUserService } from '../service/mock-user.service';

@Controller()
export class MockUserController {
   constructor(private readonly mockUserService: MockUserService) {}

   @MessagePattern('create_mock_user')
   async createUser(@Payload() data: any) {
      return await this.mockUserService.createUser(data);
   }

   @MessagePattern('get_one_user')
   async getOneUser(@Payload() data: any) {
      return await this.mockUserService.getUser(data);
   }

   @MessagePattern('get_all_user')
   async getAllUser() {
      return await this.mockUserService.getAll();
   }
}
