import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class ExperienceDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    company!: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    role!: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    startDate!: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endDate?: Date;
}