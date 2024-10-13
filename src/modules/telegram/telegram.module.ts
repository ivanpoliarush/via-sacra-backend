import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegrafModule } from 'nestjs-telegraf';
import { getTelegrafConfig } from 'src/configs/telegraf.config';
import { TelegramSchema } from './models/telegram-user.model';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotSender } from './telegram-bot.sender';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegrafConfig,
    }),
    MongooseModule.forFeature([
      {
        name: 'telegram_user',
        schema: TelegramSchema,
      },
    ]),
  ],
  controllers: [TelegramController],
  providers: [TelegramBotController, TelegramService, TelegramBotSender],
  exports: [TelegramBotSender],
})
export class TelegramModule {}
