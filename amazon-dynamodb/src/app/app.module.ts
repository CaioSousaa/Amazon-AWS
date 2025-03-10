import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientModule } from 'src/modules/client/client.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { TaskModule } from 'src/modules/task/task.module';

@Module({
  imports: [ClientModule, TaskModule, MailModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
