import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreatePaymentDTO } from '../dto/CreatePaymentDTO';
import { PaymentPrismaRepository } from 'src/external/repositories/PaymentPrismaRepository';
import { IPaymentPortRepository } from '../port/IPaymentPortRepository';
import { CustomerPrismaRepository } from 'src/external/repositories/CustomerPrismaRepository';
import { ICustomerPortRepository } from 'src/modules/customer/port/ICustomerPortRepository';
import { ProductPrismaRepository } from 'src/external/repositories/ProductPrismaRepository';
import { IProductPortRepository } from 'src/modules/product/port/IProductPortRepository';
import { Payment } from '../domain/entitie/Payment';
import Stripe from 'stripe';

export interface IResponse {
  customer: {
    customer_id: string;
    name: string;
    cpf: string;
  };
  product: {
    product_id: string;
    priceInCents: number;
  };
  payment: {
    payment_id: string;
  };
  appointmentDate: Date;
}

@Injectable()
export class CustomerPaysProductService {
  private stripe: Stripe;

  constructor(
    @Inject(PaymentPrismaRepository)
    private paymentRepository: IPaymentPortRepository,
    @Inject(CustomerPrismaRepository)
    private customerRepository: ICustomerPortRepository,
    @Inject(ProductPrismaRepository)
    private productRepository: IProductPortRepository,
    @Inject('STRIPE_SECRET_KEY') private readonly apiKey: string,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async execute({
    appointmentDate,
    paymentInCents,
    product_id,
    cpf,
  }: CreatePaymentDTO): Promise<IResponse> {
    const customerExists = await this.customerRepository.findByCpf(cpf);

    if (!customerExists) {
      throw new NotAcceptableException('invalid CPF or non-existent customer');
    }

    const productExists = await this.productRepository.findById(product_id);

    if (!productExists) {
      throw new NotAcceptableException('the product does not exist');
    }

    if (paymentInCents < productExists.priceInCents) {
      throw new NotAcceptableException('Insufficient purchase price');
    }

    const newPayment = new Payment({
      customer_id: customerExists.id!,
      product_id: productExists.id,
      createdAt: new Date(),
    });

    const newPurchaseProduct = await this.paymentRepository.create(newPayment);
    await this.stripe.customers.create({
      name: customerExists.name,
    });

    return {
      customer: {
        customer_id: customerExists.id!,
        name: customerExists.name,
        cpf: customerExists.name,
      },
      product: {
        product_id: productExists.id,
        priceInCents: productExists.priceInCents,
      },
      payment: {
        payment_id: newPurchaseProduct.id!,
      },
      appointmentDate,
    };
  }
}
