import { IsNotEmpty } from 'class-validator';

export class CreateMajorDto {
  @IsNotEmpty()
  major_name: string;
}
