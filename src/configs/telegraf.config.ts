import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';
import { session } from 'telegraf';

export const getTelegrafConfig = (
  configService: ConfigService,
): TelegrafModuleOptions => {
  const token = configService.get('TELEGRAM_BOT_TOKEN');

  return {
    token,
    botName: 'Via Sacra Admin',
    middlewares: [session()],
  };
};
