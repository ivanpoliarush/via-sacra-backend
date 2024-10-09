import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiLimitGurad } from 'src/guards/api-limit.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { UpdateOrderStattusDto } from './dto/update-order-state.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('all')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getOrders(@Body() filters: GetOrdersDto) {
    const result = await this.ordersService.getOrders(filters);
    return result;
  }

  @Post()
  @UseGuards(ApiLimitGurad)
  @UsePipes(new ValidationPipe())
  async createOrder(@Body() order: CreateOrderDto) {
    const result = await this.ordersService.createOrder(order);
    return result;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateOrderStatus(
    @Param('id', IdValidationPipe) id: string,
    @Body() { state }: UpdateOrderStattusDto,
  ) {
    await this.ordersService.updateOrderStatus(id, state);
    return {
      message: 'OK',
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteOrder(@Param('id', IdValidationPipe) id: string) {
    await this.ordersService.deleteOrderById(id);
    return {
      message: 'OK',
    };
  }
}
