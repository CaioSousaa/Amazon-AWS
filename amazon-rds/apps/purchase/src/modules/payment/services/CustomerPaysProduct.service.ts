import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreatePaymentDTO } from '../dto/CreatePaymentDTO';
import { PaymentPrismaRepository } from 'src/external/repositories/PaymentPrismaRepository';
import { IPaymentPortRepository } from '../port/IPaymentPortRepository';
import { CustomerPrismaRepository } from 'src/external/repositories/CustomerPrismaRepository';
import { ICustomerPortRepository } from 'src/modules/customer/port/ICustomerPortRepository';
import { ProductPrismaRepository } from 'src/external/repositories/ProductPrismaRepository';
import { IProductPortRepository } from 'src/modules/product/port/IProductPortRepository';
import { Payment } from '../domain/entitie/Payment';
import { PurchaseService } from '../../kafka/services/kafka.service';
import Stripe from 'stripe';

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
    private readonly purchaseService: PurchaseService,
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
  }: CreatePaymentDTO): Promise<void> {
    const customerExists = await this.customerRepository.findByCpf(cpf);
    if (!customerExists) {
      throw new NotAcceptableException('Invalid CPF or non-existent customer');
    }

    const productExists = await this.productRepository.findById(product_id);
    if (!productExists) {
      throw new NotAcceptableException('The product does not exist');
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

    const purchaseEvent = {
      customer: {
        customer_id: customerExists.id!,
        name: customerExists.name,
        cpf: customerExists.cpf,
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

    console.log(`[PURCHASE] Dispatching event through PurchaseService...`);
    await this.purchaseService.sendPurchaseEvent(purchaseEvent);
  }
}
