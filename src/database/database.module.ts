import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.getOrThrow('MYSQL_HOST'),
      port: this.config.getOrThrow('MYSQL_PORT'),
      database: this.config.getOrThrow('MYSQL_DATABASE'),
      username: this.config.getOrThrow('MYSQL_USERNAME'),
      password: this.config.getOrThrow('MYSQL_PASSWORD'),
      autoLoadEntities: true,
      synchronize: false,
      entities: this.config.getOrThrow('ENTITY_DIR'),
    };
  }
}
