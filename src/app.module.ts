import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageDataModule } from './image-data/image-data.module';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ImageDataModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        "type": "mysql",
        "host": configService.get("DB_HOST"),
        "port": parseInt(configService.get("DB_PORT") || "3306", 10),
        "username": configService.get("DB_USERNAME"),
        "password": configService.get("DB_PASSWORD"),
        "database": configService.get("DB_NAME"),
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true
      })
    }),
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // Límite de 10MB
    }),
  ],
})
export class AppModule { }

