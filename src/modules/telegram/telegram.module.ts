import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegrafModule } from 'nestjs-telegraf';
import { getTelegrafConfig } from 'src/configs/telegraf.config';
import { TelegramSchema } from './models/telegram-user.model';
import { TelegramController } from './telegram.controller';
import { TelegramSender } from './telegram.sender';
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
  providers: [TelegramController, TelegramService, TelegramSender],
  exports: [TelegramSender],
})
export class TelegramModule {}
