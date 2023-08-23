import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from 'src/entity/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
