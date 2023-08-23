import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/users.entity';
import { DataSource, QueryRunner, Repository, Like } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private dataSource: DataSource,
  ) {}

  @Inject(ConfigService)
  private readonly config: ConfigService;

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.dataSource
      .getRepository(Users)
      .findOne({ where: { email: loginDto.email } });

    if (!user) {
      throw new HttpException(`email not found`, HttpStatus.NOT_FOUND);
    }

    const isPassCorrect = await compare(loginDto.password, user.password);

    if (!isPassCorrect) {
      throw new HttpException(`password incorrect`, HttpStatus.NOT_FOUND);
    }

    return {
      accessToken: sign({ user }, this.config.get<string>('JWT_SECRET'), {
        expiresIn: 604800000,
      }),
      tokenType: 'Bearer',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async signup(signinDto: SignupDto): Promise<any> {
    const { password, ...rest } = signinDto;
    const genSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, genSalt);
    const newUser = {
      password: hash,
      name: rest.name,
      role: rest.roleId,
      email: rest.email,
    };
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values(newUser)
      .execute();
  }

  async delete(id: number): Promise<any> {
    return this.dataSource
      .getRepository(Users)
      .createQueryBuilder('users')
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }

  async allUsers(payload: UserDto) {
    const queryBuilder = this.dataSource.getRepository(Users);
    let filter: Object = {};

    if (payload.name) {
      filter['name'] = Like(`%${payload.name}%`);
    }
    if (payload.roleId) {
      filter['roleId'] = { id: payload.roleId };
    }

    const data = await queryBuilder.find({
      where: filter,
      select: {
        id: true,
        name: true,
        email: true,
      },
      relations: {
        roleId: true,
      },
    });
    return data;
  }
}
