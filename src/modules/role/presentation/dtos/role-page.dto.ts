import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class RolePageDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page!: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit!: number;
}
