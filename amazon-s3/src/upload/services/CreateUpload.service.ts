import { Injectable, NotAcceptableException } from '@nestjs/common';
import { IUploadDTO } from '../dto/IUploadDTO';
import { Upload } from '../../models/Upload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CreateUploadService {
  constructor(@InjectModel(Upload.name) private uploadModel: Model<Upload>) {}

  async execute({ file }: IUploadDTO): Promise<Upload> {
    if (!file) {
      throw new NotAcceptableException('Arquivo Inexistente!!!');
    }

    const upload = {
      name: file.filename,
      size: file.size,
      key: file.originalname,
      url: '',
      createdAt: new Date(),
    };

    const newUpload = await this.uploadModel.create(upload);

    return newUpload;
  }
}
