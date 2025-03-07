import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateClientService } from '../../services/CreateCustomer.service';
import { CreateClientDTO } from '../../dto/CreateClientDTO';
import { Client } from '../../domain/entities/Client';

@Controller('client')
export class ClientController {
  constructor(private createClientService: CreateClientService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() request: CreateClientDTO): Promise<Client> {
    return this.createClientService.execute(request);
  }
}
