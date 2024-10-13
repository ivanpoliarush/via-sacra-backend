import { ConfigService } from '@nestjs/config';
import { Command, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import {
  ALREADY_AUTHORIZED_MESSAGE,
  AUTHORIZED_MESSAGE,
  LOGOUT_MESSAGE,
  NEW_USER_LOGGED_IN_MESSAGE,
  PASSWORD_NOT_VALID_MESSAGE,
  START_MESSAGE,
  SYSTEM_ERROR_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from './constants/messages';
import { COMMANDS } from './telegram-bot.commands';
import { TelegramBotSender } from './telegram-bot.sender';
import { TelegramService } from './telegram.service';

@Update()
export class TelegramBotController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramService: TelegramService,
    private readonly condigService: ConfigService,
    private readonly telegramBotSender: TelegramBotSender,
  ) {
    this.bot.telegram.setMyCommands(COMMANDS);
  }

  @Start()
  async start(ctx: Context) {
    try {
      await this.telegramService.createUser(
        ctx.from.first_name,
        ctx.chat.id,
        ctx.from.id,
      );

      await ctx.reply(START_MESSAGE);
    } catch (error) {
      console.log('Start telegram error:', error);
      await ctx.reply(SYSTEM_ERROR_MESSAGE);
    }
  }

  @Command('login')
  async login(ctx: Context) {
    try {
      const telegramPassword =
        await this.condigService.get('TELEGRAM_PASSWORD');
      if (!telegramPassword) {
        await ctx.reply(SYSTEM_ERROR_MESSAGE);
        return;
      }

      const user = await this.telegramService.getUserByTelegramId(ctx.from.id);
      if (!user) {
        await ctx.reply(USER_NOT_FOUND_MESSAGE);
        return;
      }

      if (user.authorized) {
        await ctx.reply(ALREADY_AUTHORIZED_MESSAGE);
        return;
      }

      const password = (ctx.message['text'] || '').split(' ')[1];
      if (password !== telegramPassword) {
        await ctx.reply(PASSWORD_NOT_VALID_MESSAGE);
        return;
      }

      await this.telegramBotSender.sendMessage(
        NEW_USER_LOGGED_IN_MESSAGE(ctx.from.first_name, ctx.from.username),
      );
      await this.telegramService.authorizeUser(ctx.from.id);
      await ctx.reply(AUTHORIZED_MESSAGE);
    } catch (error) {
      console.log('Login telegram error:', error);
      await ctx.reply(SYSTEM_ERROR_MESSAGE);
    }
  }

  @Command('logout')
  async logout(ctx: Context) {
    try {
      const user = await this.telegramService.getUserByTelegramId(ctx.from.id);
      if (!user) {
        await ctx.reply(USER_NOT_FOUND_MESSAGE);
        return;
      }

      await this.telegramService.unauthorizeUser(ctx.from.id);
      await ctx.reply(LOGOUT_MESSAGE);
    } catch (error) {
      console.log('Logout telegram error:', error);
      await ctx.reply(SYSTEM_ERROR_MESSAGE);
    }
  }
}
