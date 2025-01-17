import { IsNotEmpty, IsString, IsInt, IsDecimal, IsBoolean } from 'class-validator';

export class CreateDealRequest {
  @IsInt()
  @IsNotEmpty()
  company_id: number;

  @IsInt()
  @IsNotEmpty()
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
