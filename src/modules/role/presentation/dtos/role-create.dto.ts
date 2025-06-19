import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RoleCreateDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(2)
    name!: string;
}
