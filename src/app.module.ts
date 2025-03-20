import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageDataModule } from './image-data/image-data.module';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ImageDataModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.DB_HOST,
      "port": 3308,
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // Límite de 10MB
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

