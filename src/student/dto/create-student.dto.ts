import { Users } from 'src/entity/users.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly religion: string;

  @IsNotEmpty()
  readonly class: string;

  @IsNotEmpty()
  readonly entry_year: string;

  @IsNotEmpty()
  readonly file: string;

  @IsNotEmpty()
  readonly user_id: Users;
}
