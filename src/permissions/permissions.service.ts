import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async assignPermission(
    assignPermissionDto: AssignPermissionDto,
  ): Promise<Permission> {
    const { user, project } = assignPermissionDto;

    const existingPermission = await this.permissionModel
      .findOne({ user, project })
      .exec();
    if (existingPermission) {
      throw new ConflictException(
        'User already has a permission for this project',
      );
    }

    return this.permissionModel.create(assignPermissionDto);
  }

  async getPermissionsByCompany(companyId: string) {
    return this.permissionModel
      .find()
      .populate({ path: 'user', match: { company: companyId } })
      .populate('project')
      .exec();
  }
}
