import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
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
  async findById(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }
}
