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
      "host": "srv1281.hstgr.io",
      "port": 3306,
      "username": "u177516757_bisteciaUser",
      "password": "21$jOs5Xz#",
      "database": "u177516757_adminbistecia",
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
export class AppModule { }

