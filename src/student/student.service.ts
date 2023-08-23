import { Injectable, Inject } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from 'src/entity/student.entity';
import { DataSource, Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entity/users.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Students)
    private readonly studentRepository: Repository<Students>,
    private dataSource: DataSource,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { password, ...rest } = createStudentDto;
    const genSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, genSalt);

    const newStudent = {
      password: hash,
      ...rest,
    };

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({
        name: rest.name,
        email: rest.email,
        password: hash,
        roleId: 2,
      })
      .execute();

    return await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Students)
      .values(newStudent)
      .execute();
  }

  async findAll(payload: CreateStudentDto) {
    const queryBuilder = this.dataSource.getRepository(Students);
    let filter = {};

    if (payload.name) {
      filter['name'] = Like(`%${payload.name}%`);
    }
    if (payload.class) {
      filter['class'] = payload.class;
    }
    if (payload.entry_year) {
      filter['entry_year'] = payload.entry_year;
    }
    if (payload.religion) {
      filter['religion'] = payload.religion;
    }

    const data = await queryBuilder.find({
      where: filter,
      select: {
        password: false,
      },
    });

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
