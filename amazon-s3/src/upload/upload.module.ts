import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { UploadController } from './infra/http/upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from '../models/Upload';
import { CreateUploadService } from './services/CreateUpload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
  ],
  controllers: [UploadController],
  providers: [CreateUploadService],
})
export class UploadModule {}
