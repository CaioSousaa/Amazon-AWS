import {
  Controller,
  NotAcceptableException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerS3Config } from '../../../config/MulterConfig';
import { IUploadDTO } from 'src/upload/dto/IUploadDTO';
import { CreateUploadService } from 'src/upload/services/CreateUpload.service';

@Controller('upload')
export class UploadController {
  constructor(private createUploadService: CreateUploadService) {}

  @Post('/uploadImage')
  @UseInterceptors(FileInterceptor('file', multerS3Config))
  async uploadImage(@UploadedFile() file: Express.MulterS3.File) {
    if (!file) {
      throw new NotAcceptableException('Nenhum arquivo foi enviado!');
    }

    const uploadDTO: IUploadDTO = { file };

    return this.createUploadService.execute(uploadDTO);
  }
}
