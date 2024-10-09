import { IsNumber, IsOptional, IsString, Max } from 'class-validator';

export class GetUsersDto {
  @IsNumber()
  page: number;

  @IsNumber()
  @Max(100)
  limit: number;

  @IsOptional()
  @IsString()
  emailSearch: string;
}
