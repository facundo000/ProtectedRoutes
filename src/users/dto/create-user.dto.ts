import { IsEnum, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { ValidRoles } from "src/auth/interface/valid-roles";
import { Unique } from "typeorm";

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    username: string;

    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(2)
    surname: string;

    @IsString()
    @MinLength(5)
    password: string;

    @IsEnum(ValidRoles)
    @IsOptional()
    role: ValidRoles
}
