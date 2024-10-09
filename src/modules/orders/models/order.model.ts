import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CandleType, ProductType } from '../types/order';

@Schema({ _id: false })
class Client {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

@Schema({ _id: false })
class Options {
  @Prop({ type: [String] })
  names: string[];

  @Prop({ enum: CandleType, required: false })
  candleType?: CandleType;
}

@Schema({ _id: false })
class Product {
  @Prop({ enum: ProductType })
  type: ProductType;

  @Prop()
  name: string;
}

@Schema()
export class Order {
  @Prop({ type: Client })
  client: Client;

  @Prop({ type: Options })
  options: Options;

  @Prop({ type: [Product] })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
