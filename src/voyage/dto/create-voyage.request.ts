import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateVoyageRequest {
  @IsInt()
  @IsNotEmpty()
  ship_id: number;

  @IsString()
  @IsNotEmpty()
  voyage_number: string;

  @IsString()
  @IsNotEmpty()
  from_location: string;

  @IsString()
  @IsNotEmpty()
  to_location: string;
}
