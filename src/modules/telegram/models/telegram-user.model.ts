import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TelegramUser {
  @Prop()
  name: string;

  @Prop()
  telegramUserId: number;

  @Prop()
  telegramChartId: number;

  @Prop()
  authorized: boolean;
}

export const TelegramSchema = SchemaFactory.createForClass(TelegramUser);
