import { IsNotEmpty, IsString } from "class-validator";

export class LocationDto {
    @IsNotEmpty()
    @IsString()
    address!: string

    @IsNotEmpty()
    @IsString()
    city!: string;

    @IsNotEmpty()
    @IsString()
    state!: string;

    @IsNotEmpty()
    @IsString()
    country!: string;
}