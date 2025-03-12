import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDTO {
  @IsString({ message: `the "name" field must be a string` })
  @IsNotEmpty({ message: `the "name" field needs to be filled` })
  name: string;

  @IsString({ message: `the "cpf" field must be a string` })
  @IsNotEmpty({ message: `the "cpf" field needs to be filled` })
  cpf: string;

  @IsNumber()
  @IsNotEmpty({ message: `the "age" field needs to be filled` })
  age: number;
}
