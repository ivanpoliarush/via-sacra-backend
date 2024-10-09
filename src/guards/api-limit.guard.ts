import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Requests } from 'src/modules/requests/models/requests.model';

export class ApiLimitGurad implements CanActivate {
  constructor(
    @InjectModel('request') private readonly requestModel: Model<Requests>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const ip = this.getIP(request);
    if (!ip) {
      return true;
    }

    const requestDoc = await this.requestModel.findOne({ deviceIP: ip });
    if (!requestDoc) {
      await this.requestModel.create({ deviceIP: ip, requestsCount: 1 });
      return true;
    }

    if (requestDoc.requestsCount > 30) {
      throw new HttpException(
        'Too many requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    await this.requestModel.updateOne(
      { deviceIP: ip },
      { $inc: { requestsCount: 1 } },
    );

    return true;
  }

  getIP(request: Request) {
    return (
      request.headers?.['x-forwarded-for'] ||
      request?.['socket']?.['remoteAddress']
    );
  }
}
