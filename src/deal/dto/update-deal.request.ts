import { IsString, IsInt, IsDecimal, IsBoolean, IsOptional } from 'class-validator';

export class UpdateDealRequest {
  @IsInt()
  @IsOptional()
  quantity: number;

  @IsDecimal()
  @IsOptional()
  rate_per_tonne: number;

  @IsDecimal()
  @IsOptional()
  unit_weight: number;

  @IsString()
  @IsOptional()
  goods_description: string;

  @IsBoolean()
  @IsOptional()
  is_paid: boolean;
}
