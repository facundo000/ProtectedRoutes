import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidRoles } from 'src/auth/interface/valid-roles';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Get all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  @Auth( ValidRoles.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile/:id')
  @Auth( ValidRoles.USER, ValidRoles.ADMIN)
  @ApiOperation({ summary: 'Get a user by id or name' })
  @ApiResponse({ status: 200, description: 'Get a user by id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() currentUser: User,
  ) {
    return this.usersService.findOneSecure(id, currentUser);
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({ summary: 'Update own user name/surname' })
  @ApiResponse({ status: 200, description: 'Update a user by id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() currentUser: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateSelf(id, currentUser, updateUserDto);
  }

  @Delete('remove/:id')
  @Auth( ValidRoles.USER, ValidRoles.ADMIN)
  @ApiOperation({ summary: 'Remove own user' })
  @ApiResponse({ status: 200, description: 'Remove a user by id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() currentUser: User,
  ) {
    return this.usersService.removeByPolicy(id, currentUser);
  }
}
