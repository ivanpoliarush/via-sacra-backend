import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUsersDto } from './dto/get-users.dto';
import { User } from './models/user.model';
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from './user.constants';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async getUsers(filters: GetUsersDto) {
    const [users, total] = await Promise.all([
      this.userModel
        .find({
          email: { $regex: filters.emailSearch || '', $options: 'i' },
        })
        .limit(filters.limit)
        .skip(Math.max(filters.page - 1, 0) * filters.limit),
      this.userModel.countDocuments({
        email: { $regex: filters.emailSearch || '', $options: 'i' },
      }),
    ]);

    const result = {
      data: users.map((user) => ({
        id: user._id.toString(),
        email: user.email,
        registeredAt: user.createdAt,
      })),
      pagination: {
        total,
        page: filters.page,
        limit: filters.limit,
      },
    };

    return result;
  }

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

  async deleteUserById(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }
}
