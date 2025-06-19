import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { Role } from "./role.dto";

export class UserUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    userId!: number;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    lastname?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    password?: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    @MinLength(8)
    phone?: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => Role)
    roles?: Role[];
}