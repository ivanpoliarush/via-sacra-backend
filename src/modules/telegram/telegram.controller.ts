import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('users')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getUsers(@Body() filters: GetUsersDto) {
    const users = await this.telegramService.getUsers(filters);
    return users;
  }
}
