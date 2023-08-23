import {
  Controller,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { Users } from 'src/entity/users.entity';
import { SignupDto } from './dto/signup.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto): Promise<Users> {
    return await this.userService.login(loginDto);
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() signupDto: SignupDto): Promise<any> {
    return await this.userService.signup(signupDto);
  }
}
