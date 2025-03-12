import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { Model } from 'mongoose';
import { ConflictException } from '@nestjs/common';
import { AssignPermissionDto, PermissionRole } from './dto/assign-permission.dto';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let model: Model<Permission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: getModelToken(Permission.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    model = module.get<Model<Permission>>(getModelToken(Permission.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should assign a permission successfully', async () => {
    const assignPermissionDto: AssignPermissionDto = {
      user: 'USER_ID',
      project: 'PROJECT_ID',
      role: PermissionRole.Admin,
    };

    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    jest.spyOn(model, 'create').mockImplementation(async (dto: AssignPermissionDto) => {
      return Promise.resolve({
        _id: 'GENERATED_ID',
        user: dto.user,
        project: dto.project,
        role: dto.role,
      }) as any;
    });
    const result = await service.assignPermission(assignPermissionDto);
    expect(result).toEqual({
      ...assignPermissionDto,
      _id: 'GENERATED_ID',
    });
  });

  it('should throw ConflictException if permission already exists', async () => {
    const assignPermissionDto: AssignPermissionDto = {
      user: 'USER_ID',
      project: 'PROJECT_ID',
      role: PermissionRole.Admin,
    };

    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(assignPermissionDto as any),
    } as any);

    await expect(service.assignPermission(assignPermissionDto)).rejects.toThrow(ConflictException);
  });

  it('should retrieve permissions by company', async () => {
    const companyId = 'COMPANY_ID';
    const mockPermissions = [
      {
        user: { _id: 'USER_ID', email: 'user@example.com', company: companyId },
        project: { _id: 'PROJECT_ID', name: 'Project Alpha' },
        role: PermissionRole.Admin,
      },
    ];

    jest.spyOn(model, 'find').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockPermissions),
    } as any);

    const result = await service.getPermissionsByCompany(companyId);
    expect(result).toEqual(mockPermissions);
  });
});