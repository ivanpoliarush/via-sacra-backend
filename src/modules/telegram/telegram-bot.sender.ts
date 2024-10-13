import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectBot } from 'nestjs-telegraf';
import { Queue } from 'src/common/queue';
import { Context, Telegraf } from 'telegraf';
import { TelegramUser } from './models/telegram-user.model';

@Injectable()
export class TelegramBotSender {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    @InjectModel('telegram_user')
    private readonly telegramUserModel: Model<TelegramUser>,
  ) {}

  async sendMessage(message: string, chatId?: number) {
    if (chatId) {
      try {
        await this.bot.telegram.sendMessage(chatId, message);
      } catch (error) {
        console.log('Telegram send message error:', error);
      }

      return;
    }

    const queue = new Queue();

    const users = await this.telegramUserModel.find({ authorized: true });
    const promises = users.map((user) => async () => {
      try {
        await this.bot.telegram.sendMessage(
          user.toJSON().telegramChatId,
          message,
        );
      } catch (error) {
        console.log('Telegram send message error:', error);
      }
    });

    await queue.run(promises);
  }
}
