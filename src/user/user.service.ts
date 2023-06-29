import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-dto-schema';
import { UpdateUserDto } from './dto/update-dto-schema';
import { User, UserDocument } from './entities/user-entities';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto['passwordHash'] = createHash('sha256')
      .update(String(createUserDto.password))
      .digest('base64');
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return (
      await (await this.userModel.findById(id)).populate('client')
    ).populate('base');
  }

  async findByQuery(query: any) {
    return await this.userModel.find(query);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return this.userModel.findById(id);
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return deletedUser ? true : false;
  }
}
