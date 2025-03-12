import { Customer } from '../../modules/customer/domain/entitie/Customer';
import prisma from '../../infra/database/prisma/PrismaClient';
import { ICustomerPortRepository } from '../../modules/customer/port/ICustomerPortRepository';

export class CustomerPrismaRepository implements ICustomerPortRepository {
  async create({ age, cpf, name }: Customer): Promise<Customer> {
    const customer = await prisma.customer.create({
      data: {
        age,
        cpf,
        name,
        createdAt: new Date(),
      },
    });

    return customer;
  }

  async delete(id: string): Promise<void> {
    await prisma.customer.delete({
      where: { id },
    });
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const findCustomerByCpf = await prisma.customer.findUnique({
      where: { cpf },
    });

    if (!findCustomerByCpf) {
      return null;
    }

    return findCustomerByCpf;
  }
}
