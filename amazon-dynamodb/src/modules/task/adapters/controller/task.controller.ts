import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskService } from '../../service/CreateTask.service';
import { CreateTaskDTO } from '../../dto/CreateTaskDTO';
import { Task } from '../../domain/entities/Task';

@Controller('task')
export class TaskController {
  constructor(private createTaskService: CreateTaskService) {}

  @Post(':client_id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() request: CreateTaskDTO,
    @Param('client_id') client_id: string,
  ): Promise<Task> {
    return this.createTaskService.execute(request, client_id);
  }
}
