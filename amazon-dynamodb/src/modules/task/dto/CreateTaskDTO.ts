import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString({ message: `the "email" field must be a string` })
  @IsNotEmpty({ message: `the "email" field cannot be empty` })
  @IsEmail()
  recipient_email: string;

  @IsString({ message: `the "description" field must be a string` })
  @IsNotEmpty({ message: `the "description" field cannot be empty` })
  description: string;
}
