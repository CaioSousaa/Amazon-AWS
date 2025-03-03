import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { json } from 'stream/consumers';

@Controller('upload')
export class UploadController {
  @Post('/uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file) {
    return 'upload success';
  }
}
