import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export enum PermissionRole {
  Read = 'Read',
  Write = 'Write',
  Delete = 'Delete',
  Admin = 'Admin',
}

export class AssignPermissionDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsMongoId()
  @IsNotEmpty()
  project: string;

  @IsEnum(PermissionRole)
  @IsNotEmpty()
  role: PermissionRole;
}
