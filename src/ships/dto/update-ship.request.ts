import { IsOptional, IsString } from 'class-validator';

export class UpdateShipRequest {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  nahkoda?: string;
}
