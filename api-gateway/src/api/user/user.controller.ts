import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mock User')
@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Post()
   create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
   }

   @Get()
   getAll() {
      return this.userService.getAll();
   }

   @Get(':id')
   getOne(@Param('email') email: string) {
      return this.userService.getOne(email);
   }
}
