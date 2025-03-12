import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Company } from './schemas/company.schema';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a company' })
  @ApiResponse({ status: 201, description: 'Company created successfully' })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  async findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by ID' })
  @ApiResponse({ status: 200, description: 'Company retrieved successfully' })
  async findById(@Param('id') id: string) {
    return this.companiesService.findById(id);
  }
}
