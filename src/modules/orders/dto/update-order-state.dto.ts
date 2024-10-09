import { IsEnum, IsString } from 'class-validator';
import { State } from '../types/order';

export class UpdateOrderStattusDto {
  @IsString()
  @IsEnum(State)
  state: State;
}
