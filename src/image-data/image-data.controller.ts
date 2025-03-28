import { Controller, Get, NotFoundException, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
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
        } catch (error) {
            throw error;
        }
    }

    @Get("list")
    async getAllImages(@Res() res: Response) {
        const imagesList = await this.imageService.getAllImages();
        res.setHeader('Content-Type', 'application/json');
        res.send(imagesList);
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
