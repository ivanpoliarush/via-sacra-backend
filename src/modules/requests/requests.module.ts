import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsSchema } from './models/requests.model';
import { RequestsService } from './requests.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'request',
        schema: RequestsSchema,
      },
    ]),
  ],
  providers: [RequestsService],
})
export class RequestsModule {}
