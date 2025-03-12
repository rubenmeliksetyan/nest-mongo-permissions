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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

interface JwtUserPayload {
  userId: string;
}
interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}
@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Post('assign')
  @ApiOperation({ summary: 'Assign a permission to a user' })
  @ApiResponse({ status: 201, description: 'Permission assigned successfully' })
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

  @Get('company/:id')
  @ApiOperation({ summary: 'Get permissions for a company' })
  @ApiResponse({
    status: 200,
    description: 'Permissions retrieved successfully',
  })
  async getPermissionsByCompany(@Param('companyId') companyId: string) {
    return this.permissionsService.getPermissionsByCompany(companyId);
  }
}
