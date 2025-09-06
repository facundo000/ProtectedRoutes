import { IsString, IsUUID, MinLength } from "class-validator";

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

}
