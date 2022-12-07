import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './user.model';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userModel.create({
      name: createUserDto.name,
      username: createUserDto.username,
      password: hashedPassword,
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(username: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        username
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<[affectedCount: number, affectedRows: User[]]> {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    return this.userModel.update({
      name: updateUserDto.name,
      username: updateUserDto.username,
      password: hashedPassword
    }, { where: { id }, returning: true });
  }

  remove(id: string): Promise<Number> {
    return this.userModel.destroy({ where: { id } });
  }
}
