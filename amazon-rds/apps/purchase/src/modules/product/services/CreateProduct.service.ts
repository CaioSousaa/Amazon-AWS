import { Inject, Injectable } from '@nestjs/common';
import { ProductPrismaRepository } from 'src/external/repositories/ProductPrismaRepository';
import { IProductPortRepository } from '../port/IProductPortRepository';
import { Product } from '../domain/entitie/Product';
import Stripe from 'stripe';

@Injectable()
export class CreateProductService {
  private stripe: Stripe;

  constructor(
    @Inject(ProductPrismaRepository)
    private productRepository: IProductPortRepository,
    @Inject('STRIPE_SECRET_KEY') private readonly apiKey: string,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async execute() {
    const products = await this.stripe.products.list();
    const dataProducts = products.data;

    await Promise.all(
      dataProducts.map(async (p) => {
        if (!(await this.productRepository.findById(p.id))) {
          if (!p.default_price) return;

          const priceStripeInCents = await this.stripe.prices.retrieve(
            p.default_price as string,
          );

          const product = new Product({
            id: p.id,
            priceInCents: priceStripeInCents.unit_amount!,
            description: p.name,
          });

          return this.productRepository.create(product);
        }
      }),
    );
  }
}
