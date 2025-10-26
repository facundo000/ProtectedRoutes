import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { ValidRoles } from './interface/valid-roles';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.UserRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        role: ValidRoles.USER,
      });
      await this.UserRepository.save(user);

      const { password: _, ...userWithoutPassword } = user;

      return {
        ...userWithoutPassword,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.UserRepository.findOne({
      where: { username },
      select: { username: true, password: true, id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials - Username');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials - password');
    }

    return {
      user: user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async checkAuthStatus(user: User | null) {
    // Si no hay usuario autenticado, devolver rol "user"
    if (!user) {
      return {
        role: 'user no Aunth',
        authenticated: false,
      };
    }

    const { password, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      authenticated: true,
      token: this.getJwtToken({ id: user.id }),
    };
  }
}
