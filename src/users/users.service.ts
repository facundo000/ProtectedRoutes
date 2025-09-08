import { Injectable, NotFoundException } from '@nestjs/common';
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
  

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string){
    const user = await this.findOne(id);
    await this.UserRepository.remove(user);

    return true;
  }
}
