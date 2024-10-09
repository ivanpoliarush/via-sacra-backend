import { IsEnum, IsNumber, IsOptional, IsString, Max } from 'class-validator';
import { ProductType, State } from '../types/order';

export class GetOrdersDto {
  @IsNumber()
  page: number;

  @Max(100)
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  @IsEnum(State)
  state?: State;

  @IsOptional()
  @IsString()
  clientNameSearch?: string;

  @IsOptional()
  @IsString()
  clientEmailSearch?: string;

  @IsOptional()
  @IsString()
  @IsEnum(ProductType)
  productTypeSearch?: ProductType;
}
