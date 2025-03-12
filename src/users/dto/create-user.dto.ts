import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password (min. 6 characters)',
    example: 'SecurePass123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
