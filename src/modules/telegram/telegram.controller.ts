import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { LOGOUT_MESSAGE } from './constants/messages';
import { GetUsersDto } from './dto/get-users.dto';
import { TelegramBotSender } from './telegram-bot.sender';
import { USER_NOT_AUTHORIZED, USER_NOT_FOUND } from './telegram.constants';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly telegamBotSender: TelegramBotSender,
  ) {}

  @Post('users')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getUsers(@Body() filters: GetUsersDto) {
    const users = await this.telegramService.getUsers(filters);
    return users;
  }

  @Delete('users/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', IdValidationPipe) userId: string) {
    const user = await this.telegramService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (!user.authorized) {
      throw new BadRequestException(USER_NOT_AUTHORIZED);
    }

    await this.telegramService.unauthorizeUser(user.telegramUserId);
    await this.telegamBotSender.sendMessage(
      LOGOUT_MESSAGE,
      user.telegramChatId,
    );

    return { message: 'OK' };
  }
}
