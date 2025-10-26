import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetRawHeaders } from './decorators/raw-headers.decorator';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interface/valid-roles';
import { OptionalAuthGuard } from './guards/user-role/optional-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @UseGuards(OptionalAuthGuard)
  // @Auth()
  checkAuthStatus(@GetUser() user: User | null) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private/users')
  @Auth()
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('username') username: string,

    @GetRawHeaders() rawHeaders: string[],
  ) {
    return {
      ok: true,
      message: 'en privado',
      user,
      username,
      rawHeaders,
    };
  }

  @Get('private2/admin')
  @Auth(ValidRoles.ADMIN)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
