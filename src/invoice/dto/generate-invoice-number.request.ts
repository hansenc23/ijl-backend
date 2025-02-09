import { IsBoolean, IsInt, IsNotEmpty, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator';

export class GenerateInvoiceNumberRequest {
  @IsInt()
  @IsNotEmpty()
  company_id: number;

  @IsInt()
  @IsNotEmpty()
  ship_id: number;

  @IsInt()
  voyage_id?: number;

  @IsString()
  voyage_number?: string;

  @IsBoolean()
  @IsNotEmpty()
  new_voyage: boolean;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
