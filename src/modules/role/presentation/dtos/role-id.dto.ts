import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class RoleIdDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    roleId!: number;
}
