import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  use(req: any, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const user = verify(token, this.config.get<string>('JWT_SECRET'));
      req.user = user;
      next();
      return;
    } catch (err) {
      req.user = null;
      next();
      return;
    }
  }
}
