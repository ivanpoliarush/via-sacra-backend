import { CreateOrderDto } from './dto/create-order.dto';

export const ORDER_NOT_FOUND = 'Order not found';
export const TELEGRAM_ORDER_MESSAGE = (order: CreateOrderDto) => {
  return (
    'New order created! 🛒 \n' +
    `Client name: ${order.client.name}\n` +
    `Client email: ${order.client.email}\n` +
    `Type: ${order.products[0].type[0].toUpperCase() + order.products[0].type.slice(1)}\n` +
    `Names: ${order.options.names.join(', ')}\n` +
    (order.options.candleType
      ? `Candle type: ${order.options.candleType[0].toUpperCase() + order.options.candleType.slice(1)}\n`
      : '') +
    `Products: ${order.products.map((p) => p.name).join(', ')}`
  );
};
