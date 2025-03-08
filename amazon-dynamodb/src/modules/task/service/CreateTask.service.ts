import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from '../dto/CreateTaskDTO';
import { Status, Task } from '../domain/entities/Task';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateTaskService {
  constructor(
    @Inject('DynamoDBDocumentClient')
    private readonly docClient: DynamoDBDocumentClient,
  ) {}

  async execute(
    { recipient_email, description }: CreateTaskDTO,
    client_id: string,
  ): Promise<Task> {
    const newTask = new Task(
      {
        recipient_email,
        description,
        status: Status.error,
        client_id,
      },
      uuidv4(),
    );

    const putParams = {
      TableName: 'task',
      Item: {
        id: newTask.id,
        client_id: newTask.client_id,
        description: newTask.description,
        status: newTask.status.toString(),
        recipient_email: newTask.recipient_email,
      },
    };

    await this.docClient.send(new PutCommand(putParams));

    return newTask;
  }
}
