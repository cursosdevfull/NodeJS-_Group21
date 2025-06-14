import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class EducationDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    degree!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    institution!: string;

    @IsNotEmpty()
    @IsNumber()
    @Max(2200)
    @Min(1900)
    @Type(() => Number)
    yearOfGraduation!: number;
}