import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PermissionRole {
  Read = 'Read',
  Write = 'Write',
  Delete = 'Delete',
  Admin = 'Admin',
}

export class AssignPermissionDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ description: 'User ID', example: '60a7a7b9f29d5e4a3c3e1b7c' })
  user: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Project ID',
    example: '67d12d89bf3808a75d5d97ce',
  })
  project: string;

  @IsEnum(PermissionRole)
  @IsNotEmpty()
  @ApiProperty({
    enum: ['Read', 'Write', 'Delete', 'Admin'],
    description: 'User role',
  })
  role: PermissionRole;
}
