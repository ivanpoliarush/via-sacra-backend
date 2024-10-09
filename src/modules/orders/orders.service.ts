import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { Order } from './models/order.model';
import { ORDER_NOT_FOUND } from './orders.constants';
import { State } from './types/order';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('order') private readonly orderModel: Model<Order>,
  ) {}

  async getOrders(filters: GetOrdersDto) {
    const seacrhParams = {};

    if (filters.clientEmailSearch) {
      seacrhParams['client.email'] = {
        $regex: filters.clientEmailSearch,
        $options: 'i',
      };
    }

    if (filters.clientNameSearch) {
      seacrhParams['client.name'] = {
        $regex: filters.clientNameSearch,
        $options: 'i',
      };
    }

    if (filters.state) {
      seacrhParams['status'] = filters.state;
    }

    if (filters.productTypeSearch) {
      seacrhParams['products'] = {
        $elemMatch: { type: filters.productTypeSearch },
      };
    }

    const [orders, total] = await Promise.all([
      this.orderModel
        .find(seacrhParams)
        .limit(filters.limit)
        .skip(Math.max(filters.page - 1, 0) * filters.limit),
      this.orderModel.countDocuments(seacrhParams),
    ]);

    const result = {
      data: orders.map((order) => {
        const { _id, ...rest } = order.toJSON();

        return {
          id: _id.toString(),
          ...rest,
        };
      }),
      pagination: {
        total,
        page: filters.page,
        limit: filters.limit,
      },
    };

    return result;
  }

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

  async deleteOrderById(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) {
      throw new NotFoundException(ORDER_NOT_FOUND);
    }
  }
}
