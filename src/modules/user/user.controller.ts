import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { GetUsersDto } from './dto/get-users.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('all')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getUsers(@Body() filters: GetUsersDto) {
    const result = await this.userService.getUsers(filters);
    return result;
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() { email }: RegisterUserDto) {
    const result = await this.userService.registerUser(email);
    return result;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    await this.userService.deleteUserById(id);
    return {
      message: 'OK',
    };
  }
}
