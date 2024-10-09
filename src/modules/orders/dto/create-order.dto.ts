import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CandleType, ProductType } from '../types/order';

class Client {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;
}

class Options {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsString({ each: true })
  names: string[];

  @IsOptional()
  @IsString()
  @IsEnum(CandleType)
  candleType?: CandleType;
}

class Product {
  @IsString()
  @IsEnum(ProductType)
  type: ProductType;

  @IsString()
  name: string;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => Client)
  client: Client;

  @ValidateNested()
  @Type(() => Options)
  options: Options;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Product)
  @ValidateNested({ each: true })
  products: Product[];
}
