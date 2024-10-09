import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TelegramUser } from './models/telegram-user.model';

@Injectable()
export class TelegramService {
  constructor(
    @InjectModel('telegram_user')
    private readonly telegramUserModel: Model<TelegramUser>,
  ) {}

  async createUser(name: string, chatId: number, userId: number) {
    const existsUser = await this.telegramUserModel.findOne({
      telegramUserId: userId,
    });
    if (existsUser) {
      return;
    }

    await this.telegramUserModel.create({
      name,
      telegramUserId: userId,
      telegramChatId: chatId,
      authorized: false,
    });
  }
}
