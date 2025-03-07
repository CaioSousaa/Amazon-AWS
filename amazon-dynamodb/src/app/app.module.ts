import { Module } from '@nestjs/common';
import { ClientModule } from 'src/modules/client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
