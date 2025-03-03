import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { UploadController } from './infra/http/upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from '../models/Upload';
import { CreateUploadService } from './services/CreateUpload.service';

const UploadDir = join(process.cwd(), 'uploads');
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, UploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 2, //2mb
      },

      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
        } else {
          cb(new Error('Only images are allowed...'), false);
        }
      },
    }),
  ],
  controllers: [UploadController],
  providers: [CreateUploadService],
})
export class UploadModule {}
