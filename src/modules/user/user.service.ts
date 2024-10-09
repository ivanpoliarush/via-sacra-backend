import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { USER_ALREADY_EXISTS } from './user.constants';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async registerUser(email: string) {
    const existsUser = await this.userModel.findOne({ email });
    if (existsUser) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }

    const newUser = await this.userModel.create({ email });

    return {
      id: newUser._id.toString(),
    };
  }
}
