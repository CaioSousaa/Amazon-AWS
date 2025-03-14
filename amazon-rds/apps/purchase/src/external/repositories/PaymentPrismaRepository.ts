import prisma from 'src/infra/database/prisma/PrismaClient';
import { Payment } from 'src/modules/payment/domain/entitie/Payment';
import { IPaymentPortRepository } from 'src/modules/payment/port/IPaymentPortRepository';

export class PaymentPrismaRepository implements IPaymentPortRepository {
  async create({ customer_id, product_id }: Payment): Promise<Payment> {
    const payment = prisma.payment.create({
      data: {
        customer_id,
        product_id,
        createdAt: new Date(),
      },
    });

    return payment;
  }
}
