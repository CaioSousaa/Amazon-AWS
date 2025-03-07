import { Module } from '@nestjs/common';
import { CreateClientService } from './services/CreateCustomer.service';
import { docClient } from '../../config/DynamoConfig';
import { ClientController } from './adapters/controller/client.controller';

@Module({
  providers: [
    CreateClientService,
    {
      provide: 'DynamoDBDocumentClient',
      useValue: docClient,
    },
  ],
  exports: [CreateClientService],
  controllers: [ClientController],
})
export class ClientModule {}
