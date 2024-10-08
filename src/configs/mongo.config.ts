import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const MONGO_HOST = configService.get<string>('MONGO_HOST');
  const MONGO_PORT = configService.get<string>('MONGO_PORT');
  const MONGO_USERNAME = configService.get<string>('MONGO_USERNAME');
  const MONGO_PASSWORD = configService.get<string>('MONGO_PASSWORD');

  const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

  return { uri };
};
