import { IsNotEmpty } from 'class-validator';
import { Roles } from 'src/entity/roles.entity';

export class SignupDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
  
  @IsNotEmpty()
  readonly name: string;
  
  @IsNotEmpty()
  readonly roleId: Roles;  
}   
