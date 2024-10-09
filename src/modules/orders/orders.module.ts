import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsSchema } from '../requests/models/requests.model';
import { TelegramModule } from '../telegram/telegram.module';
import { OrderSchema } from './models/order.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'order',
        schema: OrderSchema,
      },
      {
        name: 'request',
        schema: RequestsSchema,
      },
    ]),

    TelegramModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
