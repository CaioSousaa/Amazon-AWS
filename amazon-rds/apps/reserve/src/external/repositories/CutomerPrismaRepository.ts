import prisma from 'src/infra/database/Prisma';
import { Customer } from '../../modules/customer/domain/entitie/Customer';
import { ICustomerPortRepository } from '../../modules/customer/port/ICustomerPortRepository';

export class CustomerPrismaRepository implements ICustomerPortRepository {
  async create({ cpf, name, id }: Customer): Promise<Customer> {
    const newCustomer = await prisma.customer.create({
      data: {
        id,
        cpf,
        name,
      },
    });

    return newCustomer;
  }

  async findByCpf(cpf: string): Promise<Customer> {
    const customer = await prisma.customer.findUnique({
      where: { cpf },
    });

    return customer!;
  }
}
