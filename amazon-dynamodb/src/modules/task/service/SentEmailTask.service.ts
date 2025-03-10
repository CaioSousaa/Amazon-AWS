import {
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SentEmailService } from 'src/modules/mail/service/SentEmail.service';

@Injectable()
export class SentEmailTaskService {
  constructor(
    private readonly mailService: SentEmailService,
    @Inject('DynamoDBDocumentClient')
    private readonly docClient: DynamoDBDocumentClient,
  ) {}

  @Cron('45 * * * * *')
  async handleCron() {
    const queryParams = { TableName: 'task' };

    const items = await this.docClient.send(new ScanCommand(queryParams));

    await Promise.all(
      items.Items?.map(async (task) => {
        if (task.status === '0') {
          try {
            await this.mailService.sendMail(
              task.recipient_email,
              task.description,
            );

            const putParams = {
              TableName: 'task',
              Key: { id: String(task.id) },
              UpdateExpression: 'SET #status = :newStatus',
              ExpressionAttributeNames: {
                '#status': 'status',
              },
              ExpressionAttributeValues: {
                ':newStatus': '1',
              },
            };

            await this.docClient.send(new UpdateCommand(putParams));
          } catch {
            const putParams = {
              TableName: 'task',
              Key: { id: String(task.id) },
              UpdateExpression: 'SET #status = :newStatus',
              ExpressionAttributeNames: {
                '#status': 'status',
              },
              ExpressionAttributeValues: {
                ':newStatus': '2',
              },
            };

            await this.docClient.send(new UpdateCommand(putParams));
          }
        }
      }) || [],
    );
  }
}
