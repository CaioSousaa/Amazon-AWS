import {
  ConflictException,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CustomerPrismaRepository } from 'src/external/repositories/CustomerPrismaRepository';
import { ICustomerPortRepository } from '../port/ICustomerPortRepository';
import { CreateCustomerDTO } from '../dto/CreateCustomerDTO';
import { Customer } from '../domain/entitie/Customer';
import { validateCPF } from '../utils/functions/ValidateCpf';

@Injectable()
export class CreateCustomerService {
  constructor(
    @Inject(CustomerPrismaRepository)
    private customerRepository: ICustomerPortRepository,
  ) {}

  async execute({ age, cpf, name }: CreateCustomerDTO): Promise<Customer> {
    const customerAlreadyExists = await this.customerRepository.findByCpf(cpf);

    if (!validateCPF(cpf)) {
      throw new NotAcceptableException(
        'the CPF is invalid or does not follow the format xxx.xxx.xxx-xx',
      );
    }

    if (customerAlreadyExists) {
      throw new ConflictException('CPF already registered by another customer');
    }

    const customer = {
      age,
      cpf,
      name,
      createdAt: new Date(),
    };

    const newCustomer = await this.customerRepository.create(customer);

    return newCustomer;
  }
}
