import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>
  ){}

  findAll() {
    const users = this.UserRepository.find();
    return users;
  }

  //SEARCH BY USERNAME, FIRST NAME, OR LAST NAME
// findBy(){
//}

  async findOne(id: string) {
    const user = await this.UserRepository.findOneBy({ id: id})

    if(!user){
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return user
  }
  
  async findOneSecure(id: string, currentUser: User) {
    if (currentUser.role !== 'admin' && currentUser.id !== id) {
      throw new ForbiddenException('You can only view your own profile');
    }
    return this.findOne(id);
  }
  

  async updateSelf(id: string, currentUser: User, updateUserDto: UpdateUserDto) {
    if (currentUser.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    const user = await this.findOne(id);
    if (typeof updateUserDto.name !== 'undefined') {
      user.name = updateUserDto.name;
    }
    if (typeof updateUserDto.surname !== 'undefined') {
      user.surname = updateUserDto.surname;
    }
    await this.UserRepository.save(user);
    return user;
  }

  async removeByPolicy(id: string, currentUser: User){
    if (currentUser.role !== 'admin' && currentUser.id !== id) {
      throw new ForbiddenException('You can only delete your own account');
    }
    const user = await this.findOne(id);
    await this.UserRepository.remove(user);
    return true;
  }
}
