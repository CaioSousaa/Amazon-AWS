import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerService } from '../../services/CreateCustomer.service';
import { DeleteCustomerService } from '../../services/DeleteCustomer.service';
import { CreateCustomerDTO } from '../../dto/CreateCustomerDTO';

@Controller('api/purchase/customer')
export class CustomerController {
  constructor(
    private createCustomerService: CreateCustomerService,
    private deleteCustomerService: DeleteCustomerService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() request: CreateCustomerDTO) {
    return this.createCustomerService.execute(request);
  }

  @Delete('delete/:cpf')
  async del(@Param('cpf') cpf: string) {
    return this.deleteCustomerService.execute(cpf);
  }
}
