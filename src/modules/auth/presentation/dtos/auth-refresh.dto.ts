import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthRefreshDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    refreshToken!: string;
}
