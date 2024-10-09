import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Requests } from './models/requests.model';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel('request') private readonly requestModel: Model<Requests>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async clearRequests() {
    await this.requestModel.deleteMany();
  }
}
