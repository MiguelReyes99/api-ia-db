import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageDataService {

    constructor(
        @InjectRepository(Image) private readonly imageRepository: Repository<Image>
    ){}

    async createImageRecord(file: Express.Multer.File): Promise<Image> {
        const newImage = new Image();
        newImage.fileName = file.originalname;
        newImage.imageData = file.buffer;
        // newImage.url = `http://localhost:3000/images/${file.originalname}`;

        return this.imageRepository.save(newImage);
    }

    async getImageById(id: number): Promise<{ image: Buffer; mimeType: string }> {
        const imageExists = await this.imageRepository.findOne({ where: { id } })
        if(!imageExists) {
            throw new NotFoundException("No se encontro ninguna imagen");
        }

        return {
            image: imageExists.imageData,
            mimeType: this.getMimeType(imageExists.fileName)
        };
    }


    private getMimeType(fileName: string): string {
        const extension = fileName.split(".").pop()?.toLowerCase();
        switch(extension) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            default:
                return "application/octet-stream";  // Extensión desconocida
        }
    }
}
