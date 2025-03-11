import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

const mockUser = {
  _id: '507f191e810c19729de860ea',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'hashedpassword',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockImplementation(() => ({
              exec: jest.fn().mockResolvedValue(null),
            })),
            deleteMany: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));

    await model.deleteMany({});
  });

  afterEach(async () => {
    await model.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const newUser = await service.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword',
    });

    expect(newUser).toEqual(mockUser);
    expect(model.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John Doe',
      email: 'john@example.com',
    }));
  });
});