import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class StudentIdDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    studentId!: number;
}