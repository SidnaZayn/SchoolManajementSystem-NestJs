import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/entity/subject.entity';
import { DataSource, Like, Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    private dataSource: DataSource,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return await this.subjectRepository.insert(createSubjectDto);
  }

  async findAll(payload: CreateSubjectDto) {
    const data = this.subjectRepository;
    let filter = {};

    if (payload.name) {
      filter['name'] = Like(`%${payload.name}%`);
    }

    return await data.find({
      where: filter,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
