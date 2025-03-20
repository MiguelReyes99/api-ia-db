import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";

export class ImageDTO {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    fileName!: string;

    @IsNotEmpty()
    @IsUrl({}, { message: 'La URL proporcionada no es válida' })
    url!: string;
}