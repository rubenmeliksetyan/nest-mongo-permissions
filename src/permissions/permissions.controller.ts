import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsService } from './permissions.service';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';

interface JwtUserPayload {
  userId: string;
}
interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Post('assign')
  async assignPermission(
    @Request() req: AuthenticatedRequest,
    @Body() assignPermissionDto: AssignPermissionDto,
  ) {
    const { project, role } = assignPermissionDto;
    const user = req.user as JwtUserPayload | undefined;

    if (!user?.userId) {
      throw new BadRequestException('User ID is missing from authentication');
    }

    const userRecord = await this.usersService.findById(user.userId);
    if (!userRecord) throw new BadRequestException('User not found');

    const projectRecord = await this.projectsService.findById(project);
    if (!projectRecord) throw new BadRequestException('Project not found');
    if (!userRecord.company || !projectRecord.company) {
      throw new BadRequestException(
        'User or Project is missing company information',
      );
    }

    if (!userRecord.company.equals(projectRecord.company)) {
      throw new BadRequestException(
        'User and Project must belong to the same company',
      );
    }

    return this.permissionsService.assignPermission({
      user: user.userId,
      project,
      role,
    });
  }

  @Get('company/:companyId')
  async getPermissionsByCompany(@Param('companyId') companyId: string) {
    return this.permissionsService.getPermissionsByCompany(companyId);
  }
}
