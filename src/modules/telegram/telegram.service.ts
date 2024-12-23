import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUsersDto } from './dto/get-users.dto';
import { TelegramUser } from './models/telegram-user.model';

@Injectable()
export class TelegramService {
  constructor(
    @InjectModel('telegram_user')
    private readonly telegramUserModel: Model<TelegramUser>,
  ) {}

  async getUsers(filters: GetUsersDto) {
    const [users, total] = await Promise.all([
      this.telegramUserModel
        .find({ authorized: true })
        .limit(filters.limit)
        .skip(Math.max(filters.page - 1, 0) * filters.limit),
      this.telegramUserModel.countDocuments({ authorized: true }),
    ]);

    const result = {
      users: users.map((user) => {
        const { _id, ...rest } = user.toJSON();

        return {
          id: _id.toString(),
          ...rest,
        };
      }),
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
      },
    };

    return result;
  }

  async createUser(name: string, chatId: number, userId: number) {
    const existsUser = await this.telegramUserModel.findOne({
      telegramUserId: userId,
    });
    if (existsUser) {
      return;
    }

    await this.telegramUserModel.create({
      name,
      telegramUserId: userId,
      telegramChatId: chatId,
      authorized: false,
    });
  }

  async getUserByTelegramId(telegramUserId: number) {
    const user = await this.telegramUserModel.findOne({ telegramUserId });
    return user;
  }

  async getUserById(id: string) {
    const user = await this.telegramUserModel.findById(id);
    return user;
  }

  async authorizeUser(telegramUserId: number) {
    const user = await this.telegramUserModel.findOne({ telegramUserId });
    if (!user) {
      return;
    }

    user.authorized = true;
    await user.save();
  }

  async unauthorizeUser(telegramUserId: number) {
    const user = await this.telegramUserModel.findOne({ telegramUserId });
    if (!user) {
      return;
    }

    user.authorized = false;
    await user.save();
  }
}
