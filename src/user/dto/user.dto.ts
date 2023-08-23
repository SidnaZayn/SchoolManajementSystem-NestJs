import { Roles } from 'src/entity/roles.entity';

export class UserDto {
  readonly email: string;

  readonly password: string;

  readonly name: string;

  readonly roleId: Roles;
}
