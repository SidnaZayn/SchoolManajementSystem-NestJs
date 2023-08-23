import {
  Query,
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MajorService } from './major.service';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('major')
@UseGuards(AuthGuard)
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Post()
  async create(@Body() createMajorDto: CreateMajorDto) {
    return await this.majorService.create(createMajorDto);
  }

  @Get()
  async findAll(@Query() payload: CreateMajorDto) {
    return this.majorService.findAll(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.majorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMajorDto: UpdateMajorDto) {
    return this.majorService.update(+id, updateMajorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.majorService.remove(+id);
  }
}
