import { RoleUpdateProps } from "../../application";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class RoleUpdateDto implements RoleUpdateProps {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    roleId!: number;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @MinLength(2)
    name?: string;
}
