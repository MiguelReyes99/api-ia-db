import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ImageDTO {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    fileName!: string;
}