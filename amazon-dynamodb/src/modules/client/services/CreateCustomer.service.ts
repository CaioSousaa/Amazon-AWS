import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateClientDTO } from '../dto/CreateClientDTO';
import { Client } from '../domain/entities/Client';
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateClientService {
  constructor(
    @Inject('DynamoDBDocumentClient')
    private readonly docClient: DynamoDBDocumentClient,
  ) {}

  async execute({ email, name }: CreateClientDTO): Promise<Client> {
    const queryParams = {
      TableName: 'client',
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const { Items } = await this.docClient.send(new QueryCommand(queryParams));

    if (Items && Items.length > 0) {
      throw new NotAcceptableException(
        'email already registered by another customer',
      );
    }

    const newClient = new Client(
      {
        name,
        email,
        createdAt: new Date(),
      },
      uuidv4(),
    );

    const putParams = {
      TableName: 'client',
      Item: {
        id: newClient.id,
        name: newClient.name,
        email: newClient.email,
        createdAt: newClient.createdAt.toISOString(),
      },
    };

    await this.docClient.send(new PutCommand(putParams));

    return newClient;
  }
}
