import { Module } from '@nestjs/common';
import { docClient } from '../../config/DynamoConfig';
import { CreateTaskService } from './service/CreateTask.service';
import { TaskController } from './adapters/controller/task.controller';

@Module({
  providers: [
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
