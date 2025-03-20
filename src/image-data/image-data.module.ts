import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { ImageDataController } from './image-data.controller';
import { ImageDataService } from './image-data.service';

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    controllers: [ImageDataController],
    providers: [ImageDataService]
})
export class ImageDataModule {}
