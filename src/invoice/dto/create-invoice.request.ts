import { IsBoolean, IsInt, IsNotEmpty, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator';

enum InvoiceType {
  DOWN_PAYMENT = 'DOWN_PAYMENT',
  FINAL_PAYMENT = 'FINAL_PAYMENT',
}

export class CreateInvoiceRequest {
  @IsInt()
  @IsNotEmpty()
  deal_id: number;

  @IsString()
  @IsNotEmpty()
  invoice_number: string;

  @IsNumber({ maxDecimalPlaces: 3 })
  @IsNotEmpty()
  amount: number;

  @IsBoolean()
  @IsNotEmpty()
  is_paid: boolean;

  @IsEnum(InvoiceType)
  @IsNotEmpty()
  type: InvoiceType;

  @IsDateString()
  @IsNotEmpty()
  created_at: string;
}
