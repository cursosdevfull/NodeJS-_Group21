import { StudentUpdateProps } from "../../application";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { GenderEnum } from "../enums";
import { LocationDto } from "./location.dto";
import { EducationDto } from "./education.dto";
import { ExperienceDto } from "./experience.dto";
import { CertificationDto } from "./certification.dto";

export class StudentUpdateDto implements StudentUpdateProps {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    studentId!: number;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    name!: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @MinLength(3)
    lastname!: string;

    @IsOptional()
    @IsNumber()
    @Min(18)
    @Type(() => Number)
    age!: number

    @IsOptional()
    @IsEmail()
    @MaxLength(100)
    email!: string;

    @IsOptional()
    @IsEnum(GenderEnum, {
        message: `Gender debe ser uno de los siguientes valores: ${Object.values(GenderEnum).join(', ')}`
    })
    gender?: GenderEnum;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    @MinLength(8)
    phone?: string;

    @IsOptional()
    @Type(() => LocationDto)
    location?: LocationDto;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    skills?: string[];

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => EducationDto)
    @ValidateNested({ each: true })
    education?: EducationDto[];

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ExperienceDto)
    @ValidateNested({ each: true })
    experience?: ExperienceDto[]

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => CertificationDto)
    @ValidateNested({ each: true })
    certifications?: CertificationDto[];
}