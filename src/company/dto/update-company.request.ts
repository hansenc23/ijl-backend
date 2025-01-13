import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyRequest {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  initials?: string;
}
