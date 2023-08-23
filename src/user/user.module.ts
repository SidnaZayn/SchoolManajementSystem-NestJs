import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entity/roles.entity';
import { Users } from 'src/entity/users.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, Users])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
