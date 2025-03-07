import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDTO {
  @IsString({ message: `the "name" field must be a string` })
  @IsNotEmpty({ message: `the "name" field cannot be empty` })
  name: string;

  @IsString({ message: `the "email" field must be a string` })
  @IsNotEmpty({ message: `the "email" field cannot be empty` })
  email: string;
}
