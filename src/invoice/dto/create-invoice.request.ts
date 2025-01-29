import { IsBoolean, IsInt, IsNotEmpty, IsString, IsEnum, IsNumber, IsDate } from 'class-validator';

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

  @IsDate()
  @IsNotEmpty()
  created_at: Date;
}
