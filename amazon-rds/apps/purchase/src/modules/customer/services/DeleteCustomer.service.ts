import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CustomerPrismaRepository } from 'src/external/repositories/CustomerPrismaRepository';
import { ICustomerPortRepository } from '../port/ICustomerPortRepository';

@Injectable()
export class DeleteCustomerService {
  constructor(
    @Inject(CustomerPrismaRepository)
    private customerRepository: ICustomerPortRepository,
  ) {}

  async execute(cpf: string): Promise<string> {
    const customerExists = await this.customerRepository.findByCpf(cpf);

    if (!customerExists) {
      throw new NotAcceptableException('invalid CPF, customer not found');
    }

    await this.customerRepository.delete(customerExists.id!);

    return 'customer deleted successfully';
  }
}
