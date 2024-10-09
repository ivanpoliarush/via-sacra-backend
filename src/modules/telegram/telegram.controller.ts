import { Command, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { COMMANDS } from './telegram.commands';

@Update()
export class TelegramController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {
    this.bot.telegram.setMyCommands(COMMANDS);
  }

  @Start()
  async start(ctx: Context) {
    const telegramUserId = ctx.from.id;
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
