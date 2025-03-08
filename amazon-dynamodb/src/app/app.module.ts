import { Module } from '@nestjs/common';
import { ClientModule } from 'src/modules/client/client.module';
import { TaskModule } from 'src/modules/task/task.module';

@Module({
  imports: [ClientModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
