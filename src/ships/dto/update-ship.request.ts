import { IsOptional, IsString, IsUppercase } from 'class-validator';

export class UpdateShipRequest {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  nahkoda?: string;

  @IsString()
  @IsOptional()
  @IsUppercase()
  initials?: string;
}
