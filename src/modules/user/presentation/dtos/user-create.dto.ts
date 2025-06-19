import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { Role } from "./role.dto";

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    lastname!: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    password!: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Role)
    roles!: Role[];


    @IsOptional()
    @IsString()
    @MaxLength(30)
    @MinLength(8)
    phone?: string;
}