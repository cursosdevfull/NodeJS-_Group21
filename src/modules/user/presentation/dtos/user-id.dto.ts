import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class UserIdDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    userId!: number;
}