import { IsNumber, Max } from 'class-validator';

export class GetUsersDto {
  @IsNumber()
  page: number;

  @Max(100)
  @IsNumber()
  limit: number;
}
