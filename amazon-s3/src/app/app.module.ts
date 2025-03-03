import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { UploadModule } from 'src/upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';

dotenv.config();

const mongoUrl = String(process.env.URL_MONGO);

@Module({
  imports: [UploadModule, MongooseModule.forRoot(mongoUrl)],
  controllers: [],
  providers: [],
})
export class AppModule {}
