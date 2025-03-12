import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name', example: 'TechCorp' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Industry the company belongs to',
    example: 'Software',
    required: false,
  })
  @IsString()
  @IsOptional()
  industry?: string;
}
