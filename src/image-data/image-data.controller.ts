import { Controller, Get, HttpStatus, NotFoundException, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageDataService } from './image-data.service';
import { Response, Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("images")
export class ImageDataController {

    constructor(private imageService: ImageDataService){}

    @Post("upload")
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            return await this.imageService.createImageRecord(file);
            // res.status(HttpStatus.OK).send(response);
        } catch (error) {
            // res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
            throw error;
        }
    }

    @Get(":id")
    async getImage(@Param("id") id: number, @Res() res: Response) {
        try {
            const { image, mimeType } = await this.imageService.getImageById(id);
            res.setHeader("Content-Type", mimeType);
            res.send(image);
        } catch (error) {
            throw new NotFoundException("No se encontro ninguna imagen");
        }
    }
}
