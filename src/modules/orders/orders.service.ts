import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';
import { ORDER_NOT_FOUND } from './orders.constants';
import { State } from './types/order';

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

  async updateOrderStatus(id: string, status: State) {
    const order = await this.orderModel.findByIdAndUpdate(id, { status });
    if (!order) {
      throw new NotFoundException(ORDER_NOT_FOUND);
    }
  }
}
