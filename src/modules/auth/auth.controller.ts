import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { INVALID_PASSWORD, SERVER_ERROR } from './auth.constants';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(@Body() { password }: LoginDto) {
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
    if (!adminPassword) {
      throw new InternalServerErrorException(SERVER_ERROR);
    }

    if (password !== adminPassword) {
      throw new UnauthorizedException(INVALID_PASSWORD);
    }

    return {
      message: 'OK',
      success: true,
    };
  }
}
