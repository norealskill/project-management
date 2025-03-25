import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UsersService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  async getUsers(): Promise<UserModel[] | null> {
    return this.userService.users({});
  }

  @Get('/:id')
  async getProjectById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Post('/')
  async signupUser(
    @Body() userData: { email: string; password: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
