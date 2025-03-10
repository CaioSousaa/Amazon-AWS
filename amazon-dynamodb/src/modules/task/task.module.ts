import { Module } from '@nestjs/common';
import { docClient } from '../../config/DynamoConfig';
import { CreateTaskService } from './service/CreateTask.service';
import { TaskController } from './adapters/controller/task.controller';
import { SentEmailTaskService } from './service/SentEmailTask.service';
import { SentEmailService } from '../mail/service/SentEmail.service';

@Module({
  providers: [
    SentEmailService,
    SentEmailTaskService,
    CreateTaskService,
    {
      provide: 'DynamoDBDocumentClient',
      useValue: docClient,
    },
  ],
  exports: [CreateTaskService],
  controllers: [TaskController],
})
export class TaskModule {}
