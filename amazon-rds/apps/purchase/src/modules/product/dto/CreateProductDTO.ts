import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString({ message: `the "description" field must be a string` })
  @IsNotEmpty({ message: `the "description" field needs to be filled` })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: `the "priceInCents" field needs to be filled` })
  priceInCents: number;
}
