import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('projects')
@UseGuards(JwtAuthGuard)
@ApiTags('Projects')
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  async create(
    @Body()
    body: {
      name: string;
      description?: string;
      status: string;
      priority?: number;
      company: string;
    },
  ) {
    return this.projectsService.create(body);
  }

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Project retrieved successfully' })
  async findById(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }
}
