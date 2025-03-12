import { Module } from '@nestjs/common';
import { CreateCustomerService } from './services/CreateCustomer.service';
import { CustomerController } from './infra/http/customer.controller';
import { CustomerPrismaRepository } from 'src/external/repositories/CustomerPrismaRepository';
import { DeleteCustomerService } from './services/DeleteCustomer.service';

@Module({
  controllers: [CustomerController],
  providers: [
    CreateCustomerService,
    CustomerPrismaRepository,
    DeleteCustomerService,
  ],
})
export class CustomerModule {}
