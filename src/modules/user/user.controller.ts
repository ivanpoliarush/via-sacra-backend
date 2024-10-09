import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
