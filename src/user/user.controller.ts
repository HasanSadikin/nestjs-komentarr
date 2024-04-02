import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipThrottle()
  @Get('cluster/:id')
  async getUsers() {
    return this.userService.getUsers();
  }
}
