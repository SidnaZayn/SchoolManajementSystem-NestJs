import {
  HttpException,
  HttpStatus,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<any>();

    if (request.user) {
      return true;
    }

    throw new HttpException(
      `Sorry You're not authorized to access this resource.`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
