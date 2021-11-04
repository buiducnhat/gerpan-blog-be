import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { SocialDto } from '../auth/dto/social.dto';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { Social } from './entities/social.entity';
import { User } from './entities/user.entity';
import { SocialProvider } from './enums/social-provider.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Social)
    private socialRepository: Repository<Social>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findWithEmail(email: string, needPassword = false) {
    const qb = this.userRepository.createQueryBuilder('user').where({ email }).select('user');
    if (needPassword) {
      qb.addSelect('user.password');
    }
    return qb.getOne();
  }

  findOne(userId: number | string, needPassword = false) {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .select('user')
      .leftJoinAndSelect('user.socials', 'social');
    if (needPassword) {
      qb.addSelect('user.password');
    }
    return qb.getOne();
  }

  update(userId: number | string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(userId, updateUserDto);
  }

  remove(userId: number | string) {
    return this.userRepository.delete(userId);
  }

  async createSocial(socialUserDto: SocialDto, userId: number | string) {
    const user = await this.userRepository.findOne(userId);

    const socialUser = new Social();
    socialUser.user = user;
    for (const [key, value] of Object.entries(socialUserDto)) {
      socialUser[key] = value;
    }
    return this.socialRepository.save(socialUser);
  }

  async addSocialToUser(userId: number | string, socialUserId: number | string) {
    const socialUser = await this.socialRepository.findOne(socialUserId);
    const user = await this.findOne(userId);
    if (user.socials.some((social) => social.id === socialUser.id)) {
      return user;
    }
    user.socials.push(socialUser);
    return this.userRepository.save(user);
  }

  findSocialUser(socialId: string, provider: SocialProvider) {
    return this.socialRepository.findOne({ socialId, provider }, { relations: ['user'] });
  }
}
