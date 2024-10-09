import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const adminPassword = this.configService.get('ADMIN_PASSWORD');
    if (!adminPassword) {
      return false;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) {
      return false;
    }

    return token === adminPassword;
  }

  getToken(request: Request) {
    const header = request.headers.authorization;
    if (!header) {
      return null;
    }

    const parts = header.split(' ');
    if (parts.length !== 2) {
      return null;
    }

    const [type, token] = parts;

    if (type !== 'Bearer') {
      return null;
    }

    return token;
  }
}
