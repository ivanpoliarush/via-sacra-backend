import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStattusDto } from './dto/update-order-state.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
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
