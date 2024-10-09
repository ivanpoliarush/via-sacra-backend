import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Requests {
  @Prop({ required: true })
  deviceIP: string;

  @Prop({ required: true })
  requestsCount: number;
}

export const RequestsSchema = SchemaFactory.createForClass(Requests);
