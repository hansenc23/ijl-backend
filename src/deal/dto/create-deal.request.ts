import { IsNotEmpty, IsString, IsInt, IsDecimal, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { CreateVoyageRequest } from '../../voyage/dto/create-voyage.request';
import { Type } from 'class-transformer';

class DealDto {
  @IsInt()
  @IsNotEmpty()
  company_id: number;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  voyage_id: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsDecimal()
  @IsNotEmpty()
  rate_per_tonne: number;

  @IsDecimal()
  @IsNotEmpty()
  unit_weight: number;

  @IsString()
  @IsNotEmpty()
  goods_description: string;

  @IsBoolean()
  @IsNotEmpty()
  is_paid: boolean;
}
export class CreateDealRequest {
  @ValidateNested()
  @Type(() => CreateVoyageRequest)
  @IsOptional()
  voyage: CreateVoyageRequest;

  @ValidateNested()
  @Type(() => DealDto)
  deal: DealDto;
}
