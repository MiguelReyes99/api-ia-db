import { Injectable } from '@nestjs/common';
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
        newImage.url = `http://localhost:3000/images/${file.originalname}`;

        return this.imageRepository.save(newImage);
    }
}
