import { IsString, MaxLength, MinLength, minLength } from "class-validator";


export class LoginUserDto{

    @IsString()
    username: string;

    @IsString()
    @MinLength(5)
    @MaxLength(25)    
    password: string
}