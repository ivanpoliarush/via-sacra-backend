import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('order') private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(order: CreateOrderDto) {
    const newOrder = await this.orderModel.create(order);

    return {
      id: newOrder._id.toString(),
    };
  }
}
