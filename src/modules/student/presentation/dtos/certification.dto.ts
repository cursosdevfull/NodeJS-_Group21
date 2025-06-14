import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CertificationDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    institution!: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date!: Date;
}