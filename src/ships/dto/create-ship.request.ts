import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShipRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nahkoda: string;
}
