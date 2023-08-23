import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/users.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
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
      accessToken: sign(user),
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
}
