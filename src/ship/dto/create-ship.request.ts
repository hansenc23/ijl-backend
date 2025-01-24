import { IsNotEmpty, IsString, IsUppercase } from 'class-validator';

export class CreateShipRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nahkoda: string;

  @IsString()
  @IsNotEmpty()
  @IsUppercase()
  initials: string;
}
