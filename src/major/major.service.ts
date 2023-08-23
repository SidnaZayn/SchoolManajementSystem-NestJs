import { Injectable } from '@nestjs/common';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Major } from 'src/entity/major.entity';
import { DataSource, Like, Repository } from 'typeorm';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(Major)
    private readonly majorRepository: Repository<Major>,
    private dataSource: DataSource,
  ) {}

  async create(createMajorDto: CreateMajorDto) {
    return await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Major)
      .values(createMajorDto)
      .execute();
  }

  async findAll(payload: CreateMajorDto) {
    const data = this.majorRepository;
    let filter = {};

    if (payload.major_name) {
      filter['major_name'] = Like(`%${payload.major_name}%`);
    }

    return await data.find({
      where: filter,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} major`;
  }

  update(id: number, updateMajorDto: UpdateMajorDto) {
    return `This action updates a #${id} major`;
  }

  remove(id: number) {
    return `This action removes a #${id} major`;
  }
}
