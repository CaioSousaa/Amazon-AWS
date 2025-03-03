import { Module } from '@nestjs/common';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
