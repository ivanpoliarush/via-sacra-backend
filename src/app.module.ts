import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { getMongoConfig } from './configs/mongo.config';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RequestsModule } from './modules/requests/requests.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),

    AuthModule,
    UserModule,
    OrdersModule,
    TelegramModule,
    RequestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
