import { Command, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { START_MESSAGE } from './constants/messages';
import { COMMANDS } from './telegram.commands';
import { TelegramService } from './telegram.service';

@Update()
export class TelegramController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramService: TelegramService,
  ) {
    this.bot.telegram.setMyCommands(COMMANDS);
  }

  @Start()
  async start(ctx: Context) {
    await this.telegramService.createUser(
      ctx.from.first_name,
      ctx.chat.id,
      ctx.from.id,
    );

    await ctx.reply(START_MESSAGE);
  }

  @Command('login')
  async login(ctx: Context) {
    const telegramUserId = ctx.from.id;
  }

  @Command('logout')
  async logout(ctx: Context) {
    const telegramUserId = ctx.from.id;
  }
}
